import { useEffect } from "react";
import IntroScreen from "./components/IntroScreen";
import styles from "@css/Home.module.css"

export default function Home() {
  useEffect(() => {
    document.body.classList.add("vibes")
  }, []);

  return (
    <main className={styles.scene}>
      <IntroScreen />
    </main>
  )
}