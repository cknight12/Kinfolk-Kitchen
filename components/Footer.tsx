import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-navy text-cream">
      {/* Stripe divider */}
      <div className="h-3 bg-stripe-olive opacity-30" />

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-cream/60">
            <Image
              src="/images/logo.jpg"
              alt="Kinfolk Kitchen"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center font-dancing text-2xl text-peach mb-10">
          Made with care for you and your family.
        </p>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-10">
          <div>
            <h4 className="font-playfair text-xs uppercase tracking-widest text-peach mb-3">
              Follow Along
            </h4>
            <a
              href="https://www.instagram.com/kinfolk.kitchen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/80 hover:text-cream transition-colors text-sm"
            >
              @kinfolk.kitchen
            </a>
          </div>

          <div>
            <h4 className="font-playfair text-xs uppercase tracking-widest text-peach mb-3">
              Questions? Text Us
            </h4>
            <a
              href="tel:+19012682558"
              className="text-cream/80 hover:text-cream transition-colors text-sm"
            >
              (901) 268-2558
            </a>
          </div>

          <div>
            <h4 className="font-playfair text-xs uppercase tracking-widest text-peach mb-3">
              Payment via Venmo
            </h4>
            <p className="text-cream/80 text-sm">@lydia_knight3</p>
            <p className="text-cream/80 text-sm">@alliescurlock</p>
          </div>
        </div>

        {/* Pickup/shipping note */}
        <p className="text-center text-cream/60 text-sm mb-2">
          Nashville, TN pickup or shipping available
        </p>

        <div className="border-t border-cream/10 mt-6 pt-6 text-center text-xs text-cream/40">
          © {new Date().getFullYear()} Kinfolk Kitchen · All rights reserved
        </div>
      </div>
    </footer>
  )
}
