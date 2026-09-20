import { useState, useEffect } from "react";
import {
  ShoppingCart, Heart, Search, Menu, X, Sun, Moon,
  ChevronRight, Star, Truck, Shield, RefreshCw, Award,
  Plus, Minus, Trash2, ArrowRight, Check, ArrowLeft,
  User, Package, MapPin, CreditCard, Settings, LogOut,
  BarChart3, Users, ShoppingBag, TrendingUp,
  MessageSquare, ChevronDown, Send, Upload,
  Filter, Bell, Home, Percent, Calendar,
  Globe, Zap, Lock, Phone, Mail,
  Grid3X3, LayoutList, ChevronUp,
  Layers, Activity
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────

type Page =
  | "home" | "shop" | "product" | "cart" | "checkout"
  | "auth" | "dashboard" | "admin" | "vendor" | "support";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  category: string;
  imageId: string;
  badge: string;
  description: string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
}

interface CartItem {
  product: Product;
  qty: number;
  color: string;
  size: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 1, name: "Pro Wireless Headphones", price: 349, originalPrice: 449,
    rating: 4.8, reviews: 2847, category: "Electronics",
    imageId: "1505740420928-5e560c06d30e", badge: "Best Seller",
    description: "Experience studio-quality sound with our flagship wireless headphones. Featuring 40mm drivers, active noise cancellation, and 30-hour battery life for uninterrupted listening.",
    colors: ["#1a1a1a", "#ffffff", "#2563eb", "#dc2626"], sizes: [], inStock: true,
  },
  {
    id: 2, name: "Minimalist Smart Watch", price: 599, originalPrice: 799,
    rating: 4.9, reviews: 1203, category: "Wearables",
    imageId: "1546868871-7041f2a55e12", badge: "New",
    description: "A sleek smart watch combining premium materials with intelligent health tracking. Titanium case, sapphire crystal, and AMOLED display. Water resistant to 100m.",
    colors: ["#1a1a1a", "#c0c0c0", "#d4af37"], sizes: ["38mm", "42mm", "46mm"], inStock: true,
  },
  {
    id: 3, name: "Performance Running Shoes", price: 189, originalPrice: 229,
    rating: 4.7, reviews: 4521, category: "Footwear",
    imageId: "1542291026-7eec264c27ff", badge: "Sale",
    description: "Built for elite performance. Carbon fiber plate, responsive foam midsole, and breathable engineered mesh upper for your fastest runs yet.",
    colors: ["#1a1a1a", "#ffffff", "#f97316"], sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"], inStock: true,
  },
  {
    id: 4, name: "Full-Frame Mirrorless Camera", price: 2299, originalPrice: 2599,
    rating: 4.9, reviews: 892, category: "Photography",
    imageId: "1526170375885-4d8ecf77b99f", badge: "",
    description: "Professional-grade full-frame mirrorless camera with 61MP sensor, 5-axis IBIS stabilization, and 4K60p video. The benchmark for serious photographers.",
    colors: ["#1a1a1a"], sizes: [], inStock: true,
  },
  {
    id: 5, name: "Polarized Sunglasses", price: 299, originalPrice: 399,
    rating: 4.6, reviews: 678, category: "Accessories",
    imageId: "1572635196237-14b3f281503f", badge: "",
    description: "Italian-crafted acetate frames with polarized lenses offering 100% UV protection. Handmade in Luxottica's flagship facility in Agordo.",
    colors: ["#1a1a1a", "#6b3a2a", "#1e40af"], sizes: [], inStock: true,
  },
  {
    id: 6, name: "Premium Leather Backpack", price: 449, originalPrice: 549,
    rating: 4.8, reviews: 1567, category: "Bags",
    imageId: "1553062407-98eeb64c6a62", badge: "Popular",
    description: "Full-grain vegetable-tanned leather backpack with padded 16\" laptop compartment, YKK zippers, and antique brass hardware. Built to outlast decades of daily use.",
    colors: ["#6b3a2a", "#1a1a1a", "#4a4a4a"], sizes: [], inStock: true,
  },
  {
    id: 7, name: "Ultrabook Pro Laptop", price: 1799, originalPrice: 1999,
    rating: 4.8, reviews: 3241, category: "Electronics",
    imageId: "1496181133206-80ce9b88a853", badge: "Top Rated",
    description: "Ultra-thin performance laptop with Intel Core Ultra 9, 32GB LPDDR5X, 2TB NVMe SSD, and a stunning 14\" OLED display with 120Hz refresh rate.",
    colors: ["#c0c0c0", "#1a1a1a"], sizes: ["14\"", "16\""], inStock: true,
  },
  {
    id: 8, name: "Flagship Smartphone", price: 1199, originalPrice: 1299,
    rating: 4.7, reviews: 5832, category: "Electronics",
    imageId: "1511707171634-5f897ff02aa9", badge: "",
    description: "Next-generation smartphone with Snapdragon 8 Gen 4, a groundbreaking triple 200MP periscope camera system, and 5500mAh silicon-carbon battery.",
    colors: ["#1a1a1a", "#ffffff", "#6366f1", "#14b8a6"], sizes: [], inStock: true,
  },
];

const CATEGORIES = [
  { name: "Electronics", count: 284, imageId: "1550009158-9ebf69173e03" },
  { name: "Fashion", count: 1842, imageId: "1445205170230-053b83016050" },
  { name: "Sports & Fitness", count: 563, imageId: "1517836357463-d25dfeac3438" },
  { name: "Home & Garden", count: 921, imageId: "1484101403633-562f891dc89a" },
  { name: "Beauty & Care", count: 437, imageId: "1571781926291-c477ebfd024b" },
  { name: "Photography", count: 198, imageId: "1526170375885-4d8ecf77b99f" },
];

const TESTIMONIALS = [
  {
    name: "Sarah Johnson", role: "Creative Director at Studio Arc",
    rating: 5, imageId: "1494790108377-be9c29b29330",
    text: "The quality exceeded every expectation. Products arrived beautifully packaged, and the sound quality from my headphones is absolutely phenomenal. Three years of loyal shopping and counting.",
  },
  {
    name: "Marcus Chen", role: "Senior Software Engineer",
    rating: 5, imageId: "1472099645785-5658abf4ff4e",
    text: "Fast shipping, exceptional customer service, and products that genuinely match their descriptions. This is how online shopping should always work — honest, fast, and premium.",
  },
  {
    name: "Elena Rodriguez", role: "Founder, Chromatic Studio",
    rating: 5, imageId: "1438761681033-6461ffad8d80",
    text: "I've ordered from dozens of online stores, but Nexus stands above them all. The curation is impeccable, returns are hassle-free, and the unboxing experience is genuinely delightful.",
  },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 42000, orders: 320 },
  { month: "Feb", revenue: 55000, orders: 415 },
  { month: "Mar", revenue: 48000, orders: 362 },
  { month: "Apr", revenue: 71000, orders: 521 },
  { month: "May", revenue: 89000, orders: 672 },
  { month: "Jun", revenue: 95000, orders: 718 },
  { month: "Jul", revenue: 108000, orders: 821 },
  { month: "Aug", revenue: 124000, orders: 940 },
  { month: "Sep", revenue: 118000, orders: 892 },
  { month: "Oct", revenue: 142000, orders: 1075 },
  { month: "Nov", revenue: 198000, orders: 1492 },
  { month: "Dec", revenue: 231000, orders: 1748 },
];

const CATEGORY_PIE = [
  { name: "Electronics", value: 35, color: "#2563eb" },
  { name: "Fashion", value: 28, color: "#7c3aed" },
  { name: "Sports", value: 15, color: "#059669" },
  { name: "Home", value: 12, color: "#d97706" },
  { name: "Beauty", value: 10, color: "#db2777" },
];

