import type { Metadata } from "next"
import {
  Instrument_Serif,
  Inter,
  Libre_Baskerville,
  Pinyon_Script,
} from "next/font/google"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
})

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Legend-dairy — The Stinson Playbook Archive",
    template: "%s | Legend-dairy",
  },
  description:
    "A cinematic private archive of every screen-canon play, appearance, and legendary final page.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrument.variable} ${pinyon.variable} ${libre.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
