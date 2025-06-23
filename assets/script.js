document.addEventListener('DOMContentLoaded', () => {
    // Mendapatkan elemen tombol tema dan elemen body
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // --- Logika Deteksi dan Penerapan Tema Awal ---

    // 1. Cek apakah ada tema yang tersimpan di Local Storage
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        // Jika ada, terapkan tema yang tersimpan
        body.classList.add(savedTheme);
        // Atur ikon tombol sesuai tema yang diterapkan
        if (savedTheme === 'dark-mode') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ikon matahari untuk dark mode
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ikon bulan untuk light mode
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // 2. Jika tidak ada tema di Local Storage, cek preferensi sistem operasi pengguna
        // Jika sistem operasi lebih suka mode gelap, terapkan dark mode secara default
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ikon matahari
    }
    // Jika tidak ada preferensi tersimpan atau preferensi sistem adalah light,
    // maka biarkan default (light mode) yang sudah diatur oleh CSS

    // --- Logika Toggle Tema Saat Tombol Diklik ---

    themeToggle.addEventListener('click', () => {
        // Periksa apakah body saat ini memiliki kelas 'dark-mode'
        if (body.classList.contains('dark-mode')) {
            // Jika ya, hapus kelas 'dark-mode' (beralih ke light mode)
            body.classList.remove('dark-mode');
            // Simpan preferensi tema di Local Storage
            localStorage.setItem('theme', 'light-mode');
            // Ganti ikon tombol menjadi bulan (untuk beralih ke dark)
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            // Jika tidak, tambahkan kelas 'dark-mode' (beralih ke dark mode)
            body.classList.add('dark-mode');
            // Simpan preferensi tema di Local Storage
            localStorage.setItem('theme', 'dark-mode');
            // Ganti ikon tombol menjadi matahari (untuk beralih ke light)
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // --- Opsional: Smooth Scrolling untuk Navigasi Internal ---
    // Ini membuat transisi saat mengklik tautan navigasi menjadi lebih halus.

    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Mencegah perilaku default (loncat langsung)

            // Menggulir ke elemen target dengan efek halus
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
