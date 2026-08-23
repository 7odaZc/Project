import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-auto flex w-[min(1120px,calc(100%-32px))] items-center justify-between py-6">
      <Link href="/" className="font-bold tracking-tight">
        Mahmoud<span className="text-[#AAB2FF]">.</span>
      </Link>

      <nav aria-label="Main navigation" className="flex gap-5 text-sm text-[#9EACC0]">
        <Link href="/work" className="hover:text-white">Work</Link>
        <Link href="/about" className="hover:text-white">About</Link>
        <Link href="/contact" className="hover:text-white">Contact</Link>
      </nav>
    </header>
  );
}
