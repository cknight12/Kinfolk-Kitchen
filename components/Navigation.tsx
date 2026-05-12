'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-cream border-b-2 border-navy sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + brand name */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-navy shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Kinfolk Kitchen"
              fill
              className="object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </div>
          <span className="font-playfair text-navy text-lg font-semibold hidden sm:block leading-tight">
            Kinfolk Kitchen
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-lato text-sm font-medium uppercase tracking-widest transition-colors hover:text-olive ${
                pathname === href
                  ? 'text-olive border-b-2 border-olive pb-0.5'
                  : 'text-navy'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/order"
            className="bg-navy text-cream px-5 py-2 rounded-full text-sm font-medium tracking-wide hover:bg-navy/80 transition-colors"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-navy p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-cream border-t border-peach px-4 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-lato text-navy font-medium uppercase tracking-widest text-sm"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/order"
            className="bg-navy text-cream px-5 py-3 rounded-full text-center text-sm font-medium tracking-wide"
            onClick={() => setOpen(false)}
          >
            Order Now
          </Link>
        </div>
      )}
    </nav>
  )
}