const TOP_PRODUCTS = [
  { name: "Headphones", sales: 2847 },
  { name: "Smart Watch", sales: 2103 },
  { name: "Running Shoes", sales: 1892 },
  { name: "Ultrabook", sales: 1654 },
  { name: "Smartphone", sales: 1423 },
];

const RECENT_ORDERS = [
  { id: "#ORD-8821", customer: "Alex Thompson", product: "Pro Headphones", amount: 349, status: "Delivered", date: "Dec 12, 2024" },
  { id: "#ORD-8820", customer: "Maya Patel", product: "Smart Watch", amount: 599, status: "Shipped", date: "Dec 12, 2024" },
  { id: "#ORD-8819", customer: "James Wilson", product: "Running Shoes", amount: 189, status: "Processing", date: "Dec 11, 2024" },
  { id: "#ORD-8818", customer: "Sophia Lee", product: "Mirrorless Camera", amount: 2299, status: "Delivered", date: "Dec 11, 2024" },
  { id: "#ORD-8817", customer: "Noah Brown", product: "Leather Backpack", amount: 449, status: "Cancelled", date: "Dec 10, 2024" },
];

const FAQS = [
  {
    q: "What is your return policy?",
    a: "We offer a 30-day hassle-free return policy. Items must be in original condition and packaging. Refunds are processed within 3-5 business days of receiving the return.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3-7 business days. Express shipping (1-2 days) is available at checkout. Free standard shipping is available on orders over $75.",
  },
  {
    q: "Are my payment details secure?",
    a: "Absolutely. We use 256-bit SSL encryption and are fully PCI-DSS compliant. We never store your full card details on our servers.",
  },
  {
    q: "Can I track my order?",
    a: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order in real-time from your customer dashboard.",
  },
  {
    q: "Do you offer price matching?",
    a: "We offer price matching for identical products sold by authorized retailers. Contact our support team within 14 days of purchase with proof of the lower price.",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function img(id: string, w = 400, h = 400) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

function fmtPrice(n: number) {
  return `$${n.toLocaleString()}`;
}

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700"
          }
        />
      ))}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Delivered: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
    Shipped: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
    Processing: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    Cancelled: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-3">
      {children}
    </p>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar({
  page, onNav, cartCount, theme, toggleTheme, wishCount,
}: {
  page: Page; onNav: (p: Page) => void; cartCount: number;
  theme: string; toggleTheme: () => void; wishCount: number;
}) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Shop", page: "shop" },
    { label: "Dashboard", page: "dashboard" },
    { label: "Admin", page: "admin" },
    { label: "Support", page: "support" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNav("home")}
            className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            NEXUS
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <button
                key={l.page}
                onClick={() => onNav(l.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === l.page
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-secondary rounded-xl px-3 py-2 animate-in fade-in slide-in-from-right-2 duration-200">
                <Search size={15} className="text-muted-foreground" />
                <input
                  autoFocus
                  placeholder="Search products…"
                  className="bg-transparent text-sm outline-none w-40 text-foreground placeholder:text-muted-foreground"
                  onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X size={14} className="text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search size={18} />
              </button>
            )}

            <button
              onClick={() => onNav("auth")}
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors relative"
            >
              <Heart size={18} />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNav("cart")}
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors relative"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => onNav("auth")}
              className="hidden sm:flex items-center gap-2 ml-1 px-4 py-2 bg-foreground text-background rounded-xl text-sm font-medium hover:opacity-85 transition-opacity"
            >
              <User size={14} />
              Sign In
            </button>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 py-4 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((l) => (
            <button
              key={l.page}
              onClick={() => { onNav(l.page); setOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                page === l.page
                  ? "bg-foreground text-background"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ onNav }: { onNav: (p: Page) => void }) {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="font-['Playfair_Display'] text-2xl font-bold mb-4">NEXUS</div>
            <p className="text-sm text-background/60 max-w-xs leading-relaxed mb-6">
              Premium e-commerce for the discerning consumer. Curated products, exceptional service, and a shopping experience worth returning to.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageSquare, Send].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {[
            {
              title: "Shop",
              links: [
                { label: "All Products", page: "shop" },
                { label: "New Arrivals", page: "shop" },
                { label: "Best Sellers", page: "shop" },
                { label: "Sale", page: "shop" },
              ],
            },
            {
              title: "Company",
              links: [
                { label: "About", page: "home" },
                { label: "Careers", page: "home" },
                { label: "Press", page: "home" },
                { label: "Blog", page: "home" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "Help Center", page: "support" },
                { label: "Contact Us", page: "support" },
                { label: "Returns", page: "support" },
                { label: "Shipping", page: "support" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => onNav(l.page as Page)}
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            &copy; 2024 Nexus Commerce Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <button key={t} className="text-xs text-background/40 hover:text-background/70 transition-colors">
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product, onNav, onAddToCart, wishlist, onWishlist,
}: {
  product: Product; onNav: (p: Page, id?: number) => void;
  onAddToCart: (p: Product) => void; wishlist: number[];
  onWishlist: (id: number) => void;
}) {
  const wished = wishlist.includes(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image */}
      <div
        className="relative aspect-square bg-secondary overflow-hidden cursor-pointer"
        onClick={() => onNav("product", product.id)}
      >
        <img
          src={img(product.imageId, 600, 600)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-foreground text-background text-xs font-semibold rounded-full">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-10 px-2 py-0.5 bg-accent text-white text-xs font-semibold rounded-full">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(product.id); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            wished
              ? "bg-red-500 text-white"
              : "bg-white/90 text-zinc-600 hover:bg-white"
          }`}
        >
          <Heart size={14} fill={wished ? "currentColor" : "none"} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="absolute bottom-0 inset-x-0 py-3 bg-foreground text-background text-xs font-semibold text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          Add to Cart
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3
          className="font-semibold text-sm leading-snug mb-2 cursor-pointer hover:text-accent transition-colors line-clamp-1"
          onClick={() => onNav("product", product.id)}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <Stars rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground">{fmtPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">{fmtPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({
  onNav, onAddToCart, wishlist, onWishlist,
}: {
  onNav: (p: Page, id?: number) => void;
  onAddToCart: (p: Product) => void;
  wishlist: number[];
  onWishlist: (id: number) => void;
}) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/50 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold text-accent">New Season 2024 — Shop Now</span>
              </div>

              <h1 className="hero-title font-['Playfair_Display'] text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-foreground mb-6">
                The Future of
                <span className="block italic text-accent">Shopping,</span>
                Redefined.
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
                Discover curated premium products from the world&apos;s finest brands.
                Fast shipping, exceptional quality, and a shopping experience designed around you.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => onNav("shop")}
                  className="flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold hover:opacity-85 transition-all hover:gap-3"
                >
                  Shop Now <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => onNav("shop")}
                  className="flex items-center gap-2 px-8 py-4 border border-border rounded-2xl font-semibold hover:border-foreground transition-colors text-foreground"
                >
                  View Lookbook
                </button>
              </div>

              <div className="hero-stats flex items-center gap-8">
                {[
                  { n: "50K+", label: "Happy Customers" },
                  { n: "10K+", label: "Products" },
                  { n: "4.9★", label: "Average Rating" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-bold text-2xl text-foreground">{s.n}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden bg-secondary aspect-[4/5] max-w-lg mx-auto">
                <img
                  src={img("1483985988355-763728e1935b", 800, 1000)}
                  alt="Premium fashion shopping"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating cards */}
              <div className="absolute hidden sm:block -left-4 lg:-left-8 top-1/4 bg-card border border-border rounded-2xl p-4 shadow-2xl animate-bounce" style={{ animationDuration: "3s" }}>
                <div className="flex items-center gap-2 mb-1">
                  <Stars rating={5} />
                </div>
                <p className="text-xs font-semibold text-foreground">Rated 4.9/5</p>
                <p className="text-xs text-muted-foreground">2,847 reviews</p>
              </div>

              <div className="absolute hidden sm:block -right-2 lg:-right-6 bottom-1/4 bg-accent text-white rounded-2xl p-4 shadow-2xl">
                <p className="text-xs font-semibold mb-1">Limited Offer</p>
                <p className="text-3xl font-bold">40%</p>
                <p className="text-xs opacity-80">OFF select items</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="bg-foreground text-background py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12">
          {Array.from({ length: 4 }).flatMap((_, copy) =>
            ["Free Worldwide Shipping", "30-Day Returns", "Secure Checkout", "Premium Quality", "24/7 Support", "Member Rewards"].map((t, i) => (
              <span key={`${copy}-${i}`} className="inline-flex items-center gap-2 text-sm font-medium">
                <Zap size={12} className="text-accent" /> {t}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <SectionLabel>Browse by Category</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground">
              Shop by Collection
            </h2>
          </div>
          <button
            onClick={() => onNav("shop")}
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onNav("shop")}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-secondary hover:ring-2 hover:ring-foreground/20 transition-all"
            >
              <img
                src={img(cat.imageId, 300, 300)}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <p className="text-white text-xs font-semibold leading-tight">{cat.name}</p>
                <p className="text-white/60 text-xs">{cat.count} items</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <SectionLabel>Hand-Picked</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground">
              Featured Products
            </h2>
          </div>
          <button
            onClick={() => onNav("shop")}
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onNav={onNav}
              onAddToCart={onAddToCart}
              wishlist={wishlist}
              onWishlist={onWishlist}
            />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src={img("1441986300917-64674bd600d8", 1400, 600)}
            alt="Season sale"
            className="w-full h-64 sm:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 sm:px-16">
            <div>
              <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
                Limited Time Offer
              </p>
              <h3 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-4">
                Up to 40% Off<br />Selected Items
              </h3>
              <button
                onClick={() => onNav("shop")}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Shop the Sale <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <SectionLabel>Customer Favorites</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground">
              Best Sellers
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(4, 8).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onNav={onNav}
              onAddToCart={onAddToCart}
              wishlist={wishlist}
              onWishlist={onWishlist}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $75" },
            { icon: RefreshCw, title: "Easy Returns", desc: "30-day hassle-free returns" },
            { icon: Shield, title: "Secure Payment", desc: "256-bit SSL encryption" },
            { icon: Award, title: "Premium Quality", desc: "Curated top-tier products" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 items-start p-6 rounded-2xl bg-card border border-border">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground">{title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel>What People Say</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-foreground">
              Loved by Thousands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeTestimonial === i
                    ? "bg-card border-foreground/20 shadow-lg"
                    : "bg-card border-border hover:border-foreground/10"
                }`}
                onClick={() => setActiveTestimonial(i)}
              >
                <Stars rating={t.rating} size={14} />
                <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={img(t.imageId, 80, 80)}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover bg-secondary"
                  />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <div className="ml-auto">
                    <Check size={14} className="text-emerald-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl bg-foreground text-background overflow-hidden p-10 sm:p-16 text-center">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }} />
          </div>
          <div className="relative">
            <SectionLabel>Stay in the Loop</SectionLabel>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-4">
              Get 10% Off Your First Order
            </h2>
            <p className="text-background/70 mb-8 max-w-md mx-auto">
              Subscribe to our newsletter for exclusive deals, new arrivals, and style inspiration delivered weekly.
            </p>
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold">
                <Check size={18} /> You&apos;re subscribed! Check your inbox.
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-white/50 text-sm"
                />
                <button
                  onClick={() => { if (email) setSubscribed(true); }}
                  className="px-6 py-3.5 bg-accent rounded-xl font-semibold text-white text-sm hover:bg-accent/90 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Shop Page ────────────────────────────────────────────────────────────────

function ShopPage({
  onNav, onAddToCart, wishlist, onWishlist,
}: {
  onNav: (p: Page, id?: number) => void;
  onAddToCart: (p: Product) => void;
  wishlist: number[];
  onWishlist: (id: number) => void;
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(3000);
  const [filterOpen, setFilterOpen] = useState(false);

  const categories = [...new Set(PRODUCTS.map((p) => p.category))];

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchPrice = p.price <= priceMax;
    return matchSearch && matchCat && matchPrice;
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  const toggleCat = (cat: string) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-1">Shop All</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex-1 min-w-48 relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/30 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground outline-none cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm font-medium hover:border-foreground/30 transition-colors"
          >
            <Filter size={14} /> Filters
            {selectedCategories.length > 0 && (
              <span className="w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                {selectedCategories.length}
              </span>
            )}
          </button>

          <div className="flex border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`p-2.5 transition-colors ${view === "grid" ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2.5 transition-colors ${view === "list" ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutList size={16} />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {filterOpen && (
            <aside className="w-60 flex-shrink-0 animate-in slide-in-from-left-4 duration-200">
              <div className="bg-card border border-border rounded-2xl p-5 space-y-6 sticky top-24">
                <div>
                  <h3 className="font-semibold text-sm mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            selectedCategories.includes(cat)
                              ? "bg-foreground border-foreground"
                              : "border-border group-hover:border-foreground/40"
                          }`}
                          onClick={() => toggleCat(cat)}
                        >
                          {selectedCategories.includes(cat) && <Check size={10} className="text-background" />}
                        </div>
                        <span className="text-sm text-foreground">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-3">
                    Price Range <span className="text-muted-foreground font-normal">— up to {fmtPrice(priceMax)}</span>
                  </h3>
                  <input
                    type="range"
                    min={50}
                    max={3000}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-foreground"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$50</span>
                    <span>$3,000</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-3">Min Rating</h3>
                  <div className="flex gap-2">
                    {[4, 4.5, 4.8].map((r) => (
                      <button
                        key={r}
                        className="px-2 py-1 rounded-lg border border-border text-xs hover:border-foreground/30 transition-colors"
                      >
                        {r}+
                      </button>
                    ))}
                  </div>
                </div>

                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </aside>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onNav={onNav}
                    onAddToCart={onAddToCart}
                    wishlist={wishlist}
                    onWishlist={onWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="flex gap-5 bg-card border border-border rounded-2xl overflow-hidden hover:border-foreground/20 transition-all hover:shadow-lg"
                  >
                    <div
                      className="w-40 h-40 bg-secondary flex-shrink-0 overflow-hidden cursor-pointer"
                      onClick={() => onNav("product", p.id)}
                    >
                      <img src={img(p.imageId, 200, 200)} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">{p.category}</p>
                        <h3
                          className="font-semibold text-foreground mt-1 mb-2 cursor-pointer hover:text-accent transition-colors"
                          onClick={() => onNav("product", p.id)}
                        >
                          {p.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Stars rating={p.rating} />
                          <span className="text-xs text-muted-foreground">({p.reviews.toLocaleString()})</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{fmtPrice(p.price)}</span>
                          <span className="text-sm text-muted-foreground line-through">{fmtPrice(p.originalPrice)}</span>
                        </div>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="px-4 py-2 bg-foreground text-background rounded-xl text-sm font-medium hover:opacity-85 transition-opacity"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <ShoppingBag size={40} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Product Detail ───────────────────────────────────────────────────────────

function ProductDetailPage({
  productId, onNav, onAddToCart, wishlist, onWishlist,
}: {
  productId: number; onNav: (p: Page, id?: number) => void;
  onAddToCart: (p: Product) => void; wishlist: number[];
  onWishlist: (id: number) => void;
}) {
  const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0];
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "specs" | "reviews">("description");
  const [added, setAdded] = useState(false);
  const wished = wishlist.includes(product.id);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const REVIEWS = [
    { name: "Alex T.", rating: 5, date: "Dec 10, 2024", text: "Absolutely phenomenal product. The build quality is exceptional and it exceeded all my expectations. Worth every penny." },
    { name: "Priya M.", rating: 5, date: "Nov 28, 2024", text: "Fast shipping, arrived in beautiful packaging. The product itself is exactly as described — premium quality and performs perfectly." },
    { name: "Chris R.", rating: 4, date: "Nov 15, 2024", text: "Really good product overall. Minor nitpick on the setup process, but the end result is excellent. Would recommend to anyone." },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <button onClick={() => onNav("home")} className="hover:text-foreground transition-colors">Home</button>
          <ChevronRight size={12} />
          <button onClick={() => onNav("shop")} className="hover:text-foreground transition-colors">Shop</button>
          <ChevronRight size={12} />
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img
                src={img(product.imageId, 800, 800)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[product.imageId, "1505740420928-5e560c06d30e", "1526170375885-4d8ecf77b99f", "1546868871-7041f2a55e12"].map((id, i) => (
                <div key={i} className={`aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer ring-2 ring-offset-2 ring-offset-background transition-all ${i === 0 ? "ring-foreground" : "ring-transparent hover:ring-foreground/30"}`}>
                  <img src={img(id, 200, 200)} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="py-4">
            {product.badge && (
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-4">
                {product.badge}
              </span>
            )}
            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-muted-foreground mb-4">{product.category}</p>

            <div className="flex items-center gap-3 mb-6">
              <Stars rating={product.rating} size={16} />
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-bold text-foreground">{fmtPrice(product.price)}</span>
              <span className="text-xl text-muted-foreground line-through">{fmtPrice(product.originalPrice)}</span>
              {discount > 0 && (
                <span className="px-2.5 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Color</p>
                <div className="flex gap-2.5">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-background transition-all ${selectedColor === i ? "ring-foreground" : "ring-transparent hover:ring-foreground/30"}`}
                      style={{ backgroundColor: c, border: c === "#ffffff" ? "1px solid #e4e4e7" : "none" }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(i)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                        selectedSize === i
                          ? "bg-foreground text-background border-foreground"
                          : "border-border hover:border-foreground/30 text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">Quantity</p>
              <div className="inline-flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-14 text-center text-sm font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition-all ${
                  added
                    ? "bg-emerald-500 text-white"
                    : "bg-foreground text-background hover:opacity-85"
                }`}
              >
                {added ? <><Check size={18} /> Added!</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </button>
              <button
                onClick={() => onWishlist(product.id)}
                className={`w-14 h-14 flex items-center justify-center rounded-2xl border transition-all ${
                  wished ? "bg-red-50 border-red-200 text-red-500 dark:bg-red-950 dark:border-red-800" : "border-border hover:border-foreground/30"
                }`}
              >
                <Heart size={20} fill={wished ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Delivery info */}
            <div className="space-y-3 p-4 bg-secondary rounded-2xl">
              {[
                { icon: Truck, text: "Free shipping on this order — arrives in 3-5 business days" },
                { icon: RefreshCw, text: "30-day free returns — no questions asked" },
                { icon: Shield, text: "2-year manufacturer warranty included" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={15} className="text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-border mb-8">
            {(["description", "specs", "reviews"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-all border-b-2 -mb-px ${
                  tab === t
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "reviews" ? `Reviews (${product.reviews.toLocaleString()})` : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab === "description" && (
            <div className="max-w-2xl">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              <ul className="mt-6 space-y-2">
                {["Premium materials and craftsmanship", "Designed for everyday excellence", "Industry-leading performance benchmarks", "Eco-conscious packaging"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                    <Check size={14} className="text-emerald-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "specs" && (
            <div className="max-w-2xl">
              <div className="divide-y divide-border">
                {[
                  ["Brand", "Nexus Original"],
                  ["SKU", `NX-${product.id.toString().padStart(4, "0")}`],
                  ["Category", product.category],
                  ["Rating", `${product.rating}/5 (${product.reviews.toLocaleString()} reviews)`],
                  ["Availability", "In Stock"],
                  ["Warranty", "2 Years"],
                  ["Return Policy", "30 Days"],
                ].map(([key, val]) => (
                  <div key={key} className="flex py-3">
                    <span className="w-40 text-sm text-muted-foreground">{key}</span>
                    <span className="text-sm text-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "reviews" && (
            <div className="max-w-2xl space-y-6">
              {REVIEWS.map((r, i) => (
                <div key={i} className="p-5 bg-card border border-border rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-sm text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.date}</p>
                    </div>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        <div className="mt-20">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onNav={onNav}
                onAddToCart={onAddToCart}
                wishlist={wishlist}
                onWishlist={onWishlist}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Cart Page ────────────────────────────────────────────────────────────────

function CartPage({
  cart, onNav, onUpdateQty, onRemove,
}: {
  cart: CartItem[]; onNav: (p: Page, id?: number) => void;
  onUpdateQty: (productId: number, qty: number) => void;
  onRemove: (productId: number) => void;
}) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = cart.reduce((s, item) => s + item.product.price * item.qty, 0);
  const shipping = subtotal > 75 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "NEXUS10") {
      setDiscount(Math.round(subtotal * 0.1));
      setCouponApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart size={56} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Add some products to get started</p>
          <button
            onClick={() => onNav("shop")}
            className="px-8 py-3 bg-foreground text-background rounded-2xl font-semibold hover:opacity-85 transition-opacity"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-8">
          Shopping Cart
          <span className="ml-3 text-xl font-normal text-muted-foreground">({cart.length} items)</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-5 p-5 bg-card border border-border rounded-2xl">
                <div
                  className="w-24 h-24 rounded-xl overflow-hidden bg-secondary flex-shrink-0 cursor-pointer"
                  onClick={() => onNav("product", product.id)}
                >
                  <img src={img(product.imageId, 200, 200)} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <h3 className="font-semibold text-sm text-foreground mt-0.5 line-clamp-1">{product.name}</h3>
                    </div>
                    <p className="font-bold text-foreground whitespace-nowrap">{fmtPrice(product.price * qty)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{fmtPrice(product.price)} each</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="inline-flex items-center border border-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => onUpdateQty(product.id, Math.max(1, qty - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors text-sm"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                      <button
                        onClick={() => onUpdateQty(product.id, qty + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => onNav("shop")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={15} /> Continue Shopping
            </button>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="p-6 bg-card border border-border rounded-2xl">
              <h2 className="font-semibold text-foreground mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">{fmtPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount (NEXUS10)</span>
                    <span>-{fmtPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-foreground">
                    {shipping === 0 ? <span className="text-emerald-600">Free</span> : fmtPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">Add {fmtPrice(75 - subtotal)} more for free shipping</p>
                )}
              </div>

              <div className="flex justify-between font-bold text-foreground py-4 border-t border-border">
                <span>Total</span>
                <span className="text-xl">{fmtPrice(total)}</span>
              </div>

              <button
                onClick={() => onNav("checkout")}
                className="w-full py-4 bg-foreground text-background rounded-2xl font-semibold hover:opacity-85 transition-opacity flex items-center justify-center gap-2 mt-2"
              >
                Checkout <ArrowRight size={16} />
              </button>
            </div>

            {/* Coupon */}
            <div className="p-5 bg-card border border-border rounded-2xl">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Percent size={14} className="text-accent" /> Promo Code
              </h3>
              {couponApplied ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm">
                  <Check size={14} /> Code applied! You saved {fmtPrice(discount)}
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter code (try NEXUS10)"
                    className="flex-1 px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/30 text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-foreground text-background rounded-xl text-sm font-medium hover:opacity-85 transition-opacity"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-secondary rounded-xl">
              <Lock size={12} className="text-accent" />
              Secure checkout with SSL encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Checkout Page ────────────────────────────────────────────────────────────

function CheckoutPage({ cart, onNav }: { cart: CartItem[]; onNav: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  const [orderNumber] = useState(48217);
  const [form, setForm] = useState({
    email: "", firstName: "", lastName: "", address: "", city: "", zip: "", country: "US",
    shipping: "standard", card: "", expiry: "", cvv: "", nameOnCard: "",
  });

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = form.shipping === "express" ? 19.99 : subtotal > 75 ? 0 : 9.99;
  const total = subtotal + shipping;

  const upd = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const steps = ["Contact", "Shipping", "Payment", "Confirm"];

  if (step === 4) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-emerald-500" />
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-foreground mb-3">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-2">
            Thank you, {form.firstName || "Customer"}! Your order has been placed successfully.
          </p>
          <p className="text-sm text-muted-foreground mb-2">Order #NX-{orderNumber}</p>
          <p className="text-sm text-muted-foreground mb-8">
            A confirmation email has been sent to {form.email || "your email address"}.
          </p>
          <div className="p-5 bg-card border border-border rounded-2xl mb-6 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order total</span>
              <span className="font-semibold text-foreground">{fmtPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated delivery</span>
              <span className="font-semibold text-foreground">Dec 18–22, 2024</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onNav("dashboard")}
              className="flex-1 py-3 bg-foreground text-background rounded-2xl font-semibold hover:opacity-85 transition-opacity text-sm"
            >
              Track Order
            </button>
            <button
              onClick={() => onNav("home")}
              className="flex-1 py-3 border border-border rounded-2xl font-semibold hover:border-foreground/30 transition-colors text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-secondary/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i + 1 < step ? "bg-emerald-500 text-white" :
                  i + 1 === step ? "bg-foreground text-background" :
                  "bg-border text-muted-foreground"
                }`}>
                  {i + 1 < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i + 1 === step ? "text-foreground" : "text-muted-foreground"}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 sm:w-20 h-0.5 mx-2 transition-colors ${i + 1 < step ? "bg-emerald-500" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              {step === 1 && (
                <div>
                  <h2 className="font-semibold text-xl text-foreground mb-6">Contact & Shipping</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Email Address</label>
                      <input value={form.email} onChange={(e) => upd("email", e.target.value)} type="email" placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">First Name</label>
                        <input value={form.firstName} onChange={(e) => upd("firstName", e.target.value)} placeholder="John"
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Last Name</label>
                        <input value={form.lastName} onChange={(e) => upd("lastName", e.target.value)} placeholder="Doe"
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Address</label>
                      <input value={form.address} onChange={(e) => upd("address", e.target.value)} placeholder="123 Main Street, Apt 4B"
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">City</label>
                        <input value={form.city} onChange={(e) => upd("city", e.target.value)} placeholder="New York"
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">ZIP Code</label>
                        <input value={form.zip} onChange={(e) => upd("zip", e.target.value)} placeholder="10001"
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-semibold text-xl text-foreground mb-6">Shipping Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: "standard", label: "Standard Shipping", desc: "5-7 business days", price: subtotal > 75 ? "Free" : "$9.99" },
                      { id: "express", label: "Express Shipping", desc: "2-3 business days", price: "$19.99" },
                      { id: "overnight", label: "Overnight Delivery", desc: "Next business day", price: "$39.99" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => upd("shipping", opt.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                          form.shipping === opt.id
                            ? "border-foreground bg-secondary"
                            : "border-border hover:border-foreground/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.shipping === opt.id ? "border-foreground" : "border-border"}`}>
                            {form.shipping === opt.id && <div className="w-2 h-2 rounded-full bg-foreground" />}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                            <p className="text-xs text-muted-foreground">{opt.desc}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-foreground">{opt.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="font-semibold text-xl text-foreground mb-6">Payment</h2>
                  <div className="flex gap-2 mb-6">
                    {["Visa", "Mastercard", "Amex", "PayPal"].map((pm) => (
                      <div key={pm} className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-xs font-medium text-muted-foreground">
                        {pm}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Card Number</label>
                      <div className="relative">
                        <input value={form.card} onChange={(e) => upd("card", e.target.value)} placeholder="4242 4242 4242 4242"
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground pr-10" />
                        <CreditCard size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Name on Card</label>
                      <input value={form.nameOnCard} onChange={(e) => upd("nameOnCard", e.target.value)} placeholder="John Doe"
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Expiry</label>
                        <input value={form.expiry} onChange={(e) => upd("expiry", e.target.value)} placeholder="MM / YY"
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">CVV</label>
                        <input value={form.cvv} onChange={(e) => upd("cvv", e.target.value)} placeholder="•••"
                          className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock size={12} className="text-accent" />
                      Your payment data is encrypted and never stored on our servers.
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 px-5 py-3 border border-border rounded-xl text-sm font-medium hover:border-foreground/30 transition-colors"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                )}
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-foreground text-background rounded-xl text-sm font-semibold hover:opacity-85 transition-opacity"
                >
                  {step === 3 ? "Place Order" : "Continue"} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 mb-5">
                {cart.map(({ product, qty }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <div className="relative">
                      <img src={img(product.imageId, 60, 60)} alt={product.name} className="w-12 h-12 rounded-xl object-cover bg-secondary" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-muted-foreground text-background text-xs rounded-full flex items-center justify-center font-medium">
                        {qty}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground line-clamp-1">{product.name}</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{fmtPrice(product.price * qty)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span><span>{fmtPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-emerald-600">Free</span> : fmtPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border">
                  <span>Total</span><span>{fmtPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Auth Page ────────────────────────────────────────────────────────────────

function AuthPage({ onNav }: { onNav: (p: Page) => void }) {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-secondary/20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-2">NEXUS</div>
          <p className="text-sm text-muted-foreground">
            {mode === "signin" && "Welcome back. Sign in to your account."}
            {mode === "signup" && "Create your Nexus account."}
            {mode === "forgot" && "Reset your password."}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          {mode === "signin" && !otpSent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Google", color: "#fff" },
                  { name: "Apple", color: "#000" },
                ].map((p) => (
                  <button key={p.name}
                    className="flex items-center justify-center gap-2 py-3 border border-border rounded-xl text-sm font-medium hover:border-foreground/30 transition-colors">
                    <Globe size={16} /> Continue with {p.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or continue with email</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Email</label>
                <input type="email" placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Password</label>
                  <button onClick={() => setMode("forgot")} className="text-xs text-accent hover:underline">Forgot password?</button>
                </div>
                <input type="password" placeholder="••••••••"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
              </div>

              <button
                onClick={() => { setOtpSent(true); }}
                className="w-full py-3.5 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-85 transition-opacity"
              >
                Sign In
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button onClick={() => setMode("signup")} className="text-accent font-medium hover:underline">Sign up</button>
              </p>
            </div>
          )}

          {mode === "signin" && otpSent && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Phone size={28} className="text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Verify your identity</h3>
                <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email</p>
              </div>

              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    value={digit}
                    onChange={(e) => {
                      const next = [...otp];
                      next[i] = e.target.value.slice(-1);
                      setOtp(next);
                    }}
                    maxLength={1}
                    className="w-12 h-12 text-center text-lg font-bold bg-secondary border border-border rounded-xl outline-none focus:border-foreground/40 text-foreground"
                  />
                ))}
              </div>

              <button
                onClick={() => onNav("home")}
                className="w-full py-3.5 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-85 transition-opacity"
              >
                Verify & Sign In
              </button>
              <button onClick={() => setOtpSent(false)} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors">
                ← Back to login
              </button>
            </div>
          )}

          {mode === "signup" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">First Name</label>
                  <input placeholder="John" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Last Name</label>
                  <input placeholder="Doe" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Email</label>
                <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Password</label>
                <input type="password" placeholder="Min. 8 characters" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
              </div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" className="mt-0.5 rounded" />
                <span className="text-xs text-muted-foreground">
                  I agree to the{" "}
                  <span className="text-accent">Terms of Service</span>
                  {" "}and{" "}
                  <span className="text-accent">Privacy Policy</span>
                </span>
              </label>
              <button className="w-full py-3.5 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-85 transition-opacity">
                Create Account
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => setMode("signin")} className="text-accent font-medium hover:underline">Sign in</button>
              </p>
            </div>
          )}

          {mode === "forgot" && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Mail size={24} className="text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">Enter your email and we&apos;ll send a reset link.</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Email Address</label>
                <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
              </div>
              <button className="w-full py-3.5 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-85 transition-opacity">
                Send Reset Link
              </button>
              <button onClick={() => setMode("signin")} className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors">
                ← Back to sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Customer Dashboard ───────────────────────────────────────────────────────

function CustomerDashboardPage() {
  const [tab, setTab] = useState<"overview" | "orders" | "wishlist" | "addresses" | "settings">("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen pt-20 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-60 flex-shrink-0">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-violet-500 flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">jane@example.com</p>
                </div>
              </div>
              <nav className="space-y-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                      tab === id
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon size={16} /> {label}
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left mt-2">
                  <LogOut size={16} /> Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {tab === "overview" && (
              <div>
                <h1 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-6">Good morning, Jane</h1>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total Orders", value: "24", icon: Package, color: "text-blue-500" },
                    { label: "Wishlist Items", value: "12", icon: Heart, color: "text-red-500" },
                    { label: "Total Spent", value: "$3,842", icon: ShoppingBag, color: "text-violet-500" },
                    { label: "Reward Points", value: "1,240", icon: Award, color: "text-amber-500" },
                  ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="p-5 bg-card border border-border rounded-2xl">
                      <Icon size={20} className={`${color} mb-3`} />
                      <p className="text-2xl font-bold text-foreground">{value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                <h2 className="font-semibold text-foreground mb-4">Recent Orders</h2>
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        {["Order", "Product", "Amount", "Status", "Date"].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {RECENT_ORDERS.slice(0, 4).map((o) => (
                        <tr key={o.id} className="hover:bg-secondary/50 transition-colors">
                          <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{o.id}</td>
                          <td className="px-5 py-3 font-medium text-foreground">{o.product}</td>
                          <td className="px-5 py-3 font-semibold text-foreground">{fmtPrice(o.amount)}</td>
                          <td className="px-5 py-3"><StatusPill status={o.status} /></td>
                          <td className="px-5 py-3 text-muted-foreground">{o.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "orders" && (
              <div>
                <h1 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-6">Order History</h1>
                <div className="space-y-4">
                  {RECENT_ORDERS.map((o) => (
                    <div key={o.id} className="flex items-center justify-between p-5 bg-card border border-border rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                          <Package size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{o.product}</p>
                          <p className="text-xs text-muted-foreground">{o.id} · {o.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-foreground">{fmtPrice(o.amount)}</span>
                        <StatusPill status={o.status} />
                        <button className="text-xs text-accent hover:underline">View</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "wishlist" && (
              <div>
                <h1 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-6">Wishlist</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {PRODUCTS.slice(0, 6).map((p) => (
                    <div key={p.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square bg-secondary">
                        <img src={img(p.imageId, 300, 300)} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-sm text-foreground mb-1">{p.name}</p>
                        <p className="font-bold text-foreground mb-3">{fmtPrice(p.price)}</p>
                        <button className="w-full py-2 bg-foreground text-background rounded-xl text-xs font-semibold hover:opacity-85 transition-opacity">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "addresses" && (
              <div>
                <h1 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-6">Saved Addresses</h1>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Home", address: "123 Main Street, Apt 4B", city: "New York, NY 10001", default: true },
                    { label: "Work", address: "456 Broadway, Suite 800", city: "New York, NY 10013", default: false },
                  ].map((addr) => (
                    <div key={addr.label} className={`p-5 bg-card border rounded-2xl ${addr.default ? "border-foreground/20" : "border-border"}`}>
                      <div className="flex justify-between mb-3">
                        <span className="font-semibold text-sm text-foreground">{addr.label}</span>
                        {addr.default && (
                          <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">Default</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{addr.address}</p>
                      <p className="text-sm text-muted-foreground">{addr.city}</p>
                      <div className="flex gap-3 mt-4">
                        <button className="text-xs text-accent hover:underline">Edit</button>
                        <button className="text-xs text-red-500 hover:underline">Delete</button>
                      </div>
                    </div>
                  ))}
                  <button className="p-5 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-foreground/30 transition-colors text-muted-foreground hover:text-foreground">
                    <Plus size={20} />
                    <span className="text-sm font-medium">Add new address</span>
                  </button>
                </div>
              </div>
            )}

            {tab === "settings" && (
              <div>
                <h1 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-6">Account Settings</h1>
                <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">First Name</label>
                      <input defaultValue="Jane" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Last Name</label>
                      <input defaultValue="Doe" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Email</label>
                    <input defaultValue="jane@example.com" type="email" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Phone</label>
                    <input defaultValue="+1 (555) 234-5678" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground" />
                  </div>
                  <div className="pt-4 border-t border-border">
                    <h3 className="font-semibold text-sm text-foreground mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                      {["Order updates", "Promotions and deals", "Newsletter", "Product restocks"].map((pref) => (
                        <label key={pref} className="flex items-center justify-between cursor-pointer">
                          <span className="text-sm text-foreground">{pref}</span>
                          <input type="checkbox" defaultChecked={pref !== "Newsletter"} className="rounded" />
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="px-6 py-2.5 bg-foreground text-background rounded-xl text-sm font-semibold hover:opacity-85 transition-opacity">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminDashboardPage() {
  const [adminTab, setAdminTab] = useState<"analytics" | "products" | "orders" | "customers" | "inventory">("analytics");

  const adminNav = [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "orders", label: "Orders", icon: Package },
    { id: "customers", label: "Customers", icon: Users },
    { id: "inventory", label: "Inventory", icon: Layers },
  ] as const;

  const metricCards = [
    { label: "Total Revenue", value: "$1.42M", change: "+18.2%", up: true, icon: TrendingUp, color: "text-emerald-500" },
    { label: "Total Orders", value: "12,847", change: "+12.5%", up: true, icon: Package, color: "text-blue-500" },
    { label: "Active Customers", value: "48,291", change: "+8.1%", up: true, icon: Users, color: "text-violet-500" },
    { label: "Avg Order Value", value: "$249", change: "-2.3%", up: false, icon: ShoppingBag, color: "text-amber-500" },
  ];

  return (
    <div className="min-h-screen pt-0 bg-secondary/20">
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0 bg-card border-r border-border hidden lg:flex flex-col pt-4 pb-6 px-3">
          <div className="px-2 mb-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Admin Panel</p>
          </div>
          <nav className="flex-1 space-y-1">
            {adminNav.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setAdminTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                  adminTab === id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </nav>
          <div className="border-t border-border pt-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">A</div>
              <div>
                <p className="text-xs font-semibold text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8">
          {adminTab === "analytics" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-['Playfair_Display'] text-3xl font-bold text-foreground">Analytics Overview</h1>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Jan – Dec 2024</span>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                {metricCards.map(({ label, value, change, up, icon: Icon, color }) => (
                  <div key={label} className="p-5 bg-card border border-border rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <Icon size={18} className={color} />
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        up ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400" : "bg-red-50 text-red-500 dark:bg-red-950 dark:text-red-400"
                      }`}>
                        {change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid xl:grid-cols-3 gap-6 mb-6">
                <div className="xl:col-span-2 p-6 bg-card border border-border rounded-2xl">
                  <h3 className="font-semibold text-foreground mb-6">Revenue & Orders (2024)</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={REVENUE_DATA}>
                      <defs>
                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#71717a" }} />
                      <YAxis tick={{ fontSize: 11, fill: "#71717a" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value) => { const v = typeof value === "number" ? value : Number(value ?? 0); return [`$${v.toLocaleString()}`, "Revenue"]; }} labelStyle={{ color: "#0a0a0a" }} />
                      <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#revGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h3 className="font-semibold text-foreground mb-4">Sales by Category</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={CATEGORY_PIE} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" stroke="none">
                        {CATEGORY_PIE.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => { const v = typeof value === "number" ? value : Number(value ?? 0); return [`${v}%`, ""]; }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {CATEGORY_PIE.map((c) => (
                      <div key={c.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                          <span className="text-muted-foreground">{c.name}</span>
                        </div>
                        <span className="font-semibold text-foreground">{c.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid xl:grid-cols-2 gap-6">
                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h3 className="font-semibold text-foreground mb-6">Top Products by Sales</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={TOP_PRODUCTS} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11, fill: "#71717a" }} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#71717a" }} width={80} />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#2563eb" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-6 bg-card border border-border rounded-2xl">
                  <h3 className="font-semibold text-foreground mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {RECENT_ORDERS.map((o) => (
                      <div key={o.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">{o.customer}</p>
                          <p className="text-xs text-muted-foreground">{o.product} · {o.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-foreground">{fmtPrice(o.amount)}</span>
                          <StatusPill status={o.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {adminTab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-['Playfair_Display'] text-3xl font-bold text-foreground">Products</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-xl text-sm font-semibold hover:opacity-85 transition-opacity">
                  <Plus size={14} /> Add Product
                </button>
              </div>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        {["Product", "Category", "Price", "Stock", "Sales", "Status"].map((h) => (
                          <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {PRODUCTS.map((p) => (
                        <tr key={p.id} className="hover:bg-secondary/40 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <img src={img(p.imageId, 60, 60)} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-secondary" />
                              <span className="font-medium text-foreground">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-muted-foreground">{p.category}</td>
                          <td className="px-5 py-4 font-semibold text-foreground">{fmtPrice(p.price)}</td>
                          <td className="px-5 py-4 text-foreground">In Stock</td>
                          <td className="px-5 py-4 text-foreground">{p.reviews.toLocaleString()}</td>
                          <td className="px-5 py-4">
                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-xs font-medium rounded-full">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {adminTab === "orders" && (
            <div>
              <h1 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-8">Order Management</h1>
              <div className="flex gap-3 mb-6 flex-wrap">
                {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                  <button key={s} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${s === "All" ? "bg-foreground text-background" : "bg-card border border-border hover:border-foreground/30 text-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      {["Order ID", "Customer", "Product", "Amount", "Status", "Date", "Action"].map((h) => (
                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {RECENT_ORDERS.map((o) => (
                      <tr key={o.id} className="hover:bg-secondary/40 transition-colors">
                        <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{o.id}</td>
                        <td className="px-5 py-4 font-medium text-foreground">{o.customer}</td>
                        <td className="px-5 py-4 text-muted-foreground">{o.product}</td>
                        <td className="px-5 py-4 font-semibold text-foreground">{fmtPrice(o.amount)}</td>
                        <td className="px-5 py-4"><StatusPill status={o.status} /></td>
                        <td className="px-5 py-4 text-muted-foreground">{o.date}</td>
                        <td className="px-5 py-4">
                          <button className="text-xs text-accent hover:underline">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adminTab === "customers" && (
            <div>
              <h1 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-8">Customers</h1>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Total Customers", value: "48,291", icon: Users },
                  { label: "New This Month", value: "1,842", icon: TrendingUp },
                  { label: "Returning Rate", value: "68.4%", icon: Activity },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="p-5 bg-card border border-border rounded-2xl">
                    <Icon size={18} className="text-accent mb-2" />
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      {["Customer", "Email", "Orders", "Total Spent", "Joined", "Status"].map((h) => (
                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { name: "Alex Thompson", email: "alex@example.com", orders: 12, spent: 3420, joined: "Jan 2023" },
                      { name: "Maya Patel", email: "maya@example.com", orders: 8, spent: 1890, joined: "Mar 2023" },
                      { name: "James Wilson", email: "james@example.com", orders: 24, spent: 7840, joined: "Oct 2022" },
                      { name: "Sophia Lee", email: "sophia@example.com", orders: 5, spent: 940, joined: "Jul 2024" },
                      { name: "Noah Brown", email: "noah@example.com", orders: 17, spent: 4210, joined: "Feb 2023" },
                    ].map((c) => (
                      <tr key={c.name} className="hover:bg-secondary/40 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                              {c.name[0]}
                            </div>
                            <span className="font-medium text-foreground">{c.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-muted-foreground">{c.email}</td>
                        <td className="px-5 py-4 text-foreground">{c.orders}</td>
                        <td className="px-5 py-4 font-semibold text-foreground">{fmtPrice(c.spent)}</td>
                        <td className="px-5 py-4 text-muted-foreground">{c.joined}</td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-xs font-medium rounded-full">Active</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {adminTab === "inventory" && (
            <div>
              <h1 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-8">Inventory</h1>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      {["Product", "SKU", "Category", "Stock", "Threshold", "Status"].map((h) => (
                        <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {PRODUCTS.map((p, i) => {
                      const stock = [142, 38, 291, 15, 67, 89, 23, 187][i] ?? 50;
                      const low = stock < 30;
                      return (
                        <tr key={p.id} className="hover:bg-secondary/40 transition-colors">
                          <td className="px-5 py-4 font-medium text-foreground">{p.name}</td>
                          <td className="px-5 py-4 font-mono text-xs text-muted-foreground">NX-{p.id.toString().padStart(4, "0")}</td>
                          <td className="px-5 py-4 text-muted-foreground">{p.category}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold ${low ? "text-red-500" : "text-foreground"}`}>{stock}</span>
                              <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${low ? "bg-red-500" : "bg-emerald-500"}`}
                                  style={{ width: `${Math.min(100, (stock / 300) * 100)}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-muted-foreground">30</td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${low ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"}`}>
                              {low ? "Low Stock" : "In Stock"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Vendor Dashboard ─────────────────────────────────────────────────────────

function VendorDashboardPage() {
  const [uploadTab, setUploadTab] = useState<"upload" | "products" | "earnings">("upload");

  return (
    <div className="min-h-screen pt-20 bg-secondary/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Vendor Portal</p>
            <h1 className="font-['Playfair_Display'] text-4xl font-bold text-foreground">Seller Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Verified Seller
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Earnings", value: "$24,891", change: "+14.2%" },
            { label: "Products Listed", value: "42", change: "+6" },
            { label: "Orders Received", value: "847", change: "+22.8%" },
            { label: "Avg. Rating", value: "4.8★", change: "+0.2" },
          ].map(({ label, value, change }) => (
            <div key={label} className="p-5 bg-card border border-border rounded-2xl">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              <p className="text-xs text-emerald-500 font-medium mt-1">{change} this month</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border mb-6">
          {(["upload", "products", "earnings"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setUploadTab(t)}
              className={`px-5 py-3 text-sm font-medium capitalize border-b-2 -mb-px transition-all ${uploadTab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t === "upload" ? "Upload Product" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {uploadTab === "upload" && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-semibold text-foreground mb-6">Add New Product</h2>
            <div className="space-y-5">
              <div className="border-2 border-dashed border-border rounded-2xl p-10 text-center hover:border-accent/50 transition-colors cursor-pointer">
                <Upload size={28} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground">Drag & drop product images</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each · Min 800×800px</p>
                <button className="mt-4 px-5 py-2 bg-secondary border border-border rounded-xl text-sm font-medium hover:border-foreground/30 transition-colors">
                  Browse Files
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Product Name</label>
                  <input placeholder="e.g. Premium Leather Wallet" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Category</label>
                  <select className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground">
                    {CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Description</label>
                <textarea rows={4} placeholder="Describe your product in detail…"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Price ($)</label>
                  <input type="number" placeholder="0.00" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Compare Price</label>
                  <input type="number" placeholder="0.00" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Stock Qty</label>
                  <input type="number" placeholder="0" className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button className="px-6 py-3 bg-foreground text-background rounded-xl text-sm font-semibold hover:opacity-85 transition-opacity">
                  Publish Product
                </button>
                <button className="px-6 py-3 border border-border rounded-xl text-sm font-medium hover:border-foreground/30 transition-colors text-foreground">
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        )}

        {uploadTab === "products" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  {["Product", "Price", "Stock", "Sales", "Status"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PRODUCTS.slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-secondary/40 transition-colors">
                    <td className="px-5 py-4 font-medium text-foreground">{p.name}</td>
                    <td className="px-5 py-4 font-semibold text-foreground">{fmtPrice(p.price)}</td>
                    <td className="px-5 py-4 text-foreground">In Stock</td>
                    <td className="px-5 py-4 text-foreground">{p.reviews.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-xs font-medium rounded-full">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {uploadTab === "earnings" && (
          <div>
            <div className="p-6 bg-card border border-border rounded-2xl mb-6">
              <h3 className="font-semibold text-foreground mb-6">Monthly Earnings</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={REVENUE_DATA.slice(0, 6)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#71717a" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#71717a" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => { const v = typeof value === "number" ? value : Number(value ?? 0); return [`$${v.toLocaleString()}`, "Earnings"]; }} />
                  <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Payout History</h3>
                <button className="text-sm text-accent hover:underline">Download CSV</button>
              </div>
              <div className="space-y-3">
                {["Dec 2024", "Nov 2024", "Oct 2024", "Sep 2024"].map((month, i) => {
                  const amounts = [4821, 6104, 5890, 3921];
                  return (
                    <div key={month} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium text-foreground">{month} Payout</p>
                        <p className="text-xs text-muted-foreground">Transferred to bank account</p>
                      </div>
                      <span className="font-bold text-emerald-500">{fmtPrice(amounts[i])}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Support Page ─────────────────────────────────────────────────────────────

function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm Nexus AI. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "Thanks for reaching out! I'm looking into your query. For complex issues, I can connect you with a human agent — just say 'human agent' at any time.",
        },
      ]);
    }, 800);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-foreground text-background py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs font-semibold text-background/50 uppercase tracking-widest mb-3">Help Center</p>
          <h1 className="font-['Playfair_Display'] text-5xl font-bold mb-4">How can we help?</h1>
          <div className="relative max-w-md mx-auto mt-8">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-background/40" />
            <input
              placeholder="Search for answers…"
              className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/40 outline-none focus:border-white/50 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {[
            { icon: Package, title: "Track My Order", desc: "Real-time order tracking and delivery updates" },
            { icon: RefreshCw, title: "Returns & Refunds", desc: "Start a return or check your refund status" },
            { icon: MessageSquare, title: "Live Chat", desc: "Chat with our support team instantly" },
          ].map(({ icon: Icon, title, desc }) => (
            <button
              key={title}
              onClick={() => title === "Live Chat" && setChatOpen(true)}
              className="p-6 bg-card border border-border rounded-2xl text-left hover:border-foreground/20 hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Icon size={18} className="text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* FAQ */}
          <div>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold text-sm text-foreground pr-4">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp size={16} className="text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 border-t border-border pt-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-foreground mb-8">
              Send Us a Message
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Name</label>
                  <input value={contactForm.name} onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))} placeholder="Your name"
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Email</label>
                  <input value={contactForm.email} onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))} type="email" placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Subject</label>
                <select value={contactForm.subject} onChange={(e) => setContactForm((f) => ({ ...f, subject: e.target.value }))}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground">
                  <option value="">Select a topic…</option>
                  <option>Order Issue</option>
                  <option>Return & Refund</option>
                  <option>Product Question</option>
                  <option>Technical Support</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Message</label>
                <textarea rows={5} value={contactForm.message} onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Describe your issue in detail…"
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:border-foreground/40 text-foreground placeholder:text-muted-foreground resize-none" />
              </div>
              <button className="w-full py-3.5 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-85 transition-opacity flex items-center justify-center gap-2">
                <Send size={14} /> Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between p-4 bg-foreground text-background">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-sm">Nexus AI Support</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="opacity-70 hover:opacity-100 transition-opacity">
              <X size={16} />
            </button>
          </div>

          <div className="h-72 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-snug ${
                  msg.role === "user"
                    ? "bg-foreground text-background rounded-br-sm"
                    : "bg-secondary text-foreground rounded-bl-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message…"
              className="flex-1 px-3.5 py-2.5 bg-secondary rounded-xl text-sm outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center hover:opacity-85 transition-opacity flex-shrink-0"
            >
              <Send size={14} className="text-background" />
            </button>
          </div>
        </div>
      )}

      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center shadow-xl hover:opacity-85 transition-all hover:scale-105 z-50"
        >
          <MessageSquare size={22} />
        </button>
      )}
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number>(1);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const onNav = (p: Page, id?: number) => {
    if (p === "product" && id != null) setSelectedProductId(id);
    setPage(p);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1, color: "", size: "" }];
    });
  };

  const updateQty = (productId: number, qty: number) => {
    setCart((prev) => prev.map((i) => i.product.id === productId ? { ...i, qty } : i));
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const sharedProps = { onNav, onAddToCart: addToCart, wishlist, onWishlist: toggleWishlist };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 3px; }
        .dark ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); }
      `}</style>

      {page !== "admin" && (
        <Navbar
          page={page}
          onNav={onNav}
          cartCount={cartCount}
          theme={theme}
          toggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          wishCount={wishlist.length}
        />
      )}

      {page === "admin" && (
        <div className="fixed top-0 inset-x-0 z-50 bg-card border-b border-border h-16 flex items-center px-4">
          <div className="flex items-center justify-between w-full">
            <div className="font-['Playfair_Display'] text-xl font-bold text-foreground">NEXUS Admin</div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button
                onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => onNav("home")}
                className="px-4 py-2 bg-foreground text-background rounded-xl text-xs font-semibold hover:opacity-85 transition-opacity"
              >
                Exit Admin
              </button>
            </div>
          </div>
        </div>
      )}

      <main key={page} style={{ animation: "fadeUp 0.3s ease both" }}>
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>

        {page === "home" && <HomePage {...sharedProps} />}
        {page === "shop" && <ShopPage {...sharedProps} />}
        {page === "product" && (
          <ProductDetailPage
            productId={selectedProductId}
            onNav={onNav}
            onAddToCart={addToCart}
            wishlist={wishlist}
            onWishlist={toggleWishlist}
          />
        )}
        {page === "cart" && (
          <CartPage
            cart={cart}
            onNav={onNav}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
          />
        )}
        {page === "checkout" && <CheckoutPage cart={cart} onNav={onNav} />}
        {page === "auth" && <AuthPage onNav={onNav} />}
        {page === "dashboard" && <CustomerDashboardPage />}
        {page === "admin" && <AdminDashboardPage />}
        {page === "vendor" && <VendorDashboardPage />}
        {page === "support" && <SupportPage />}
      </main>

      {!["admin", "auth"].includes(page) && <Footer onNav={onNav} />}
    </div>
  );
}
