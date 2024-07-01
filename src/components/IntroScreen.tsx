import styles from "@css/IntroScreen.module.css";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Logo from "@assets/logo.svg?react";
import Card from "@assets/card.svg?react";

gsap.registerPlugin(useGSAP);

export default function IntroScreen() {
  const ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2, ease: "elastic.out(1,0.3)" });
    const ease = "expo.out";
    const elasticEase = "elastic.out(0.15,0.12)";
    const duration = 0.5;
    const pull = 40;
    const rotation = 11;

    tl
      .set("[data-animate=scene]", {
        transformOrigin: "bottom center",
        yPercent: -30
      })
      .set("[data-animate=logo]", {
        transformOrigin: "bottom center",
        scale: 0.6,
      })
      .set("[data-animate=cards]", {
        transformOrigin: "bottom center",
        scale: 0.8,
      })
      .set("[data-animate=letter-group]", {
        opacity: 0,
        yPercent: -50
      })
      .set("[data-animate=letter]", {
        xPercent: 11,
        yPercent: 4,
      })
      .to("[data-animate=scene]", {
        scale: 1,
        yPercent: -10,
        duration,
        delay: 1,
        ease
      })
      .to("[data-animate=logo]", {
        transformOrigin: "bottom center",
        scale: 1,
        yPercent: 0,
        duration: duration * 3,
        ease
      }, "<")
      .to("[data-animate=letter-group]", {
        opacity: 1,
        duration: 0.1,
        stagger: 0.04
      }, "<")
      .to("[data-animate=letter-group]", {
        xPercent: 0,
        yPercent: 0,
        duration,
        ease,
        stagger: 0.03
      }, "<")
      .to("[data-animate=letter]", {
        xPercent: 0,
        yPercent: 0,
        duration,
        ease: "back.out(4)",
        stagger: 0.04
      }, "<+=25%")
      .to("[data-animate=cards]", {
        scale: 1,
        yPercent: 0,
        duration: duration * 2,
        ease
      }, "<+=5%")
      .fromTo("[data-animate=main]", {
        transformOrigin: 'bottom center',
        yPercent: 150,
      }, {
        yPercent: 20,
        duration: duration * 2,
        ease: elasticEase,
      }, "<+=10%")
      .to("[data-animate=face]", {
        yPercent: -15,
        duration: duration,
        ease: "power2.in",
      }, "<-=30%")
      .to("[data-animate=face]", {
        yPercent: 0,
        duration: duration,
        ease: "back.out(3)",
      }, ">")
      .to("[data-animate=cheeks]", {
        yPercent: -35,
        duration: duration,
        ease: "power2.in",
      }, "<-=90%")
      .to("[data-animate=cheeks]", {
        yPercent: 0,
        duration: duration,
        ease: "back.out(3)",
      }, ">")
      .to("[data-animate=nose]", {
        transformOrigin: "60% left",
        rotate: -15,
        duration: duration,
        ease: "power4.in",
      }, "<-=95%")
      .to("[data-animate=nose]", {
        rotate: 0,
        duration: duration * 2,
        ease: "elastic.out(1.2,0.3)",
      }, ">")
      .fromTo("[data-animate=side]", {
        yPercent: 100
      }, {
        yPercent: 40,
        x: (i) => i === 0 ? pull : -pull,
        duration: duration * 1.5,
        ease: elasticEase,
        stagger: 0.08
      }, "<-=25%")
      .to("[data-animate=side]", {
        rotate: (i) => i === 0 ? rotation : -rotation,
        duration: duration * 2,
        ease,
      }, "<+=10%")

  }, { scope: ref })

  return (
    <article ref={ref} className={clsx(styles.intro, "flow")}>
      <figure className={clsx(styles.scene, "stack")} data-animate="scene">
        <div className={clsx(styles.cards, "stack")} data-animate="cards">
          <img className={styles.left} data-animate="side" src="card-alt.svg" />
          <img className={styles.right} data-animate="side" src="card-alt.svg" />
          <Card className={styles.main} data-animate="main" />
        </div>
        <Logo className={styles.logo} data-animate="logo" />
      </figure>
      {/* <p className="font-display">a choice of chance for shruggie moods</p> */}
    </article>
  )
}