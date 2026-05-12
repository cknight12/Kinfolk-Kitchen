import { NextRequest, NextResponse } from 'next/server'
import { saveOrder, getOrders, OrderItem } from '@/lib/orders'

function buildEmailHtml(order: {
  id: string
  timestamp: string
  name: string
  email: string
  phone: string
  items: OrderItem[]
  preference: string
  address?: string
  notes?: string
}): string {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:6px 0;font-size:14px;color:#2B4A9F;">${item.productName}${item.variant ? ` — ${item.variant}` : ''}</td>
          <td style="padding:6px 0;font-size:14px;color:#8A8A5C;text-align:right;">×${item.quantity} &nbsp; ${item.priceLabel}</td>
        </tr>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:Georgia,serif;background:#FAF3E0;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#FCECD8;border-radius:24px;border:2px solid #2B4A9F22;overflow:hidden;">
    <div style="background:#2B4A9F;padding:28px 32px;text-align:center;">
      <h1 style="color:#FAF3E0;font-size:24px;margin:0 0 4px;">Kinfolk Kitchen</h1>
      <p style="color:#FCECD8;margin:0;font-size:14px;font-family:Arial,sans-serif;">New Order Received</p>
    </div>

    <div style="padding:28px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr>
          <td style="font-size:12px;color:#8A8A5C;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.08em;">Order ID</td>
          <td style="font-size:12px;color:#2B4A9F;font-family:Arial,sans-serif;text-align:right;">${order.id}</td>
        </tr>
        <tr>
          <td style="font-size:12px;color:#8A8A5C;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.08em;">Received</td>
          <td style="font-size:12px;color:#2B4A9F;font-family:Arial,sans-serif;text-align:right;">${new Date(order.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
        </tr>
      </table>

      <h2 style="font-size:16px;color:#2B4A9F;border-bottom:1px solid #2B4A9F22;padding-bottom:8px;margin:0 0 12px;">Customer</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr><td style="font-size:14px;color:#2B4A9F;padding:4px 0;font-family:Arial,sans-serif;"><strong>${order.name}</strong></td></tr>
        <tr><td style="font-size:14px;color:#2B4A9F;padding:2px 0;font-family:Arial,sans-serif;"><a href="mailto:${order.email}" style="color:#2B4A9F;">${order.email}</a></td></tr>
        <tr><td style="font-size:14px;color:#2B4A9F;padding:2px 0;font-family:Arial,sans-serif;"><a href="tel:${order.phone}" style="color:#2B4A9F;">${order.phone}</a></td></tr>
      </table>

      <h2 style="font-size:16px;color:#2B4A9F;border-bottom:1px solid #2B4A9F22;padding-bottom:8px;margin:0 0 12px;">Items Ordered</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        ${itemsHtml}
      </table>

      <h2 style="font-size:16px;color:#2B4A9F;border-bottom:1px solid #2B4A9F22;padding-bottom:8px;margin:0 0 12px;">Delivery</h2>
      <p style="font-size:14px;color:#2B4A9F;font-family:Arial,sans-serif;margin:0 0 8px;">
        <strong>${order.preference === 'shipping' ? '📦 Shipping' : '🤝 Pickup'}</strong>
      </p>
      ${order.address ? `<p style="font-size:14px;color:#2B4A9F;font-family:Arial,sans-serif;margin:0;">${order.address}</p>` : ''}

      ${
        order.notes
          ? `<div style="margin-top:20px;background:#FAF3E0;border-radius:16px;padding:16px;border:1px solid #2B4A9F22;">
              <h3 style="font-size:13px;color:#8A8A5C;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Notes from customer</h3>
              <p style="font-size:14px;color:#2B4A9F;font-family:Arial,sans-serif;margin:0;line-height:1.6;">${order.notes}</p>
            </div>`
          : ''
      }
    </div>

    <div style="background:#2B4A9F;padding:16px 32px;text-align:center;">
      <p style="color:#FCECD888;font-size:12px;font-family:Arial,sans-serif;margin:0;">
        Made with care for you and your family. · Kinfolk Kitchen
      </p>
    </div>
  </div>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, items, preference, address, notes } = body

    if (!name || !email || !phone || !items || !preference) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const order = saveOrder({ name, email, phone, items, preference, address, notes })

    // Send email notification if Resend is configured
    const apiKey = process.env.RESEND_API_KEY
    let emailResult = 'not attempted'
    if (apiKey && apiKey !== 'your_resend_api_key_here') {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(apiKey)
        const from = process.env.EMAIL_FROM || 'onboarding@resend.dev'
        const to = process.env.OWNER_EMAIL || 'hello@kinfolkkitchen.com'
        const result = await resend.emails.send({
          from,
          to,
          subject: `🧺 New Order from ${name} — ${order.id}`,
          html: buildEmailHtml(order),
        })
        emailResult = JSON.stringify(result)
      } catch (emailErr) {
        emailResult = `error: ${emailErr}`
        console.error('Email send failed:', emailErr)
      }
    } else {
      emailResult = 'no api key'
    }

    return NextResponse.json({ success: true, orderId: order.id, emailResult })
  } catch (err) {
    console.error('Order submission error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  const orders = getOrders()
  return NextResponse.json(orders)
}
