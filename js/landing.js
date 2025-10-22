document.addEventListener("DOMContentLoaded", function () {
  // 1. Atur semua hal terkait popup login
  setupLoginModal();

  // 2. Atur semua hal terkait validasi form
  setupLoginForm();

  // 3. Atur link-link bantuan
  setupHelpLinks();

  function setupLoginModal() {
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginPopupBtn");
    const closeModalBtn = document.getElementById("closeLoginModal");

    // Tampilkan modal saat tombol login di header diklik
    if (loginBtn) {
      loginBtn.onclick = function (e) {
        e.preventDefault(); // Mencegah link '#' melompat ke atas
        if (loginModal) loginModal.style.display = "block";
      };
    }

    // Sembunyikan modal saat tombol close (X) diklik
    if (closeModalBtn) {
      closeModalBtn.onclick = function () {
        if (loginModal) loginModal.style.display = "none";
      };
    }

    // Sembunyikan modal saat klik di luar area modal
    window.onclick = function (event) {
      if (event.target == loginModal) {
        loginModal.style.display = "none";
      }
    };
  }

  /**
   * Fungsi ini mengurus validasi form login saat disubmit.
   */
  function setupLoginForm() {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return; // Keluar jika form tidak ada

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Mencegah form reload halaman

      // Pastikan dataPengguna ada (dari data.js)
      if (typeof dataPengguna === "undefined" || !Array.isArray(dataPengguna)) {
        alert("Data pengguna belum dimuat. Pastikan data.js telah disertakan.");
        return;
      }

      // Ambil nilai input
      const emailInput = document
        .getElementById("email")
        .value.trim()
        .toLowerCase();
      const passwordInput = document.getElementById("password").value;

      // Cari pengguna
      const user = dataPengguna.find(
        (u) =>
          (u.email || "").toLowerCase() === emailInput &&
          u.password === passwordInput
      );

      if (user) {
        alert("Login berhasil! Selamat datang, " + user.nama);
        localStorage.setItem("loggedInUser", user.nama);
        window.location.href = "dashboard.html";
      } else {
        alert("email/password yang anda masukkan salah");
      }
    });
  }

  /**
   * Fungsi ini mengurus link "Lupa Password" dan "Daftar".
   */
  function setupHelpLinks() {
    const lupaLink = document.getElementById("lupaPasswordLink");
    const daftarLink = document.getElementById("daftarLink");

    if (lupaLink) {
      lupaLink.onclick = function (e) {
        e.preventDefault();
        alert(
          "Silakan hubungi administrator sistem Anda untuk mereset password."
        );
      };
    }

    if (daftarLink) {
      daftarLink.onclick = function (e) {
        e.preventDefault();
        alert("Pendaftaran akun baru hanya dapat dilakukan oleh Admin Pusat.");
      };
    }
  }
});
