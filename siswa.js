

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');

    if (!studentId) {
        document.getElementById('profile').innerHTML = 'ID siswa tidak ditemukan.';
        return;
    }

    fetch('siswa.json')
        .then(response => response.json())
        .then(data => {
            const allStudents = data; // Store all students for reference
            const student = data.find(s => s.id_siswa === studentId);

            if (!student) {
                document.getElementById('profile').innerHTML = 'Siswa tidak ditemukan.';
                return;
            }

            // Extract friend IDs
            const friendIds = student.teman_terdekat;
            const friends = allStudents.filter(s => friendIds.includes(s.id_siswa));

            const profileDiv = document.getElementById('profile');
            profileDiv.innerHTML = `
<div class="content">
    <div class="navigation">
        <div class="arrow_back">
            <p onclick="window.history.back()">Kembali</p>
        </div>
        <div class="header">${student.nama_lengkap}</div>
        <div class="subtext">25 Tweets</div>
    </div>

    <div class="wallpaper">
        <div class="container-banner">
            <!-- Banner Section -->
            ${student.foto_galeri.map((foto, index) => `
                <div class="banner">
                    <img class="banner-image" id="myImg${index + 1}" src="${foto}" alt="Image ${index + 1}">
                </div>
            `).join('')}
        </div>

        <div class="links">
            <a href="https://x.com/GibsonSMurray/status/1811980098502787267" target="_blank" rel="noreferrer">
                <span>Tutorial</span>
                <i class="icon" data-lucide="link"></i>
            </a>
            <a href="https://x.com/bartek_marzec/status/1798078019770482740/video/1" target="_blank" rel="noreferrer">
                <span>Inspiration</span>
                <i class="icon" data-lucide="sparkle"></i>
            </a>
        </div>

        <!-- Modal -->
        <div id="myModal" class="modal">
            <div class="modal-overlay"></div>
            <div class="modal-dialog">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img class="modal-image" id="img01" alt="Modal Image">
                    <div class="modal-caption" id="caption"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="bio">
        <div class="pre-bio">
            <div class="pfp">
                <img src="${student.foto_profil}" alt="${student.nama_panggilan}">
            </div>
            <div class="badge-container">
                ${student.badge_penghargaan.map(badge => `
                    <div class="tooltip-container">
                        <img src="${badge.logo}" alt="${badge.nama}" class="badge-logo">
                        <span class="tooltip">${badge.nama}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div>
            <div class="header">${student.nama_lengkap}</div>
            <div class="subtext">@codegem_io</div>
        </div>

<div class="friends-container">
    <ul class="closest-friends-list">
        ${friends.slice(0, 3).map(friend => `
            <li class="friend-card">
                <a href="siswa.html?id=${friend.id_siswa}" class="friend-link">
                    <img src="${friend.foto_profil}" alt="${friend.nama_lengkap}" class="friend-image">
                </a>
            </li>
        `).join('')}
    </ul>
    ${friends.length > 3 ? `
        <div class="more-friends-container">
            <a href="teman.html?id=${student.id_siswa}" class="more-friends-link">
                +${friends.length - 3}
            </a>
        </div>
    ` : ''}
</div>

        <div>🚀 We show you how to code cool stuff</div>
        <div>
            <a href="https://linktr.ee/codegem">linktr.ee/codegem</a>
            <span class="secondary">Joined March 2021</span>
        </div>
        <div>
            15 <span class="secondary">Following</span>
            12 <span class="secondary">Followers</span>
        </div>
    </div>

    <div class="tabs">
        <div class="selected" data-tab="tweets">Tweets</div>
        <div data-tab="replies">Tweets & replies</div>
        <div data-tab="media">Media</div>
        <div data-tab="likes">Likes</div>
    </div>

    <div class="tab-content active" id="tweets">
        Content for Tweets
    </div>
    <div class="tab-content" id="replies">
        Content for Tweets & replies
    </div>
    <div class="tab-content" id="media">
        Content for Media
    </div>
    <div class="tab-content" id="likes">
        Content for Likes
    </div>

    <div class="controls">
        <button onclick="switchTheme();" class="btn">Switch theme</button>
    </div>

    <img src="${student.foto_profil}" alt="${student.nama_panggilan}" class="profile-pic">
    <h1>${student.nama_lengkap}</h1>
    <p>Kelas: ${student.kelas}</p>
    <p>Jurusan: ${student.jurusan}</p>
    <p>Tanggal Lahir: ${student.tanggal_lahir}</p>
    <p>Kelamin: ${student.kelamin}</p>
    <p>Jabatan di Kelas: ${student.jabatan_di_kelas}</p>
    <p>Biografi: ${student.biografi}</p>
    <p>Quote Favorit: "${student.quote_favorit}"</p>

    <h2>Teman Terdekat</h2>
    <ul>
        ${friends.map(friend => `
            <li>
                <a href="siswa.html?id=${friend.id_siswa}">
                    <img src="${friend.foto_profil}" alt="${friend.nama_lengkap}" class="profile-pic">
                    ${friend.nama_lengkap}
                </a>
            </li>
        `).join('')}
    </ul>

    <h2>Prestasi</h2>
    <ul>
        ${student.prestasi.map(p => `<li>${p}</li>`).join('')}
    </ul>

    <h2>Aktivitas Ekstrakurikuler</h2>
    <ul>
        ${student.aktivitas_ekstrakurikuler.map(a => `
            <li><a href="ekstrakurikuler.html?nama=${encodeURIComponent(a.nama)}">
                <img src="${a.logo}" alt="${a.nama}" class="activity-logo">
                ${a.nama}
            </a></li>
        `).join('')}
    </ul>

    <h2>Foto Galeri</h2>
    <div class="photo-gallery">
        ${student.foto_galeri.map(foto => `<img src="${foto}" alt="Foto Galeri">`).join('')}
    </div>

    <h2>Hobi dan Minat</h2>
    <ul>
        ${student.hobi_dan_minat.map(hobi => `<li>${hobi}</li>`).join('')}
    </ul>

    <h2>Playlist Musik</h2>
    <a href="${student.playlist_musik}" target="_blank">Dengarkan Playlist</a>

    <h2>Kesan dan Pesan</h2>
    <ul>
        ${student.kesan_dan_pesan.map(kesan => `
            <li><strong>${kesan.nama}:</strong> ${kesan.pesan}</li>
        `).join('')}
    </ul>

    <h2>Mimpi dan Cita-cita</h2>
    <p>${student.mimpi_dan_cita_cita}</p>

    <h2>Statistik Akademis</h2>
    <div class="chart-container">
        <canvas id="semester-chart"></canvas>
    </div>
    <p>Semester 1: Rata-rata ${student.statistik_akademis.semester_1.rata_rata}</p>
    <p>Semester 2: Rata-rata ${student.statistik_akademis.semester_2.rata_rata}</p>

    <h2>Badge Penghargaan</h2>
    <!-- Add Badge Section here if needed -->
</div>

            `;


            const modal = document.getElementById('myModal');
            const imgs = document.querySelectorAll('.banner-image');

            imgs.forEach(img => {
                img.addEventListener('click', function() {
                    modal.style.display = 'block';
                    document.getElementById('img01').src = this.src;
                    document.getElementById('caption').innerHTML = this.alt || '';
                });
            });

            const span = document.getElementsByClassName('close')[0];
            span.addEventListener('click', function() {
                modal.style.display = 'none';
            });

            window.addEventListener('click', function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            });

            // Add event listeners for tab switching
            const tabs = document.querySelectorAll('.tabs div');
            const tabContents = document.querySelectorAll('.tab-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    tabs.forEach(t => t.classList.remove('selected'));
                    tab.classList.add('selected');

                    const targetTab = tab.getAttribute('data-tab');
                    tabContents.forEach(content => {
                        if (content.id === targetTab) {
                            content.classList.add('active');
                        } else {
                            content.classList.remove('active');
                        }
                    });
                });
            });
        })
        .catch(error => {
            document.getElementById('profile').innerHTML = 'Terjadi kesalahan saat memuat data.';
            console.error('Error:', error);
        });
});

window.addEventListener("load", main);

function switchTheme() {
    document.body.classList.toggle('light-theme');
};

// Get the modal
var modal = document.getElementById('myModal');

// Get all images with class 'banner-image'
var imgs = document.querySelectorAll('.banner-image');

imgs.forEach(function(img) {
    img.onclick = function() {
        modal.style.display = 'block';
        var modalImg = document.getElementById('img01');
        var captionText = document.getElementById('caption');
        modalImg.src = this.src;
        captionText.innerHTML = this.alt || ''; // Use alt text if available
    };
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};