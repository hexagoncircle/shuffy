import IntroScreen from "./components/IntroScreen";
import styles from "@css/Home.module.css"

export default function Home() {
  return (
    <main className={styles.scene}>
      <h1 className="visually-hidden">Shuffy</h1>
      <IntroScreen />
    </main>
  )
}