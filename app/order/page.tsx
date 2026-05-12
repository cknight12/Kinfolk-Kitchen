'use client'

import { useState, useEffect, Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { allProducts, Product } from '@/lib/products'

const schema = z
  .object({
    name: z.string().min(2, 'Full name is required'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(7, 'Phone number is required'),
    preference: z.enum(['pickup', 'shipping']),
    address: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (d) => {
      if (d.preference === 'shipping' && (!d.address || d.address.trim().length < 5)) return false
      return true
    },
    { message: 'Please enter your full shipping address', path: ['address'] }
  )

type FormValues = z.infer<typeof schema>

interface SelectedItem {
  quantity: number
  variant?: string
}

function ProductRow({
  product,
  selected,
  onToggle,
  onQuantity,
  onVariant,
}: {
  product: Product
  selected: SelectedItem | undefined
  onToggle: () => void
  onQuantity: (q: number) => void
  onVariant: (v: string) => void
}) {
  const checked = !!selected
  return (
    <div
      className={`rounded-2xl border-2 p-4 flex gap-4 items-start transition-all ${
        checked ? 'border-navy bg-peach/60' : 'border-navy/15 bg-cream hover:border-navy/30'
      }`}
    >
      {/* Checkbox */}
      <div className="pt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="w-5 h-5 rounded accent-navy cursor-pointer"
          id={`chk-${product.id}`}
        />
      </div>

      {/* Small image */}
      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-navy/10">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover ${product.id === 'sourdough-loaf' ? 'object-right' : 'object-center'}`}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center text-xs font-dancing text-navy/60 ${
              product.placeholder === 'golden' ? 'bg-amber-100' : 'bg-peach'
            }`}
          >
            🍞
          </div>
        )}
      </div>

      {/* Info + controls */}
      <label htmlFor={`chk-${product.id}`} className="flex-1 cursor-pointer">
        <p className="font-playfair text-navy font-semibold text-sm leading-snug">{product.name}</p>
        <p className="text-olive font-lato text-xs font-medium mt-0.5">{product.priceLabel}</p>

        {/* Variant selector */}
        {checked && product.variants && (
          <select
            className="mt-2 text-xs border border-navy/20 rounded-lg px-2 py-1 bg-cream text-navy font-lato"
            value={selected?.variant || ''}
            onChange={(e) => onVariant(e.target.value)}
          >
            <option value="">Select scent…</option>
            {product.variants.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        )}

        {/* Quantity */}
        {checked && (
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => onQuantity(Math.max(1, (selected?.quantity || 1) - 1))}
              className="w-6 h-6 rounded-full border border-navy/30 text-navy text-sm flex items-center justify-center hover:bg-navy hover:text-cream transition-colors"
            >
              −
            </button>
            <span className="font-lato text-navy text-sm w-4 text-center">{selected?.quantity || 1}</span>
            <button
              type="button"
              onClick={() => onQuantity((selected?.quantity || 1) + 1)}
              className="w-6 h-6 rounded-full border border-navy/30 text-navy text-sm flex items-center justify-center hover:bg-navy hover:text-cream transition-colors"
            >
              +
            </button>
          </div>
        )}
      </label>
    </div>
  )
}

function ConfirmationBanner() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-16 bg-cream">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <div className="relative w-28 h-28 mx-auto mb-7 rounded-full overflow-hidden border-[3px] border-navy shadow-lg">
          <Image
            src="/images/logo.jpg"
            alt="Kinfolk Kitchen"
            fill
            className="object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        <div className="bg-peach rounded-3xl border-2 border-navy/20 p-8">
          <p className="text-4xl mb-4">🧡</p>
          <h2 className="font-playfair text-2xl text-navy font-bold mb-4">Order Received!</h2>
          <p className="font-lato text-navy/80 leading-relaxed text-sm mb-6">
            Your order has been received! 🧡 Please send payment via Venmo to{' '}
            <span className="font-semibold text-navy">@lydia_knight3</span> or{' '}
            <span className="font-semibold text-navy">@alliescurlock</span>.
          </p>

          <div className="bg-cream rounded-2xl p-5 border border-navy/10 text-sm space-y-2">
            <p className="font-playfair text-navy font-semibold mb-3">Have questions?</p>
            <p className="font-lato text-navy/75">
              📱 DM us on Instagram{' '}
              <a
                href="https://www.instagram.com/kinfolk.kitchen"
                className="text-navy font-medium underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @kinfolk.kitchen
              </a>
            </p>
            <p className="font-lato text-navy/75">
              💬 Text us at{' '}
              <a href="tel:+19012682558" className="text-navy font-medium underline">
                (901) 268-2558
              </a>
            </p>
            <p className="font-lato text-navy/65 text-xs mt-3">
              We'll be in touch soon to confirm your order!
            </p>
          </div>
        </div>

        <a
          href="/"
          className="inline-block mt-8 text-sm text-olive font-medium underline underline-offset-2 hover:text-navy transition-colors"
        >
          ← Back to home
        </a>
      </div>
    </div>
  )
}

function OrderForm() {
  const searchParams = useSearchParams()
  const preselect = searchParams.get('product')

  const [selectedItems, setSelectedItems] = useState<Record<string, SelectedItem>>({})
  const [itemsError, setItemsError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { preference: 'pickup' },
  })

  const preference = watch('preference')

  // Pre-select product if ?product= query param is set
  useEffect(() => {
    if (preselect) {
      setSelectedItems({ [preselect]: { quantity: 1 } })
    }
  }, [preselect])

  function toggleProduct(id: string) {
    setSelectedItems((prev) => {
      if (prev[id]) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: { quantity: 1 } }
    })
    setItemsError('')
  }

  function updateQuantity(id: string, quantity: number) {
    setSelectedItems((prev) => ({ ...prev, [id]: { ...prev[id], quantity } }))
  }

  function updateVariant(id: string, variant: string) {
    setSelectedItems((prev) => ({ ...prev, [id]: { ...prev[id], variant } }))
  }

  async function onSubmit(data: FormValues) {
    if (Object.keys(selectedItems).length === 0) {
      setItemsError('Please select at least one item')
      return
    }

    const items = Object.entries(selectedItems).map(([productId, sel]) => {
      const product = allProducts.find((p) => p.id === productId)!
      return {
        productId,
        productName: product.name,
        quantity: sel.quantity,
        priceLabel: product.priceLabel,
        variant: sel.variant,
      }
    })

    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, items }),
      })
      if (!res.ok) throw new Error('Server error')
      setSubmitted(true)
    } catch {
      setServerError('Something went wrong. Please text us at (901) 268-2558 or DM @kinfolk.kitchen to place your order.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return <ConfirmationBanner />

  return (
    <div className="min-h-screen py-12 px-5 bg-cream">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-playfair text-3xl sm:text-4xl text-navy font-bold mb-2">
            Place Your Order
          </h1>
          <p className="font-dancing text-xl text-olive">
            We'll confirm and collect payment via Venmo
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* ── Product Selection ── */}
          <div>
            <h2 className="font-playfair text-xl text-navy font-semibold mb-1">
              What would you like?
            </h2>
            <p className="font-lato text-navy/60 text-xs mb-4">
              Select items and adjust quantities
            </p>

            <div className="space-y-3">
              {allProducts.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  selected={selectedItems[product.id]}
                  onToggle={() => toggleProduct(product.id)}
                  onQuantity={(q) => updateQuantity(product.id, q)}
                  onVariant={(v) => updateVariant(product.id, v)}
                />
              ))}
            </div>
            {itemsError && (
              <p className="text-red-500 text-xs mt-2 font-lato">{itemsError}</p>
            )}
          </div>

          {/* ── Customer Info ── */}
          <div>
            <h2 className="font-playfair text-xl text-navy font-semibold mb-4">Your Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block font-lato text-xs font-medium text-navy/70 uppercase tracking-widest mb-1">
                  Full Name *
                </label>
                <input
                  {...register('name')}
                  placeholder="Your full name"
                  className="w-full border-2 border-navy/20 rounded-xl px-4 py-3 text-sm font-lato text-navy bg-white placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-lato text-xs font-medium text-navy/70 uppercase tracking-widest mb-1">
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border-2 border-navy/20 rounded-xl px-4 py-3 text-sm font-lato text-navy bg-white placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-lato text-xs font-medium text-navy/70 uppercase tracking-widest mb-1">
                  Phone Number *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="(555) 000-0000"
                  className="w-full border-2 border-navy/20 rounded-xl px-4 py-3 text-sm font-lato text-navy bg-white placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* ── Pickup vs Shipping ── */}
          <div>
            <h2 className="font-playfair text-xl text-navy font-semibold mb-4">
              Pickup or Shipping?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {(['pickup', 'shipping'] as const).map((val) => (
                <label
                  key={val}
                  className={`flex items-center gap-3 rounded-2xl border-2 p-4 cursor-pointer transition-all ${
                    preference === val
                      ? 'border-navy bg-peach/60'
                      : 'border-navy/15 bg-cream hover:border-navy/30'
                  }`}
                >
                  <input
                    {...register('preference')}
                    type="radio"
                    value={val}
                    className="accent-navy"
                  />
                  <div>
                    <p className="font-playfair text-navy font-semibold text-sm capitalize">{val}</p>
                    <p className="font-lato text-navy/55 text-xs">
                      {val === 'pickup' ? 'Nashville, TN pickup' : 'Ship anywhere'}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {/* Shipping address */}
            {preference === 'shipping' && (
              <div className="mt-4">
                <label className="block font-lato text-xs font-medium text-navy/70 uppercase tracking-widest mb-1">
                  Shipping Address *
                </label>
                <textarea
                  {...register('address')}
                  placeholder="Street address, city, state, ZIP"
                  rows={3}
                  className="w-full border-2 border-navy/20 rounded-xl px-4 py-3 text-sm font-lato text-navy bg-white placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors resize-none"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                )}
              </div>
            )}
          </div>

          {/* ── Special Notes ── */}
          <div>
            <label className="block font-playfair text-xl text-navy font-semibold mb-1">
              Special Notes / Requests
            </label>
            <p className="font-lato text-navy/55 text-xs mb-3">
              Allergies, quantities, preferred pickup time, etc.
            </p>
            <textarea
              {...register('notes')}
              placeholder="Anything else we should know?"
              rows={4}
              className="w-full border-2 border-navy/20 rounded-xl px-4 py-3 text-sm font-lato text-navy bg-white placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors resize-none"
            />
          </div>

          {/* ── Payment note ── */}
          <div className="bg-peach rounded-2xl p-5 border border-navy/10 text-sm">
            <p className="font-playfair text-navy font-semibold mb-1">Payment via Venmo</p>
            <p className="font-lato text-navy/70 text-xs leading-relaxed">
              After placing your order, send payment to{' '}
              <span className="font-semibold">@lydia_knight3</span> or{' '}
              <span className="font-semibold">@alliescurlock</span>. We'll confirm your order
              once payment is received.
            </p>
          </div>

          {serverError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <p className="font-lato text-red-700 text-sm">{serverError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-navy text-cream py-4 rounded-full text-base font-medium tracking-wide hover:bg-navy/80 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending your order…' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="font-dancing text-2xl text-olive">Loading…</p>
      </div>
    }>
      <OrderForm />
    </Suspense>
  )
}
