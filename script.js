const cities = [
  { name: "Jakarta", timeZone: "Asia/Jakarta" },
  { name: "Tokyo", timeZone: "Asia/Tokyo" },
  { name: "London", timeZone: "Europe/London" },
  { name: "New York", timeZone: "America/New_York" }
];

const grid = document.getElementById("grid");

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

  const hourHand = card.querySelector(".hour");
  const minuteHand = card.querySelector(".minute");
  const secondHand = card.querySelector(".second");

  function updateClock() {
    const now = new Date().toLocaleString("en-US", { timeZone: city.timeZone });
    const time = new Date(now);
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDeg = seconds * 6; // 360/60
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = hours * 30 + minutes * 0.5;

    secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
  }

  setInterval(updateClock, 1000);
  updateClock();
});
