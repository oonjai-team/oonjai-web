import type { Metadata } from "next"
import { Lexend } from "next/font/google"
import "./globals.css"

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-lexend",
})

export const metadata: Metadata = {
  title: "Oonjai",
  description: "Your Parents' Joy, Your Peace Of Mind",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={lexend.variable}>
      <body className="min-h-dvh" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}