const cities = [
  { name: "Kuala Lumpur", tz: "Asia/Kuala_Lumpur" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "Brunei", tz: "Asia/Brunei" },
  { name: "Singapore", tz: "Asia/Singapore" },
  { name: "New York", tz: "America/New_York" },
  { name: "Sydney", tz: "Australia/Sydney" }
];

const grid = document.getElementById("grid");

function updateClocks() {
  grid.innerHTML = "";
  const now = new Date();
  cities.forEach(city => {
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      timeZone: city.tz
    });
    const date = now.toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
      timeZone: city.tz
    });

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="city">${city.name}</div>
      <div class="time">${time}</div>
      <div class="date">${date}</div>
    `;
    grid.appendChild(card);
  });
}

updateClocks();
setInterval(updateClocks, 1000);
