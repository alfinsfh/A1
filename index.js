document.addEventListener('DOMContentLoaded', function() {
    fetch('siswa.json')
        .then(response => response.json())
        .then(data => {
            const studentList = document.getElementById('studentList');
            const kelasFilter = document.getElementById('kelasFilter');
            const kelaminFilter = document.getElementById('kelaminFilter');
            const searchInput = document.getElementById('searchInput');

            // Populate the filter with unique classes
            const classes = new Set();
            data.forEach(student => classes.add(student.kelas));
            classes.forEach(klass => {
                const option = document.createElement('option');
                option.value = klass;
                option.textContent = klass;
                kelasFilter.appendChild(option);
            });

            // Shuffle array function
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            function renderStudents(students) {
                studentList.innerHTML = '';
                students.forEach(student => {
                    const div = document.createElement('div');
                    div.classList.add('student-card');
                    div.innerHTML = `
                        <img src="${student.foto_profil}" alt="${student.nama_panggilan}" class="profile-pic">
                        <h2><a href="siswa.html?id=${student.id_siswa}">${student.nama_lengkap}</a></h2>
                        <p>${student.kelas} - ${student.jurusan}</p>
                    `;
                    studentList.appendChild(div);
                });
            }

            function filterStudents() {
                const searchValue = searchInput.value.toLowerCase();
                const kelasValue = kelasFilter.value;
                const kelaminValue = kelaminFilter.value;

                const filteredData = data.filter(student => {
                    return (student.nama_lengkap.toLowerCase().includes(searchValue) || student.nama_panggilan.toLowerCase().includes(searchValue)) &&
                           (kelasValue === '' || student.kelas === kelasValue) &&
                           (kelaminValue === '' || student.kelamin === kelaminValue);
                });

                shuffleArray(filteredData); // Shuffle data before rendering
                renderStudents(filteredData);
            }

            searchInput.addEventListener('input', filterStudents);
            kelasFilter.addEventListener('change', filterStudents);
            kelaminFilter.addEventListener('change', filterStudents);

            filterStudents(); // Initial render
        });
});
