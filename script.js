// Change these messages and photo captions to personalize the page.
const titleText = "Happy Birthday";
const messageText =
  "May your life be filled with happiness, good health, beautiful memories, " +
  "and all the success you deserve. Keep smiling and shining! 💜";


const photos = [
  { src: "Photo21.jpeg", caption: "Beautiful Memories 💜" },
  { src: "Photo22.jpeg", caption: "Keep Smiling ✨" },
  { src: "Photo23.jpeg", caption: "Special Moments ❤️" },
  { src: "Photo24.jpeg", caption: "Beautiful Day 🌸" },
  { src: "Photo25.jpeg", caption: "Memories Forever 💖" },
  { src: "Photo26.jpeg", caption: "Happy Birthday 🎂" },
  { src: "Photo27.jpeg", caption: "Keep Shining ✨" },
  { src: "Photo28.jpeg", caption: "Stay Happy 💜" },
  { src: "Photo29.jpeg", caption: "Special Memories" },
  { src: "Photo30.jpeg", caption: "Lots of Happiness ❤️" },
  { src: "Photo31.jpeg", caption: "Beautiful Moments" },
  { src: "Photo32.jpeg", caption: "A Special Day 💖" },
  { src: "Photo1.jpeg", caption: "First Memory 💜" },
  { src: "Photo5.jpeg", caption: "Forever Special ✨" },
  { src: "Photo33.jpeg", caption: "Another Beautiful Memory 💜" }
];


const intro = document.getElementById("intro");
const openBtn = document.getElementById("openBtn");
const birthdayPage = document.getElementById("birthdayPage");
const birthdayHero = document.querySelector(".birthday-hero");
const typingTitle = document.getElementById("typingTitle");
const typingMessage = document.getElementById("typingMessage");
const photo = document.getElementById("photo");
const caption = document.getElementById("caption");
const dots = document.getElementById("dots");
const counter = document.getElementById("counter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const memoriesButton = document.getElementById("memoriesButton");
const birthdayMusic = document.getElementById("birthdayMusic");
const memoriesMusic = document.getElementById("memoriesMusic");
const musicBtn = document.getElementById("musicBtn");
const memoryMusicBtn = document.getElementById("memoryMusicBtn");
const stars = document.getElementById("stars");

let currentPhoto = 0;
let slideTimer = null;
let slideshowEnabled = false;
let isOpened = false;
let heartTimer = null;
let photoChangeTimer = null;
let birthdayMusicTimer = null;
let memoriesMusicTimer = null;
let activeMusic = birthdayMusic;

// Create twinkling stars.
for (let i = 0; i < 70; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.textContent = Math.random() > 0.5 ? "✦" : "·";
  star.style.left = Math.random() * 100 + "vw";
  star.style.top = Math.random() * 100 + "vh";
  star.style.fontSize = (Math.random() * 12 + 7) + "px";
  star.style.animationDelay = Math.random() * 3 + "s";
  stars.appendChild(star);
}

function typeText(element, text, speed, callback) {
  let index = 0;
  element.textContent = "";
  const timer = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;
    if (index >= text.length) {
      clearInterval(timer);
      if (callback) callback();
    }
  }, speed);
}

openBtn.addEventListener("click", () => {
  if (isOpened) return;
  isOpened = true;

  const musicPlayback = activeMusic.play();
  musicPlayback.catch(showMusicError);

  intro.classList.add("hide");
  birthdayPage.classList.remove("hidden");

  typeText(typingTitle, titleText, 110, () => {
    typeText(typingMessage, messageText, 28);
  });

  createDots();
  showPhoto(0);
  createConfetti();
  startHearts();
});

