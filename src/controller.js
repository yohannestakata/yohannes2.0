"use strict";

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  // console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

gsap.to(".header-content", {
  scale: 0.9,
  duration: 2,
  opacity: 0.25,
  scrollTrigger: {
    trigger: "#services",
    start: 0,
    end: "top 10%",
    scrub: true,
    // markers: true,
  },
});

const works = document.querySelector(".works");
const worksWidth = -works.scrollWidth + window.innerWidth - 128;

gsap.to(".works", {
  x: worksWidth,
  scrollTrigger: {
    trigger: ".works-wrapper",
    start: "top top",
    scrub: 1,
    end: () => `+=${worksWidth * -1}`,
    pin: true,
    // markers: true,
  },
});

const animatedHeader = document.querySelector(".animate-header");

console.log(animatedHeader.children);

[...animatedHeader.children].forEach((char, i) => {
  console.log(char);
  gsap.to(char, {
    y: 0,
    opacity: 1,
    delay: 0.04 * i,
    duration: 0.2,
    scrollTrigger: {
      trigger: animatedHeader,
      start: "top 80%",
    },
  });
});

const cursor = document.querySelector("#cursor");
const cursorText = document.querySelector("#cursor-text");
let cursorClientY = 0;

document.addEventListener("mousemove", (e) => {
  cursorClientY = e.clientY;

  if (document.querySelector("#works").getBoundingClientRect().top < 1000) {
    cursor.animate([{ left: `${e.pageX}px`, top: `${e.pageY}px` }], {
      duration: 500,
      fill: "forwards",
      delay: 10,
    });
    cursorText.animate([{ left: `${e.pageX}px`, top: `${e.pageY}px` }], {
      duration: 200,
      fill: "forwards",
    });
  }

  const hoveredElement = e.target;

  if (hoveredElement.id === "work-amedie") {
    cursorText.innerHTML = "";
    cursor.animate(
      [
        {
          height: `${288}px`,
          width: `${288}px`,
          borderRadius: "8px",
          mixBlendMode: "normal",
        },
      ],
      {
        duration: 200,
        fill: "forwards",
      }
    );

    cursor.innerHTML = `<div class="p-6 bg-background text-foreground h-full rounded-lg">
    <h3 class="text-3xl font-semibold">${hoveredElement.dataset.title}</h3>
    <span class="opacity-75">${hoveredElement.dataset.subtitle}</span>
    <p class="text-lg mt-4">${hoveredElement.dataset.description}</p>
    </div>`;
  } else if (
    hoveredElement.id === "work-visualize" ||
    hoveredElement.id === "cursor-text"
  ) {
    cursor.innerHTML = "";
    cursor.animate(
      [
        {
          height: `${80}px`,
          width: `${80}px`,
          borderRadius: "1000px",
          mixBlendMode: "normal",
          backgroundColor: "#ddeee1",
        },
      ],
      {
        duration: 200,
        fill: "forwards",
      }
    );
    cursorText.innerHTML = `<a href=${hoveredElement.dataset.link} target="_blank" class="text-lg font-semibold undeline">Visit</a>`;
  } else {
    cursorText.innerHTML = "";
    cursor.animate(
      [
        {
          height: `${16}px`,
          width: `${16}px`,
          borderRadius: "1000px",
          mixBlendMode: "difference",
          backgroundColor: "#ffffff",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
      }
    );
    cursor.innerHTML = "";
  }
});
document.addEventListener("scroll", (e) => {
  if (document.querySelector("#works").getBoundingClientRect().top < 200) {
    cursor.classList.add("show");
    cursor.classList.remove("hidden");
    cursor.animate(
      { top: `${window.scrollY + cursorClientY}px` },
      { duration: 500, fill: "forwards", delay: 0 }
    );
    cursorText.animate(
      { top: `${window.scrollY + cursorClientY}px` },
      { duration: 500, fill: "forwards", delay: 0 }
    );
  } else {
    cursor.classList.add("hidden");
    cursor.classList.remove("show");
  }
});
