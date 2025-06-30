const form = document.getElementById('studentForm');
const tableBody = document.getElementById('studentTableBody');
const search = document.getElementById('search');
const toggleBtn = document.getElementById('toggleDarkMode');

let students = JSON.parse(localStorage.getItem('students')) || [];

function saveToStorage() {
  localStorage.setItem('students', JSON.stringify(students));
}

function renderTable(data = students) {
  tableBody.innerHTML = '';
  data.forEach((student, index) => {
    const row = `
      <tr>
        <td data-label="Name">${student.name}</td>
        <td data-label="Reg No">${student.regNo}</td>
        <td data-label="Dept">${student.dept}</td>
        <td data-label="Year">${student.year}</td>
        <td data-label="Marks">${student.marks}</td>
        <td data-label="Actions">
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const student = {
    name: form.name.value,
    regNo: form.regNo.value,
    dept: form.dept.value,
    year: form.year.value,
    marks: form.marks.value
  };

  students.push(student);
  saveToStorage();
  renderTable();
  form.reset();
  showAlert("Student added successfully!", "success");
});

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    saveToStorage();
    renderTable();

  }
  showAlert("Student deleted!", "error");
}

function editStudent(index) {
  const s = students[index];
  form.name.value = s.name;
  form.regNo.value = s.regNo;
  form.dept.value = s.dept;
  form.year.value = s.year;
  form.marks.value = s.marks;

  students.splice(index, 1); // Temporarily remove for re-adding on submit
  renderTable();
  showAlert("Edit mode enabled for selected student.", "edit");

}

search.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(query) ||
    s.regNo.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

// Dark Mode Initialization
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
});

// Initial render
renderTable();
function showAlert(message, type = 'success') {
  const alertBox = document.getElementById('alertBox');
  alertBox.textContent = message;
  alertBox.className = `alert-box alert-${type}`;
  alertBox.style.display = 'block';
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 3000);
}


