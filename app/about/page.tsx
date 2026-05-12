import Image from 'next/image'
import Link from 'next/link'

const values = [
  {
    icon: '🌾',
    title: 'Simple Ingredients',
    body: 'We believe the fewer ingredients, the better. Nothing artificial, nothing unnecessary.',
  },
  {
    icon: '🤍',
    title: 'Intentional Living',
    body: 'Every product we make is a thoughtful choice — for you, your family, and the earth.',
  },
  {
    icon: '🍞',
    title: 'Made with Care',
    body: 'Small batches only. Every loaf, every jar, every candle gets our full attention.',
  },
  {
    icon: '🌿',
    title: 'Nontoxic + Organic',
    body: 'We use organic, non-toxic ingredients across all of our food and body products.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero: owners photo full-width ── */}
      <section className="relative w-full" style={{ minHeight: '70vh' }}>
        <Image
          src="/images/owners.jpg"
          alt="The owners of Kinfolk Kitchen"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 40%' }}
          priority
        />
        {/* Gradient overlay — dark at bottom so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

        {/* Text pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 text-center">
          <p className="font-dancing text-cream/80 text-2xl mb-1">Meet the makers</p>
          <h1 className="font-playfair text-4xl sm:text-5xl text-cream font-bold mb-3 drop-shadow-lg">
            Our Story
          </h1>
          <p className="font-lato text-cream/75 text-sm max-w-xs mx-auto">
            Two friends. One kitchen. A whole lot of love.
          </p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-16 px-5 bg-cream">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-playfair text-3xl text-navy font-bold mb-4">
            Simple. Intentional. Nourishing.
          </h2>
          <div className="w-14 h-0.5 bg-olive mx-auto mb-8" />
          <div className="space-y-5 font-lato text-navy/75 leading-relaxed text-base text-left">
            <p>
              Kinfolk Kitchen was born from a simple belief: what we put in and on our bodies
              truly matters. We're a small-batch, home-based food and wellness brand rooted right
              here in Nashville, TN.
            </p>
            <p>
              Everything we make — from our sourdough loaves to our beef tallow lotion — starts
              with real, recognizable ingredients and is made by hand with intention and care.
            </p>
            <p>
              We believe in worry-free, nontoxic + organic living. And we believe food made with
              love just tastes better.
            </p>
          </div>
        </div>
      </section>

      {/* ── Baked goods lifestyle photo ── */}
      <section className="px-5 pb-16 bg-cream">
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden h-64 sm:h-80 border-2 border-navy/15 shadow-lg">
            <Image
              src="/images/baked-goods-photo.jpg"
              alt="Freshly baked goods from Kinfolk Kitchen"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Stripe divider ── */}
      <div className="h-10 bg-stripe-pink" />

      {/* ── Values ── */}
      <section className="py-16 px-5 bg-peach/25">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl text-navy font-bold mb-2">What We Stand For</h2>
            <div className="w-16 h-0.5 bg-olive mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, body }) => (
              <div
                key={title}
                className="bg-cream rounded-3xl p-7 border-2 border-navy/15 text-center hover:border-navy/35 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-playfair text-navy font-semibold text-lg mb-3">{title}</h3>
                <p className="font-lato text-navy/65 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-16 px-5 bg-cream border-t border-peach">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-playfair text-2xl text-navy font-bold mb-6">Find Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-peach rounded-2xl p-5">
              <p className="font-playfair text-xs uppercase tracking-widest text-olive mb-2">Instagram</p>
              <a
                href="https://www.instagram.com/kinfolk.kitchen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy font-medium text-sm hover:text-olive transition-colors"
              >
                @kinfolk.kitchen
              </a>
            </div>
            <div className="bg-peach rounded-2xl p-5">
              <p className="font-playfair text-xs uppercase tracking-widest text-olive mb-2">Text Us</p>
              <a href="tel:+19012682558" className="text-navy font-medium text-sm hover:text-olive transition-colors">
                (901) 268-2558
              </a>
            </div>
            <div className="bg-peach rounded-2xl p-5">
              <p className="font-playfair text-xs uppercase tracking-widest text-olive mb-2">Venmo</p>
              <p className="text-navy text-sm">@lydia_knight3</p>
              <p className="text-navy text-sm">@alliescurlock</p>
            </div>
          </div>
          <p className="font-lato text-navy/60 text-sm mb-6">
            Nashville, TN · Pickup available · Shipping available
          </p>
          <Link
            href="/order"
            className="inline-block bg-navy text-cream px-9 py-3 rounded-full text-sm font-medium hover:bg-navy/80 transition-colors"
          >
            Place an Order
          </Link>
        </div>
      </section>
    </div>
  )
}
