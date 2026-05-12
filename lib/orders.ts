import { writeFileSync, readFileSync, existsSync } from 'fs'

const ORDERS_FILE = '/tmp/kinfolk-orders.json'

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  priceLabel: string
  variant?: string
}

export interface Order {
  id: string
  timestamp: string
  name: string
  email: string
  phone: string
  items: OrderItem[]
  preference: 'pickup' | 'shipping'
  address?: string
  notes?: string
}

export function getOrders(): Order[] {
  try {
    if (existsSync(ORDERS_FILE)) {
      return JSON.parse(readFileSync(ORDERS_FILE, 'utf-8'))
    }
  } catch {
    // Return empty array if file unreadable
  }
  return []
}

export function saveOrder(data: Omit<Order, 'id' | 'timestamp'>): Order {
  const orders = getOrders()
  const newOrder: Order = {
    ...data,
    id: `KK-${Date.now()}`,
    timestamp: new Date().toISOString(),
  }
  orders.unshift(newOrder)
  try {
    writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2))
  } catch {
    // Silently continue if write fails (e.g. read-only fs)
  }
  return newOrder
}
