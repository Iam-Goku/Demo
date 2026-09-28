// ============================================================
// NEAR MINI MART — product catalogue (single source of truth)
// ALL PRICES BELOW ARE DEVELOPMENT PLACEHOLDERS. Replace with real prices.
// To add a photo: set image: "img/milk.webp" (any URL/path). Without an
// image the card shows the emoji instead, so the site works either way.
// Set available:false to show a product as "Unavailable".
// ============================================================
const CATEGORIES = [
  { id: "fresh",     name: "Fresh & Dairy",         emoji: "🥛", tone: "bg-sky-50" },
  { id: "produce",   name: "Fruits & Vegetables",   emoji: "🍅", tone: "bg-red-50" },
  { id: "drinks",    name: "Drinks",                emoji: "🥤", tone: "bg-cyan-50" },
  { id: "snacks",    name: "Snacks",                emoji: "🍫", tone: "bg-amber-50" },
  { id: "grocery",   name: "Grocery",               emoji: "🍚", tone: "bg-lime-50" },
  { id: "household", name: "Household & Cleaning",  emoji: "🧼", tone: "bg-violet-50" }
];

const PRODUCTS = [
  // Fresh & Dairy
  { id: 1,  name: "Fresh Milk",  category: "fresh", price: 7.0,  image: "", emoji: "🥛", description: "", available: true },
  { id: 2,  name: "Laban",       category: "fresh", price: 4.0,  image: "", emoji: "🥛", description: "", available: true },
  { id: 3,  name: "Yoghurt",     category: "fresh", price: 5.0,  image: "", emoji: "🍦", description: "", available: true },
  { id: 4,  name: "Eggs",        category: "fresh", price: 12.0, image: "", emoji: "🥚", description: "", available: true },
  { id: 5,  name: "Cheese",      category: "fresh", price: 9.0,  image: "", emoji: "🧀", description: "", available: true },
  { id: 6,  name: "Butter",      category: "fresh", price: 10.0, image: "", emoji: "🧈", description: "", available: true },
  { id: 7,  name: "Bread",       category: "fresh", price: 4.0,  image: "", emoji: "🍞", description: "", available: true },
  { id: 8,  name: "Khubz",       category: "fresh", price: 3.0,  image: "", emoji: "🫓", description: "", available: true },
  // Fruits & Vegetables
  { id: 9,  name: "Daily Fresh Fruits", category: "produce", price: 10.0, image: "", emoji: "🍎", description: "", available: true },
  { id: 10, name: "Vegetables",  category: "produce", price: 8.0,  image: "", emoji: "🥕", description: "", available: true },
  { id: 11, name: "Onion",       category: "produce", price: 4.0,  image: "", emoji: "🧅", description: "", available: true },
  { id: 12, name: "Potato",      category: "produce", price: 4.0,  image: "", emoji: "🥔", description: "", available: true },
  { id: 13, name: "Tomato",      category: "produce", price: 5.0,  image: "", emoji: "🍅", description: "", available: true },
  // Drinks
  { id: 14, name: "Cold Drinks", category: "drinks", price: 3.0,  image: "", emoji: "🥤", description: "", available: true },
  { id: 15, name: "Water",       category: "drinks", price: 2.0,  image: "", emoji: "💧", description: "", available: true },
  { id: 16, name: "Juices",      category: "drinks", price: 6.0,  image: "", emoji: "🧃", description: "", available: true },
  { id: 17, name: "Energy Drinks", category: "drinks", price: 8.0, image: "", emoji: "⚡", description: "", available: true },
  { id: 18, name: "Karak Tea",   category: "drinks", price: 3.0,  image: "", emoji: "🍵", description: "", available: true },
  // Snacks
  { id: 19, name: "Chips",       category: "snacks", price: 3.0,  image: "", emoji: "🥔", description: "", available: true },
  { id: 20, name: "Chocolates",  category: "snacks", price: 5.0,  image: "", emoji: "🍫", description: "", available: true },
  { id: 21, name: "Biscuits",    category: "snacks", price: 4.0,  image: "", emoji: "🍪", description: "", available: true },
  { id: 22, name: "Ice Cream",   category: "snacks", price: 8.0,  image: "", emoji: "🍨", description: "", available: true },
  { id: 23, name: "Nuts",        category: "snacks", price: 12.0, image: "", emoji: "🥜", description: "", available: true },
  { id: 24, name: "Cakes",       category: "snacks", price: 6.0,  image: "", emoji: "🍰", description: "", available: true },
  // Grocery
  { id: 25, name: "Rice",        category: "grocery", price: 12.0, image: "", emoji: "🍚", description: "", available: true },
  { id: 26, name: "Sugar",       category: "grocery", price: 5.0,  image: "", emoji: "🧂", description: "", available: true },
  { id: 27, name: "Salt",        category: "grocery", price: 2.0,  image: "", emoji: "🧂", description: "", available: true },
  { id: 28, name: "Oil",         category: "grocery", price: 14.0, image: "", emoji: "🫒", description: "", available: true },
  { id: 29, name: "Flour",       category: "grocery", price: 8.0,  image: "", emoji: "🌾", description: "", available: true },
  { id: 30, name: "Tea",         category: "grocery", price: 10.0, image: "", emoji: "🍃", description: "", available: true },
  { id: 31, name: "Coffee",      category: "grocery", price: 15.0, image: "", emoji: "☕", description: "", available: true },
  { id: 32, name: "Noodles",     category: "grocery", price: 2.0,  image: "", emoji: "🍜", description: "", available: true },
  { id: 33, name: "Canned Food", category: "grocery", price: 6.0,  image: "", emoji: "🥫", description: "", available: true },
  // Household & Cleaning
  { id: 34, name: "Soap",        category: "household", price: 4.0,  image: "", emoji: "🧼", description: "", available: true },
  { id: 35, name: "Shampoo",     category: "household", price: 12.0, image: "", emoji: "🧴", description: "", available: true },
  { id: 36, name: "Tissue",      category: "household", price: 6.0,  image: "", emoji: "🧻", description: "", available: true },
  { id: 37, name: "Detergent",   category: "household", price: 15.0, image: "", emoji: "🧺", description: "", available: true },
  { id: 38, name: "Cleaning Spray", category: "household", price: 9.0, image: "", emoji: "🧽", description: "", available: true }
];
