import Link from "next/link"

export default function Header() {
  return (
    <header className="w-full border-b bg-primary text-primary-foreground  p-4 flex justify-center">
      <Link href="/">
        <span className="text-lg font-bold">
          Javni konkursi u Bosni i Hercegovini
        </span>
      </Link>
    </header>
  )
}
