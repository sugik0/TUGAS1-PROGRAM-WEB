document.addEventListener("DOMContentLoaded", function () {
  const trackingForm = document.getElementById("trackingForm");
  const nomorDOInput = document.getElementById("nomorDO");
  const trackingResult = document.getElementById("trackingResult");

  const nomorDOHasil = document.getElementById("nomorDOHasil");
  const namaPenerima = document.getElementById("namaPenerima");
  const statusPengiriman = document.getElementById("statusPengiriman");
  const tglTerima = document.getElementById("tglTerima");
  const ekspedisi = document.getElementById("ekspedisi");
  const tglKirim = document.getElementById("tglKirim");
  const listPerjalanan = document.getElementById("listPerjalanan");

  if (trackingForm) {
    trackingForm.addEventListener("submit", function (event) {

      event.preventDefault();
      const doNumber = nomorDOInput.value.trim();

      if (typeof dataTracking === "undefined") {
        alert("Error: Data tracking tidak dapat dimuat.");
        return;
      }

      const data = dataTracking[doNumber];

      if (data) {

        trackingResult.style.display = "block";

        if (nomorDOHasil) nomorDOHasil.textContent = nomorDOInput.value;
        if (namaPenerima) namaPenerima.textContent = data.nama;
        if (statusPengiriman) statusPengiriman.textContent = data.status;
        if (ekspedisi) ekspedisi.textContent = data.ekspedisi;
        if (tglKirim) tglKirim.textContent = data.tanggalKirim;

        let tanggalTerimaValue = "-";
        if (data.perjalanan && Array.isArray(data.perjalanan)) {

          const deliveryEntry = data.perjalanan.find((item) =>
            item.keterangan.startsWith("Selesai Antar")
          );

          if (deliveryEntry) {
            tanggalTerimaValue = deliveryEntry.waktu.split(" ")[0];
          }
        }
        if (tglTerima) tglTerima.textContent = tanggalTerimaValue;

        if (listPerjalanan) {
          listPerjalanan.innerHTML = "";

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
        alert("Nomor Delivery Order tidak ditemukan!");
        trackingResult.style.display = "none";
      }
    });
  }
});
