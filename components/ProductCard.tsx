'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'

function CreamPlaceholder({ name }: { name: string }) {
  return (
    <div className="w-full h-full bg-peach flex flex-col items-center justify-center p-4">
      <div className="border-2 border-navy rounded-full w-20 h-20 flex items-center justify-center mb-3 overflow-hidden bg-cream/60">
        <div className="relative w-16 h-16">
          <Image
            src="/images/logo.jpg"
            alt="Kinfolk Kitchen"
            fill
            className="object-cover rounded-full"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>
      </div>
      <p className="font-dancing text-navy text-sm text-center leading-snug">Photo Coming Soon</p>
    </div>
  )
}

function GoldenPlaceholder({ variants }: { variants?: string[] }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #FFF8E1 0%, #FFE082 100%)' }}
    >
      <div className="border-2 border-amber-500 rounded-full w-20 h-20 flex items-center justify-center mb-3 overflow-hidden bg-amber-50">
        <div className="relative w-16 h-16">
          <Image
            src="/images/logo.jpg"
            alt="Kinfolk Kitchen"
            fill
            className="object-cover rounded-full"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>
      </div>
      <p className="font-dancing text-amber-800 text-sm text-center leading-snug mb-2">Photo Coming Soon</p>
      {variants && (
        <div className="flex flex-col gap-1 items-center">
          {variants.map((v) => (
            <span key={v} className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
              {v}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const { id, name, priceLabel, description, image, placeholder, variants } = product

  return (
    <div
      className={`bg-peach rounded-3xl overflow-hidden border-2 border-navy/15 hover:border-navy/50 transition-all hover:shadow-lg group flex flex-col ${
        featured ? 'shadow-md' : ''
      }`}
    >
      {/* Image / placeholder */}
      <div className="relative h-52 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
              id === 'sourdough-loaf' ? 'object-right' : 'object-center'
            }`}
          />
        ) : placeholder === 'golden' ? (
          <GoldenPlaceholder variants={variants} />
        ) : (
          <CreamPlaceholder name={name} />
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-playfair text-lg text-navy font-semibold mb-1 leading-snug">{name}</h3>

        {/* Variants for non-golden (golden shows them in placeholder) */}
        {variants && placeholder !== 'golden' && (
          <div className="flex flex-wrap gap-1 mb-2">
            {variants.map((v) => (
              <span key={v} className="text-xs bg-cream text-olive px-2 py-0.5 rounded-full border border-olive/30">
                {v}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-navy/65 mb-4 leading-relaxed flex-1">{description}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-playfair text-navy font-bold text-lg">{priceLabel}</span>
          <Link
            href={`/order?product=${id}`}
            className="bg-navy text-cream px-4 py-2 rounded-full text-sm font-medium hover:bg-navy/80 transition-colors shrink-0"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  )
}
