const icons = document.querySelectorAll(".icon");
const windows = document.querySelectorAll(".window");
let zIndex = 10;

function openWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;

  win.style.display = "block";
  win.style.zIndex = zIndex++;
}

// Open windows
icons.forEach(icon => {
  icon.addEventListener("click", () => {
    const id = icon.dataset.window;
    const win = document.getElementById(id);
    openWindow(id);
  });
});

// Close windows
document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", e => {
    e.target.closest(".window").style.display = "none";
  });
});

// Drag windows
windows.forEach(win => {
  const bar = win.querySelector(".title-bar");
  let offsetX = 0, offsetY = 0, isDragging = false;

  bar.addEventListener("mousedown", e => {
    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = zIndex++;
  });

  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    win.style.left = e.clientX - offsetX + "px";
    win.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
});

function updateTaskbarClock() {
  const clock = document.querySelector(".taskbar-clock");
  if (!clock) return;

  const now = new Date();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  clock.textContent = `${hours}:${minutes}`;
}

// Update immediately
updateTaskbarClock();

// Update every minute
setInterval(updateTaskbarClock, 60000);

window.addEventListener("load", () => {
  openWindow("welcome");
});

const welcomeTask = document.getElementById("welcome-task");

if (welcomeTask) {
  welcomeTask.addEventListener("click", () => {
    openWindow("welcome");
  });
}