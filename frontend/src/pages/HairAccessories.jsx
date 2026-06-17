import CategoryProductPage from "../components/CategoryProductPage";

import scrunchie from "../assets/Scrunchie Set (5 Pack).avif";
import butterfly from "../assets/Butterfly Clutcher Clips.jpg";
import pearlhairpins from "../assets/Pearl Hairpins.jpg";
import headband from "../assets/Wide Elastic Headband.jpg";
import flowerCrown from "../assets/Artificial Flower Crown.webp";
import clawClip from "../assets/Claw Clip Set (3 Pack).jpg";

const products = [
  { id: 1, name: "Scrunchie Set (5 Pack)", description: "Soft velvet scrunchies in assorted colors", price: 149, originalPrice: 249, rating: 5, reviews: 203, badge: "New", image: scrunchie },
  { id: 2, name: "Butterfly Clutcher Clips", description: "Set of 4 butterfly hair clutcher clips", price: 99, originalPrice: 199, rating: 4, reviews: 87, badge: null, image: butterfly },
  { id: 3, name: "Pearl Hairpins (6 Pack)", description: "Elegant pearl-studded bobby pins", price: 129, originalPrice: 199, rating: 4, reviews: 156, badge: "Sale", image: pearlhairpins },
  { id: 4, name: "Wide Elastic Headband", description: "Trendy wide knot headband", price: 89, originalPrice: 149, rating: 4, reviews: 112, badge: null, image: headband },
  { id: 5, name: "Artificial Flower Crown", description: "Boho floral hair crown for festivals", price: 199, originalPrice: 349, rating: 5, reviews: 78, badge: "New", image: flowerCrown },
  { id: 6, name: "Claw Clip Set (3 Pack)", description: "Strong hold claw clips in neutral tones", price: 119, originalPrice: 199, rating: 4, reviews: 93, badge: null, image: clawClip },
];

export default function HairAccessories() {
  return <CategoryProductPage title="Hair Accessories" products={products} />;
}