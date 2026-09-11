const screens = [...document.querySelectorAll(".screen")];
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

function showScreen(number) {
  screens.forEach((s, i) => s.classList.toggle("active", i === number - 1));
  window.scrollTo(0,0);
  if (number === 1) resetArrow();
}

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => showScreen(Number(btn.dataset.next)));
});

// Music: browsers usually require the first sound to happen after a tap.
function startMusic() {
  music.play().then(() => {
    musicBtn.textContent = "♫";
  }).catch(() => {});
}
document.addEventListener("pointerdown", startMusic, {once:true});
musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.textContent = "♫";
  } else {
    music.pause();
    musicBtn.textContent = "🔇";
  }
});

// BOW & ARROW — works with mouse AND touch.
const arrow = document.getElementById("arrow");
const target = document.getElementById("heartTarget");
const popup = document.getElementById("heartPopup");
let pulling = false;
let startX = 0;
let originalLeft = 55;

function pointerX(e) {
  return e.touches ? e.touches[0].clientX : e.clientX;
}
function beginPull(e) {
  pulling = true;
  arrow.classList.add("pulling");
  startX = pointerX(e);
  e.preventDefault();
}
function movePull(e) {
  if (!pulling) return;
  const x = pointerX(e);
  const dx = Math.max(-115, Math.min(15, x - startX));
  arrow.style.transform = `translateX(${dx}px)`;
  e.preventDefault();
}
function endPull() {
  if (!pulling) return;
  pulling = false;
  arrow.classList.remove("pulling");

  const matrix = new DOMMatrix(getComputedStyle(arrow).transform);
  const pulled = Math.abs(matrix.e);
  arrow.style.transform = "translateX(0)";
  if (pulled > 65) {
    setTimeout(() => {
      target.classList.add("hit");
      setTimeout(() => popup.classList.add("show"), 350);
    }, 180);
  }
}
arrow.addEventListener("mousedown", beginPull);
window.addEventListener("mousemove", movePull);
window.addEventListener("mouseup", endPull);
arrow.addEventListener("touchstart", beginPull, {passive:false});
window.addEventListener("touchmove", movePull, {passive:false});
window.addEventListener("touchend", endPull);

function resetArrow() {
  arrow.style.transform = "translateX(0)";
  target.classList.remove("hit");
}
document.querySelector("#heartPopup .next-btn").addEventListener("click", () => {
  popup.classList.remove("show");
});

// BALLOONS
const balloons = [...document.querySelectorAll(".balloon")];
const reasonBox = document.getElementById("reasonBox");
const reasonNumber = document.getElementById("reasonNumber");
const reasonText = document.getElementById("reasonText");
const balloonNext = document.getElementById("balloonNext");
let popped = 0;

balloons.forEach((balloon, index) => {
  balloon.addEventListener("click", () => {
    if (balloon.classList.contains("popped")) return;
    balloon.classList.add("popped");
    popped++;
    reasonNumber.textContent = `REASON NO.${popped} 💗`;
    reasonText.textContent = balloon.dataset.message;
    reasonBox.animate(
      [{transform:"scale(.96)",opacity:.5},{transform:"scale(1)",opacity:1}],
      {duration:280,easing:"ease-out"}
    );
    if (popped === balloons.length) balloonNext.classList.remove("hidden");
  });
});

// PHOTO SLIDER
// Add more photos by changing this array. Put the files in assets/.
const photos = [
  {src:"photo1.jpeg", caption:"ye dosti ham nahi todengee♡"},
  {src:"photo2.jpeg", caption:"proof that we have no normal photos "},
  {src:"photo3.jpeg", caption:"this one still makes me smile"},
  {src:"photo4.jpeg", caption:"Jaanuuuu"},
  {src:"photo5.jpeg", caption:"Sundarrr Ladkiiii✨"}
];
let photoIndex = 0;
const photo = document.getElementById("memoryPhoto");
const caption = document.getElementById("photoCaption");
const dots = document.getElementById("photoDots");

photos.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dots.appendChild(dot);
});

function renderPhoto() {
  photo.src = photos[photoIndex].src;
  photo.alt = photos[photoIndex].caption;
  caption.textContent = photos[photoIndex].caption;
  [...dots.children].forEach((d,i)=>d.classList.toggle("active", i===photoIndex));
}
document.getElementById("nextPhoto").addEventListener("click", () => {
  if (photoIndex === photos.length - 1) {
    showScreen(5) ;
    return;
  }

  photoIndex++;
  renderPhoto();
});
document.getElementById("prevPhoto").addEventListener("click", () => {
  photoIndex = (photoIndex - 1 + photos.length) % photos.length;
  renderPhoto();
});

// Swipe support for phone.
let touchStart = 0;
const slider = document.querySelector(".polaroid");
slider.addEventListener("touchstart", e => touchStart = e.touches[0].clientX, {passive:true});
slider.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - touchStart;
  if (Math.abs(dx) > 45) {
    photoIndex = dx < 0 ? (photoIndex + 1) % photos.length : (photoIndex - 1 + photos.length) % photos.length;
    renderPhoto();
  }
});

// ENVELOPE
const envelope = document.getElementById("envelope");
const letterOverlay = document.getElementById("letterOverlay");
const closeLetter = document.getElementById("closeLetter");
envelope.addEventListener("click", () => letterOverlay.classList.add("show"));
closeLetter.addEventListener("click", () => letterOverlay.classList.remove("show"));

// Replay
document.getElementById("replayBtn").addEventListener("click", () => {
  balloons.forEach(b => b.classList.remove("popped"));
  popped = 0;
  reasonNumber.textContent = "REASON";
  reasonText.textContent = "";
  balloonNext.classList.add("hidden");
  photoIndex = 0;
  renderPhoto();
  showScreen(1);
});
