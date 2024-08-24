import { useEffect } from "react";
import IntroScreen from "./components/IntroScreen";
import styles from "@css/Home.module.css"

export default function Home() {
  useEffect(() => {
    document.body.classList.add("vibes")
  }, []);

  return (
    <main className={styles.scene}>
      <h1 className="visually-hidden">Shuffy</h1>
      <IntroScreen />
    </main>
  )
}