function createDots() {
  dots.innerHTML = "";
  photos.forEach((item, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show photo ${index + 1}`);
    dot.addEventListener("click", () => {
      showPhoto(index);
      resetSlideshowTimer();
    });
    dots.appendChild(dot);
  });
}

function showPhoto(index) {
  if (photos.length === 0) return;
  currentPhoto = (index + photos.length) % photos.length;
  const selected = photos[currentPhoto];

  clearTimeout(photoChangeTimer);
  photo.classList.add("fade");

  photoChangeTimer = setTimeout(() => {
    photo.src = selected.src;
    photo.alt = selected.caption;
    caption.textContent = selected.caption;
    counter.textContent = `Photo ${currentPhoto + 1} of ${photos.length}`;

    dots.querySelectorAll("button").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentPhoto);
      dot.setAttribute("aria-current", i === currentPhoto ? "true" : "false");
    });

    photo.classList.remove("fade");
  }, 180);
}

prevBtn.addEventListener("click", () => {
  showPhoto(currentPhoto - 1);
  resetSlideshowTimer();
});

nextBtn.addEventListener("click", () => {
  showPhoto(currentPhoto + 1);
  resetSlideshowTimer();
});

memoriesButton.addEventListener("click", () => {
  startSlideshow();
  switchMusic(memoriesMusic);
});

memoryMusicBtn.addEventListener("click", () => {
  if (memoriesMusic.paused) {
    switchMusic(memoriesMusic);
  } else {
    memoriesMusic.pause();
  }
});

window.addEventListener("scroll", () => {
  if (isOpened && birthdayHero.getBoundingClientRect().bottom <= 0) {
    birthdayMusic.pause();
  }
}, { passive: true });

async function switchMusic(nextMusic) {
  if (activeMusic !== nextMusic) {
    activeMusic.pause();
    activeMusic = nextMusic;
  }

  if (activeMusic.paused) {
    try {
      await activeMusic.play();
    } catch (error) {
      showMusicError(error);
    }
  }
}

function startSlideshow() {
  slideshowEnabled = true;
  resetSlideshowTimer();
}

function resetSlideshowTimer() {
  clearInterval(slideTimer);
  if (slideshowEnabled && photos.length > 1) {
    slideTimer = setInterval(() => showPhoto(currentPhoto + 1), 6000);
  }
}

function showMusicError(error) {
  musicBtn.textContent = "▶ Music: Off";
  musicBtn.title = `Music could not play: ${error.message}`;
}

musicBtn.addEventListener("click", async () => {
  if (activeMusic.paused) {
    try {
      await activeMusic.play();
    } catch (error) {
      showMusicError(error);
    }
  } else {
    activeMusic.pause();
  }
});

for (const track of [birthdayMusic, memoriesMusic]) {
  track.addEventListener("play", () => {
    if (track === birthdayMusic) {
      clearTimeout(birthdayMusicTimer);
      birthdayMusicTimer = setTimeout(() => birthdayMusic.pause(), 12000);
    }

    if (track === memoriesMusic) {
      clearTimeout(memoriesMusicTimer);
      memoriesMusicTimer = setTimeout(() => memoriesMusic.pause(), 80000);
      memoryMusicBtn.textContent = "⏸ Memory Song: On";
      memoryMusicBtn.removeAttribute("title");
    }

    if (track === activeMusic) {
      musicBtn.textContent = "⏸ Music: On";
      musicBtn.removeAttribute("title");
    }
  });

  track.addEventListener("pause", () => {
    if (track === birthdayMusic) {
      clearTimeout(birthdayMusicTimer);
      birthdayMusicTimer = null;
    }

    if (track === memoriesMusic) {
      clearTimeout(memoriesMusicTimer);
      memoriesMusicTimer = null;
      memoryMusicBtn.textContent = "▶ Memory Song: Off";
    }

    if (track === activeMusic) musicBtn.textContent = "▶ Music: Off";
  });

  track.addEventListener("error", () => {
    if (track === memoriesMusic) {
      memoryMusicBtn.textContent = "▶ Memory Song: Off";
      memoryMusicBtn.title = "Memory song could not be loaded. Check the music file path.";
    }

    if (track === activeMusic) {
      musicBtn.textContent = "▶ Music: Off";
      musicBtn.title = "Music could not be loaded. Check the music file path.";
    }
  });
}

function startHearts() {
  clearInterval(heartTimer);
  heartTimer = setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = ["💜", "💖", "♡", "💕"][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 95 + "vw";
    heart.style.fontSize = (Math.random() * 18 + 16) + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 300);
}

function createConfetti() {
  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.backgroundColor = ["#a855f7", "#f0abfc", "#e879f9", "#ffffff", "#8b5cf6"][Math.floor(Math.random() * 5)];
    piece.style.animationDelay = Math.random() * 1.5 + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}
