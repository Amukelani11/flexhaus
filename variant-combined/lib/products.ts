export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  image: string;
  images: string[];
  badge?: "NEW DROP" | "LAST 1" | "SOLD OUT" | "HOT";
  featured: boolean;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
};

export const products: Product[] = [
  {
    id: "lv-001",
    slug: "lv-neverfull-tote-monogram",
    name: "Neverfull MM Tote",
    brand: "Louis Vuitton",
    category: "Bags",
    price: 8500,
    description: "The iconic Neverfull tote reimagined in classic monogram canvas. Spacious, structured and unmistakably LV.",
    details: ["Monogram coated canvas", "Natural cowhide leather trim", "Gold-tone hardware", "Interior zip pocket", "Dimensions: 31 x 28 x 14cm"],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    badge: "HOT",
    featured: true,
    inStock: true,
  },
  {
    id: "lv-002",
    slug: "lv-card-holder-damier",
    name: "Card Holder Damier Ebene",
    brand: "Louis Vuitton",
    category: "Accessories",
    price: 2200,
    description: "Slim and refined, this card holder in Damier Ebene canvas holds your essentials in LV style.",
    details: ["Damier Ebene coated canvas", "6 card slots", "1 bill compartment", "Dimensions: 10 x 7.5 x 1cm"],
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    badge: "NEW DROP",
    featured: true,
    inStock: true,
  },
  {
    id: "lv-003",
    slug: "lv-belt-initiales-40mm",
    name: "Initiales Belt 40mm",
    brand: "Louis Vuitton",
    category: "Accessories",
    price: 3800,
    description: "The Initiales belt in Damier Infini leather with iconic LV buckle. The finishing touch to any outfit.",
    details: ["Damier Infini embossed leather", "Silver-tone LV buckle", "Width: 40mm", "Sizes: 85cm–105cm"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    badge: "LAST 1",
    featured: false,
    inStock: true,
    sizes: ["85cm", "90cm", "95cm"],
  },
  {
    id: "prada-001",
    slug: "prada-re-edition-2000-nylon",
    name: "Re-Edition 2000 Nylon Bag",
    brand: "Prada",
    category: "Bags",
    price: 7200,
    description: "An icon reborn. The Prada Re-Edition 2000 bag in signature nylon with triangular logo plaque.",
    details: ["Re-Nylon fabric", "Adjustable shoulder strap", "Snap-button closure", "Interior zip pocket", "Dimensions: 22 x 18 x 6cm"],
    image: "https://images.unsplash.com/photo-1590739225287-bd31519780c3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1590739225287-bd31519780c3?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    ],
    badge: "NEW DROP",
    featured: true,
    inStock: true,
    colors: ["Black", "White", "Blush"],
  },
  {
    id: "prada-002",
    slug: "prada-sunglasses-spr-08y",
    name: "SPR 08Y Sunglasses",
    brand: "Prada",
    category: "Eyewear",
    price: 4500,
    description: "Oversized rectangular frames with gradient lenses. Bold, architectural, unmistakably Prada.",
    details: ["Acetate frame", "UV400 protection", "Gradient lenses", "Prada logo temples"],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80",
    ],
    featured: false,
    inStock: true,
    colors: ["Black", "Tortoise", "Clear"],
  },
  {
    id: "prada-003",
    slug: "prada-bucket-hat-re-nylon",
    name: "Re-Nylon Bucket Hat",
    brand: "Prada",
    category: "Accessories",
    price: 3200,
    description: "The Prada bucket hat — sporty silhouette meets luxury materials in this season's must-have.",
    details: ["Re-Nylon construction", "Prada enamel logo", "One size fits most", "Interior sweatband"],
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80",
    ],
    badge: "HOT",
    featured: true,
    inStock: true,
  },
  {
    id: "goyard-001",
    slug: "goyard-saint-louis-tote-pm",
    name: "Saint Louis Tote PM",
    brand: "Goyard",
    category: "Bags",
    price: 12500,
    description: "The Saint Louis PM — understated luxury in hand-painted Goyardine canvas. Effortlessly Parisian.",
    details: ["Hand-painted Goyardine canvas", "Natural cowhide trim", "Removable zip pouch", "Dimensions: 43 x 27 x 18cm"],
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    ],
    badge: "LAST 1",
    featured: true,
    inStock: true,
    colors: ["Black", "Navy", "Red", "Yellow"],
  },
  {
    id: "goyard-002",
    slug: "goyard-card-holder-goyardine",
    name: "Honoré Card Holder",
    brand: "Goyard",
    category: "Accessories",
    price: 3500,
    description: "Carry only the essentials. The Goyard Honoré card holder in signature Goyardine canvas.",
    details: ["Goyardine canvas", "4 card slots", "Slim profile", "Gold-tone Goyard charm"],
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    ],
    featured: false,
    inStock: true,
  },
  {
    id: "ck-001",
    slug: "ck-3-pack-boxer-briefs",
    name: "Cotton Stretch 3-Pack Boxers",
    brand: "Calvin Klein",
    category: "Underwear",
    price: 750,
    originalPrice: 950,
    description: "The essential CK boxer brief. Premium cotton stretch fabric, iconic waistband, everyday luxury.",
    details: ["95% cotton, 5% elastane", "Iconic Calvin Klein waistband", "3-pack", "Machine washable"],
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=800&q=80",
    ],
    badge: "NEW DROP",
    featured: false,
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Grey"],
  },
  {
    id: "versace-001",
    slug: "versace-medusa-boxers-2pack",
    name: "Medusa Head 2-Pack Boxers",
    brand: "Versace",
    category: "Underwear",
    price: 1200,
    description: "Bold Versace energy from the inside out. Medusa logo waistband on ultra-soft cotton boxers.",
    details: ["Modal cotton blend", "Versace Medusa waistband", "2-pack", "Signature pattern"],
    image: "https://images.unsplash.com/photo-1558171813-3b17e9f8f9d5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558171813-3b17e9f8f9d5?w=800&q=80",
    ],
    featured: false,
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "nike-001",
    slug: "nike-air-force-1-07-white",
    name: "Air Force 1 '07",
    brand: "Nike",
    category: "Sneakers",
    price: 2800,
    description: "The iconic AF1 in all-white leather. Clean, classic, and certified heat. Always in demand.",
    details: ["Full-grain leather upper", "Air-Sole unit", "Rubber cupsole", "Pivot circle rubber outsole"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    ],
    badge: "HOT",
    featured: true,
    inStock: true,
    sizes: ["UK6", "UK7", "UK8", "UK9", "UK10", "UK11"],
  },
  {
    id: "nike-002",
    slug: "nike-tech-fleece-joggers-black",
    name: "Tech Fleece Joggers",
    brand: "Nike",
    category: "Apparel",
    price: 1800,
    description: "Lightweight warmth meets modern silhouette. The Nike Tech Fleece jogger for the streets and beyond.",
    details: ["Nike Tech Fleece fabric", "Tapered fit", "Zip side pockets", "Elastic waistband with drawcord"],
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
    ],
    badge: "NEW DROP",
    featured: true,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Grey", "Navy"],
  },
  {
    id: "nike-003",
    slug: "nike-dunk-low-retro-panda",
    name: "Dunk Low Retro 'Panda'",
    brand: "Nike",
    category: "Sneakers",
    price: 3200,
    originalPrice: 3800,
    description: "The Panda Dunk — black and white never looked this good. Retro styling with modern comfort.",
    details: ["Leather and synthetic upper", "Foam midsole", "Rubber outsole", "Padded collar"],
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    ],
    badge: "LAST 1",
    featured: true,
    inStock: true,
    sizes: ["UK6", "UK7", "UK8", "UK9", "UK10"],
  },
  {
    id: "nike-004",
    slug: "nike-club-fleece-hoodie",
    name: "Club Fleece Pullover Hoodie",
    brand: "Nike",
    category: "Apparel",
    price: 1500,
    description: "Classic fleece hoodie with embroidered Swoosh. Comfortable, clean, and built to last.",
    details: ["Fleece fabric", "Kangaroo pocket", "Ribbed cuffs and hem", "Embroidered Nike Swoosh"],
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
    ],
    featured: false,
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Grey", "Navy", "Burgundy"],
  },
  {
    id: "dg-001",
    slug: "dolce-gabbana-boxer-brief-crown",
    name: "DG Crown Boxer Brief",
    brand: "Dolce & Gabbana",
    category: "Underwear",
    price: 980,
    description: "Luxurious cotton-modal blend with DG crown logo waistband. Italian luxury against your skin.",
    details: ["Cotton-modal blend", "DG Crown logo waistband", "Elasticated waist", "Single pack"],
    image: "https://images.unsplash.com/photo-1558171813-3b17e9f8f9d5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558171813-3b17e9f8f9d5?w=800&q=80",
    ],
    featured: false,
    inStock: false,
    badge: "SOLD OUT",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "lv-004",
    slug: "lv-sunglasses-attitude-pillow",
    name: "Attitude Pillow Sunglasses",
    brand: "Louis Vuitton",
    category: "Eyewear",
    price: 5500,
    description: "The LV Attitude Pillow in iconic Damier pattern — bold futuristic frames with LV monogram detail.",
    details: ["Acetate and metal frame", "UV400 lenses", "LV Damier pattern temples", "Comes with LV case"],
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    ],
    badge: "NEW DROP",
    featured: false,
    inStock: true,
  },
];

export const brands = [
  { name: "Louis Vuitton", slug: "louis-vuitton", count: 4 },
  { name: "Prada", slug: "prada", count: 3 },
  { name: "Goyard", slug: "goyard", count: 2 },
  { name: "Nike", slug: "nike", count: 4 },
  { name: "Calvin Klein", slug: "calvin-klein", count: 1 },
  { name: "Versace", slug: "versace", count: 1 },
  { name: "Dolce & Gabbana", slug: "dolce-gabbana", count: 1 },
];

export const categories = ["All", "Bags", "Accessories", "Eyewear", "Sneakers", "Apparel", "Underwear"];

export const featuredProducts = products.filter((p) => p.featured);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand === brand);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return `R${price.toLocaleString("en-ZA")}`;
}
