import { useMemo, useState } from "react"

const brandLogo = new URL(
  "./imports/francine-clothing-store-logo.jpg",
  import.meta.url,
).href

type Page = "home" | "shop" | "categories" | "new-arrivals" | "sale" | "about" | "contact" | "product" | "cart" | "checkout" | "orders" | "login" | "account" | "admin"
type UserRole = "admin" | "customer"
type IconName =
  | "arrow"
  | "bag"
  | "chevron"
  | "edit"
  | "logout"
  | "menu"
  | "minus"
  | "orders"
  | "pin"
  | "plus"
  | "search"
  | "settings"
  | "star"
  | "trash"
  | "user"
  | "x"

const defaultAccounts = {
  customer: {
    email: "customer@francine.store",
    password: "customer2026",
  },
  admin: {
    email: "admin@francine.store",
    password: "francine2026",
  },
} as const

type CustomerProfile = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  street: string
  municipality: string
  province: string
  postalCode: string
}

const defaultCustomerProfile: CustomerProfile = {
  firstName: "Alex",
  lastName: "Reyes",
  email: defaultAccounts.customer.email,
  phone: "+63 917 123 4567",
  password: defaultAccounts.customer.password,
  street: "Salvacion",
  municipality: "Rosales",
  province: "Pangasinan",
  postalCode: "2441",
}

const images = {
  hero: "https://images.unsplash.com/photo-1685999298198-54b70e8cb4a4?auto=format&fit=crop&w=1400&q=85",
  i17_1: new URL("./imports/i17-1.jpg", import.meta.url).href,
  i17_2: new URL("./imports/i17-2.jpg", import.meta.url).href,
  i17_3: new URL("./imports/i17-3.jpg", import.meta.url).href,
  lilacDress:
    "https://images.unsplash.com/photo-1779400883023-12ac14f6ab8e?auto=format&fit=crop&w=900&q=85",
  ivorySet:
    "https://images.unsplash.com/photo-1658530060827-1e0fb31efa46?auto=format&fit=crop&w=900&q=85",
  plumSuit:
    "https://images.unsplash.com/photo-1713204767650-8be36bc71040?auto=format&fit=crop&w=900&q=85",
  softDress:
    "https://images.unsplash.com/photo-1670261158313-9ffc3e66b1c1?auto=format&fit=crop&w=900&q=85",
  sandSuit:
    "https://images.unsplash.com/photo-1779406166699-662a041a12a9?auto=format&fit=crop&w=900&q=85",
  linenBlazer:
    "https://images.unsplash.com/photo-1779406167603-d0afe0a4cdd7?auto=format&fit=crop&w=900&q=85",
  shirtEdit:
    "https://images.unsplash.com/photo-1788500304966-2c60274a5de7?auto=format&fit=crop&w=900&q=85",
  relaxedSuit:
    "https://images.unsplash.com/photo-1779406165962-7df12de281b1?auto=format&fit=crop&w=900&q=85",
  atelierBag:
    "https://images.unsplash.com/photo-1786872814428-1f0d8d685217?auto=format&fit=crop&w=900&q=85",
  modernShirt:
    "https://images.unsplash.com/photo-1759350075124-4268c95108ba?auto=format&fit=crop&w=900&q=85",
  softTailoring:
    "https://images.unsplash.com/photo-1772714601004-23b94ae3913d?auto=format&fit=crop&w=900&q=85",
  mensEdit:
    "https://images.unsplash.com/photo-1608145596061-c0796f01f3b8?auto=format&fit=crop&w=900&q=85",
  wardrobe:
    "https://images.unsplash.com/photo-1670014541811-9b0ec280ed60?auto=format&fit=crop&w=900&q=85",
}

type ProductItem = {
  id: number
  name: string
  category: string
  price: number
  image: string
  tag: string
  sku?: string
  stock?: number
  description?: string
  sizes?: string[]
  colors?: string[]
}

const products: ProductItem[] = [
  {
    id: 1,
    name: "Lavender Muse Dress",
    category: "Dresses",
    price: 800,
    image: new URL("./imports/i17.jpg", import.meta.url).href,
    tag: "New",
  },
  {
    id: 2,
    name: "Comfy brown",
    category: "Matching sets",
    price: 350,
    image: new URL("./imports/i14.jpg", import.meta.url).href,
    tag: "Bestseller",
  },
  {
    id: 3,
    name: "Violet Tailored Suit",
    category: "Outerwear",
    price: 450,
    image: new URL("./imports/i18.jpg", import.meta.url).href,
    tag: "Limited",
  },
  {
    id: 4,
    name: "Clara Evening Dress",
    category: "Dresses",
    price: 850,
    image: new URL("./imports/i16.jpg", import.meta.url).href,
    tag: "New",
  },
  {
    id: 5,
    name: "Sienna Soft Blazer",
    category: "Outerwear",
    price: 500,
    image: new URL("./imports/i19.jpg", import.meta.url).href,
    tag: "New",
  },
  {
    id: 6,
    name: "Summer Vibes",
    category: "Matching sets",
    price: 350,
    image: new URL("./imports/i15.jpg", import.meta.url).href,
    tag: "Bestseller",
  },
  {
    id: 7,
    name: "Everyday Cotton Shirt",
    category: "Tops",
    price: 250,
    image: images.shirtEdit,
    tag: "Essential",
  },
  {
    id: 8,
    name: "Simple wear",
    category: "Matching sets",
    price: 350,
    image: new URL("./imports/i12.jpg", import.meta.url).href,
    tag: "New",
  },
  {
    id: 9,
    name: "Atelier Shoulder Bag",
    category: "Accessories",
    price: 900,
    image: images.atelierBag,
    tag: "Limited",
  },
  {
    id: 10,
    name: "Camille Poplin Shirt",
    category: "Tops",
    price: 750,
    image: images.modernShirt,
    tag: "New",
  },
  {
    id: 11,
    name: "Cherry Brown",
    category: "Matching sets",
    price: 350,
    image: new URL("./imports/i13.jpg", import.meta.url).href,
    tag: "Bestseller",
  },
  {
    id: 12,
    name: "The Gentleman's Edit",
    category: "Men",
    price: 700,
    image: new URL("./imports/i7-3.jpg", import.meta.url).href,
    tag: "New",
  },
]

type StoreCategory = {
  id: number
  name: string
  slug: string
  description: string
  image: string
}

const initialCategories: StoreCategory[] = [
  {
    id: 1,
    name: "Women",
    slug: "women",
    description: "Everyday elegance and considered occasion pieces.",
    image: new URL("./imports/i2-4.jpg", import.meta.url).href,
  },
  {
    id: 2,
    name: "Men",
    slug: "men",
    description: "Relaxed tailoring and refined wardrobe foundations.",
    image: new URL("./imports/i7-2.jpg", import.meta.url).href,
  },
  {
    id: 3,
    name: "Dresses",
    slug: "dresses",
    description: "Fluid silhouettes for day, dinner, and everything between.",
    image: new URL("./imports/i3-2.jpg", import.meta.url).href,
  },
  {
    id: 4,
    name: "Matching Sets",
    slug: "matching-sets",
    description: "Effortless pairings that make dressing simple.",
    image: new URL("./imports/i4-2.jpg", import.meta.url).href,
  },
  {
    id: 5,
    name: "Tops",
    slug: "tops",
    description: "Polished shirts, soft layers, and easy essentials.",
    image: images.shirtEdit,
  },
  {
    id: 6,
    name: "Outerwear",
    slug: "outerwear",
    description: "Light layers and beautifully cut tailoring.",
    image: new URL("./imports/i18-1.jpg", import.meta.url).href,
  },
  {
    id: 7,
    name: "Bags",
    slug: "bags",
    description: "Quietly elegant finishing pieces.",
    image: images.atelierBag,
  },
  {
    id: 8,
    name: "Accessories",
    slug: "accessories",
    description: "Thoughtful details to complete the look.",
    image: new URL("./imports/i9-2.jpg", import.meta.url).href,
  },
  {
    id: 9,
    name: "Kids",
    slug: "kids",
    description: "Comfortable pieces for little everyday adventures.",
    image: new URL("./imports/i6-2.jpg", import.meta.url).href,
  },
]

type ProductReview = {
  id: string
  productId: number
  customer: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
}

const createInitialReviews = (): Record<number, ProductReview[]> =>
  Object.fromEntries(
    products.map((product, index) => [
      product.id,
      [
        {
          id: `${product.id}-review-1`,
          productId: product.id,
          customer: ["Maria S.", "Camille R.", "Sofia D.", "Nina P."][
            index % 4
          ],
          rating: 5,
          title: [
            "Beautiful fit and lovely fabric.",
            "Even better than I expected.",
            "A new favorite in my wardrobe.",
            "Elegant and comfortable.",
          ][index % 4],
          body: `The ${product.name.toLowerCase()} feels thoughtfully made and fits beautifully. The fabric is comfortable, and it arrived carefully packed.`,
          date: "September 2026",
          verified: true,
        },
        {
          id: `${product.id}-review-2`,
          productId: product.id,
          customer: ["Angela M.", "Bea L.", "Tricia G.", "Louise A."][
            index % 4
          ],
          rating: index % 3 === 0 ? 4 : 5,
          title: [
            "Lovely quality for the price.",
            "The details are so well done.",
            "Easy to style and true to size.",
            "So pleased with this piece.",
          ][index % 4],
          body:
            "The color and finish look just like the photos. It is easy to wear, flattering, and already getting plenty of compliments.",
          date: "August 2026",
          verified: true,
        },
      ],
    ]),
  )

type CartItem = {
  product: ProductItem
  quantity: number
  size: string
  color: string
}

type OrderRecord = {
  id: string
  items: CartItem[]
  payment: "GCash" | "Bank Transfer" | "Cash on Delivery"
  pickup: boolean
  total: number
  placedAt: string
  deliveryStatus?: "packing" | "delivered"
}

type AddToCart = (
  product: ProductItem,
  quantity?: number,
  size?: string,
  color?: string,
) => void

function Icon({ name, size = 20 }: { name: IconName size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l-1 13H6L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    x: <path d="m6 6 12 12M18 6 6 18" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    edit: (
      <>
        <path d="m4 20 4.5-1 10-10-3.5-3.5-10 10L4 20Z" />
        <path d="m13.5 6.5 3.5 3.5" />
      </>
    ),
    logout: (
      <>
        <path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10" />
      </>
    ),
    orders: (
      <>
        <path d="M6 3h12v18H6zM9 7h6M9 11h6M9 15h4" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.8-1L14.4 3h-4.8l-.3 3.1a7 7 0 0 0-1.8 1l-2.4-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7 7 0 0 0 1.8 1l.3 3.1h4.8l.3-3.1a7 7 0 0 0 1.8-1l2.4 1 2-3.4-2-1.5a7 7 0 0 0 .1-1Z" />
      </>
    ),
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "text" | "icon"
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function BrandMark({
  className = "",
  decorative = false,
}: {
  className?: string
  decorative?: boolean
}) {
  return (
    <span
      className={`brand-logo ${className}`}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Francine Clothing Store"}
      role={decorative ? undefined : "img"}
    >
      <img src={brandLogo} alt="" />
    </span>
  )
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="text" className="logo" onClick={onClick}>
      <BrandMark />
    </Button>
  )
}

function Header({
  page,
  cartCount,
  navigate,
  profile = defaultCustomerProfile,
  userRole,
}: {
  page: Page
  cartCount: number
  navigate: (page: Page) => void
  profile?: CustomerProfile
  userRole: UserRole
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const nav = [
    ["HOME", "home"],
    ["SHOP", "shop"],
    ["CATEGORIES", "categories"],
    ["NEW ARRIVALS", "new-arrivals"],
    ["SALE", "sale"],
    ["ABOUT", "about"],
    ["CONTACT", "contact"],
  ] as const
  return (
    <>
      {userRole === "admin" ? (
        <div className="admin-preview-bar">
          <span>ADMIN STOREFRONT PREVIEW</span>
          <Button variant="text" onClick={() => navigate("admin")}>
            RETURN TO DASHBOARD <Icon name="arrow" size={15} />
          </Button>
        </div>
      ) : (
        <div className="announcement">
          Complimentary shipping on orders over ₱3,500
        </div>
      )}
      <header className="header shell">
        <Button
          variant="icon"
          className="mobile-only"
          onClick={() => setMobileOpen(true)}
        >
          <Icon name="menu" />
          <span className="sr-only">Open menu</span>
        </Button>
        <Logo onClick={() => navigate("home")} />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, destination]) => (
            <Button
              key={label}
              variant="text"
              className={page === destination ? "nav-active" : ""}
              onClick={() => navigate(destination)}
            >
              {label}
            </Button>
          ))}
        </nav>
        <div className="utility-nav">
          <Button variant="icon" onClick={() => navigate("shop")}>
            <Icon name="search" />
            <span className="sr-only">Search</span>
          </Button>
          <Button
            variant="icon"
            className="cart-button"
            onClick={() => navigate("cart")}
          >
            <Icon name="bag" />
            <span className="cart-count">{cartCount}</span>
            <span className="sr-only">Cart</span>
          </Button>
          <Button
            variant="text"
            className={`profile-button ${
              page === "account" || userRole === "admin" ? "active" : ""
            }`}
            onClick={() =>
              navigate(userRole === "admin" ? "admin" : "account")
            }
          >
            <span className="profile-avatar">
              <Icon name="user" size={17} />
              <i aria-hidden="true" />
            </span>
            <span className="profile-copy">
              <small>
                {userRole === "admin" ? "STORE ADMIN" : "MY ACCOUNT"}
              </small>
              <strong>
                {userRole === "admin" ? "Francine" : profile.firstName}
              </strong>
            </span>
            <span className="sr-only">Account</span>
          </Button>
        </div>
      </header>
      {mobileOpen && (
        <div className="drawer-wrap">
          <div
            className="drawer-backdrop"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="drawer">
            <div className="drawer-head">
              <Logo onClick={() => navigate("home")} />
              <Button variant="icon" onClick={() => setMobileOpen(false)}>
                <Icon name="x" />
              </Button>
            </div>
            {nav.map(([label, destination]) => (
              <Button
                key={label}
                variant="text"
                className="drawer-link"
                onClick={() => {
                  navigate(destination)
                  setMobileOpen(false)
                }}
              >
                {label}
                <Icon name="arrow" />
              </Button>
            ))}
            <Button
              variant="secondary"
              onClick={() => {
                navigate(userRole === "admin" ? "admin" : "account")
                setMobileOpen(false)
              }}
            >
              {userRole === "admin" ? "ADMIN DASHBOARD" : "MY ACCOUNT"}
            </Button>
          </aside>
        </div>
      )}
    </>
  )
}

function ServiceBar() {
  return (
    <section className="service-bar" aria-label="Store services">
      <div className="shell">
        {[
          ["SECURE PAYMENTS", "SSL-protected checkout"],
          ["FREE STORE PICKUP", "Salvacion, Rosales"],
          ["NATIONWIDE SHIPPING", "Live delivery tracking"],
          ["7-DAY RETURNS", "Friendly customer support"],
        ].map(([title, detail], index) => (
          <div key={title}>
            <span>0{index + 1}</span>
            <p>
              <strong>{title}</strong>
              <small>{detail}</small>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProductCard({
  product,
  onOpen,
  onAdd,
}: {
  product: ProductItem
  onOpen: () => void
  onAdd: () => void
}) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <button
          className="image-button"
          onClick={onOpen}
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={`${product.name} editorial product photograph`}
            className="product-image"
          />
        </button>
        <span className="product-tag">{product.tag}</span>
        <Button variant="secondary" className="quick-add" onClick={onAdd}>
          QUICK ADD
        </Button>
      </div>
      <div className="product-info">
        <Button variant="text" className="product-name" onClick={onOpen}>
          {product.name}
        </Button>
        <p>{product.category}</p>
        <div className="product-meta">
          <strong>₱{product.price.toLocaleString()}</strong>
          <span>XS–XL</span>
        </div>
      </div>
    </article>
  )
}

function SectionTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string
  title: string
  action?: () => void
}) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action && (
        <Button variant="text" onClick={action}>
          VIEW ALL <Icon name="arrow" />
        </Button>
      )}
    </div>
  )
}

