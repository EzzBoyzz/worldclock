const cities = [
    { name: "Jakarta", timeZone: "Asia/Jakarta" },
    { name: "Tokyo", timeZone: "Asia/Tokyo" },
    { name: "London", timeZone: "Europe/London" },
    { name: "New York", timeZone: "America/New_York" },
    { name: "Kuching", timeZone: "Asia/Kuching" },
    { name: "Brunei", timeZone: "Asia/Brunei" },
    { name: "Singapore", timeZone: "Asia/Singapore" },
    { name: "Kuala Lumpur", timeZone: "Asia/Kuala_Lumpur" },
    { name: "Sydney", timeZone: "Australia/Sydney" }
];

const grid = document.getElementById("grid");
const globalDateEl = document.getElementById("global-date");

// Menggunakan CSS Grid dari file CSS, bukan di sini
// grid.style.display = "grid";
// grid.style.gridTemplateColumns = "repeat(3, 1fr)";
// grid.style.gridTemplateRows = "repeat(4, auto)";
// grid.style.gap = "16px";
// grid.style.width = "100%";
// grid.style.maxWidth = "1000px";

// Fungsi untuk update tanggal global
function updateGlobalDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    globalDateEl.textContent = `${day}/${month}/${year}`;
}
setInterval(updateGlobalDate, 1000);
updateGlobalDate();

cities.forEach(city => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="city">${city.name}</div>
        <div class="clock">
            <div class="hand hour"></div>
            <div class="hand minute"></div>
            <div class="hand second"></div>
            <div class="center"></div>
        </div>
    `;
    grid.appendChild(card);

    const clock = card.querySelector(".clock");
    
    // Tambahkan angka 1-12
    for (let i = 1; i <= 12; i++) {
        const number = document.createElement("div");
        number.className = "number";
        number.innerText = i;
        
        // Perhitungan posisi angka yang diperbaiki
        const angle = i * 30; // 360/12 = 30 derajat per angka
        const radians = (angle * Math.PI / 180) - (90 * Math.PI / 180); // Ubah ke radian, putar 90 deg
        const radius = 70; // Jarak angka dari pusat
        const centerX = 90; // Setengah dari lebar jam (180px)
        const centerY = 90; // Setengah dari tinggi jam (180px)
        
        const x = centerX + radius * Math.cos(radians);
        const y = centerY + radius * Math.sin(radians);
        
        number.style.left = `${x}px`;
        number.style.top = `${y}px`;
        
        clock.appendChild(number);
    }

    // Tambahkan marker menit
    for (let i = 0; i < 60; i++) {
        const marker = document.createElement("div");
        marker.className = "marker";
        if (i % 5 === 0) marker.classList.add("hour-marker");
        marker.style.transform = `rotate(${i * 6}deg) translateX(-50%)`;
        clock.appendChild(marker);
    }
    
    const hourHand = card.querySelector(".hour");
    const minuteHand = card.querySelector(".minute");
    const secondHand = card.querySelector(".second");

    function updateClock() {
        const now = new Date().toLocaleString("en-US", { timeZone: city.timeZone });
        const time = new Date(now);

        const seconds = time.getSeconds();
        const minutes = time.getMinutes();
        const hours = time.getHours();

        const secondDeg = seconds * 6;
        const minuteDeg = minutes * 6 + seconds * 0.1;
        const hourDeg = hours * 30 + minutes * 0.5;

        secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
        minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
        hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;

        // 🌙 Mode malam: 18:00 - 06:00
        if (hours >= 18 || hours < 6) {
            clock.classList.remove("day");
            clock.classList.add("night");
        } else {
            clock.classList.remove("night");
            clock.classList.add("day");
        }
    }

    setInterval(updateClock, 1000);
    updateClock();
});
