import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { featuredProducts } from '@/lib/products'

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        {/* Background photo */}
        <div className="absolute inset-0">
          <Image
            src="/images/baked-goods-photo.jpg"
            alt="Kinfolk Kitchen baked goods on a wooden cutting board"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-navy/55" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-5 max-w-xl mx-auto py-16">
          {/* Oval logo */}
          <div className="relative w-36 h-36 mx-auto mb-7 rounded-full overflow-hidden border-[3px] border-navy shadow-xl">
            <Image
              src="/images/logo.jpg"
              alt="Kinfolk Kitchen logo"
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl text-cream font-bold mb-4 leading-tight drop-shadow-lg">
            Kinfolk Kitchen
          </h1>

          <p className="font-dancing text-2xl sm:text-3xl text-peach mb-6 drop-shadow">
            Simple ingredients. Intentionally made. Made to nourish.
          </p>

          <p className="font-lato text-cream/85 text-base sm:text-lg mb-9 leading-relaxed">
            Worry-free, nontoxic + organic living.
            <br />
            Baked goods &amp; home essentials.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>Nash, TN pickup or shipping available.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-block bg-navy text-cream px-10 py-4 rounded-full text-base font-medium tracking-wide hover:bg-navy/80 transition-colors shadow-lg"
            >
              Shop Now
            </Link>
            <Link
              href="/order"
              className="inline-block border-2 border-cream text-cream px-10 py-4 rounded-full text-base font-medium tracking-wide hover:bg-cream hover:text-navy transition-colors"
            >
              Place an Order
            </Link>
          </div>
        </div>
      </section>

      {/* ── About blurb ── */}
      <section className="py-16 px-5 bg-cream">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-dancing text-olive text-xl mb-3">Nashville, TN</p>
          <h2 className="font-playfair text-3xl text-navy font-bold mb-4">
            Made with intention
          </h2>
          <div className="w-14 h-0.5 bg-olive mx-auto mb-6" />
          <p className="font-lato text-navy/75 text-base leading-relaxed">
            At Kinfolk Kitchen, we believe the best food starts with the simplest ingredients.
            Every loaf, every jar, every candle is handmade in our Nashville kitchen — with care
            and real love for you and your family.
          </p>
          <Link href="/about" className="inline-block mt-6 text-sm text-olive font-medium underline underline-offset-2 hover:text-navy transition-colors">
            Our story →
          </Link>
        </div>
      </section>

      {/* ── Stripe divider ── */}
      <div className="h-10 bg-stripe-pink" />

      {/* ── Featured Products ── */}
      <section className="py-16 px-5 bg-peach/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl text-navy font-bold mb-2">
              Our Favorites
            </h2>
            <p className="font-dancing text-xl text-olive">Fresh, small-batch, and made with love</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-block border-2 border-navy text-navy px-9 py-3 rounded-full text-sm font-medium hover:bg-navy hover:text-cream transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── Instagram CTA ── */}
      <section className="py-14 px-5 bg-cream text-center border-t border-peach">
        <p className="font-dancing text-2xl text-olive mb-2">Follow the journey</p>
        <a
          href="https://www.instagram.com/kinfolk.kitchen"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-navy text-cream px-7 py-3 rounded-full text-sm font-medium hover:bg-navy/80 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          @kinfolk.kitchen
        </a>
      </section>
    </div>
  )
}
