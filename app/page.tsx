import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <h1 className="text-3xl font-bold underline">
              Working on Next.js 13!
          </h1>
      </div>
    </main>
  )
}
