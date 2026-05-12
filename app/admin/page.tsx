import { getOrders } from '@/lib/orders'

export const dynamic = 'force-dynamic'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export default async function AdminPage() {
  const orders = getOrders()

  return (
    <div className="min-h-screen py-12 px-5 bg-cream">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-playfair text-3xl text-navy font-bold mb-1">Order Admin</h1>
          <p className="font-lato text-navy/55 text-sm">
            {orders.length === 0
              ? 'No orders yet.'
              : `${orders.length} order${orders.length !== 1 ? 's' : ''} received`}
          </p>
          <p className="font-lato text-navy/40 text-xs mt-1">
            Orders are also emailed to the business owner at time of submission.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-24 bg-peach/20 rounded-3xl border-2 border-navy/10">
            <p className="font-dancing text-2xl text-olive mb-2">No orders yet!</p>
            <p className="font-lato text-navy/50 text-sm">
              Orders will appear here as they come in.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-peach/40 rounded-3xl p-6 border-2 border-navy/15 hover:border-navy/30 transition-colors"
              >
                {/* Order header */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4 pb-4 border-b border-navy/10">
                  <div>
                    <p className="font-playfair text-navy font-bold text-lg">{order.name}</p>
                    <p className="font-lato text-navy/55 text-xs">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                        order.preference === 'shipping'
                          ? 'bg-navy text-cream'
                          : 'bg-olive/20 text-olive'
                      }`}
                    >
                      {order.preference === 'shipping' ? '📦 Shipping' : '🤝 Pickup'}
                    </span>
                    <p className="font-lato text-navy/45 text-xs mt-1">{formatDate(order.timestamp)}</p>
                  </div>
                </div>

                {/* Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
                  <div>
                    <p className="font-lato text-xs uppercase tracking-widest text-olive mb-0.5">Email</p>
                    <a href={`mailto:${order.email}`} className="text-navy underline text-sm font-lato">
                      {order.email}
                    </a>
                  </div>
                  <div>
                    <p className="font-lato text-xs uppercase tracking-widest text-olive mb-0.5">Phone</p>
                    <a href={`tel:${order.phone}`} className="text-navy text-sm font-lato">
                      {order.phone}
                    </a>
                  </div>
                  {order.address && (
                    <div>
                      <p className="font-lato text-xs uppercase tracking-widest text-olive mb-0.5">Ship To</p>
                      <p className="text-navy text-sm font-lato leading-snug">{order.address}</p>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div className="mb-3">
                  <p className="font-lato text-xs uppercase tracking-widest text-olive mb-2">Items Ordered</p>
                  <div className="space-y-1">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-start text-sm font-lato text-navy">
                        <span>
                          {item.productName}
                          {item.variant ? ` — ${item.variant}` : ''}
                        </span>
                        <span className="text-navy/60 shrink-0 ml-4">
                          ×{item.quantity} · {item.priceLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {order.notes && (
                  <div className="bg-cream rounded-2xl p-4 border border-navy/10 mt-3">
                    <p className="font-lato text-xs uppercase tracking-widest text-olive mb-1">Notes</p>
                    <p className="font-lato text-navy/75 text-sm leading-relaxed">{order.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
