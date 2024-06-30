import styles from "@css/IntroScreen.module.css";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Logo from "@assets/logo.svg?react";

gsap.registerPlugin(useGSAP);

export default function IntroScreen() {
  const ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1, ease: "elastic.out(1,0.3)" });
    const ease = "expo.out";
    const duration = 0.8;
    const rotation = 11;
    const pull = 30;
    const letterCount = 6;
    const letterCountMid = letterCount / 2;
    const letterRotate = 5;
    const letterOffset = 0.1;
    const letterPull = 20;

    tl
      .set("[data-animate=figure]", {
        transformOrigin: "bottom center",
        yPercent: 20,
        scale: 1
      })
      .set("[data-animate=letter]", {
        opacity: 0
      })
      .set("[data-animate=logo]", {
        transformOrigin: "bottom center",
        scaleX: 0.8,
        scaleY: 0.8,
      }, "<")
      .to("[data-animate=figure]", {
        yPercent: -pull / 2,
        scale: 1,
        duration,
        delay: 0.5,
        ease,
      })
      .to("[data-animate=letter]", {
        opacity: 1,
        transformOrigin: "bottom center",
        rotate: (i) => {
          if (i < letterCountMid) {
            return (letterCountMid - i) * -letterRotate;
          } else {
            return (i - letterCountMid + 1) * letterRotate;
          }
        },
        yPercent: (i) => {
          if (i < letterCountMid) {
            return (i + 1) * -letterPull;
          } else {
            return (letterCount - i) * -letterPull;
          }
        },
        scaleY: (i) => {
          if (i < letterCountMid) {
            return (i + 1) * letterOffset + 1;
          } else {
            return (letterCount - i) * letterOffset + 1;
          }
        },
        duration: duration / 4,
        ease,
      }, "<")
      .fromTo("[data-animate=main]", {
        yPercent: 100,
        rotate: 40
      }, {
        yPercent: 0,
        rotate: 0,
        duration: duration / 2,
        ease,
      }, "<")
      .fromTo("[data-animate=side]", {
        yPercent: 120
      }, {
        yPercent: 20,
        x: (i) => i === 0 ? pull : -pull,
        duration: duration / 2,
        ease
      }, "<+=10%")
      .to("[data-animate=side]", {
        rotate: (i) => i === 0 ? rotation : -rotation,
        duration: duration / 2,
        ease
      }, "<+=10%")
      .to("[data-animate=letter]", {
        opacity: 1,
        rotate: 0,
        yPercent: 0,
        scaleY: 1,
        duration,
        ease,
      }, "<")
      .to("[data-animate=logo]", {
        scaleX: 1,
        scaleY: 1,
        duration,
        ease
      }, "<")
      .to("[data-animate=figure]", {
        yPercent: 0,
        duration,
        ease: "elastic.out(1, 0.3)",
      }, "<+=40%")

  }, { scope: ref })

  return (
    <article ref={ref} className={clsx(styles.intro, "flow")}>
      <figure className={clsx(styles.figure, "stack")} data-animate="figure">
        <div className={clsx(styles.wrapper, "stack")} data-animate="wrapper">
          <img className={styles.left} data-animate="side" src="card-alt.svg" />
          <img className={styles.right} data-animate="side" src="card-alt.svg" />
          <img className={styles.main} data-animate="main" src="card.svg" />
        </div>
        <Logo className={styles.logo} data-animate="logo" />
      </figure>
      {/* <p className="font-display">a choice of chance for shruggie moods</p> */}
    </article>
  )
}