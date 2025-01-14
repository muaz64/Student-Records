const students = [
    { name: 'John Doe', class: '10th', marks: 95 },
    { name: 'Jane Smith', class: '12th', marks: 85 },
    { name: 'Emma Johnson', class: '11th', marks: 92 },
    { name: 'Michael Brown', class: '9th', marks: 88 },
    { name: 'Sophia Davis', class: '10th', marks: 90 },
    { name: 'Liam Wilson', class: '12th', marks: 97 },
];

let currentPage = 1;
const recordsPerPage = 3;

// Display Student Records
function displayStudentRecords() {
    const tableBody = document.querySelector("#student-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = Math.min(startIndex + recordsPerPage, students.length);

    for (let i = startIndex; i < endIndex; i++) {
        const student = students[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
        `;
        tableBody.appendChild(row);
    }

    createPagination();
    highlightTopScorer();
}

// Highlight Top Scorer
function highlightTopScorer() {
    const rows = document.querySelectorAll("#student-table tbody tr");
    let maxMarks = -1;
    let topRow;

    rows.forEach(row => {
        const marks = parseInt(row.children[2].textContent);
        if (marks > maxMarks) {
            maxMarks = marks;
            topRow = row;
        }
    });

    if (topRow) topRow.style.backgroundColor = "#FFD700"; // Gold color
}

// Create Pagination
function createPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ""; // Clear existing buttons

    const totalPages = Math.ceil(students.length / recordsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            displayStudentRecords();
        };
        pagination.appendChild(button);
    }
}

// Sort Table
function sortTable(columnIndex) {
    const isNumeric = columnIndex === 2;
    students.sort((a, b) => {
        const valueA = isNumeric ? a.marks : a.name.toLowerCase();
        const valueB = isNumeric ? b.marks : b.name.toLowerCase();
        return isNumeric ? valueA - valueB : valueA.localeCompare(valueB);
    });
    displayStudentRecords();
}

// Search Filter
function filterTable() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredStudents = students.filter(student => {
        return student.name.toLowerCase().includes(query) || student.class.toLowerCase().includes(query);
    });

    const tableBody = document.querySelector("#student-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    filteredStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Add New Student
function addStudent(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const studentClass = document.getElementById('class').value;
    const marks = parseInt(document.getElementById('marks').value);

    if (marks > 90 && marks <= 100) {
        students.push({ name, class: studentClass, marks });
        displayStudentRecords();
    } else {
        alert("Marks must be between 91 and 100!");
    }
}

// Export to CSV
function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Name,Class,Marks\n";

    students.forEach(student => {
        csvContent += `${student.name},${student.class},${student.marks}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'student_records.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize
window.onload = displayStudentRecords;
