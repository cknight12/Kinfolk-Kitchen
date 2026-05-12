import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { bakedGoods, homeBody } from '@/lib/products'

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      {/* ── Page header ── */}
      <div className="bg-peach py-16 px-5 text-center border-b-2 border-navy/15">
        <h1 className="font-playfair text-4xl sm:text-5xl text-navy font-bold mb-2">
          The Shop
        </h1>
        <p className="font-dancing text-2xl text-olive">
          Small-batch · Fresh · Made with love
        </p>
      </div>

      {/* ── Baked Goods & Sourdough ── */}
      <section className="py-16 px-5 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-playfair text-3xl text-navy font-bold mb-2">
              Baked Goods &amp; Sourdough
            </h2>
            <div className="w-20 h-0.5 bg-olive mx-auto" />
          </div>

          {/* Sourdough menu as decorative feature */}
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-xs sm:max-w-sm rounded-[2rem] overflow-hidden border-2 border-navy/20 shadow-lg">
              <Image
                src="/images/sourdough-menu.png"
                alt="Kinfolk Kitchen Sourdough Menu"
                width={420}
                height={530}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bakedGoods.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stripe divider ── */}
      <div className="h-10 bg-stripe-olive" />

      {/* ── Home & Body ── */}
      <section className="py-16 px-5 bg-peach/25">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl text-navy font-bold mb-2">
              Home &amp; Body
            </h2>
            <div className="w-20 h-0.5 bg-olive mx-auto mb-4" />
            <p className="font-lato text-navy/65 text-sm max-w-md mx-auto leading-relaxed">
              Nontoxic, thoughtfully crafted products for your home and body.
              Simple ingredients you can actually trust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {homeBody.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <div className="bg-stripe-pink py-3" />
      <section className="py-14 px-5 bg-cream text-center">
        <p className="font-playfair text-xl text-navy font-semibold mb-2">
          Ready to order?
        </p>
        <p className="font-lato text-navy/65 text-sm mb-6">
          Fill out our simple order form and we'll be in touch. Payment via Venmo after confirmation.
        </p>
        <a
          href="/order"
          className="inline-block bg-navy text-cream px-9 py-3 rounded-full text-sm font-medium hover:bg-navy/80 transition-colors"
        >
          Place Your Order
        </a>
      </section>
    </div>
  )
}
