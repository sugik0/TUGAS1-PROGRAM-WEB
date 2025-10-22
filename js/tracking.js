document.addEventListener("DOMContentLoaded", function () {
  const trackingForm = document.getElementById("trackingForm");
  const nomorDOInput = document.getElementById("nomorDO");
  const trackingResult = document.getElementById("trackingResult");

  // Ambil semua elemen untuk menampilkan hasil
  const nomorDOHasil = document.getElementById("nomorDOHasil");
  const namaPenerima = document.getElementById("namaPenerima");
  const statusPengiriman = document.getElementById("statusPengiriman");
  const tglTerima = document.getElementById("tglTerima"); // Tambahan
  const ekspedisi = document.getElementById("ekspedisi");
  const tglKirim = document.getElementById("tglKirim");
  const listPerjalanan = document.getElementById("listPerjalanan");

  // Pastikan form ada sebelum menambah event listener
  if (trackingForm) {
    trackingForm.addEventListener("submit", function (event) {
      // Mencegah halaman reload
      event.preventDefault();
      const doNumber = nomorDOInput.value.trim();

      // Cek jika data.js sudah dimuat
      if (typeof dataTracking === "undefined") {
        alert("Error: Data tracking tidak dapat dimuat.");
        return;
      }

      // Cari data di objek dataTracking (dari data.js)
      const data = dataTracking[doNumber];

      if (data) {
        // --- DATA DITEMUKAN ---

        // Tampilkan kontainer hasil
        trackingResult.style.display = "block";

        // Isi data utama
        if (nomorDOHasil) nomorDOHasil.textContent = data.nomorDO;
        if (namaPenerima) namaPenerima.textContent = data.nama;
        if (statusPengiriman) statusPengiriman.textContent = data.status;
        if (ekspedisi) ekspedisi.textContent = data.ekspedisi;
        if (tglKirim) tglKirim.textContent = data.tanggalKirim;

        // Logika untuk Tanggal Terima
        let tanggalTerimaValue = "-"; // Default value
        if (data.perjalanan && Array.isArray(data.perjalanan)) {
          // Cari entri yang keterangannya "Selesai Antar"
          const deliveryEntry = data.perjalanan.find((item) =>
            item.keterangan.startsWith("Selesai Antar")
          );

          if (deliveryEntry) {
            // Ambil tanggalnya saja (bagian sebelum spasi)
            tanggalTerimaValue = deliveryEntry.waktu.split(" ")[0];
          }
        }
        if (tglTerima) tglTerima.textContent = tanggalTerimaValue;

        // Isi Detail Perjalanan (Timeline)
        if (listPerjalanan) {
          listPerjalanan.innerHTML = ""; // Kosongkan list sebelumnya

          data.perjalanan.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `
              <span class="time">${item.waktu}</span>
              <span class="detail">${item.keterangan}</span>
            `;
            listPerjalanan.appendChild(li);
          });
        }
      } else {
        // --- DATA TIDAK DITEMUKAN ---
        alert("Nomor Delivery Order tidak ditemukan!");
        trackingResult.style.display = "none"; // Sembunyikan hasil
      }
    });
  }
});
