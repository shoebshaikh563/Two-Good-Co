function videoconAnimation() {
  let vicontainer = document.querySelector("#video-container");
  let play = document.querySelector("#play");
  vicontainer.addEventListener("mouseenter", () => {
    gsap.to(play, {
      scale: 1,
      opacity: 1,
    });
  });
  vicontainer.addEventListener("mouseleave", () => {
    gsap.to(play, {
      scale: 0,
      opacity: 0,
    });
  });
  vicontainer.addEventListener("mousemove", (dets) => {
    gsap.to(play, {
      left: dets.x - 40,
      top: dets.y - 40,
    });
  });
}
videoconAnimation();

gsap.from("#page1 >h1", {
  y: 200,
  opacity: 0,
  delay: 0.5,
  duration: 0.7,
  stagger: 0.3,
});

function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

let ele = document.querySelectorAll(".dets");
ele.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    el.childNodes[1].style.top = "10%";
    el.childNodes[3].style.opacity = 1;
  });
  el.addEventListener("mouseleave", () => {
    el.childNodes[1].style.top = "30%";
    el.childNodes[3].style.opacity = 0;
  });
});

let crsr = document.querySelector("#crsr");
document.addEventListener("mousemove", (dets) => {
  gsap.to("#crsr", {
    top: dets.y,
    left: dets.x,
  });
});
let page3 = document.querySelector("#page3");

page3.addEventListener("mouseenter", () => {
  crsr.style.opacity = 1;
});
page3.addEventListener("mouseleave", () => {
  crsr.style.opacity = 0;
});
console.log(page3.childNodes[3]);
page3.childNodes[7].addEventListener("mouseenter", () => {
  crsr.style.backgroundColor = "#fd7300";
});
page3.childNodes[7].addEventListener("mouseleave", () => {
  crsr.style.backgroundColor = "#54423d";
});

page3.childNodes[1].addEventListener("mouseenter", () => {
  crsr.style.backgroundColor = "#fd7300";
});
page3.childNodes[1].addEventListener("mouseleave", () => {
  crsr.style.backgroundColor = "#54423d";
});

gsap.to(".links  a", {
  opacity: 0,
  scrollTrigger: {
    trigger: "#page1",
    scroller: "#main",
    scrub: true,
    start: "-30% -20%",
    end: "top top",
  },
});
gsap.to("#nav-part1 svg", {
  y: -83,
  scrollTrigger: {
    trigger: "#page1",
    scroller: "#main",
    scrub: true,
    start: "-30% -20%",
    end: "top top",
  },
});

gsap.from("#child1, #child2", {
  opacity: 0,
  scale: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
  },
});
gsap.from("#child3, #child4", {
  opacity: 0,
  scale: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    start: "center center",
  },
});
