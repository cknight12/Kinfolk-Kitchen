export interface Product {
  id: string
  name: string
  price: number | null
  priceLabel: string
  description: string
  image: string | null
  category: 'bakedGoods' | 'homeBody'
  placeholder?: 'cream' | 'golden'
  variants?: string[]
}

export const bakedGoods: Product[] = [
  {
    id: 'sourdough-loaf',
    name: 'Sourdough Loaf',
    price: 15,
    priceLabel: '$15',
    description:
      'Naturally leavened sourdough baked fresh in small batches. Simple ingredients, real flavor, made with love.',
    image: '/images/baked-goods-photo.jpg',
    category: 'bakedGoods',
  },
  {
    id: 'sourdough-hamburger-buns',
    name: 'Sourdough Hamburger Buns (6)',
    price: 15,
    priceLabel: '$15',
    description:
      'Set of 6 soft, fluffy sourdough hamburger buns with that perfect sourdough tang. Summer cookout approved.',
    image: null,
    category: 'bakedGoods',
    placeholder: 'cream',
  },
  {
    id: 'sourdough-bagel',
    name: 'Sourdough Bagel',
    price: 4,
    priceLabel: '$4 each',
    description:
      'Chewy, golden sourdough bagels made fresh. Great for breakfast or a wholesome snack.',
    image: null,
    category: 'bakedGoods',
    placeholder: 'cream',
  },
  {
    id: 'sourdough-starter',
    name: 'Sourdough Starter',
    price: 5,
    priceLabel: '$5',
    description:
      'Take home a living piece of our kitchen. Our active, bubbly sourdough starter is ready to bake with.',
    image: null,
    category: 'bakedGoods',
    placeholder: 'cream',
  },
  {
    id: 'strawberry-harvest-jam',
    name: 'Strawberry Harvest Jam',
    price: null,
    priceLabel: 'Ask for availability',
    description:
      'Sweet, vibrant strawberry jam made with fresh-picked berries and a clean, simple recipe. Ask us about current batches.',
    image: '/images/strawberry-jam.png',
    category: 'bakedGoods',
  },
]

export const homeBody: Product[] = [
  {
    id: 'beef-tallow-lotion',
    name: 'Beef Tallow Lotion (8oz)',
    price: 25,
    priceLabel: '$25',
    description:
      'Deeply nourishing 8oz jar of beef tallow lotion. Non-toxic, simple ingredients, and incredibly moisturizing.',
    image: '/images/beef-tallow-lotion.jpg',
    category: 'homeBody',
  },
  {
    id: 'beeswax-candles',
    name: 'Beeswax Candles',
    price: 25,
    priceLabel: '$25 each',
    description:
      'Hand-poured beeswax candles in two cozy scents. Clean burning, naturally fragrant, and non-toxic.',
    image: null,
    category: 'homeBody',
    placeholder: 'golden',
    variants: ['Orange Lemon Summer Blend', 'Coconut Vanilla'],
  },
]

export const allProducts: Product[] = [...bakedGoods, ...homeBody]

export const featuredProducts: Product[] = [
  bakedGoods[0],  // Sourdough Loaf
  bakedGoods[4],  // Strawberry Harvest Jam
  homeBody[0],    // Beef Tallow Lotion
  homeBody[1],    // Beeswax Candles
]
