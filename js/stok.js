document.addEventListener("DOMContentLoaded", function () {
  const stokGrid = document.getElementById("stokBookGrid");
  const addStokForm = document.getElementById("addStokForm");

  function renderBookGrid() {
    
    if (!stokGrid) return;

    stokGrid.innerHTML = "";

    dataBahanAjar.forEach((item) => {
    
      const card = document.createElement("article");
      card.className = "book-card"; 
      card.innerHTML = `
        <img src="${item.cover}" alt="${item.namaBarang}" class="book-card-image">
        <div class="book-card-content">
          <h3 class="book-card-title">${item.namaBarang}</h3>
          
          <div class="book-card-details">
            <span>Kode: ${item.kodeBarang}</span>
            <span>Lokasi: ${item.kodeLokasi}</span>
            <span>Edisi: ${item.edisi}</span>
          </div>
          
          <div class="book-card-stock">
            Stok: <span>${item.stok}</span>
          </div>
        </div>
      `;

      stokGrid.appendChild(card);
    });
  }

  if (addStokForm) {
    addStokForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const newStok = {
        kodeLokasi: document.getElementById("kodeLokasi").value,
        kodeBarang: document.getElementById("kodeBarang").value,
        namaBarang: document.getElementById("namaBarang").value,
        jenisBarang: "BMP",
        edisi: document.getElementById("edisi").value,
        stok: parseInt(document.getElementById("stok").value, 10),
        cover: "img/std_buku.jpg",
      };

      dataBahanAjar.push(newStok);

      renderBookGrid();

      addStokForm.reset();
    });
  }

  renderBookGrid();

  const stokModal = document.getElementById("addStokModal");
  const openModalBtn = document.getElementById("openAddStokModalBtn");
  const closeModalBtn = document.getElementById("closeStokModal");

  console.log(
    "debug: stokModal=",
    stokModal,
    " openModalBtn=",
    openModalBtn,
    " closeModalBtn=",
    closeModalBtn
  );

  if (openModalBtn) {
    openModalBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (stokModal) {
        stokModal.style.display = "block";
        console.log("debug: modal dibuka");
      } else {
        console.warn("debug: elemen modal tidak ditemukan (id addStokModal)");
      }
    });
  } else {
    console.warn("debug: elemen tombol openAddStokModalBtn tidak ditemukan");
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      if (stokModal) stokModal.style.display = "none";
    });
  }

  window.addEventListener("click", function (event) {
    if (event.target == stokModal) {
      stokModal.style.display = "none";
    }
  });
});
