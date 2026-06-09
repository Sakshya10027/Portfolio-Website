window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const logsContainer = document.getElementById("terminal-logs");
  const binaryName = document.getElementById("binary-name");
  const statusProgress = preloader.querySelector(".status-progress");
  const initBtn = document.getElementById("init-btn");
  
  const logs = [
    "> kernel.init(sakshya_patel)...",
    "> loading_modules: [MERN, DSA, UI_UX]",
    "> fetching_experience_data... DONE",
    "> calibrating_visual_engine... 85%",
    "> secure_connection_established: lucknow.in",
    "> system_ready: true"
  ];

  const finalName = "Sakshya Patel.";
  const chars = "0101010101010101";
  
  let logIndex = 0;
  let progress = 0;

  const typeLogs = () => {
    if (logIndex < logs.length) {
      const log = document.createElement("div");
      log.textContent = logs[logIndex];
      logsContainer.appendChild(log);
      logsContainer.scrollTop = logsContainer.scrollHeight;
      logIndex++;
      setTimeout(typeLogs, 400);
    }
  };

  const scrambleName = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      binaryName.innerText = finalName
        .split("")
        .map((char, index) => {
          if (index < iterations) return finalName[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iterations >= finalName.length) {
        clearInterval(interval);
        showInitiate();
      }
      iterations += 1/3;
    }, 50);
  };

  const startProgress = () => {
    const interval = setInterval(() => {
      progress += Math.random() * 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        scrambleName();
      }
      statusProgress.style.width = `${progress}%`;
    }, 100);
  };

  const showInitiate = () => {
    setTimeout(() => {
      initBtn.classList.add("visible");
    }, 500);
  };

  initBtn.addEventListener("click", () => {
    preloader.classList.add("exit");
    
    setTimeout(() => {
      document.body.classList.remove("preloader-active");
      preloader.style.display = "none";
    }, 800);
  });

  typeLogs();
  startProgress();
});

const themeToggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "dark";

if (currentTheme === "light") {
  document.documentElement.setAttribute("data-theme", "light");
}

themeToggleBtn.addEventListener("click", () => {
  let theme = document.documentElement.getAttribute("data-theme");
  if (theme === "light") {
    theme = "dark";
    document.documentElement.removeAttribute("data-theme");
  } else {
    theme = "light";
    document.documentElement.setAttribute("data-theme", "light");
  }
  localStorage.setItem("theme", theme);
});

const cursorV2 = document.getElementById("cursor-v2");
const cursorLabel = document.getElementById("cursor-label");

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

const animateCursor = () => {
  cursorX = lerp(cursorX, mouseX, 0.15);
  cursorY = lerp(cursorY, mouseY, 0.15);
  
  cursorV2.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
  requestAnimationFrame(animateCursor);
};
animateCursor();

document.querySelectorAll("a, button, .skill-pill, .stat-card").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorV2.classList.add("link-hover");
  });
  el.addEventListener("mouseleave", () => {
    cursorV2.classList.remove("link-hover");
  });
});

document.querySelectorAll(".project-card").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorV2.classList.add("project-hover");
    cursorLabel.textContent = "VIEW PROJECT";
  });
  el.addEventListener("mouseleave", () => {
    cursorV2.classList.remove("project-hover");
    cursorLabel.textContent = "EXPLORE";
  });
});

document.querySelectorAll(".cert-card, .contact-link").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorV2.classList.add("active");
    cursorLabel.textContent = "OPEN";
  });
  el.addEventListener("mouseleave", () => {
    cursorV2.classList.remove("active");
    cursorLabel.textContent = "EXPLORE";
  });
});

const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const navbar = document.getElementById("navbar");

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
  });
});

const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        e.target.querySelectorAll(".skill-bar-fill").forEach((bar) => {
          bar.style.width = bar.dataset.width;
        });
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
);
revealEls.forEach((el) => observer.observe(el));

document.querySelectorAll(".skill-bar-fill").forEach((bar) => {
  const parentObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) bar.style.width = bar.dataset.width;
      });
    },
    { threshold: 0.3 },
  );
  parentObserver.observe(bar.closest(".skill-category"));
});

const memeSounds = [
  "https://www.myinstants.com/media/sounds/vine-boom.mp3",
  "https://www.myinstants.com/media/sounds/discord-notification.mp3",
  "https://www.myinstants.com/media/sounds/error_CD7sEq4.mp3",
];

const audioPool = memeSounds.map((src) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  return audio;
});

document.querySelectorAll(".skill-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * audioPool.length);
    const sound = audioPool[randomIndex];

    const playInstance = sound.cloneNode();
    playInstance.volume = 0.5;

    const playPromise = playInstance.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn(
          "Audio playback failed. Please interact with the page first.",
          error,
        );
      });
    }

    pill.style.backgroundColor = "var(--accent)";
    pill.style.color = "white";
    pill.style.transform = "scale(0.9) rotate(3deg)";
    pill.style.boxShadow = "0 0 15px var(--accent)";

    setTimeout(() => {
      pill.style.backgroundColor = "";
      pill.style.color = "";
      pill.style.transform = "";
      pill.style.boxShadow = "";
    }, 200);
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach((a) => {
    a.style.color =
      a.getAttribute("href") === "#" + current ? "var(--ink)" : "";
  });
});