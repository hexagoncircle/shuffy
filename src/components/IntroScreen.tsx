import { SyntheticEvent, useCallback, useEffect, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { moveEyes } from "@js/moveEyes";
import ShuffyCard from "./ShuffyCard";
import Logo from "@assets/logo.svg?react";
import styles from "@css/IntroScreen.module.css";

gsap.registerPlugin(useGSAP);

export default function IntroScreen() {
  const introRef = useRef(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleEyesFocus = useCallback((e: SyntheticEvent | FocusEvent) => {
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = (rect.left + rect.right) / 2;
    const y = (rect.top + rect.bottom) / 2;

    moveEyes(svgRef.current, { x, y });
  }, [])

  useGSAP(() => {
    const duration = 0.5;
    const ease = "expo.out";
    const elasticEase = "elastic.out(0.15,0.12)";
    const sidePull = 12;
    const sideRotation = 11;
    const formHeight = gsap.getProperty("[data-animate=form]", "height");
    let isIntroComplete = false;
    let isFollowCursorActive = false;

    // Set up timelines
    const tlIntro = gsap.timeline();
    const tlBlinking = gsap.timeline({ repeat: -1, repeatDelay: 5 })

    // Appearing animation
    tlIntro
      .set("[data-animate=form]", {
        height: 0
      })
      .set("[data-animate=form-item]", {
        opacity: 0
      })
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
        yPercent: -50,
      })
      .set("[data-animate=letter]", {
        xPercent: 11,
        yPercent: 4,
      })
      .set("[data-animate=tagline]", {
        opacity: 0,
        y: 8
      })
      .set("[data-animate=eye-blink]", {
        opacity: 0
      })
      .to("[data-animate=scene]", {
        scale: 1,
        yPercent: 0,
        duration,
        delay: 0.5,
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
        yPercent: 0,
        duration,
        ease,
        stagger: 0.04
      }, "<")
      .to("[data-animate=letter]", {
        xPercent: 0,
        yPercent: 0,
        duration: duration / 1.5,
        ease: "back.out(5)",
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
      .fromTo("[data-animate=main]", {
        rotate: 20,
        scale: 0.2
      }, {
        rotate: 0,
        scale: 1,
        duration: duration * 1.25,
        ease,
      }, "<+=20%")
      .to("[data-animate=face]", {
        yPercent: -15,
        duration,
        ease: "power2.in",
      }, "<-=30%")
      .to("[data-animate=face]", {
        yPercent: 0,
        duration,
        ease: "back.out(3)",
      }, ">")
      .to("[data-animate=cheek]", {
        yPercent: -35,
        duration,
        ease: "power2.in",
      }, "<-=90%")
      .to("[data-animate=cheek]", {
        yPercent: 0,
        duration,
        ease: "back.out(3)",
      }, ">")
      .to("[data-animate=nose]", {
        transformOrigin: "60% left",
        rotate: -15,
        duration,
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
        xPercent: (i) => i === 0 ? sidePull : -sidePull,
        duration: duration * 1.5,
        ease: elasticEase,
        stagger: 0.08
      }, "<-=30%")
      .to("[data-animate=side]", {
        rotate: (i) => i === 0 ? sideRotation : -sideRotation,
        duration: duration * 2.5,
        ease,
      }, "<+=10%")
      .to(introRef.current, {
        yPercent: -4,
        duration,
        ease: "power4.out"
      }, "<+=20%")
      .to("[data-animate=form]", {
        height: formHeight,
        duration,
        ease: "power4.out",
        onComplete: () => {
          isIntroComplete = true;
        }
      }, "<")
      .to("[data-animate=tagline]", {
        opacity: 1,
        y: 0,
        duration: duration / 2,
        ease,
      }, "<+=50%")
      .to("[data-animate=form-item]", {
        opacity: 1,
        duration,
        ease: "power4.out",
        stagger: 0.03
      }, "<+=25%")

    // Blinking animation
    tlBlinking.set("[data-animate=eye-blink]", {
      opacity: 1,
      onComplete: () => {
        // After intro finishes, allow eyeballs to follow pointer
        if (!isIntroComplete || isFollowCursorActive) return;
        isFollowCursorActive = true;
      }
    }).set("[data-animate=eye-blink]", {
      opacity: 0,
      delay: 0.15
    })

    const handleFollowCursor = (e: PointerEvent) => {
      if (!isFollowCursorActive) return;
      moveEyes(svgRef.current, { x: e.clientX, y: e.clientY })
    }

    const handleFirstBlink = () => {
      if (!isIntroComplete) return;
      tlBlinking.restart();
      document.removeEventListener("pointermove", handleFirstBlink);
    }

    document.addEventListener("pointermove", handleFollowCursor);
    document.addEventListener("pointermove", handleFirstBlink);

    return () => {
      document.removeEventListener("pointermove", handleFollowCursor);
    }
  }, { scope: introRef })

  useEffect(() => {
    document.addEventListener('focusin', handleEyesFocus, true);

    return () => {
      document.removeEventListener('focusin', handleEyesFocus);
    }
  }, [handleEyesFocus])

  return (
    <article ref={introRef} className={styles.intro}>
      <figure className={clsx(styles.scene, "stack")} data-animate="scene">
        <div className={clsx(styles.cards, "stack")} data-animate="cards">
          <img className={styles.left} data-animate="side" src="card-alt.svg" alt="" width="103" height="150" />
          <img className={styles.right} data-animate="side" src="card-alt.svg" alt="" width="103" height="150" />
          <ShuffyCard ref={svgRef} className={styles.main} data-animate="main" />
        </div>
        <Logo className={styles.logo} data-animate="logo" />
      </figure>

      <p className={clsx(styles.tagline, "font-display")} data-animate="tagline">
        A choice of chance for shruggie moods
      </p>

      <form
        className={clsx(styles.form, "center")}
        data-animate="form"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="visually-hidden">Name your deck to get started</label>
        <input
          className="text-center"
          type="text"
          placeholder="Enter a name for your deck"
          data-animate="form-item"
          onChange={handleEyesFocus}
        />
        <button className="action raised" type="button" data-animate="form-item">Get started</button>
      </form>
    </article>
  )
}