function Home({
  navigate,
  openProduct,
  addToCart,
  catalog,
}: {
  navigate: (page: Page) => void
  openProduct: (product: ProductItem) => void
  addToCart: AddToCart
  catalog: ProductItem[]
}) {
  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <span className="eyebrow">THE NEW SEASON · 2026</span>
          <h1>
            Style that feels
            <br />
            <em>like you.</em>
          </h1>
          <p>
            Carefully selected fashion pieces designed to bring ease,
            confidence, and quiet elegance to every day.
          </p>
          <div className="button-row">
            <Button onClick={() => navigate("shop")}>
              SHOP THE COLLECTION <Icon name="arrow" />
            </Button>
            <Button variant="secondary" onClick={() => navigate("shop")}>
              NEW ARRIVALS
            </Button>
          </div>
          <div className="hero-note">
            <span>01</span>
            <div />
            <p>
              Soft tailoring
              <br />
              Everyday ease
            </p>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src={new URL("./imports/I1.jpg", import.meta.url).href}
            alt="Woman seated beside a curated rack of neutral and burgundy clothing"
          />
          <div className="hero-card">
            <span />
            <strong>The Lavender Hour</strong>
            <Button variant="text" onClick={() => navigate("shop")}>
              Discover <Icon name="arrow" />
            </Button>
          </div>
        </div>
      </section>

      <section className="category-section shell">
        <SectionTitle eyebrow="FIND YOUR STYLE" title="Shop by category" />
        <div className="category-grid">
          {[
            ["Women", new URL("./imports/i2-2.jpg", import.meta.url).href],
            ["Dresses", new URL("./imports/i3-1.jpg", import.meta.url).href],
            [
              "Matching Sets",
              new URL("./imports/i4-1.jpg", import.meta.url).href,
            ],
            ["Outerwear", new URL("./imports/i5-1.jpg", import.meta.url).href],
          ].map(([name, image], index) => (
            <button
              key={name}
              className={`category-card category-${index + 1}`}
              onClick={() => navigate("shop")}
            >
              <img src={image} alt={`${name} fashion category`} />
              <span>
                <strong>{name}</strong>
                <small>EXPLORE COLLECTION</small>
              </span>
            </button>
          ))}
        </div>
        <div className="category-index" aria-label="More clothing categories">
          {[
            ["Women", new URL("./imports/i2-3.jpg", import.meta.url).href],
            ["Men", new URL("./imports/i7-1.jpg", import.meta.url).href],
            ["Kids", new URL("./imports/i6-1.jpg", import.meta.url).href],
            ["Tops", images.shirtEdit],
            ["Bottoms", new URL("./imports/i11-1.jpg", import.meta.url).href],
            ["Shoes", new URL("./imports/i10-1.jpg", import.meta.url).href],
            ["Bags", images.atelierBag],
            [
              "Accessories",
              new URL("./imports/i9-1.jpg", import.meta.url).href,
            ],
          ].map(([name, image]) => (
            <button key={name} onClick={() => navigate("shop")}>
              <img src={image} alt={`${name} clothing and fashion category`} />
              <span>{name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="products-section shell">
        <SectionTitle
          eyebrow="JUST IN"
          title="New arrivals"
          action={() => navigate("shop")}
        />
        <div className="product-grid">
          {catalog.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={() => openProduct(product)}
              onAdd={() => addToCart(product)}
            />
          ))}
        </div>
        <div className="center-action">
          <Button variant="secondary" onClick={() => navigate("shop")}>
            DISCOVER ALL {catalog.length} PIECES <Icon name="arrow" />
          </Button>
        </div>
      </section>

      <section className="story-band">
        <div className="shell story-inner">
          <div className="story-image">
            <img
              src={new URL("./imports/i20.jpg", import.meta.url).href}
              alt="Francine studio tailoring editorial"
            />
            <span>FRANCINE / 2026</span>
          </div>
          <div className="story-copy">
            <span className="eyebrow">OUR POINT OF VIEW</span>
            <h2>
              Clothes for the way
              <br />
              you actually live.
            </h2>
            <p>
              We believe getting dressed should feel effortless. Thoughtful
              silhouettes, soft textures, and versatile pieces made to move with
              your life—not against it.
            </p>
            <Button variant="secondary" onClick={() => navigate("about")}>
              OUR STORY <Icon name="arrow" />
            </Button>
          </div>
          <div className="story-quote">
            <span>“</span>
            <p>Confidence begins with feeling comfortable in your own style.</p>
          </div>
        </div>
      </section>

      <section className="benefits shell">
        {[
          [
            "01",
            "Curated with care",
            "Every piece is selected for quality, comfort, and lasting style.",
          ],
          [
            "02",
            "Easy exchanges",
            "A simple 14-day exchange policy, because fit matters.",
          ],
          [
            "03",
            "Here to help",
            "Real support from our friendly Francine care team.",
          ],
        ].map(([num, title, copy]) => (
          <div key={num}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </section>

      <section className="newsletter">
        <div className="shell newsletter-inner">
          <div>
            <span className="eyebrow">THE FRANCINE LETTER</span>
            <h2>A little style in your inbox.</h2>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="email">Email address</label>
            <div>
              <input id="email" type="email" placeholder="you@example.com" />
              <Button type="submit">
                JOIN US <Icon name="arrow" />
              </Button>
            </div>
            <small />
          </form>
        </div>
      </section>
    </main>
  )
}

function Shop({
  navigate,
  openProduct,
  addToCart,
  catalog,
  categories,
}: {
  navigate: (page: Page) => void
  openProduct: (product: ProductItem) => void
  addToCart: AddToCart
  catalog: ProductItem[]
  categories: StoreCategory[]
}) {
  const [filter, setFilter] = useState("All")
  const [query, setQuery] = useState("")
  const [minPrice, setMinPrice] = useState(100)
  const [maxPrice, setMaxPrice] = useState(20000)
  const [inStock, setInStock] = useState(false)
  const [sort, setSort] = useState("Featured")
  const filtered = useMemo(() => {
    const result = catalog.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        (filter === "All" ||
          p.category.toLowerCase() === filter.toLowerCase()) &&
        p.price >= minPrice &&
        p.price <= maxPrice &&
        (!inStock || (p.stock ?? 1) > 0),
    )
    return [...result].sort((a, b) =>
      sort === "Price: Low to High"
        ? a.price - b.price
        : sort === "Price: High to Low"
          ? b.price - a.price
          : 0,
    )
  }, [catalog, filter, query, minPrice, maxPrice, sort, inStock])
  return (
    <main className="shop-page shell">
      <div className="page-head">
        <span className="eyebrow">THE COLLECTION</span>
        <h1>Shop all</h1>
        <p>
          Modern essentials and standout pieces, thoughtfully chosen for your
          everyday wardrobe.
        </p>
      </div>
      <div className="shop-toolbar">
        <div className="search-field">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the collection"
            aria-label="Search products"
          />
        </div>
        <div className="filter-row">
          {["All", ...categories.map((category) => category.name)].map((item) => (
            <Button
              key={item}
              variant={filter === item ? "primary" : "secondary"}
              onClick={() => setFilter(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div className="advanced-filters">
        <div className="price-filter">
          <span>PRICE RANGE</span>
          <strong>
            ₱{minPrice.toLocaleString()} — ₱{maxPrice.toLocaleString()}
          </strong>
          <div>
            <input
              aria-label="Minimum price"
              type="range"
              min="100"
              max="20000"
              step="100"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(Math.min(Number(e.target.value), maxPrice - 100))
              }
            />
            <input
              aria-label="Maximum price"
              type="range"
              min="100"
              max="20000"
              step="100"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Math.max(Number(e.target.value), minPrice + 100))
              }
            />
          </div>
        </div>
        <label>
          SIZE
          <select defaultValue="All sizes">
            <option>All sizes</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </label>
        <label>
          COLOR
          <select defaultValue="All colors">
            <option>All colors</option>
            <option>Lavender</option>
            <option>Ivory</option>
            <option>Deep plum</option>
            <option>Beige</option>
            <option>Light brown</option>
          </select>
        </label>
        <label>
          SORT BY
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </label>
        <label className="stock-check">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />{" "}
          IN STOCK ONLY
        </label>
      </div>
      <div className="results-line">
        <span>{filtered.length} PIECES</span>
        <span>Showing curated results</span>
      </div>
      {filtered.length ? (
        <div className="product-grid shop-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={() => openProduct(product)}
              onAdd={() => addToCart(product)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No pieces found</h2>
          <p>Try a different search or clear your filters.</p>
          <Button
            onClick={() => {
              setQuery("")
              setFilter("All")
            }}
          >
            CLEAR FILTERS
          </Button>
        </div>
      )}
    </main>
  )
}

function Categories({
  navigate,
  categories,
}: {
  navigate: (page: Page) => void
  categories: StoreCategory[]
}) {
  return (
    <main className="categories-page shell">
      <div className="page-head">
        <span className="eyebrow">THE WARDROBE</span>
        <h1>Shop by category</h1>
        <p>
          Find the pieces that suit your day, your plans, and your personal
          point of view.
        </p>
      </div>
      <div className="all-categories">
        {categories.map((category, index) => (
          <button
            key={category.id}
            className={index === 0 || index === 5 ? "featured" : ""}
            onClick={() => navigate("shop")}
          >
            <img
              src={category.image}
              alt={`${category.name} clothing collection`}
            />
            <span>
              <strong>{category.name}</strong>
              <small>{category.description}</small>
              <b>SHOP NOW →</b>
            </span>
          </button>
        ))}
      </div>
    </main>
  )
}

function CuratedCollection({
  kind,
  navigate,
  openProduct,
  addToCart,
  catalog,
}: {
  kind: "new" | "sale"
  navigate: (page: Page) => void
  openProduct: (product: ProductItem) => void
  addToCart: AddToCart
  catalog: ProductItem[]
}) {
  const isSale = kind === "sale"
  const collection = isSale ? catalog.slice(1, 9) : catalog.slice(0, 8)
  return (
    <main className="collection-page">
      <section className={`collection-hero ${isSale ? "sale-hero" : ""}`}>
        <div className="shell">
          <span className="eyebrow">
            {isSale ? "THE FRANCINE EDIT" : "FRESHLY ARRIVED"}
          </span>
          <h1>
            {isSale
              ? "Considered pieces,\nlovely prices."
              : "New, now,\nand noteworthy."}
          </h1>
          <p>
            {isSale
              ? "A thoughtful selection of past-season favorites, available for a little less."
              : "The latest silhouettes, soft tailoring, and easy layers to join the Francine wardrobe."}
          </p>
        </div>
      </section>
      <section className="shell collection-products">
        <div className="results-line">
          <span>{collection.length} PIECES</span>
          <span>{isSale ? "UP TO 30% OFF" : "UPDATED WEEKLY"}</span>
        </div>
        <div className="product-grid">
          {collection.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={() => openProduct(product)}
              onAdd={() => addToCart(product)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

function About({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <main className="about-page">
      <section className="about-hero shell">
        <div>
          <span className="eyebrow">OUR STORY</span>
          <h1>Getting dressed should feel like coming home to yourself.</h1>
        </div>
        <img src={images.sandSuit} alt="Francine soft tailoring editorial" />
      </section>
      <section className="about-intro shell">
        <span className="about-number">01</span>
        <div>
          <span className="eyebrow">WHY FRANCINE</span>
          <h2>Style with softness at its heart.</h2>
        </div>
        <p>
          Francine began with a simple idea: beautiful clothes should fit real
          life. We bring together flattering silhouettes, comfortable fabrics,
          and an easy sense of polish—pieces you will reach for again and again.
        </p>
      </section>
      <section className="about-mosaic shell">
        <img
          src={images.shirtEdit}
          alt="Curated shirts in the Francine studio"
        />
        <div>
          <img src={images.lilacDress} alt="Francine dress editorial" />
          <blockquote>
            “We choose every piece for how it feels, how it moves, and how
            naturally it becomes yours.”
          </blockquote>
        </div>
      </section>
      <section className="about-values shell">
        {[
          [
            "01",
            "Considered quality",
            "We favor thoughtful construction, comfortable materials, and pieces designed to be worn often.",
          ],
          [
            "02",
            "Personal style",
            "Trends can inspire, but your confidence and point of view always come first.",
          ],
          [
            "03",
            "Genuine care",
            "From finding your size to receiving your order, our team is here to make shopping feel easy.",
          ],
        ].map(([num, title, copy]) => (
          <div key={num}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </section>
      <div className="about-cta">
        <span className="eyebrow">FIND YOUR FRANCINE</span>
        <h2>Meet your next favorite piece.</h2>
        <Button onClick={() => navigate("shop")}>
          SHOP THE COLLECTION <Icon name="arrow" />
        </Button>
      </div>
    </main>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <main className="contact-page shell">
      <div className="contact-intro">
        <span className="eyebrow">WE’RE HERE TO HELP</span>
        <h1>Let’s talk.</h1>
        <p>
          Questions about a piece, your size, or an existing order? Send us a
          note and our Francine care team will be in touch.
        </p>
        <div className="contact-details">
          <div>
            <span>EMAIL</span>
            <strong>hello@francine.store</strong>
          </div>
          <div>
            <span>CALL OR TEXT</span>
            <strong>+63 917 555 0134</strong>
          </div>
          <div>
            <span>VISIT</span>
            <strong>Salvacion, Rosales, Pangasinan</strong>
            <small>Monday–Saturday · 10am–7pm</small>
          </div>
        </div>
      </div>
      <form
        className="contact-form"
        onSubmit={(event) => {
          event.preventDefault()
          setSent(true)
        }}
      >
        <span className="eyebrow">SEND A MESSAGE</span>
        {sent && (
          <div className="inline-message success">
            Thank you. Your message is on its way to our care team.
          </div>
        )}
        <label>
          Full name
          <input required placeholder="Your name" />
        </label>
        <label>
          Email address
          <input required type="email" placeholder="you@example.com" />
        </label>
        <label>
          Subject
          <select defaultValue="Product question">
            <option>Product question</option>
            <option>Order support</option>
            <option>Returns and exchanges</option>
            <option>Store visit</option>
          </select>
        </label>
        <label>
          Message
          <textarea required rows={6} placeholder="How can we help?" />
        </label>
        <Button type="submit">
          SEND MESSAGE <Icon name="arrow" />
        </Button>
      </form>
      <section className="store-map">
        <div className="store-map-copy">
          <span className="eyebrow">VISIT OUR STORE</span>
          <h2>Come say hello in Rosales.</h2>
          <p>
            Explore the collection in person and enjoy complimentary pickup for
            online orders.
          </p>
          <div className="map-address">
            <Icon name="pin" size={22} />
            <div>
              <strong>Salvacion, Rosales, Pangasinan</strong>
              <small>Philippines · Open Monday–Saturday</small>
            </div>
          </div>
          <div className="map-actions">
            <Button
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/dir/?api=1&destination=Salvacion%2C+Rosales%2C+Pangasinan%2C+Philippines",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              GET DIRECTIONS <Icon name="arrow" />
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/search/?api=1&query=Salvacion%2C+Rosales%2C+Pangasinan%2C+Philippines",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              OPEN FULL MAP
            </Button>
          </div>
        </div>
        <div className="map-frame">
          <iframe
            title="Interactive map pinpointing Salvacion, Rosales, Pangasinan"
            src="https://www.google.com/maps?q=Salvacion%2C%20Rosales%2C%20Pangasinan%2C%20Philippines&z=16&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-hint">
            <Icon name="pin" size={15} />
            Drag to move · Use map controls to zoom
          </div>
        </div>
      </section>
    </main>
  )
}

function Product({
  product,
  navigate,
  addToCart,
  reviews,
}: {
  product: ProductItem
  navigate: (page: Page) => void
  addToCart: AddToCart
  reviews: ProductReview[]
}) {
  const [size, setSize] = useState("")
  const [color, setColor] = useState(product.colors?.[0] ?? "Lilac")
  const [qty, setQty] = useState(1)
  const [message, setMessage] = useState("")
  const productColors = (
    product.colors?.length
      ? product.colors
      : ["Lilac", "Deep Plum", "Ivory", "Beige", "Light Brown"]
  ).map((name) => ({
    name,
    className: name.toLowerCase().replace(/\s+/g, "-"),
  }))
  const add = () => {
    if (!size)
      return setMessage("Please select your size before adding this piece.")
    addToCart(product, qty, size, color)
    setMessage("Added to your bag.")
  }
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length
    : 0
  return (
    <main className="product-page shell">
      <div className="breadcrumbs">
        <Button variant="text" onClick={() => navigate("home")}>
          Home
        </Button>
        <span>/</span>
        <Button variant="text" onClick={() => navigate("shop")}>
          {product.category}
        </Button>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <div className="product-detail">
        <div className="gallery">
          <div className="thumbnails"></div>
          <div className="gallery-preview">
            <img
              className="gallery-main"
              src={product.image}
              alt={`${product.name} in editorial styling`}
            />
          </div>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">FRANCINE SIGNATURE</span>
          <h1>{product.name}</h1>
          <div className="detail-price">
            <strong>₱{product.price.toLocaleString()}</strong>
            {product.id !== 1 && product.id !== 2 && (
              <span>
                or 3 payments of ₱
                {Math.ceil(product.price / 3).toLocaleString()}
              </span>
            )}
          </div>
          <p className="detail-desc">
            {product.description ??
              "An elegant, softly draped silhouette made for days that turn into evenings. Fluid through the body with considered tailoring at the waist."}
          </p>
          <div className="choice-head">
            <strong>COLOR</strong>
            <span>{color}</span>
          </div>
          <div className="swatches">
            {productColors.map((item) => (
              <button
                type="button"
                key={item.name}
                className={`swatch ${item.className} ${
                  color === item.name ? "selected" : ""
                }`}
                onClick={() => {
                  setColor(item.name)
                  setMessage("")
                }}
                aria-label={`Select ${item.name}`}
                aria-pressed={color === item.name}
                title={item.name}
              />
            ))}
          </div>
          <div className="choice-head">
            <strong>SELECT SIZE</strong>
            <Button variant="text">SIZE GUIDE</Button>
          </div>
          <div className="size-grid">
            {(product.sizes?.length
              ? product.sizes
              : ["XS", "S", "M", "L", "XL"]
            ).map((item) => (
              <Button
                key={item}
                variant={size === item ? "primary" : "secondary"}
                onClick={() => {
                  setSize(item)
                  setMessage("")
                }}
              >
                {item}
              </Button>
            ))}
          </div>
          {message && (
            <div
              className={`inline-message ${
                message.startsWith("Added") ? "success" : ""
              }`}
            >
              {message}
            </div>
          )}
          <div className="purchase-row">
            <div className="quantity">
              <Button
                variant="icon"
                onClick={() => setQty(Math.max(1, qty - 1))}
              >
                <Icon name="minus" />
              </Button>
              <span>{qty}</span>
              <Button variant="icon" onClick={() => setQty(qty + 1)}>
                <Icon name="plus" />
              </Button>
            </div>
            <Button className="add-main" onClick={add}>
              ADD TO BAG · ₱{(product.price * qty).toLocaleString()}
            </Button>
          </div>
          <Button
            variant="secondary"
            className="full-button"
            onClick={() => {
              if (size) {
                addToCart(product, qty, size, color)
                navigate("checkout")
              } else setMessage("Please select your size before continuing.")
            }}
          >
            BUY NOW
          </Button>
          <div className="detail-accordions">
            {["DETAILS & CARE", "DELIVERY & RETURNS"].map((item) => (
              <Button key={item} variant="text">
                {item}
                <Icon name="plus" />
              </Button>
            ))}
          </div>
        </div>
      </div>
      <section className="product-reviews">
        <div className="product-reviews-head">
          <div>
            <span className="eyebrow">CUSTOMER REVIEWS</span>
            <h2>What customers are saying</h2>
          </div>
          <div className="review-summary">
            <strong>{averageRating.toFixed(1)}</strong>
            <span>{"★".repeat(Math.round(averageRating))}</span>
            <small>
              Based on {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </small>
          </div>
        </div>
        <div className="product-review-list">
          {!reviews.length && (
            <div className="product-reviews-empty">
              <span className="eyebrow">NEW TO THE COLLECTION</span>
              <h3>Be the first to review this piece.</h3>
              <p>
                Customer reviews will appear here after this product receives
                its first verified review.
              </p>
            </div>
          )}
          {reviews.map((review) => (
            <article className="product-review-card" key={review.id}>
              <div className="review-card-top">
                <span className="stars" aria-label={`${review.rating} out of 5 stars`}>
                  {"★".repeat(review.rating)}
                  <span className="empty-stars">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </span>
                <small>{review.date}</small>
              </div>
              <h3>{review.title}</h3>
              <p>{review.body}</p>
              <div className="review-author">
                <strong>{review.customer}</strong>
                {review.verified && <span>VERIFIED BUYER</span>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function Cart({
  navigate,
  openProduct,
  items,
  updateQuantity,
  removeItem,
}: {
  navigate: (page: Page) => void
  openProduct: (product: ProductItem) => void
  items: CartItem[]
  updateQuantity: (item: CartItem, quantity: number) => void
  removeItem: (item: CartItem) => void
}) {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )
  if (!items.length)
    return (
      <main className="empty-state cart-empty">
        <BrandMark className="state-logo" decorative />
        <h1>Your bag is waiting</h1>
        <p>Discover something that feels like you.</p>
        <Button onClick={() => navigate("shop")}>EXPLORE THE COLLECTION</Button>
      </main>
    )
  return (
    <main className="cart-page shell">
      <div className="page-head small">
        <span className="eyebrow">YOUR SELECTION</span>
        <h1>Shopping bag</h1>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div
              className="cart-line"
              key={`${item.product.id}-${item.size}-${item.color}`}
            >
              <img src={item.product.image} alt={item.product.name} />
              <div className="cart-info">
                <Button
                  variant="text"
                  className="product-name"
                  onClick={() => openProduct(item.product)}
                >
                  {item.product.name}
                </Button>
                <p>
                  Color: {item.color} · Size: {item.size}
                </p>
                <div className="quantity">
                  <Button
                    variant="icon"
                    onClick={() =>
                      updateQuantity(item, Math.max(0, item.quantity - 1))
                    }
                  >
                    <Icon name="minus" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="icon"
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                  >
                    <Icon name="plus" />
                  </Button>
                </div>
                <Button
                  variant="text"
                  className="remove"
                  onClick={() => removeItem(item)}
                >
                  REMOVE
                </Button>
              </div>
              <strong>
                ₱{(item.product.price * item.quantity).toLocaleString()}
              </strong>
            </div>
          ))}
          <Button variant="text" onClick={() => navigate("shop")}>
            <Icon name="arrow" /> CONTINUE SHOPPING
          </Button>
        </div>
        <aside className="order-card">
          <span className="eyebrow">ORDER SUMMARY</span>
          <div>
            <span>Subtotal</span>
            <strong>₱{subtotal.toLocaleString()}</strong>
          </div>
          <div>
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="total">
            <span>Estimated total</span>
            <strong>₱{subtotal.toLocaleString()}</strong>
          </div>
          <Button className="full-button" onClick={() => navigate("checkout")}>
            PROCEED TO CHECKOUT <Icon name="arrow" />
          </Button>
          <small>Secure checkout · Easy 14-day exchanges</small>
        </aside>
      </div>
    </main>
  )
}

function Checkout({
  navigate,
  items = [],
  onOrderPlaced,
}: {
  navigate: (page: Page) => void
  items?: CartItem[]
  onOrderPlaced?: (order: OrderRecord) => void
}) {
  const [step, setStep] = useState(1)
  const [placed, setPlaced] = useState(false)
  const [payment, setPayment] = useState<
    "GCash" | "Bank Transfer" | "Cash on Delivery"
  >("GCash")
  const [pickup, setPickup] = useState(false)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )
  const deliveryFee = pickup ? 0 : 150
  const total = subtotal + deliveryFee
  if (!items.length)
    return (
      <main className="empty-state cart-empty">
        <BrandMark className="state-logo" decorative />
        <h1>Your order is empty</h1>
        <p>Add something to your bag before continuing to checkout.</p>
        <Button onClick={() => navigate("shop")}>EXPLORE THE COLLECTION</Button>
      </main>
    )
  if (placed)
    return (
      <main className="confirmation">
        <header className="confirmation-nav">
          <Logo onClick={() => navigate("home")} />
          <Button
            variant="text"
            className="confirmation-shop"
            onClick={() => navigate("shop")}
          >
            CONTINUE SHOPPING <Icon name="arrow" size={16} />
          </Button>
        </header>
        <div className="confirmation-main">
          <section className="confirmation-intro">
            <div className="confirmation-mark">✓</div>
            <span className="eyebrow">ORDER #ORD-2026-8891</span>
            <h1>Order secured!</h1>
            <p>
              Thank you for shopping with us. We’ll send updates as your
              Francine pieces make their way to you.
            </p>
            <div className="confirmation-actions">
              <Button onClick={() => navigate("orders")}>
                TRACK ORDER <Icon name="arrow" />
              </Button>
              <Button variant="secondary" onClick={() => window.print()}>
                PRINT RECEIPT
              </Button>
            </div>
            <small className="confirmation-note">
              A confirmation has been sent to your account email.
            </small>
          </section>
          <section className="confirmation-order">
            <div className="confirmation-order-head">
              <div>
                <span className="eyebrow">ORDER SUMMARY</span>
                <h2>Your Francine pieces</h2>
              </div>
              <span>{itemCount} item{itemCount === 1 ? "" : "s"}</span>
            </div>
            <div className="confirmation-products">
              {items.map((item) => (
                <div
                  className="confirmation-card"
                  key={`${item.product.id}-${item.size}-${item.color}`}
                >
                  <img src={item.product.image} alt={item.product.name} />
                  <div>
                    <strong>{item.product.name}</strong>
                    <span>
                      {item.color} · {item.size} · Qty {item.quantity}
                    </span>
                  </div>
                  <strong>
                    ₱{(item.product.price * item.quantity).toLocaleString()}
                  </strong>
                </div>
              ))}
            </div>
            <div className="receipt-details">
              <div>
                <span>ORDER PLACED</span>
                <strong>Oct 24, 2026 · 02:45 PM</strong>
              </div>
              <div>
                <span>PAYMENT</span>
                <strong>
                  {payment}
                  {payment === "Cash on Delivery"
                    ? " · Due upon delivery"
                    : " · Ref 9001284712"}
                </strong>
              </div>
              <div>
                <span>{pickup ? "PICKUP" : "DELIVERY"}</span>
                <strong>
                  {pickup
                    ? "Salvacion, Rosales, Pangasinan"
                    : "Home delivery · 2–4 days"}
                </strong>
              </div>
              <div>
                <span>
                  {payment === "Cash on Delivery"
                    ? "TOTAL DUE"
                    : "TOTAL PAID"}
                </span>
                <strong>₱{total.toLocaleString()} PHP</strong>
              </div>
            </div>
          </section>
          <section className="checkout-receipt" aria-label="Order receipt">
            <div className="checkout-receipt-head">
              <div>
                <strong>FC-CLXN</strong>
                <span>FRANCINE CLOTHING STORE</span>
              </div>
              <div>
                <span>ORDER RECEIPT</span>
                <strong>#ORD-2026-8891</strong>
              </div>
            </div>
            <div className="checkout-receipt-meta">
              <div>
                <span>ORDER PLACED</span>
                <strong>Oct 24, 2026 · 02:45 PM</strong>
              </div>
              <div>
                <span>PAYMENT METHOD</span>
                <strong>{payment}</strong>
              </div>
              <div>
                <span>FULFILLMENT</span>
                <strong>
                  {pickup
                    ? "Store pickup · Salvacion, Rosales"
                    : "Home delivery · 2–4 business days"}
                </strong>
              </div>
              <div>
                <span>PAYMENT STATUS</span>
                <strong>
                  {payment === "Cash on Delivery" ? "Payment due" : "Paid"}
                </strong>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Color / Size</th>
                  <th>Qty</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={`receipt-${item.product.id}-${item.size}-${item.color}`}
                  >
                    <td>{item.product.name}</td>
                    <td>
                      {item.color} / {item.size}
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      ₱
                      {(item.product.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="checkout-receipt-totals">
              <div>
                <span>Subtotal</span>
                <strong>₱{subtotal.toLocaleString()}</strong>
              </div>
              <div>
                <span>Delivery</span>
                <strong>
                  {deliveryFee ? `₱${deliveryFee.toLocaleString()}` : "Free"}
                </strong>
              </div>
              <div>
                <span>
                  {payment === "Cash on Delivery"
                    ? "Total due"
                    : "Total paid"}
                </span>
                <strong>₱{total.toLocaleString()} PHP</strong>
              </div>
            </div>
            <p>
              Thank you for shopping with Francine Clothing Store.
              <br />
              Salvacion, Rosales, Pangasinan, Philippines
            </p>
          </section>
        </div>
      </main>
    )
  const titles = ["Delivery", "Payment", "Review"]
  return (
    <main className="checkout-page">
      <div className="checkout-brand">
        <Logo onClick={() => navigate("home")} />
      </div>
      <div className="checkout-shell">
        <section className="checkout-form">
          <Button
            variant="text"
            onClick={() => (step === 1 ? navigate("cart") : setStep(step - 1))}
          >
            ← BACK
          </Button>
          <div className="progress">
            {titles.map((title, index) => (
              <div key={title} className={step >= index + 1 ? "active" : ""}>
                <span>{index + 1}</span>
                <small>{title}</small>
              </div>
            ))}
          </div>
          <span className="eyebrow">STEP {step} OF 3</span>
          <h1>{titles[step - 1]}</h1>
          {step === 1 && (
            <div className="form-grid">
              <button
                className={`option-card ${!pickup ? "selected" : ""}`}
                onClick={() => setPickup(false)}
              >
                <strong>Home delivery</strong>
                <span>2–4 business days · ₱150</span>
              </button>
              <button
                className={`option-card ${pickup ? "selected" : ""}`}
                onClick={() => setPickup(true)}
              >
                <strong>Store pickup</strong>
                <span>Salvacion, Rosales · Free</span>
              </button>
              <label className="wide">
                Full name
                <input required defaultValue="Alexandra Reyes" />
              </label>
              <label>
                Email address
                <input required type="email" defaultValue="alex@example.com" />
              </label>
              <label>
                Phone number
                <input required defaultValue="+63 917 555 0134" />
              </label>
              {!pickup && (
                <>
                  <label className="wide">
                    Complete address
                    <input
                      required
                      defaultValue="24 Sampaguita Street, Barangay San Isidro"
                    />
                  </label>
                  <label>
                    City / Municipality
                    <input defaultValue="Rosales, Pangasinan" />
                  </label>
                  <label>
                    Postal code
                    <input defaultValue="2441" />
                  </label>
                </>
              )}
            </div>
          )}
          {step === 2 && (
            <div className="form-grid payment-grid">
              <button
                className={`option-card ${
                  payment === "GCash" ? "selected" : ""
                }`}
                onClick={() => setPayment("GCash")}
              >
                <strong>GCash</strong>
                <span>Upload payment proof</span>
              </button>
              <button
                className={`option-card ${
                  payment === "Bank Transfer" ? "selected" : ""
                }`}
                onClick={() => setPayment("Bank Transfer")}
              >
                <strong>Bank Transfer</strong>
                <span>Transfer from your preferred bank</span>
              </button>
              <button
                className={`option-card ${
                  payment === "Cash on Delivery" ? "selected" : ""
                }`}
                onClick={() => setPayment("Cash on Delivery")}
              >
                <strong>Cash on Delivery</strong>
                <span>
                  {pickup ? "Pay when you pick up" : "Pay when your order arrives"}
                </span>
              </button>
              {payment === "GCash" ? (
                <>
                  <div className="gcash-qr">
                    <div className="qr-pattern" />
                    <span>SCAN WITH GCASH</span>
                    <strong>FRANCINE CLOTHING STORE</strong>
                  </div>
                  <div>
                    <label>
                      GCash mobile number
                      <input required placeholder="09XX XXX XXXX" />
                    </label>
                    <label>
                      Reference number
                      <input required placeholder="10-digit reference" />
                    </label>
                  </div>
                  <label className="wide upload-field">
                    Proof of payment
                    <input required type="file" accept="image/*" />
                  </label>
                </>
              ) : payment === "Bank Transfer" ? (
                <>
                  <div className="bank-transfer-details wide">
                    <span className="eyebrow">TRANSFER TO</span>
                    <div>
                      <span>Bank</span>
                      <strong>BDO Unibank</strong>
                    </div>
                    <div>
                      <span>Account name</span>
                      <strong>Francine Clothing Store</strong>
                    </div>
                    <div>
                      <span>Account number</span>
                      <strong>0012 3456 7890</strong>
                    </div>
                  </div>
                  <label className="wide">
                    Account holder name
                    <input required placeholder="Name used for the transfer" />
                  </label>
                  <label>
                    Sending bank
                    <input required placeholder="e.g. BPI, BDO, UnionBank" />
                  </label>
                  <label>
                    Reference number
                    <input required placeholder="Transfer reference" />
                  </label>
                  <label className="wide upload-field">
                    Proof of transfer
                    <input required type="file" accept="image/*" />
                  </label>
                </>
              ) : (
                <div className="cod-details wide">
                  <span className="eyebrow">PAY UPON RECEIPT</span>
                  <strong>
                    {pickup
                      ? "Prepare the exact amount when collecting your order."
                      : "Prepare the exact amount for the courier upon delivery."}
                  </strong>
                  <p>
                    Please keep your phone available for delivery confirmation.
                    No payment proof is required.
                  </p>
                </div>
              )}
              <div className="secure-note">
                {payment === "Cash on Delivery"
                  ? "Your order will be confirmed now and payment will be collected upon receipt."
                  : "Encrypted SSL checkout. Your payment information is protected."}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="review-panel">
              <div>
                <span>CONTACT</span>
                <strong>Alexandra Reyes · alex@example.com</strong>
              </div>
              <div>
                <span>{pickup ? "PICKUP" : "SHIP TO"}</span>
                <strong>
                  {pickup
                    ? "Salvacion, Rosales, Pangasinan"
                    : "24 Sampaguita Street, Rosales"}
                </strong>
              </div>
              <div>
                <span>PAYMENT</span>
                <strong>{payment}</strong>
              </div>
              <div className="secure-note">
                Please review your order summary before placing the order.
              </div>
            </div>
          )}
          <Button
            className="continue-button"
            onClick={() => {
              if (step < 3) {
                setStep(step + 1)
                return
              }
              onOrderPlaced?.({
                id: "ORD-2026-8891",
                items,
                payment,
                pickup,
                total,
                placedAt: new Date().toLocaleString("en-PH", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }),
              })
              setPlaced(true)
            }}
          >
            {step < 3
              ? "CONTINUE"
              : `PLACE ORDER · ₱${total.toLocaleString()}`}{" "}
            <Icon name="arrow" />
          </Button>
        </section>
        <aside className="checkout-summary">
          <span className="eyebrow">
            YOUR ORDER · {itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"}
          </span>
          {items.map((item) => (
            <div
              className="summary-product"
              key={`${item.product.id}-${item.size}-${item.color}`}
            >
              <img src={item.product.image} alt={item.product.name} />
              <div>
                <strong>{item.product.name}</strong>
                <span>
                  {item.color} · {item.size} · Qty {item.quantity}
                </span>
              </div>
              <strong>
                ₱{(item.product.price * item.quantity).toLocaleString()}
              </strong>
            </div>
          ))}
          <div>
            <span>Subtotal</span>
            <strong>₱{subtotal.toLocaleString()}</strong>
          </div>
          <div>
            <span>Delivery</span>
            <strong>{pickup ? "Free" : "₱150"}</strong>
          </div>
          <div className="total">
            <span>Total</span>
            <strong>₱{total.toLocaleString()}</strong>
          </div>
        </aside>
      </div>
    </main>
  )
}

function Orders({
  order,
  navigate,
}: {
  order: OrderRecord | null
  navigate: (page: Page) => void
}) {
  if (!order)
    return (
      <main className="empty-state cart-empty">
        <BrandMark className="state-logo" decorative />
        <h1>No active orders</h1>
        <p>Your newly placed orders and delivery updates will appear here.</p>
        <Button onClick={() => navigate("shop")}>EXPLORE THE COLLECTION</Button>
      </main>
    )

  const stages = [
    ["Order placed", "Your order was received"],
    ["Payment confirmed", `${order.payment} verified`],
    ["Packing", "Your pieces are being prepared"],
    ["Shipped", "Waiting for courier pickup"],
    ["Out for delivery", "Delivery update to follow"],
    ["Delivered", "Order completion"],
  ]
  const isDelivered = order.deliveryStatus === "delivered"

  return (
    <main className="orders-page shell">
      <div className="page-head small">
        <span className="eyebrow">MY ORDERS</span>
        <h1>Track your order</h1>
        <p>
          Follow your Francine pieces from confirmation through packing and
          delivery.
        </p>
      </div>
      <section className="active-order">
        <div className="active-order-head">
          <div>
            <span className="eyebrow">ORDER #{order.id}</span>
            <h2>
              {isDelivered
                ? "Your order has been delivered."
                : "Your order is being packed."}
            </h2>
            <p>Placed {order.placedAt}</p>
          </div>
          <span className="status">
            {isDelivered ? "DELIVERED" : "PACKING"}
          </span>
        </div>
        <div className="order-progress" aria-label="Order delivery progress">
          {stages.map(([title, detail], index) => (
            <div
              key={title}
              className={
                isDelivered
                  ? index < 5
                    ? "done"
                    : "current"
                  : index < 2
                    ? "done"
                    : index === 2
                      ? "current"
                      : ""
              }
            >
              <span>
                {isDelivered || index < 2 ? "✓" : index + 1}
              </span>
              <strong>{title}</strong>
              <small>{detail}</small>
            </div>
          ))}
        </div>
        <div className="tracked-order-layout">
          <div className="tracked-products">
            <span className="eyebrow">ORDER ITEMS</span>
            {order.items.map((item) => (
              <div
                className="tracked-product"
                key={`${item.product.id}-${item.size}-${item.color}`}
              >
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <strong>{item.product.name}</strong>
                  <span>
                    {item.color} · {item.size} · Qty {item.quantity}
                  </span>
                </div>
                <strong>
                  ₱{(item.product.price * item.quantity).toLocaleString()}
                </strong>
              </div>
            ))}
          </div>
          <aside className="tracking-details">
            <span className="eyebrow">DELIVERY DETAILS</span>
            <div>
              <span>Fulfillment</span>
              <strong>
                {order.pickup ? "Store pickup" : "Home delivery"}
              </strong>
            </div>
            <div>
              <span>Payment</span>
              <strong>{order.payment}</strong>
            </div>
            <div>
              <span>Estimated arrival</span>
              <strong>
                {order.pickup ? "Ready within 1–2 days" : "2–4 business days"}
              </strong>
            </div>
            <div className="tracking-total">
              <span>Total paid</span>
              <strong>₱{order.total.toLocaleString()}</strong>
            </div>
            <Button
              variant="secondary"
              className="full-button"
              onClick={() => navigate("contact")}
            >
              NEED HELP?
            </Button>
          </aside>
        </div>
      </section>
      <div className="button-row">
        <Button variant="secondary" onClick={() => navigate("shop")}>
          CONTINUE SHOPPING
        </Button>
        <Button variant="text" onClick={() => navigate("account")}>
          VIEW ACCOUNT
        </Button>
      </div>
    </main>
  )
}

function Login({
  onLogin,
  customerProfile = defaultCustomerProfile,
}: {
  onLogin: (role: UserRole) => void
  customerProfile?: CustomerProfile
}) {
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer")
  const isAdmin = selectedRole === "admin"
  const selectedAccount = isAdmin
    ? defaultAccounts.admin
    : {
        email: customerProfile.email,
        password: customerProfile.password,
      }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-card-head">
          <div className="login-logo">
            <BrandMark />
          </div>
          <span>MEMBER ACCESS</span>
        </div>
        <div className="login-intro">
          <span className="eyebrow">WELCOME TO FRANCINE</span>
          <h1>Choose your way in.</h1>
          <p>
            Select the account you want to use. Your credentials are ready, so
            you can continue with one click.
          </p>
        </div>
        <div className="login-role-switch" aria-label="Choose account type">
          <Button
            variant="text"
            className={selectedRole === "customer" ? "active" : ""}
            onClick={() => setSelectedRole("customer")}
          >
            <Icon name="user" size={17} />
            CUSTOMER
          </Button>
          <Button
            variant="text"
            className={selectedRole === "admin" ? "active" : ""}
            onClick={() => setSelectedRole("admin")}
          >
            <Icon name="settings" size={17} />
            ADMIN
          </Button>
        </div>
        <form
          key={selectedRole}
          className={`login-access-card login-access-panel ${
            isAdmin ? "admin-access" : "customer-access"
          }`}
          onSubmit={(event) => {
            event.preventDefault()
            onLogin(selectedRole)
          }}
        >
          <div className="login-access-head">
            <span className="login-access-icon">
              <Icon name={isAdmin ? "settings" : "user"} size={21} />
            </span>
            <div>
              <span>{isAdmin ? "ADMIN ACCESS" : "CUSTOMER ACCESS"}</span>
              <h2>{isAdmin ? "Manage the store" : "Visit the store"}</h2>
            </div>
          </div>
          <div className="login-panel-fields">
            <label>
              Email address
              <input readOnly type="email" value={selectedAccount.email} />
            </label>
            <label>
              Password
              <input
                readOnly
                type="password"
                value={selectedAccount.password}
              />
            </label>
          </div>
          <Button type="submit" className="login-access-submit">
            {isAdmin ? "OPEN ADMIN DASHBOARD" : "SIGN IN TO STOREFRONT"}{" "}
            <Icon name="arrow" size={16} />
          </Button>
        </form>
        <p className="login-security" />
      </section>
      <aside className="login-accent" aria-hidden="true">
        <BrandMark className="login-accent-logo" decorative />
        <div className="login-accent-copy">
          <span>FRANCINE CLOTHING STORE</span>
          <h2>Style that feels like you.</h2>
          <p>Thoughtful fashion for your everyday life.</p>
        </div>
      </aside>
    </main>
  )
}

function Account({
  navigate,
  onLogout,
  reviews,
  onAddReview,
  addToCart,
  onViewOrder,
  profile = defaultCustomerProfile,
  onUpdateProfile,
  catalog,
}: {
  navigate: (page: Page) => void
  onLogout: () => void
  reviews: ProductReview[]
  onAddReview: (review: Omit<ProductReview, "id" | "date">) => void
  addToCart: AddToCart
  onViewOrder: (order: OrderRecord) => void
  profile?: CustomerProfile
  onUpdateProfile: (profile: CustomerProfile) => void
  catalog: ProductItem[]
}) {
  const [tab, setTab] = useState("Overview")
  const [reviewSent, setReviewSent] = useState("")
  const [accountMessage, setAccountMessage] = useState("")
  const [accountError, setAccountError] = useState("")
  const displayName = `${profile.firstName} ${profile.lastName}`
  const reviewName = `${profile.firstName} ${profile.lastName.charAt(0)}.`
  const accountNav: { label: string; icon: IconName }[] = [
    { label: "Overview", icon: "user" },
    { label: "My Orders", icon: "bag" },
    { label: "Track Order", icon: "orders" },
    { label: "Reviews", icon: "star" },
    { label: "Addresses", icon: "pin" },
    { label: "Settings", icon: "settings" },
  ]
  const savedOrders: (OrderRecord & {
    status: string
    delivered?: boolean
  })[] = [
    {
      id: "ORD-2026-9901",
      status: "IN QUEUE · ORDER PLACED",
      placedAt: "Sept 28, 2026 · 10:15 AM",
      payment: "GCash",
      pickup: false,
      deliveryStatus: "packing",
      total: products[9].price + products[6].price,
      items: [
        {
          product: products[9],
          quantity: 1,
          size: "M",
          color: "Ivory",
        },
        {
          product: products[6],
          quantity: 1,
          size: "M",
          color: "Lilac",
        },
      ],
    },
    {
      id: "ORD-2026-8812",
      status: "DELIVERED",
      placedAt: "Sept 15, 2026 · 04:30 PM",
      payment: "Bank Transfer",
      pickup: false,
      deliveryStatus: "delivered",
      total: products[1].price + products[3].price,
      delivered: true,
      items: [
        {
          product: products[1],
          quantity: 1,
          size: "M",
          color: "Deep Plum",
        },
        {
          product: products[3],
          quantity: 1,
          size: "S",
          color: "Ivory",
        },
      ],
    },
  ]
  return (
    <main className="account-page shell">
      <section className="account-hero">
        <div className="account-avatar">
          {profile.firstName.charAt(0)}
          {profile.lastName.charAt(0)}
        </div>
        <div>
          <span className="eyebrow">MY FRANCINE</span>
          <h1>Welcome back, {profile.firstName}.</h1>
          <p>{profile.email} · Member since March 2026</p>
        </div>
        <span className="member-badge">FC MEMBER</span>
      </section>
      <div className="account-layout">
        <aside className="account-sidebar">
          <div className="account-nav">
            {accountNav.map((item) => (
              <Button
                key={item.label}
                variant="text"
                className={tab === item.label ? "active" : ""}
                onClick={() => {
                  setAccountMessage("")
                  setAccountError("")
                  item.label === "Track Order"
                    ? navigate("orders")
                    : setTab(item.label)
                }}
              >
                <span className="account-nav-label">
                  <Icon name={item.icon} size={17} />
                  {item.label}
                </span>
                <Icon name="chevron" size={16} />
              </Button>
            ))}
          </div>
          <Button
            variant="secondary"
            className="logout-button"
            onClick={onLogout}
          >
            <Icon name="logout" size={18} />
            SIGN OUT
          </Button>
        </aside>
        <section className="account-content">
          <div className="account-top">
            <div>
              <span className="eyebrow">ACCOUNT MANAGEMENT</span>
              <h2>{tab}</h2>
            </div>
            <span>Signed in as {reviewName}</span>
          </div>
          {accountMessage && (
            <div className="inline-message success">{accountMessage}</div>
          )}
          {accountError && (
            <div className="login-error" role="alert">
              {accountError}
            </div>
          )}
          {tab === "Overview" && (
            <div className="account-summary-grid">
              <div>
                <span>ACTIVE ORDERS</span>
                <strong>1</strong>
                <Button variant="text" onClick={() => setTab("My Orders")}>
                  VIEW ORDERS <Icon name="arrow" size={15} />
                </Button>
              </div>
              <div>
                <span>REVIEWS SHARED</span>
                <strong>
                  {
                    reviews.filter((review) => review.customer === reviewName)
                      .length
                  }
                </strong>
                <Button variant="text" onClick={() => setTab("Reviews")}>
                  WRITE A REVIEW <Icon name="arrow" size={15} />
                </Button>
              </div>
              <div>
                <span>DEFAULT ADDRESS</span>
                <strong className="summary-address">
                  {profile.street}, {profile.municipality}
                </strong>
                <Button variant="text" onClick={() => setTab("Addresses")}>
                  MANAGE ADDRESS <Icon name="arrow" size={15} />
                </Button>
              </div>
            </div>
          )}
          {(tab === "My Orders" || tab === "Overview") && (
            <div className="orders-list account-orders">
              <span className="eyebrow">
                {tab === "Overview" ? "RECENT ORDERS" : "ORDER HISTORY"}
              </span>
              {savedOrders.map((order) => (
                <OrderHistory
                  key={order.id}
                  status={order.status}
                  order={`#${order.id}`}
                  date={order.placedAt}
                  total={`₱${order.total.toLocaleString()}`}
                  image={order.items[0].product.image}
                  items={order.items
                    .map((item) => item.product.name)
                    .join(" + ")}
                  itemCount={order.items.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  )}
                  payment={order.payment}
                  delivered={order.delivered}
                  onViewDetails={() => onViewOrder(order)}
                  onReorder={() => {
                    order.items.forEach((item) =>
                      addToCart(
                        item.product,
                        item.quantity,
                        item.size,
                        item.color,
                      ),
                    )
                    navigate("cart")
                  }}
                />
              ))}
            </div>
          )}
          {tab === "Reviews" && (
            <div className="reviews-layout">
              <div className="account-review-list">
                <span className="eyebrow">LATEST REVIEWS</span>
                {[...reviews]
                  .sort(
                    (first, second) =>
                      Number(second.date === "Just now") -
                      Number(first.date === "Just now"),
                  )
                  .slice(0, 4)
                  .map((review) => {
                  const reviewedProduct = catalog.find(
                    (product) => product.id === review.productId,
                  )
                  return (
                    <article className="existing-review" key={review.id}>
                      <div className="stars" aria-label={`${review.rating} out of 5 stars`}>
                        {"★".repeat(review.rating)}
                        <span className="empty-stars">
                          {"★".repeat(5 - review.rating)}
                        </span>
                      </div>
                      <h3>{review.title}</h3>
                      <p>{review.body}</p>
                      <small>
                        {review.customer} · {reviewedProduct?.name}
                      </small>
                    </article>
                  )
                  })}
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  const form = event.currentTarget
                  const formData = new FormData(form)
                  const productId = Number(formData.get("productId"))
                  const reviewedProduct = catalog.find(
                    (product) => product.id === productId,
                  )
                  onAddReview({
                    productId,
                    customer: formData.get("anonymous")
                      ? "Anonymous"
                      : reviewName,
                    rating: Number(formData.get("rating")),
                    title: String(formData.get("title")),
                    body: String(formData.get("body")),
                    verified: true,
                  })
                  setReviewSent(
                    `Thank you—your review for ${reviewedProduct?.name} is now live.`,
                  )
                  form.reset()
                }}
              >
                <span className="eyebrow">ADD A REVIEW</span>
                {reviewSent && (
                  <div className="inline-message success">
                    {reviewSent}
                  </div>
                )}
                <label>
                  Product
                  <select name="productId" defaultValue={catalog[0].id}>
                    {catalog.map((product) => (
                      <option value={product.id} key={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Rating
                  <select name="rating" defaultValue="5">
                    <option value="5">5 stars</option>
                    <option value="4">4 stars</option>
                    <option value="3">3 stars</option>
                    <option value="2">2 stars</option>
                    <option value="1">1 star</option>
                  </select>
                </label>
                <label>
                  Review title
                  <input
                    required
                    name="title"
                    placeholder="Summarize your experience"
                  />
                </label>
                <label>
                  Your review
                  <textarea
                    required
                    name="body"
                    rows={5}
                    placeholder="Tell us about your piece"
                  />
                </label>
                <label className="upload-field">
                  Add photos
                  <input type="file" accept="image/*" multiple />
                </label>
                <label className="privacy-check">
                  <input type="checkbox" name="anonymous" /> Post anonymously
                </label>
                <Button type="submit">SUBMIT REVIEW</Button>
              </form>
            </div>
          )}
          {tab === "Addresses" && (
            <div className="account-management">
              <div className="saved-address">
                <div className="management-title">
                  <div>
                    <span className="eyebrow">DEFAULT ADDRESS</span>
                    <h3>Home</h3>
                  </div>
                  <span className="address-tag">DEFAULT</span>
                </div>
                <p>
                  {displayName}
                  <br />
                  {profile.street}, {profile.municipality}, {profile.province}{" "}
                  {profile.postalCode}
                  <br />
                  Philippines · {profile.phone}
                </p>
              </div>
              <form
                className="account-form"
                onSubmit={(event) => {
                  event.preventDefault()
                  const formData = new FormData(event.currentTarget)
                  onUpdateProfile({
                    ...profile,
                    firstName: String(formData.get("firstName")).trim(),
                    lastName: String(formData.get("lastName")).trim(),
                    phone: String(formData.get("phone")).trim(),
                    street: String(formData.get("street")).trim(),
                    municipality: String(
                      formData.get("municipality"),
                    ).trim(),
                    province: String(formData.get("province")).trim(),
                    postalCode: String(formData.get("postalCode")).trim(),
                  })
                  setAccountError("")
                  setAccountMessage("Your delivery address has been updated.")
                }}
              >
                <div className="management-title">
                  <div>
                    <span className="eyebrow">EDIT ADDRESS</span>
                    <h3>Delivery details</h3>
                  </div>
                </div>
                <div className="account-form-grid">
                  <label>
                    First name
                    <input
                      required
                      name="firstName"
                      defaultValue={profile.firstName}
                    />
                  </label>
                  <label>
                    Last name
                    <input
                      required
                      name="lastName"
                      defaultValue={profile.lastName}
                    />
                  </label>
                  <label>
                    Phone number
                    <input
                      required
                      name="phone"
                      defaultValue={profile.phone}
                    />
                  </label>
                  <label>
                    Street and barangay
                    <input
                      required
                      name="street"
                      defaultValue={profile.street}
                    />
                  </label>
                  <label>
                    Municipality
                    <input
                      required
                      name="municipality"
                      defaultValue={profile.municipality}
                    />
                  </label>
                  <label>
                    Province
                    <input
                      required
                      name="province"
                      defaultValue={profile.province}
                    />
                  </label>
                  <label>
                    Postal code
                    <input
                      required
                      name="postalCode"
                      inputMode="numeric"
                      defaultValue={profile.postalCode}
                    />
                  </label>
                </div>
                <Button type="submit">SAVE ADDRESS</Button>
              </form>
            </div>
          )}
          {tab === "Settings" && (
            <form
              className="account-form settings-form"
              onSubmit={(event) => {
                event.preventDefault()
                const formData = new FormData(event.currentTarget)
                const currentPassword = String(
                  formData.get("currentPassword"),
                )
                const newPassword = String(formData.get("newPassword"))
                const confirmPassword = String(
                  formData.get("confirmPassword"),
                )
                if (newPassword && currentPassword !== profile.password) {
                  setAccountMessage("")
                  setAccountError(
                    "Enter your current password correctly before choosing a new one.",
                  )
                  return
                }
                if (newPassword && newPassword.length < 8) {
                  setAccountMessage("")
                  setAccountError(
                    "Your new password must contain at least 8 characters.",
                  )
                  return
                }
                if (newPassword !== confirmPassword) {
                  setAccountMessage("")
                  setAccountError("Your new passwords do not match.")
                  return
                }
                onUpdateProfile({
                  ...profile,
                  firstName: String(formData.get("firstName")).trim(),
                  lastName: String(formData.get("lastName")).trim(),
                  email: String(formData.get("email")).trim().toLowerCase(),
                  phone: String(formData.get("phone")).trim(),
                  password: newPassword || profile.password,
                })
                setAccountError("")
                setAccountMessage("Your account settings have been saved.")
                const form = event.currentTarget
                ;[
                  "currentPassword",
                  "newPassword",
                  "confirmPassword",
                ].forEach((fieldName) => {
                  const field = form.elements.namedItem(fieldName)
                  if (field instanceof HTMLInputElement) field.value = ""
                })
              }}
            >
              <div className="management-title">
                <div>
                  <span className="eyebrow">PERSONAL DETAILS</span>
                  <h3>Profile information</h3>
                </div>
              </div>
              <div className="account-form-grid">
                <label>
                  First name
                  <input
                    required
                    name="firstName"
                    defaultValue={profile.firstName}
                  />
                </label>
                <label>
                  Last name
                  <input
                    required
                    name="lastName"
                    defaultValue={profile.lastName}
                  />
                </label>
                <label className="wide">
                  Email address
                  <input
                    required
                    name="email"
                    type="email"
                    defaultValue={profile.email}
                  />
                </label>
                <label className="wide">
                  Phone number
                  <input
                    required
                    name="phone"
                    defaultValue={profile.phone}
                  />
                </label>
                <label>
                  Current password
                  <input
                    name="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Required to change password"
                  />
                </label>
                <label>
                  New password
                  <input
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                  />
                </label>
                <label className="wide">
                  Confirm new password
                  <input
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Repeat your new password"
                  />
                </label>
              </div>
              <div className="account-preferences">
                <span className="eyebrow">COMMUNICATIONS</span>
                <label>
                  <input type="checkbox" defaultChecked />
                  <span>
                    <strong>Order updates</strong>
                    <small>Receive delivery and order status notifications.</small>
                  </span>
                </label>
                <label>
                  <input type="checkbox" defaultChecked />
                  <span>
                    <strong>Francine updates</strong>
                    <small>Hear about new collections and private offers.</small>
                  </span>
                </label>
              </div>
              <Button type="submit">SAVE CHANGES</Button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}

function OrderHistory({
  status,
  order,
  date,
  total,
  image,
  items,
  itemCount,
  payment,
  onViewDetails,
  onReorder,
  delivered = false,
}: {
  status: string
  order: string
  date: string
  total: string
  image: string
  items: string
  itemCount: number
  payment: OrderRecord["payment"]
  onViewDetails: () => void
  onReorder: () => void
  delivered?: boolean
}) {
  return (
    <article className="order-history">
      <div className="order-history-head">
        <span className="status">{status}</span>
        <div>
          <strong>{order}</strong>
          <small>Placed {date}</small>
        </div>
      </div>
      <div className="order-history-body">
        <img src={image} alt={items} />
        <div className="order-history-info">
          <span>
            {itemCount} ITEM{itemCount === 1 ? "" : "S"}
          </span>
          <p>{items}</p>
          <small>
            Paid by {payment} ·{" "}
            {delivered ? "Delivered successfully" : "Delivery in progress"}
          </small>
        </div>
        <div className="order-history-total">
          <span>ORDER TOTAL</span>
          <strong>{total}</strong>
        </div>
      </div>
      <div className="order-history-actions">
        <Button variant="secondary" onClick={onViewDetails}>
          VIEW DETAILS <Icon name="arrow" size={15} />
        </Button>
        <Button variant="text" onClick={onReorder}>
          <Icon name="bag" size={16} /> REORDER SET
        </Button>
      </div>
    </article>
  )
}

type AdminOrderRecord = {
  id: string
  customer: string
  date: string
  total: number
  cost: number
  payment: OrderRecord["payment"]
  paymentStatus: "Paid" | "Pending"
  status: string
  itemCount: number
}

const baseAdminOrders: AdminOrderRecord[] = [
  {
    id: "ORD-2026-9901",
    customer: "Juan Dela Cruz",
    date: "Sept 28 · 10:15 AM",
    total: 2980,
    cost: 1560,
    payment: "GCash",
    paymentStatus: "Paid",
    status: "Packing",
    itemCount: 2,
  },
  {
    id: "ORD-2026-8812",
    customer: "Maria Santos",
    date: "Sept 15 · 04:30 PM",
    total: 5140,
    cost: 2780,
    payment: "Bank Transfer",
    paymentStatus: "Paid",
    status: "Delivered",
    itemCount: 2,
  },
  {
    id: "ORD-2026-8734",
    customer: "Ana Reyes",
    date: "Sept 12 · 01:20 PM",
    total: 3250,
    cost: 1740,
    payment: "GCash",
    paymentStatus: "Paid",
    status: "Shipped",
    itemCount: 1,
  },
  {
    id: "ORD-2026-8651",
    customer: "Jamie Cruz",
    date: "Sept 09 · 11:45 AM",
    total: 4790,
    cost: 2490,
    payment: "Bank Transfer",
    paymentStatus: "Pending",
    status: "Payment review",
    itemCount: 2,
  },
]

const adminInventory = [
  { name: "Lavender Muse Dress", stock: 14, reorderPoint: 5 },
  { name: "Comfy Brown", stock: 3, reorderPoint: 5 },
  { name: "Violet Tailored Suit", stock: 8, reorderPoint: 4 },
  { name: "Clara Evening Dress", stock: 2, reorderPoint: 5 },
]

function Admin({
  onViewStorefront,
  onLogout,
  currentOrder,
  catalog = products,
  onAddProduct,
  onUpdateProduct,
  categories = initialCategories,
  onAddCategory = () => undefined,
  onUpdateCategory = () => undefined,
  onDeleteCategory = () => undefined,
}: {
  onViewStorefront: () => void
  onLogout: () => void
  currentOrder: OrderRecord | null
  catalog?: ProductItem[]
  onAddProduct: (product: Omit<ProductItem, "id">) => void
  onUpdateProduct: (product: ProductItem) => void
  categories?: StoreCategory[]
  onAddCategory?: (category: Omit<StoreCategory, "id">) => void
  onUpdateCategory?: (category: StoreCategory) => void
  onDeleteCategory?: (categoryId: number) => void
}) {
  const [section, setSection] = useState("Dashboard")
  const [saved, setSaved] = useState("")
  const [productImage, setProductImage] = useState("")
  const [productError, setProductError] = useState("")
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)
  const [editImage, setEditImage] = useState("")
  const menu = [
    "Dashboard",
    "Products",
    "Categories",
    "Inventory",
    "Orders",
    "Customers",
    "Payments",
    "Settings",
  ]
  const dashboardOrders: AdminOrderRecord[] = currentOrder
    ? [
        {
          id: currentOrder.id,
          customer: "Alex Reyes",
          date: currentOrder.placedAt,
          total: currentOrder.total,
          cost: Math.round(currentOrder.total * 0.54),
          payment: currentOrder.payment,
          paymentStatus:
            currentOrder.payment === "Cash on Delivery" ? "Pending" : "Paid",
          status:
            currentOrder.deliveryStatus === "delivered"
              ? "Delivered"
              : "Packing",
          itemCount: currentOrder.items.reduce(
            (total, item) => total + item.quantity,
            0,
          ),
        },
        ...baseAdminOrders,
      ]
    : baseAdminOrders
  const paidOrders = dashboardOrders.filter(
    (order) => order.paymentStatus === "Paid",
  )
  const totalSales = paidOrders.reduce((total, order) => total + order.total, 0)
  const productCosts = paidOrders.reduce(
    (total, order) => total + order.cost,
    0,
  )
  const paymentFees = Math.round(totalSales * 0.025)
  const netProfit = totalSales - productCosts - paymentFees
  const profitMargin = totalSales
    ? Math.round((netProfit / totalSales) * 100)
    : 0
  const averageOrderValue = paidOrders.length
    ? Math.round(totalSales / paidOrders.length)
    : 0
  const lowStockItems = [
    ...adminInventory.filter((item) => item.stock <= item.reorderPoint),
    ...catalog
      .filter(
        (product) => product.stock !== undefined && product.stock <= 5,
      )
      .map((product) => ({
        name: product.name,
        stock: product.stock ?? 0,
        reorderPoint: 5,
      })),
  ]
  return (
    <main className="admin">
      <aside className="admin-side">
        <Logo onClick={() => setSection("Dashboard")} />
        <span className="admin-label">STORE ADMIN</span>
        {menu.map((item) => (
          <Button
            key={item}
            variant="text"
            className={
              section === item ||
              (item === "Products" &&
                (section === "Add Product" || section === "Edit Product"))
                ? "active"
                : ""
            }
            onClick={() => setSection(item)}
          >
            {item}
            <span>›</span>
          </Button>
        ))}
        <div className="admin-side-actions">
          <Button variant="secondary" onClick={onViewStorefront}>
            VIEW STOREFRONT
          </Button>
          <Button className="admin-signout" onClick={onLogout}>
            <Icon name="logout" size={17} />
            <span>SIGN OUT</span>
          </Button>
        </div>
      </aside>
      <section className="admin-main">
        <div className="admin-head">
          <div>
            <span className="eyebrow">FRANCINE ADMIN</span>
            <h1>{section}</h1>
          </div>
          <div className="admin-user">
            <span>FCR</span>
            <div>
              <strong>Francine Calaunan-Robles</strong>
              <small>Store owner</small>
            </div>
          </div>
        </div>
        {section === "Dashboard" ? (
          <>
            <div className="metric-grid">
              {[
                {
                  label: "TOTAL SALES",
                  value: `₱${totalSales.toLocaleString()}`,
                  note: `${paidOrders.length} paid orders`,
                  section: "Orders",
                },
                {
                  label: "NET PROFIT",
                  value: `₱${netProfit.toLocaleString()}`,
                  note: `${profitMargin}% profit margin`,
                  section: "Payments",
                },
                {
                  label: "TOTAL ORDERS",
                  value: dashboardOrders.length.toString(),
                  note: `${dashboardOrders.filter((order) => order.paymentStatus === "Pending").length} awaiting payment`,
                  section: "Orders",
                },
                {
                  label: "AVERAGE ORDER",
                  value: `₱${averageOrderValue.toLocaleString()}`,
                  note: "Paid order value",
                  section: "Orders",
                },
              ].map((metric) => (
                <button
                  key={metric.label}
                  onClick={() => setSection(metric.section)}
                >
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <small>{metric.note} →</small>
                </button>
              ))}
            </div>
            <div className="admin-dashboard-grid">
              <div className="admin-table-card">
                <div className="table-head">
                  <div>
                    <h2>Recent orders</h2>
                    <p>Latest customer activity and fulfillment status.</p>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => setSection("Orders")}
                  >
                    VIEW ALL
                  </Button>
                </div>
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardOrders.slice(0, 5).map((order) => (
                        <tr key={order.id}>
                          <td>
                            <strong>#{order.id}</strong>
                            <small className="admin-table-date">
                              {order.date}
                            </small>
                          </td>
                          <td>{order.customer}</td>
                          <td>{order.itemCount}</td>
                          <td>₱{order.total.toLocaleString()}</td>
                          <td>{order.payment}</td>
                          <td>
                            <span className="table-status">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <aside className="dashboard-finance">
                <div>
                  <span className="eyebrow">SALES BREAKDOWN</span>
                  <h2>Financial summary</h2>
                </div>
                <dl>
                  <div>
                    <dt>Gross sales</dt>
                    <dd>₱{totalSales.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt>Product costs</dt>
                    <dd>− ₱{productCosts.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt>Payment fees</dt>
                    <dd>− ₱{paymentFees.toLocaleString()}</dd>
                  </div>
                  <div className="finance-total">
                    <dt>Estimated profit</dt>
                    <dd>₱{netProfit.toLocaleString()}</dd>
                  </div>
                </dl>
                <div className="dashboard-alerts">
                  <Button
                    variant="text"
                    onClick={() => setSection("Inventory")}
                  >
                    <span>
                      <strong>{lowStockItems.length}</strong>
                      LOW-STOCK ITEMS
                    </span>
                    <Icon name="arrow" size={16} />
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => setSection("Payments")}
                  >
                    <span>
                      <strong>
                        {
                          dashboardOrders.filter(
                            (order) => order.paymentStatus === "Pending",
                          ).length
                        }
                      </strong>
                      PENDING PAYMENTS
                    </span>
                    <Icon name="arrow" size={16} />
                  </Button>
                </div>
              </aside>
            </div>
          </>
        ) : section === "Products" ? (
          <AdminTable
            title="Products"
            action={() => setSection("Add Product")}
            productsMode
            catalog={catalog}
            onEditProduct={(product) => {
              setEditingProduct(product)
              setEditImage(product.image)
              setSaved("")
              setSection("Edit Product")
            }}
          />
        ) : section === "Edit Product" && editingProduct ? (
          <form
            className="product-form"
            onSubmit={(event) => {
              event.preventDefault()
              const formData = new FormData(event.currentTarget)
              const sizes = formData.getAll("sizes").map(String)
              const colors = formData.getAll("colors").map(String)
              onUpdateProduct({
                ...editingProduct,
                name: String(formData.get("name")).trim(),
                sku: String(formData.get("sku")).trim(),
                category: String(formData.get("category")),
                price: Number(formData.get("price")),
                stock: Number(formData.get("stock")),
                tag: String(formData.get("tag")).trim() || "Active",
                description: String(formData.get("description")).trim(),
                image: editImage || editingProduct.image,
                sizes: sizes.length ? sizes : editingProduct.sizes,
                colors: colors.length ? colors : editingProduct.colors,
              })
              setSection("Products")
              setEditingProduct(null)
              setEditImage("")
            }}
          >
            <div className="table-head">
              <div>
                <span className="eyebrow">EDITING {editingProduct.sku}</span>
                <h2>Update product</h2>
                <p>
                  Changes are applied immediately across the storefront,
                  inventory, cart, and product detail.
                </p>
              </div>
              <div className="button-row">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditingProduct(null)
                    setEditImage("")
                    setSection("Products")
                  }}
                >
                  CANCEL
                </Button>
                <Button type="submit">SAVE CHANGES</Button>
              </div>
            </div>
            <div className="admin-form-grid">
              <label className="wide">
                Product name
                <input
                  required
                  name="name"
                  defaultValue={editingProduct.name}
                />
              </label>
              <label>
                SKU
                <input
                  required
                  name="sku"
                  defaultValue={
                    editingProduct.sku ?? `FCS-00${editingProduct.id}`
                  }
                />
              </label>
              <label>
                Category
                <select
                  name="category"
                  defaultValue={editingProduct.category}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Price (PHP)
                <input
                  required
                  name="price"
                  type="number"
                  min="1"
                  defaultValue={editingProduct.price}
                />
              </label>
              <label>
                Stock quantity
                <input
                  required
                  name="stock"
                  type="number"
                  min="0"
                  defaultValue={editingProduct.stock ?? 12}
                />
              </label>
              <label className="wide">
                Product tag
                <input name="tag" defaultValue={editingProduct.tag} />
              </label>
              <label className="wide">
                Description
                <textarea
                  required
                  name="description"
                  rows={5}
                  defaultValue={
                    editingProduct.description ??
                    "A considered Francine piece designed for everyday wear."
                  }
                />
              </label>
              <label className="wide upload-field">
                Replace product image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = () => setEditImage(String(reader.result))
                    reader.readAsDataURL(file)
                  }}
                />
              </label>
              <div className="admin-image-preview wide">
                <img
                  src={editImage || editingProduct.image}
                  alt={`${editingProduct.name} preview`}
                />
                <div>
                  <span className="eyebrow">CURRENT STOREFRONT IMAGE</span>
                  <strong>{editingProduct.name}</strong>
                  <small>
                    Choose another image above to replace this photograph.
                  </small>
                </div>
              </div>
              <fieldset className="wide">
                <legend>Available sizes</legend>
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <label key={size}>
                    <input
                      type="checkbox"
                      name="sizes"
                      value={size}
                      defaultChecked={
                        editingProduct.sizes?.includes(size) ??
                        ["XS", "S", "M", "L", "XL"].includes(size)
                      }
                    />{" "}
                    {size}
                  </label>
                ))}
              </fieldset>
              <fieldset className="wide">
                <legend>Available colors</legend>
                {[
                  "Lilac",
                  "Ivory",
                  "Deep Plum",
                  "Beige",
                  "Light Brown",
                ].map((color) => (
                  <label key={color}>
                    <input
                      type="checkbox"
                      name="colors"
                      value={color}
                      defaultChecked={
                        editingProduct.colors?.includes(color) ??
                        color === "Lilac"
                      }
                    />{" "}
                    {color}
                  </label>
                ))}
              </fieldset>
            </div>
          </form>
        ) : section === "Add Product" ? (
          <form
            className="product-form"
            onSubmit={(event) => {
              event.preventDefault()
              if (!productImage) {
                setProductError("Choose a product image before publishing.")
                return
              }
              const form = event.currentTarget
              const formData = new FormData(form)
              const regularPrice = Number(formData.get("price"))
              const salePrice = Number(formData.get("salePrice"))
              const tags = String(formData.get("tags"))
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean)
              onAddProduct({
                name: String(formData.get("name")).trim(),
                sku: String(formData.get("sku")).trim(),
                category: String(formData.get("category")),
                price: salePrice > 0 ? salePrice : regularPrice,
                stock: Number(formData.get("stock")),
                tag: tags[0] || "New",
                description: String(formData.get("description")).trim(),
                image: productImage,
                sizes: formData.getAll("sizes").map(String),
                colors: formData.getAll("colors").map(String),
              })
              setProductError("")
              setSaved(
                "Product published successfully and is now live on the storefront.",
              )
              form.reset()
              setProductImage("")
            }}
          >
            <div className="table-head">
              <div>
                <h2>Add new product</h2>
                <p>Create a product and publish it to the storefront.</p>
              </div>
              <div className="button-row">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSaved(
                      "Draft saved in this form. Publish it when it is ready for the storefront.",
                    )
                    setProductError("")
                  }}
                >
                  SAVE DRAFT
                </Button>
                <Button type="submit">PUBLISH PRODUCT</Button>
              </div>
            </div>
            {productError && (
              <div className="login-error" role="alert">
                {productError}
              </div>
            )}
            {saved && (
              <div className="inline-message success admin-publish-success">
                <span>{saved}</span>
                {saved.startsWith("Product published") && (
                  <Button variant="text" onClick={() => setSection("Products")}>
                    VIEW PRODUCTS <Icon name="arrow" size={15} />
                  </Button>
                )}
              </div>
            )}
            <div className="admin-form-grid">
              <label className="wide">
                Product name
                <input
                  required
                  name="name"
                  placeholder="e.g. Oversized Cotton Tee"
                />
              </label>
              <label>
                SKU
                <input
                  required
                  name="sku"
                  defaultValue={`FCS-2026-${String(catalog.length + 1).padStart(3, "0")}`}
                />
              </label>
              <label>
                Category
                <select name="category">
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Price (PHP)
                <input
                  required
                  name="price"
                  type="number"
                  min="1"
                  placeholder="0.00"
                />
              </label>
              <label>
                Sale price (PHP)
                <input
                  name="salePrice"
                  type="number"
                  min="0"
                  placeholder="Optional"
                />
              </label>
              <label>
                Stock quantity
                <input
                  required
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="0"
                />
              </label>
              <label>
                Low stock threshold
                <input type="number" defaultValue="5" />
              </label>
              <label>
                Tags
                <input name="tags" placeholder="New, Featured" />
              </label>
              <label className="wide">
                Description
                <textarea
                  required
                  name="description"
                  rows={5}
                  placeholder="Product details, material, fit, and care…"
                />
              </label>
              <label className="wide upload-field">
                Product image
                <input
                  required
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (!file) {
                      setProductImage("")
                      return
                    }
                    const reader = new FileReader()
                    reader.onload = () => {
                      setProductImage(String(reader.result))
                      setProductError("")
                    }
                    reader.readAsDataURL(file)
                  }}
                />
              </label>
              <div className="admin-image-preview wide">
                {productImage ? (
                  <>
                    <img src={productImage} alt="Selected product preview" />
                    <div>
                      <span className="eyebrow">IMAGE PREVIEW</span>
                      <strong>Ready for storefront display</strong>
                      <small>
                        This is how the selected product image will appear in
                        the catalog.
                      </small>
                    </div>
                  </>
                ) : (
                  <div className="admin-image-placeholder">
                    <Icon name="plus" size={20} />
                    <span>Your selected product image will preview here.</span>
                  </div>
                )}
              </div>
              <fieldset className="wide">
                <legend>Available sizes</legend>
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <label key={size}>
                    <input
                      type="checkbox"
                      name="sizes"
                      value={size}
                      defaultChecked={size === "S" || size === "M"}
                    />{" "}
                    {size}
                  </label>
                ))}
              </fieldset>
              <fieldset className="wide">
                <legend>Available colors</legend>
                {[
                  "Lilac",
                  "Ivory",
                  "Deep Plum",
                  "Beige",
                  "Light Brown",
                ].map((color) => (
                    <label key={color}>
                      <input
                        type="checkbox"
                        name="colors"
                        value={color}
                        defaultChecked={color === "Lilac"}
                      />{" "}
                      {color}
                    </label>
                  ))}
              </fieldset>
            </div>
          </form>
        ) : (
          <AdminSection
            section={section}
            catalog={catalog}
            categories={categories}
            onAddCategory={onAddCategory}
            onUpdateCategory={onUpdateCategory}
            onDeleteCategory={onDeleteCategory}
            onUpdateProduct={onUpdateProduct}
          />
        )}
      </section>
    </main>
  )
}

const adminData: Record<string, {
  headers: string[]
  rows: string[][]
  action: string
}> = {
  Categories: {
    headers: ["Category", "Slug", "Products", "Status", "Actions"],
    rows: [
      ["Tops", "tops", "42", "Active", "Edit"],
      ["Bottoms", "bottoms", "28", "Active", "Edit"],
      ["Outerwear", "outerwear", "15", "Active", "Edit"],
      ["Accessories", "accessories", "19", "Active", "Edit"],
    ],
    action: "+ ADD CATEGORY",
  },
  Inventory: {
    headers: [
      "SKU",
      "Product",
      "Category",
      "Stock",
      "Reorder Point",
      "Status",
      "Actions",
    ],
    rows: [
      [
        "SKU-TS-001",
        "Classic Cotton Tee",
        "Tops",
        "45 units",
        "10",
        "In Stock",
        "Update",
      ],
      [
        "SKU-DJ-004",
        "Vintage Denim Jacket",
        "Outerwear",
        "3 units",
        "5",
        "Low Stock",
        "Update",
      ],
      [
        "SKU-CP-009",
        "Slim Fit Cargo Pants",
        "Bottoms",
        "0 units",
        "8",
        "Out of Stock",
        "Update",
      ],
    ],
    action: "+ ADD INVENTORY ITEM",
  },
  Orders: {
    headers: [
      "Order ID",
      "Customer",
      "Date & Time",
      "Items",
      "Total",
      "Payment",
      "Status",
      "Action",
    ],
    rows: [
      [
        "#ORD-2026-9901",
        "Juan Dela Cruz",
        "Sept 28 · 10:15 AM",
        "2 Items",
        "₱1,300",
        "GCash · 9001284712",
        "In Queue",
        "View",
      ],
      [
        "#ORD-2026-8812",
        "Maria Santos",
        "Sept 15 · 04:30 PM",
        "2 Items",
        "₱1,850",
        "Visa · ••••4242",
        "Delivered",
        "View",
      ],
    ],
    action: "PRINT ORDER REPORT",
  },
  Customers: {
    headers: [
      "Customer",
      "Contact",
      "Location",
      "Orders",
      "Total Spent",
      "Status",
      "Actions",
    ],
    rows: [
      [
        "Juan Dela Cruz",
        "juan@example.com · +63 917 123 4567",
        "Rosales, Pangasinan",
        "5",
        "₱6,850",
        "Active",
        "View History",
      ],
      [
        "Maria Santos",
        "maria@example.com · +63 918 987 6543",
        "Urdaneta, Pangasinan",
        "2",
        "₱3,400",
        "Active",
        "View History",
      ],
    ],
    action: "EXPORT CUSTOMERS",
  },
  Payments: {
    headers: [
      "Transaction",
      "Order",
      "Customer",
      "Gateway",
      "Reference",
      "Amount",
      "Status",
      "Action",
    ],
    rows: [
      [
        "TXN-900821",
        "#ORD-2026-9901",
        "Juan Dela Cruz",
        "GCash",
        "9001284712",
        "₱1,300",
        "Verified",
        "View",
      ],
      [
        "TXN-900822",
        "#ORD-2026-9902",
        "Ana Reyes",
        "GCash",
        "9001284999",
        "₱850",
        "Pending Verification",
        "Approve",
      ],
    ],
    action: "EXPORT TRANSACTIONS",
  },
  Reviews: {
    headers: [
      "Product",
      "Customer",
      "Rating",
      "Comment",
      "Visibility",
      "Status",
      "Actions",
    ],
    rows: [
      [
        "Classic Cotton Tee",
        "Juan D.",
        "★★★★★",
        "Great quality fabric!",
        "Public",
        "Approved",
        "Reply",
      ],
      [
        "Denim Jacket",
        "Anonymous",
        "★★★★☆",
        "Fits well, fast shipping.",
        "Anonymous",
        "Pending",
        "Approve",
      ],
    ],
    action: "MODERATION SETTINGS",
  },
}

type AdminPaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded"

const initialAdminPayments = [
  {
    id: "TXN-900821",
    order: "#ORD-2026-9901",
    customer: "Juan Dela Cruz",
    method: "GCash",
    reference: "9001284712",
    amount: 2980,
    status: "Paid" as AdminPaymentStatus,
    date: "Sept 28, 2026",
  },
  {
    id: "TXN-900822",
    order: "#ORD-2026-9902",
    customer: "Ana Reyes",
    method: "Bank Transfer",
    reference: "BT-1284999",
    amount: 850,
    status: "Pending" as AdminPaymentStatus,
    date: "Sept 28, 2026",
  },
  {
    id: "TXN-900734",
    order: "#ORD-2026-8734",
    customer: "Mika Santos",
    method: "GCash",
    reference: "9001274421",
    amount: 3250,
    status: "Failed" as AdminPaymentStatus,
    date: "Sept 12, 2026",
  },
  {
    id: "TXN-900651",
    order: "#ORD-2026-8651",
    customer: "Jamie Cruz",
    method: "Bank Transfer",
    reference: "BT-1283104",
    amount: 1850,
    status: "Refunded" as AdminPaymentStatus,
    date: "Sept 09, 2026",
  },
]

const initialAdminCustomers = [
  {
    id: "CUS-001",
    name: "Juan Dela Cruz",
    email: "juan@example.com",
    phone: "+63 917 123 4567",
    location: "Rosales, Pangasinan",
    orders: 5,
    totalSpent: 6850,
    lastOrder: "Sept 28, 2026",
    status: "Active",
  },
  {
    id: "CUS-002",
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "+63 918 987 6543",
    location: "Urdaneta, Pangasinan",
    orders: 2,
    totalSpent: 3400,
    lastOrder: "Sept 15, 2026",
    status: "Active",
  },
  {
    id: "CUS-003",
    name: "Ana Reyes",
    email: "ana@example.com",
    phone: "+63 919 415 2088",
    location: "Villasis, Pangasinan",
    orders: 1,
    totalSpent: 850,
    lastOrder: "Sept 12, 2026",
    status: "Active",
  },
  {
    id: "CUS-004",
    name: "Jamie Cruz",
    email: "jamie@example.com",
    phone: "+63 920 715 3301",
    location: "San Manuel, Tarlac",
    orders: 3,
    totalSpent: 5270,
    lastOrder: "Sept 09, 2026",
    status: "Restricted",
  },
]

const adminPackingSlips = [
  {
    id: "ORD-2026-9901",
    customer: "Juan Dela Cruz",
    address: "Salvacion, Rosales, Pangasinan 2441",
    phone: "+63 917 123 4567",
    date: "Sept 28, 2026 · 10:15 AM",
    payment: "GCash · Paid",
    items: [
      { name: "Camille Poplin Shirt", quantity: 1, amount: 1590 },
      { name: "Everyday Cotton Shirt", quantity: 1, amount: 1390 },
    ],
    total: 2980,
  },
  {
    id: "ORD-2026-8812",
    customer: "Maria Santos",
    address: "San Vicente, Urdaneta, Pangasinan 2428",
    phone: "+63 918 987 6543",
    date: "Sept 15, 2026 · 04:30 PM",
    payment: "Bank Transfer · Paid",
    items: [
      { name: "Comfy Brown", quantity: 1, amount: 350 },
      { name: "Clara Evening Dress", quantity: 1, amount: 2690 },
    ],
    total: 3040,
  },
]

function AdminSection({
  section,
  catalog = products,
  categories = initialCategories,
  onAddCategory = () => undefined,
  onUpdateCategory = () => undefined,
  onDeleteCategory = () => undefined,
  onUpdateProduct = () => undefined,
}: {
  section: string
  catalog?: ProductItem[]
  categories?: StoreCategory[]
  onAddCategory?: (category: Omit<StoreCategory, "id">) => void
  onUpdateCategory?: (category: StoreCategory) => void
  onDeleteCategory?: (categoryId: number) => void
  onUpdateProduct?: (product: ProductItem) => void
}) {
  const [notice, setNotice] = useState("")
  const [query, setQuery] = useState("")
  const [detail, setDetail] = useState<string[] | null>(null)
  const [categoryImage, setCategoryImage] = useState("")
  const [categoryError, setCategoryError] = useState("")
  const [categoryFormOpen, setCategoryFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] =
    useState<StoreCategory | null>(null)
  const [payments, setPayments] = useState(initialAdminPayments)
  const [customers, setCustomers] = useState(initialAdminCustomers)
  const [inventoryFormOpen, setInventoryFormOpen] = useState(false)
  const [inventoryNotice, setInventoryNotice] = useState("")
  const [printOrder, setPrintOrder] = useState<
    (typeof adminPackingSlips)[number] | null
  >(null)
  const categoryCounts = catalog.reduce<Record<string, number>>(
    (counts, product) => ({
      ...counts,
      [product.category]: (counts[product.category] ?? 0) + 1,
    }),
    {},
  )
  if (section === "Inventory") {
    const outOfStock = catalog.filter((product) => (product.stock ?? 12) === 0)
    const lowStock = catalog.filter((product) => {
      const stock = product.stock ?? 12
      return stock > 0 && stock <= 5
    })
    const totalUnits = catalog.reduce(
      (total, product) => total + (product.stock ?? 12),
      0,
    )
    const filteredInventory = catalog.filter((product) =>
      `${product.name} ${product.sku ?? ""} ${product.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    return (
      <div className="admin-management-page">
        <div className="management-summary-grid inventory-summary">
          <div>
            <span>TOTAL UNITS</span>
            <strong>{totalUnits}</strong>
            <small>Across all products</small>
          </div>
          <div>
            <span>IN STOCK</span>
            <strong>
              {
                catalog.filter((product) => (product.stock ?? 12) > 5)
                  .length
              }
            </strong>
            <small>Healthy inventory</small>
          </div>
          <div>
            <span>LOW STOCK</span>
            <strong>{lowStock.length}</strong>
            <small>Five units or fewer</small>
          </div>
          <div>
            <span>OUT OF STOCK</span>
            <strong>{outOfStock.length}</strong>
            <small>Needs replenishment</small>
          </div>
        </div>
        <div className="admin-table-card">
          <div className="table-head">
            <div>
              <h2>Inventory monitoring</h2>
              <p>
                Stock status updates automatically from each product quantity.
              </p>
            </div>
            <Button
              onClick={() => {
                setInventoryFormOpen((open) => !open)
                setInventoryNotice("")
              }}
            >
              {inventoryFormOpen ? "CLOSE FORM" : "+ ADD INVENTORY"}
            </Button>
          </div>
          {inventoryFormOpen && (
            <form
              className="inventory-intake-form"
              onSubmit={(event) => {
                event.preventDefault()
                const form = event.currentTarget
                const formData = new FormData(form)
                const productId = Number(formData.get("productId"))
                const quantity = Number(formData.get("quantity"))
                const product = catalog.find(
                  (catalogProduct) => catalogProduct.id === productId,
                )
                if (!product || quantity < 1) return
                onUpdateProduct({
                  ...product,
                  stock: (product.stock ?? 12) + quantity,
                })
                setInventoryNotice(
                  `${quantity} units were added to ${product.name}.`,
                )
                form.reset()
                setInventoryFormOpen(false)
              }}
            >
              <label>
                Product
                <select name="productId" required>
                  {catalog.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} · Current {product.stock ?? 12}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Quantity received
                <input
                  required
                  name="quantity"
                  type="number"
                  min="1"
                  placeholder="0"
                />
              </label>
              <Button type="submit">
                ADD TO INVENTORY <Icon name="plus" size={16} />
              </Button>
            </form>
          )}
          {inventoryNotice && (
            <div className="inline-message success">{inventoryNotice}</div>
          )}
          {(outOfStock.length > 0 || lowStock.length > 0) && (
            <div className="inventory-alert">
              <strong>Inventory attention:</strong>
              <span>
                {outOfStock.length} out of stock · {lowStock.length} low stock
              </span>
            </div>
          )}
          <div className="admin-controls">
            <div className="search-field">
              <Icon name="search" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search inventory"
              />
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Available stock</th>
                  <th>Automatic status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((product) => {
                  const stock = product.stock ?? 12
                  const status =
                    stock === 0
                      ? "Out of Stock"
                      : stock <= 5
                        ? "Low Stock"
                        : "In Stock"
                  return (
                    <tr key={product.id}>
                      <td>{product.sku ?? `FCS-00${product.id}`}</td>
                      <td>
                        <div className="table-product">
                          <img src={product.image} alt="" />
                          <strong>{product.name}</strong>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>{stock} units</td>
                      <td>
                        <span
                          className={`inventory-status ${status
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  if (section === "Payments") {
    const filteredPayments = payments.filter((payment) =>
      Object.values(payment)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    const paidTotal = payments
      .filter((payment) => payment.status === "Paid")
      .reduce((total, payment) => total + payment.amount, 0)
    const refundedTotal = payments
      .filter((payment) => payment.status === "Refunded")
      .reduce((total, payment) => total + payment.amount, 0)
    const updatePaymentStatus = (
      paymentId: string,
      status: AdminPaymentStatus,
    ) =>
      setPayments((currentPayments) =>
        currentPayments.map((payment) =>
          payment.id === paymentId ? { ...payment, status } : payment,
        ),
      )
    return (
      <div className="admin-management-page">
        <div className="management-summary-grid">
          <div>
            <span>PAID REVENUE</span>
            <strong>₱{paidTotal.toLocaleString()}</strong>
            <small>Successfully collected</small>
          </div>
          <div>
            <span>PENDING</span>
            <strong>
              {payments.filter((payment) => payment.status === "Pending").length}
            </strong>
            <small>Requires verification</small>
          </div>
          <div>
            <span>FAILED</span>
            <strong>
              {payments.filter((payment) => payment.status === "Failed").length}
            </strong>
            <small>Payment unsuccessful</small>
          </div>
          <div>
            <span>REFUNDED</span>
            <strong>₱{refundedTotal.toLocaleString()}</strong>
            <small>Returned to customers</small>
          </div>
        </div>
        <div className="admin-table-card">
          <div className="table-head">
            <div>
              <h2>Payment transactions</h2>
              <p>Verify payments, monitor failures, and process refunds.</p>
            </div>
          </div>
          <div className="admin-controls">
            <div className="search-field">
              <Icon name="search" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search transactions"
              />
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Method / Reference</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      <strong>{payment.id}</strong>
                      <small className="admin-table-date">{payment.date}</small>
                    </td>
                    <td>{payment.order}</td>
                    <td>{payment.customer}</td>
                    <td>
                      {payment.method}
                      <small className="admin-table-date">
                        {payment.reference}
                      </small>
                    </td>
                    <td>₱{payment.amount.toLocaleString()}</td>
                    <td>
                      <span
                        className={`payment-status ${payment.status.toLowerCase()}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      <div className="payment-actions">
                        {payment.status === "Paid" && (
                          <Button
                            variant="secondary"
                            className="payment-action-button refund-payment"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Refund ₱${payment.amount.toLocaleString()} for ${payment.order}?`,
                                )
                              )
                                updatePaymentStatus(payment.id, "Refunded")
                            }}
                          >
                            REFUND
                          </Button>
                        )}
                        {payment.status === "Pending" && (
                          <>
                            <Button
                              variant="secondary"
                              className="payment-action-button approve-payment"
                              onClick={() =>
                                updatePaymentStatus(payment.id, "Paid")
                              }
                            >
                              MARK PAID
                            </Button>
                            <Button
                              variant="secondary"
                              className="payment-action-button payment-fail-action"
                              onClick={() =>
                                updatePaymentStatus(payment.id, "Failed")
                              }
                            >
                              FAIL
                            </Button>
                          </>
                        )}
                        {payment.status === "Failed" && (
                          <Button
                            variant="secondary"
                            className="payment-action-button retry-payment"
                            onClick={() =>
                              updatePaymentStatus(payment.id, "Pending")
                            }
                          >
                            RETRY REVIEW
                          </Button>
                        )}
                        {payment.status === "Refunded" && (
                          <small>Refund completed</small>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  if (section === "Customers") {
    const filteredCustomers = customers.filter((customer) =>
      Object.values(customer)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    const customerRevenue = customers.reduce(
      (total, customer) => total + customer.totalSpent,
      0,
    )
    return (
      <div className="admin-management-page">
        <div className="management-summary-grid customer-summary">
          <div>
            <span>TOTAL CUSTOMERS</span>
            <strong>{customers.length}</strong>
            <small>Registered accounts</small>
          </div>
          <div>
            <span>ACTIVE</span>
            <strong>
              {customers.filter((customer) => customer.status === "Active").length}
            </strong>
            <small>Can place orders</small>
          </div>
          <div>
            <span>REPEAT CUSTOMERS</span>
            <strong>
              {customers.filter((customer) => customer.orders > 1).length}
            </strong>
            <small>More than one order</small>
          </div>
          <div>
            <span>CUSTOMER REVENUE</span>
            <strong>₱{customerRevenue.toLocaleString()}</strong>
            <small>Lifetime recorded value</small>
          </div>
        </div>
        <div className="admin-table-card">
          <div className="table-head">
            <div>
              <h2>Customer management</h2>
              <p>Monitor activity, lifetime value, and account access.</p>
            </div>
          </div>
          <div className="admin-controls">
            <div className="search-field">
              <Icon name="search" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search customers"
              />
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Orders</th>
                  <th>Total spent</th>
                  <th>Last order</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <strong>{customer.name}</strong>
                      <small className="admin-table-date">{customer.id}</small>
                    </td>
                    <td>
                      {customer.email}
                      <small className="admin-table-date">
                        {customer.phone}
                      </small>
                    </td>
                    <td>{customer.location}</td>
                    <td>{customer.orders}</td>
                    <td>₱{customer.totalSpent.toLocaleString()}</td>
                    <td>{customer.lastOrder}</td>
                    <td>
                      <span
                        className={`customer-status ${customer.status.toLowerCase()}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  if (section === "Orders") {
    const filteredOrders = adminPackingSlips.filter((order) =>
      `${order.id} ${order.customer} ${order.address} ${order.items
        .map((item) => item.name)
        .join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    return (
      <div className="admin-table-card orders-print-page">
        <div className="table-head">
          <div>
            <h2>Customer order slips</h2>
            <p>Print complete packing and customer delivery information.</p>
          </div>
        </div>
        <div className="admin-controls">
          <div className="search-field">
            <Icon name="search" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search orders"
            />
          </div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Items</th>
                <th>Total payment</th>
                <th>Date & time</th>
                <th>Print</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>#{order.id}</strong>
                  </td>
                  <td>
                    {order.customer}
                    <small className="admin-table-date">{order.phone}</small>
                  </td>
                  <td>{order.address}</td>
                  <td>
                    {order.items.map((item) => (
                      <small className="order-item-line" key={item.name}>
                        {item.name} · Qty {item.quantity} · ₱
                        {item.amount.toLocaleString()}
                      </small>
                    ))}
                  </td>
                  <td>₱{order.total.toLocaleString()}</td>
                  <td>{order.date}</td>
                  <td>
                    <Button
                      variant="secondary"
                      className="print-slip-button"
                      onClick={() => {
                        setPrintOrder(order)
                        window.setTimeout(() => window.print(), 0)
                      }}
                    >
                      PRINT SLIP
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {printOrder && (
          <section className="packing-slip" aria-label="Customer packing slip">
            <div className="packing-slip-head">
              <Logo onClick={() => undefined} />
              <div>
                <span>ORDER NUMBER</span>
                <strong>#{printOrder.id}</strong>
              </div>
            </div>
            <div className="packing-slip-meta">
              <div>
                <span>CUSTOMER</span>
                <strong>{printOrder.customer}</strong>
                <p>{printOrder.phone}</p>
              </div>
              <div>
                <span>DELIVERY ADDRESS</span>
                <strong>{printOrder.address}</strong>
              </div>
              <div>
                <span>DATE & TIME</span>
                <strong>{printOrder.date}</strong>
              </div>
              <div>
                <span>PAYMENT</span>
                <strong>{printOrder.payment}</strong>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Line total</th>
                </tr>
              </thead>
              <tbody>
                {printOrder.items.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₱{item.amount.toLocaleString()}</td>
                    <td>
                      ₱{(item.amount * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="packing-slip-total">
              <span>TOTAL PAYMENT</span>
              <strong>₱{printOrder.total.toLocaleString()}</strong>
            </div>
            <p className="packing-slip-note">
              Francine Clothing Store · Salvacion, Rosales, Pangasinan
            </p>
          </section>
        )}
      </div>
    )
  }
  if (section === "Categories") {
    const filteredCategories = categories.filter((category) =>
      `${category.name} ${category.slug} ${category.description}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    return (
      <>
        <div className="admin-table-card admin-category-page">
          <div className="table-head">
            <div>
              <h2>Category management</h2>
              <p>
                Organize storefront browsing and assign products to collections.
              </p>
            </div>
            {!categoryFormOpen && (
              <Button
                onClick={() => {
                  setEditingCategory(null)
                  setCategoryImage("")
                  setCategoryError("")
                  setCategoryFormOpen(true)
                }}
              >
                + ADD CATEGORY
              </Button>
            )}
          </div>
          {categoryFormOpen && (
          <form
            key={editingCategory?.id ?? "new-category"}
            className="inline-category-form"
            onSubmit={(event) => {
              event.preventDefault()
              if (!categoryImage) {
                setCategoryError(
                  "Choose a category image before creating the category.",
                )
                return
              }
              const form = event.currentTarget
              const formData = new FormData(form)
              const name = String(formData.get("name")).trim()
              const categoryDetails = {
                name,
                slug: String(formData.get("slug"))
                  .trim()
                  .toLowerCase()
                  .replace(/\s+/g, "-"),
                description:
                  editingCategory?.description ??
                  `Explore the latest ${name.toLowerCase()} from Francine Clothing Store.`,
                image: categoryImage,
              }
              if (editingCategory) {
                onUpdateCategory({
                  ...categoryDetails,
                  id: editingCategory.id,
                })
              } else {
                onAddCategory(categoryDetails)
              }
              setNotice(
                editingCategory
                  ? `${name} was updated across the storefront.`
                  : `${name} was created and added to storefront category navigation.`,
              )
              setCategoryImage("")
              setCategoryError("")
              setEditingCategory(null)
              setCategoryFormOpen(false)
              form.reset()
            }}
          >
            <div className="inline-category-form-head">
              <div>
                <span className="eyebrow">CREATE A CATEGORY</span>
                <h3>
                  {editingCategory ? "Edit category" : "Category information"}
                </h3>
              </div>
              <p>
                New categories are added to storefront browsing and product
                forms automatically.
              </p>
            </div>
            {categoryError && (
              <div className="login-error" role="alert">
                {categoryError}
              </div>
            )}
            <div className="inline-category-fields">
              <label>
                Category name
                <input
                  required
                  name="name"
                  placeholder="e.g. Evening Wear"
                  defaultValue={editingCategory?.name}
                />
              </label>
              <label>
                URL slug
                <input
                  required
                  name="slug"
                  placeholder="e.g. evening-wear"
                  defaultValue={editingCategory?.slug}
                />
              </label>
              <label className="upload-field">
                Category cover image
                <input
                  required={!editingCategory}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (!file) {
                      setCategoryImage("")
                      return
                    }
                    const reader = new FileReader()
                    reader.onload = () => {
                      setCategoryImage(String(reader.result))
                      setCategoryError("")
                    }
                    reader.readAsDataURL(file)
                  }}
                />
              </label>
              <div className="category-image-preview">
                {categoryImage ? (
                  <img src={categoryImage} alt="Category cover preview" />
                ) : (
                  <>
                    <Icon name="plus" />
                    <span>Category cover preview</span>
                  </>
                )}
              </div>
            </div>
            <div className="inline-category-actions">
              <Button
                variant="secondary"
                onClick={() => {
                  setCategoryImage("")
                  setCategoryError("")
                  setEditingCategory(null)
                  setCategoryFormOpen(false)
                }}
              >
                CLOSE
              </Button>
              <Button type="submit">
                {editingCategory ? "SAVE CHANGES" : "CREATE CATEGORY"}{" "}
                <Icon name="arrow" size={16} />
              </Button>
            </div>
          </form>
          )}
          {notice && <div className="inline-message success">{notice}</div>}
          <div className="admin-controls">
            <div className="search-field">
              <Icon name="search" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search categories"
              />
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Slug</th>
                  <th>Products</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <div className="table-product">
                        <img src={category.image} alt="" />
                        <strong>{category.name}</strong>
                      </div>
                    </td>
                    <td>{category.slug}</td>
                    <td>
                      {categoryCounts[category.name] ??
                        categoryCounts[
                          Object.keys(categoryCounts).find(
                            (name) =>
                              name.toLowerCase() ===
                              category.name.toLowerCase(),
                          ) ?? ""
                        ] ??
                        0}
                    </td>
                    <td>
                      <span className="table-status">Active</span>
                    </td>
                    <td>
                      <div className="category-row-actions">
                        <Button
                          variant="icon"
                          className="category-edit-action"
                          onClick={() => {
                            setEditingCategory(category)
                            setCategoryImage(category.image)
                            setCategoryError("")
                            setNotice("")
                            setCategoryFormOpen(true)
                          }}
                        >
                          <Icon name="edit" size={16} />
                          <span className="sr-only">
                            Edit {category.name}
                          </span>
                        </Button>
                        <Button
                          variant="icon"
                          className="category-delete-action"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Delete ${category.name}? This removes it from storefront navigation.`,
                              )
                            ) {
                              onDeleteCategory(category.id)
                              if (editingCategory?.id === category.id) {
                                setEditingCategory(null)
                                setCategoryImage("")
                              }
                              setNotice(
                                `${category.name} was removed from category navigation.`,
                              )
                            }
                          }}
                        >
                          <Icon name="trash" size={16} />
                          <span className="sr-only">
                            Delete {category.name}
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
  const data =
    section === "Inventory"
        ? {
            ...adminData.Inventory,
            rows: catalog.map((product) => {
              const stock = product.stock ?? 12
              return [
                product.sku ?? `FCS-00${product.id}`,
                product.name,
                product.category,
                `${stock} units`,
                "5",
                stock === 0
                  ? "Out of Stock"
                  : stock <= 5
                    ? "Low Stock"
                    : "In Stock",
                "Update",
              ]
            }),
          }
        : adminData[section]
  if (data) {
    const rows = data.rows.filter((row) =>
      row.join(" ").toLowerCase().includes(query.toLowerCase()),
    )
    return (
      <div className="admin-table-card">
        <div className="table-head">
          <div>
            <h2>{section} management</h2>
            <p>Search, review, and update live store records.</p>
          </div>
          <Button
            onClick={() =>
              setNotice(`${data.action.replace("+ ", "")} workflow opened.`)
            }
          >
            {data.action}
          </Button>
        </div>
        {notice && <div className="inline-message success">{notice}</div>}
        <div className="admin-controls">
          <div className="search-field">
            <Icon name="search" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${section.toLowerCase()}`}
            />
          </div>
          <select>
            <option>All statuses</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Low Stock</option>
          </select>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {data.headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${index}`}>
                      {index === row.length - 2 ? (
                        <span className="table-status">{cell}</span>
                      ) : index === row.length - 1 ? (
                        <Button
                          variant="text"
                          onClick={() => {
                            setDetail(row)
                            setNotice(`${cell} action ready for ${row[0]}.`)
                          }}
                        >
                          {cell}
                        </Button>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {detail && (
          <div className="record-drawer">
            <div>
              <span className="eyebrow">RECORD DETAILS</span>
              <h3>{detail[0]}</h3>
              <p>
                {section === "Orders"
                  ? "Juan Dela Cruz · Salvacion, Rosales, Pangasinan · 2 items ready for fulfillment."
                  : `Review and update this ${section.toLowerCase()} record.`}
              </p>
            </div>
            {section === "Orders" && (
              <>
                <label>
                  Fulfillment status
                  <select defaultValue="In Queue">
                    <option>In Queue</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </label>
                <Button onClick={() => window.print()}>
                  PRINT PACKING SLIP
                </Button>
              </>
            )}
            <Button variant="secondary" onClick={() => setDetail(null)}>
              CLOSE
            </Button>
          </div>
        )}
      </div>
    )
  }
  if (section === "Store Content")
    return (
      <AdminSettingsForm
        title="Store content"
        description="Edit customer-facing messaging without changing code."
        fields={[
          ["Hero headline", "Style that feels like you."],
          ["Hero supporting text", "Carefully selected fashion for every day."],
          ["Announcement bar", "Free store pickup at Rosales branch!"],
          ["Service highlight", "Nationwide delivery with live tracking"],
        ]}
      />
    )
  if (section === "Settings")
    return (
      <AdminSettingsForm
        title="System settings"
        description="Configure your profile, shipping, payments, and access."
        fields={[
          ["Store owner", "Francine Calaunan-Robles"],
          ["Business name", "FRANCINE CLOTHING STORE"],
          ["Store address", "Salvacion, Rosales, Pangasinan"],
          ["Business email", "hello@francine.store"],
          ["Local shipping rate", "₱100"],
          ["Provincial shipping rate", "₱150"],
          ["Free shipping threshold", "₱3,500"],
          ["GCash merchant ID", "FCS-ROSALES-2026"],
          ["Bank account number", "0012 3456 7890"],
        ]}
      />
    )
  return (
    <div className="admin-placeholder">
      <BrandMark className="state-logo" decorative />
      <h2>{section}</h2>
      <p>This management workspace is ready.</p>
    </div>
  )
}

function AdminSettingsForm({
  title,
  description,
  fields,
}: {
  title: string
  description: string
  fields: string[][]
}) {
  const [saved, setSaved] = useState(false)
  const storageKey = `francine-admin-settings-${title
    .toLowerCase()
    .replace(/\s+/g, "-")}`
  const [storedSettings] = useState<Record<string, string>>(() => {
    try {
      const savedSettings = window.localStorage.getItem(storageKey)
      return savedSettings ? JSON.parse(savedSettings) : {}
    } catch {
      return {}
    }
  })
  return (
    <form
      className="product-form"
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const nextSettings = Object.fromEntries(
          fields.map(([label], index) => [
            label,
            String(formData.get(`setting-${index}`) ?? ""),
          ]),
        )
        window.localStorage.setItem(storageKey, JSON.stringify(nextSettings))
        setSaved(true)
      }}
    >
      <div className="table-head">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <Button type="submit">SAVE CHANGES</Button>
      </div>
      {saved && (
        <div className="inline-message success">
          Changes saved successfully.
        </div>
      )}
      <div className="admin-form-grid">
        {fields.map(([label, value], index) => (
          <label key={label}>
            {label}
            <input
              name={`setting-${index}`}
              defaultValue={storedSettings[label] ?? value}
            />
          </label>
        ))}
        <label className="wide upload-field">
          Upload image or QR code
          <input type="file" accept="image/*" />
        </label>
      </div>
    </form>
  )
}

function AdminTable({
  title,
  action,
  productsMode = false,
  catalog = products,
  onEditProduct,
}: {
  title: string
  action: () => void
  productsMode?: boolean
  catalog?: ProductItem[]
  onEditProduct?: (product: ProductItem) => void
}) {
  return (
    <div className="admin-table-card">
      <div className="table-head">
        <div>
          <h2>{title}</h2>
          <p>
            {productsMode
              ? "Manage catalog, pricing, and visibility"
              : "A clear view of your latest customer orders"}
          </p>
        </div>
        <Button onClick={action}>
          {productsMode ? "+ ADD PRODUCT" : "VIEW ALL ORDERS"}
        </Button>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {(productsMode
                ? [
                    "Product",
                    "SKU",
                    "Category",
                    "Price",
                    "Stock",
                    "Status",
                    "Actions",
                  ]
                : ["Order", "Customer", "Date", "Total", "Payment", "Status"]
              ).map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(productsMode ? catalog : catalog.slice(0, 3)).map(
              (product, index) => (
                <tr key={product.id}>
                  <td>
                    <div className="table-product">
                      <img src={product.image} alt="" />
                      <strong>
                        {productsMode ? product.name : `#FC-1048${index + 2}`}
                      </strong>
                    </div>
                  </td>
                  <td>
                    {productsMode
                      ? product.sku ?? `FCS-00${product.id}`
                      : ["Alex Reyes", "Mika Santos", "Jamie Cruz"][index]}
                  </td>
                  <td>
                    {productsMode
                      ? product.category
                      : `Mar ${18 - index}, 2026`}
                  </td>
                  <td>₱{product.price.toLocaleString()}</td>
                  <td>
                    {productsMode ? (product.stock ?? 12 - index * 3) : "GCash"}
                  </td>
                  <td>
                    <span className="table-status">
                      {productsMode
                        ? "Active"
                        : index === 0
                          ? "Shipped"
                          : "Processing"}
                    </span>
                  </td>
                  {productsMode && (
                    <td>
                      <Button
                        variant="text"
                        className="admin-edit-product"
                        onClick={() => onEditProduct?.(product)}
                      >
                        EDIT <Icon name="arrow" size={14} />
                      </Button>
                    </td>
                  )}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Footer({
  navigate,
  userRole,
}: {
  navigate: (page: Page) => void
  userRole: UserRole
}) {
  return (
    <footer>
      <div className="shell footer-grid">
        <div>
          <Logo onClick={() => navigate("home")} />
          <p>Thoughtful fashion for your everyday life.</p>
        </div>
        <div>
          <strong>SHOP</strong>
          <Button variant="text" onClick={() => navigate("new-arrivals")}>
            New arrivals
          </Button>
          <Button variant="text" onClick={() => navigate("categories")}>
            Categories
          </Button>
          <Button variant="text" onClick={() => navigate("shop")}>
            Shop all
          </Button>
          <Button variant="text" onClick={() => navigate("sale")}>
            Sale
          </Button>
        </div>
        <div>
          <strong>HELP</strong>
          <Button variant="text" onClick={() => navigate("contact")}>
            Shipping & returns
          </Button>
          <Button variant="text" onClick={() => navigate("contact")}>
            Size guide
          </Button>
          <Button variant="text" onClick={() => navigate("contact")}>
            Contact us
          </Button>
          <Button variant="text" onClick={() => navigate("account")}>
            Track order
          </Button>
        </div>
        <div>
          <strong>VISIT US</strong>
          <p>
            Salvacion, Rosales, Pangasinan
            <br />
            Mon–Sat · 10am–7pm
            <br />
            hello@francine.store
          </p>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© 2026 FRANCINE CLOTHING STORE</span>
        <span>INSTAGRAM · FACEBOOK · TIKTOK</span>
        {userRole === "admin" && (
          <Button variant="text" onClick={() => navigate("admin")}>
            RETURN TO ADMIN DASHBOARD
          </Button>
        )}
      </div>
    </footer>
  )
}

export default function App() {
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>(
    () => {
      try {
        const savedProfile = window.localStorage.getItem(
          "francine-customer-profile",
        )
        return savedProfile
          ? { ...defaultCustomerProfile, ...JSON.parse(savedProfile) }
          : defaultCustomerProfile
      } catch {
        return defaultCustomerProfile
      }
    },
  )
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    const storedRole = window.sessionStorage.getItem("francine-user-role")
    return storedRole === "admin" || storedRole === "customer"
      ? storedRole
      : null
  })
  const [page, setPage] = useState<Page>(
    userRole === "admin" ? "admin" : userRole ? "home" : "login",
  )
  const [catalogProducts, setCatalogProducts] =
    useState<ProductItem[]>(products)
  const [storeCategories, setStoreCategories] =
    useState<StoreCategory[]>(initialCategories)
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [currentOrder, setCurrentOrder] = useState<OrderRecord | null>(null)
  const [reviewsByProduct, setReviewsByProduct] =
    useState<Record<number, ProductReview[]>>(createInitialReviews)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const activeCustomerProfile = customerProfile ?? defaultCustomerProfile
  const navigate = (next: Page) => {
    if (!userRole) {
      setPage("login")
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    if (next === "admin" && userRole !== "admin") return
    if (
      userRole === "admin" &&
      (next === "account" || next === "orders")
    ) {
      setPage("admin")
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    setPage(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const login = (role: UserRole) => {
    if (role === "admin") {
      setCartItems([])
    }
    setUserRole(role)
    window.sessionStorage.setItem("francine-user-role", role)
    setPage(role === "admin" ? "admin" : "home")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const logout = () => {
    setUserRole(null)
    window.sessionStorage.removeItem("francine-user-role")
    setPage("login")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const updateCustomerProfile = (profile: CustomerProfile) => {
    const previousReviewName = `${activeCustomerProfile.firstName} ${activeCustomerProfile.lastName.charAt(0)}.`
    const nextReviewName = `${profile.firstName} ${profile.lastName.charAt(0)}.`
    if (previousReviewName !== nextReviewName) {
      setReviewsByProduct((currentReviews) =>
        Object.fromEntries(
          Object.entries(currentReviews).map(([productId, reviews]) => [
            productId,
            reviews.map((review) =>
              review.customer === previousReviewName
                ? { ...review, customer: nextReviewName }
                : review,
            ),
          ]),
        ),
      )
    }
    setCustomerProfile(profile)
    window.localStorage.setItem(
      "francine-customer-profile",
      JSON.stringify(profile),
    )
  }
  const addToCart: AddToCart = (
    product,
    quantity = 1,
    size = product.sizes?.includes("M")
      ? "M"
      : product.sizes?.[0] ?? "M",
    color = product.colors?.[0] ?? "Lilac",
  ) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color,
      )
      if (!existingItem)
        return [...currentItems, { product, quantity, size, color }]
      return currentItems.map((item) =>
        item === existingItem
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
    })
  }
  const updateCartQuantity = (target: CartItem, quantity: number) => {
    if (quantity === 0) {
      setCartItems((items) => items.filter((item) => item !== target))
      return
    }
    setCartItems((items) =>
      items.map((item) => (item === target ? { ...item, quantity } : item)),
    )
  }
  const removeCartItem = (target: CartItem) =>
    setCartItems((items) => items.filter((item) => item !== target))
  const addReview = (review: Omit<ProductReview, "id" | "date">) => {
    const newReview: ProductReview = {
      ...review,
      id: `${review.productId}-${Date.now()}`,
      date: "Just now",
    }
    setReviewsByProduct((currentReviews) => ({
      ...currentReviews,
      [review.productId]: [
        newReview,
        ...(currentReviews[review.productId] ?? []),
      ],
    }))
  }
  const addCatalogProduct = (product: Omit<ProductItem, "id">) => {
    const nextId =
      Math.max(0, ...catalogProducts.map((catalogProduct) => catalogProduct.id)) +
      1
    const newProduct = { ...product, id: nextId }
    setCatalogProducts((currentCatalog) => [newProduct, ...currentCatalog])
    setReviewsByProduct((currentReviews) => ({
      ...currentReviews,
      [nextId]: [],
    }))
  }
  const updateCatalogProduct = (updatedProduct: ProductItem) => {
    setCatalogProducts((currentCatalog) =>
      currentCatalog.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    )
    setSelectedProduct((currentProduct) =>
      currentProduct.id === updatedProduct.id
        ? updatedProduct
        : currentProduct,
    )
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === updatedProduct.id
          ? { ...item, product: updatedProduct }
          : item,
      ),
    )
  }
  const addStoreCategory = (category: Omit<StoreCategory, "id">) => {
    const nextId =
      Math.max(
        0,
        ...storeCategories.map((storeCategory) => storeCategory.id),
      ) + 1
    setStoreCategories((currentCategories) => [
      ...currentCategories,
      { ...category, id: nextId },
    ])
  }
  const updateStoreCategory = (updatedCategory: StoreCategory) => {
    setStoreCategories((currentCategories) =>
      currentCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category,
      ),
    )
  }
  const deleteStoreCategory = (categoryId: number) => {
    setStoreCategories((currentCategories) =>
      currentCategories.filter((category) => category.id !== categoryId),
    )
  }
  const viewAdminStorefront = () => {
    setCartItems([])
    setPage("home")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const openProduct = (product: ProductItem) => {
    setSelectedProduct(product)
    navigate("product")
  }
  const viewOrder = (order: OrderRecord) => {
    setCurrentOrder(order)
    navigate("orders")
  }
  const standalone = page === "checkout" || page === "login" || page === "admin"
  return (
    <div className="app">
      {!standalone && (
        <Header
          page={page}
          cartCount={cartCount}
          navigate={navigate}
          profile={activeCustomerProfile}
          userRole={userRole}
        />
      )}
      {!standalone && <ServiceBar />}
      {page === "home" && (
        <Home
          navigate={navigate}
          openProduct={openProduct}
          addToCart={addToCart}
          catalog={catalogProducts}
        />
      )}
      {page === "shop" && (
        <Shop
          navigate={navigate}
          openProduct={openProduct}
          addToCart={addToCart}
          catalog={catalogProducts}
          categories={storeCategories}
        />
      )}
      {page === "categories" && (
        <Categories navigate={navigate} categories={storeCategories} />
      )}
      {page === "new-arrivals" && (
        <CuratedCollection
          kind="new"
          navigate={navigate}
          openProduct={openProduct}
          addToCart={addToCart}
          catalog={catalogProducts}
        />
      )}
      {page === "sale" && (
        <CuratedCollection
          kind="sale"
          navigate={navigate}
          openProduct={openProduct}
          addToCart={addToCart}
          catalog={catalogProducts}
        />
      )}
      {page === "about" && <About navigate={navigate} />}
      {page === "contact" && <Contact />}
      {page === "product" && (
        <Product
          key={selectedProduct.id}
          product={selectedProduct}
          navigate={navigate}
          addToCart={addToCart}
          reviews={reviewsByProduct[selectedProduct.id] ?? []}
        />
      )}
      {page === "cart" && (
        <Cart
          navigate={navigate}
          openProduct={openProduct}
          items={cartItems}
          updateQuantity={updateCartQuantity}
          removeItem={removeCartItem}
        />
      )}
      {page === "checkout" && (
        <Checkout
          navigate={navigate}
          items={cartItems}
          onOrderPlaced={setCurrentOrder}
        />
      )}
      {page === "orders" && (
        <Orders order={currentOrder} navigate={navigate} />
      )}
      {page === "login" && (
        <Login onLogin={login} customerProfile={activeCustomerProfile} />
      )}
      {page === "account" && userRole === "customer" && (
        <Account
          navigate={navigate}
          onLogout={logout}
          reviews={Object.values(reviewsByProduct).flat()}
          onAddReview={addReview}
          addToCart={addToCart}
          onViewOrder={viewOrder}
          profile={activeCustomerProfile}
          onUpdateProfile={updateCustomerProfile}
          catalog={catalogProducts}
        />
      )}
      {page === "admin" && userRole === "admin" && (
        <Admin
          onViewStorefront={viewAdminStorefront}
          onLogout={logout}
          currentOrder={currentOrder}
          catalog={catalogProducts}
          onAddProduct={addCatalogProduct}
          onUpdateProduct={updateCatalogProduct}
          categories={storeCategories}
          onAddCategory={addStoreCategory}
          onUpdateCategory={updateStoreCategory}
          onDeleteCategory={deleteStoreCategory}
        />
      )}
      {!standalone && userRole && (
        <Footer navigate={navigate} userRole={userRole} />
      )}
    </div>
  )
}
