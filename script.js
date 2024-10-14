const students = [
    { name: 'John Doe', class: '10th Grade', marks: 95 },
    { name: 'Jane Smith', class: '12th Grade', marks: 95 },
    { name: 'Emma Johnson', class: '11th Grade', marks: 92 },
    { name: 'Michael Brown', class: '9th Grade', marks: 88 },
    { name: 'Sophia Davis', class: '10th Grade', marks: 90 },
    { name: 'Liam Wilson', class: '12th Grade', marks: 97 },
];

function displayStudentRecords() {
    const tableBody = document.querySelector("#student-table tbody");

    students.forEach(student => {
        if (student.marks > 90 && student.marks <= 100) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
            `;
            tableBody.appendChild(row);
        }
    });
}

window.onload = displayStudentRecords;
