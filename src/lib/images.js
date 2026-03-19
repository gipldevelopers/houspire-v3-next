// Product images
const diningTable = "/images/products/dining-table.jpg";
const chandelier = "/images/products/chandelier.jpg";
const marbleTile = "/images/products/marble-tile.jpg";
const modularKitchen = "/images/products/modular-kitchen.jpg";
const velvetSofa = "/images/products/velvet-sofa.jpg";
const floorLamp = "/images/products/floor-lamp.jpg";

// Category images
const furnitureImg = "/images/categories/furniture.jpg";
const lightingImg = "/images/categories/lighting.jpg";
const flooringImg = "/images/categories/flooring.jpg";
const kitchenImg = "/images/categories/kitchen.jpg";
const bathroomImg = "/images/categories/bathroom.jpg";
const decorImg = "/images/categories/decor.jpg";

// City images
const mumbaiImg = "/images/cities/mumbai.jpg";
const bangaloreImg = "/images/cities/bangalore.jpg";
const delhiImg = "/images/cities/delhi.jpg";
const jaipurImg = "/images/cities/jaipur.jpg";
const hyderabadImg = "/images/cities/hyderabad.jpg";
const puneImg = "/images/cities/pune.jpg";

export const heroImg = "/images/hero-interior.jpg";

export const productImages = {
  p1: diningTable,
  p2: chandelier,
  p3: marbleTile,
  p4: modularKitchen,
  p5: velvetSofa,
  p6: floorLamp,
};

export const categoryImages = {
  Furniture: furnitureImg,
  Lighting: lightingImg,
  Flooring: flooringImg,
  Kitchen: kitchenImg,
  Bathroom: bathroomImg,
  Decor: decorImg,
};

export const cityImages = {
  Mumbai: mumbaiImg,
  Bangalore: bangaloreImg,
  Delhi: delhiImg,
  Jaipur: jaipurImg,
  Hyderabad: hyderabadImg,
  Pune: puneImg,
};

export const cities = [
  { name: "Mumbai", vendors: 842, products: 3200 },
  { name: "Bangalore", vendors: 634, products: 2800 },
  { name: "Delhi", vendors: 756, products: 3100 },
  { name: "Jaipur", vendors: 412, products: 1600 },
  { name: "Hyderabad", vendors: 389, products: 1400 },
  { name: "Pune", vendors: 298, products: 1100 },
];

export const categoryShowcase = [
  { name: "Furniture", description: "Sofas, tables, chairs, beds & storage", products: 1240, image: furnitureImg },
  { name: "Lighting", description: "Chandeliers, pendants, floor & table lamps", products: 856, image: lightingImg },
  { name: "Flooring", description: "Marble, wood, tiles & vinyl", products: 634, image: flooringImg },
  { name: "Kitchen", description: "Modular kitchens, counters & accessories", products: 912, image: kitchenImg },
  { name: "Bathroom", description: "Fittings, vanities, bathtubs & showers", products: 478, image: bathroomImg },
  { name: "Decor", description: "Vases, art, mirrors & textiles", products: 1567, image: decorImg },
];

export const topCompanies = [
  { name: "Artisan Woodworks", category: "Furniture", city: "Mumbai", rating: 4.8, products: 48, verified: true },
  { name: "LuxeLights Studio", category: "Lighting", city: "Bangalore", rating: 4.6, products: 72, verified: true },
  { name: "Stonecraft India", category: "Flooring", city: "Jaipur", rating: 4.9, products: 36, verified: true },
  { name: "ModKitchen Co.", category: "Kitchen", city: "Delhi", rating: 4.5, products: 95, verified: true },
  { name: "BathLux India", category: "Bathroom", city: "Hyderabad", rating: 4.7, products: 54, verified: true },
  { name: "HomCanvas", category: "Decor", city: "Pune", rating: 4.4, products: 120, verified: false },
  { name: "WoodMaster", category: "Furniture", city: "Bangalore", rating: 4.6, products: 38, verified: true },
  { name: "Bright Ideas", category: "Lighting", city: "Mumbai", rating: 4.3, products: 61, verified: true },
];
