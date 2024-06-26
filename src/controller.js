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

gsap.to("#about", {
  scaleX: "0.85",
  scrollTrigger: {
    trigger: "#contact",
    start: "top 110%",
    scrub: true,
    // markers: true,
  },
});

gsap.to("#about-text", {
  y: -300,
  scrollTrigger: {
    trigger: "#about-text",
    start: "top 80%",
    scrub: true,
    // markers: true,
  },
});

gsap.to("#about-text", {
  marginTop: "-48px",
  scrollTrigger: {
    trigger: "#about-text",
    start: "top bottom",
  },
});

gsap.to("#contact-header", {
  x: 0,
  opacity: 1,

  fill: "forwards",
  scrollTrigger: {
    trigger: "#contact-header-wrapper",
    start: "top 100%",
    end: "bottom 60%",
    duration: 200,
    // markers: true,
    scrub: true,
  },
});

gsap.to(".circle", {
  scale: 1,
  scrollTrigger: {
    trigger: "#contact-header-wrapper",
    start: "top 80%",
    scrub: true,
  },
});

const animatedHeader = document.querySelectorAll(".animate-header");

animatedHeader.forEach((header) => {
  [...header.children].forEach((char, i) => {
    gsap.to(char, {
      y: 0,
      opacity: 1,
      delay: 0.04 * i,
      duration: 0.2,
      scrollTrigger: {
        trigger: header,
        start: "top 80%",
      },
    });
  });
});

const cursor = document.querySelector("#cursor");
const cursorText = document.querySelector("#cursor-text");
let cursorClientY = 0;

document.addEventListener("mousemove", (e) => {
  cursorClientY = e.clientY;

  cursor.animate([{ left: `${e.pageX}px`, top: `${e.pageY}px` }], {
    duration: 100,
    fill: "forwards",
  });
  cursorText.animate([{ left: `${e.pageX}px`, top: `${e.pageY}px` }], {
    duration: 0,
    fill: "forwards",
  });

  const hoveredElement = e.target;

  if (hoveredElement.id === "work-amedie") {
    cursorText.innerHTML = "";
    cursor.animate(
      [
        {
          height: `${288}px`,
          width: `${288}px`,
          borderRadius: "24px",
          mixBlendMode: "normal",
        },
      ],
      {
        duration: 500,
        fill: "forwards",
      }
    );

    cursor.innerHTML = `<div class="p-6 bg-background text-foreground h-full rounded-3xl">
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
});
