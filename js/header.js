// Menunggu sampai semua konten HTML dimuat
document.addEventListener('DOMContentLoaded', function() {
  
  // --- 1. Ambil Nama Pengguna dari localStorage ---
  const userName = localStorage.getItem('loggedInUser');
  
  // --- PENTING: Keamanan Sederhana ---
  if (!userName) {
    alert('Anda harus login terlebih dahulu.');
    window.location.href = 'index.html';
    return; 
  }

  // --- 2. Logika Greeting di <main> ---
  const greetingElement = document.getElementById('greeting');
  const now = new Date();
  const hour = now.getHours();
  let greetingText = '';

  if (hour < 11) {
    greetingText = 'Selamat Pagi';
  } else if (hour < 15) {
    greetingText = 'Selamat Siang';
  } else if (hour < 19) {
    greetingText = 'Selamat Sore';
  } else {
    greetingText = 'Selamat Malam';
  }
  
    if (greetingElement) {
        // Diubah agar menyertakan nama user (cth: "Selamat Pagi, Admin!")
        greetingElement.textContent = `${greetingText}, ${userName}!`;
    }
  
  // --- 3. Tampilkan Nama di Header (NAVIGASI) ---
  const userNameDisplay = document.getElementById('userNameDisplay');
  if (userNameDisplay) {
    userNameDisplay.textContent = userName;
  }
  
  // --- 4. Logika Tombol Logout ---
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault(); 
      
      localStorage.removeItem('loggedInUser');
      
      alert('Anda telah berhasil logout.');
      
      window.location.href = 'index.html';
    });
  }

  const clockElement = document.getElementById('liveClock');
  
  function updateClock() {
    if (!clockElement) return; // Hentikan jika elemen jam tidak ada
    
    const now = new Date();
    
    // Opsi format agar terlihat bagus (cth: 21:30:05)
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Gunakan format 24 jam
    };
    
    // 'id-ID' untuk format Indonesia
    const timeString = now.toLocaleTimeString('id-ID', options).replace(/\./g, ':');
    
    clockElement.textContent = timeString;
  }
  
  // Panggil fungsi jam sekali agar langsung muncul
  updateClock();
  
  // Atur agar fungsi jam di-update setiap 1 detik
  setInterval(updateClock, 1000);

});