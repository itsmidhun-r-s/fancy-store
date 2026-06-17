import CategoryProductPage from "../components/CategoryProductPage";

import hennaCone from "../assets/Henna Cone Set.jpg";
import rosePerfume from "../assets/Rose Perfume.jpg";
import bodySpray from "../assets/Body Spray Set.webp";
import faceWash from "../assets/Herbal Face Wash.jpg";
import shampoo from "../assets/Hair Shampoo.webp";
import deodorant from "../assets/Deodorant Roll-On.jpg";

const products = [
  { id: 1, name: "Henna Cone Set (6 Pack)", description: "Natural brown henna cones for mehndi", price: 199, originalPrice: 349, rating: 5, reviews: 287, badge: "New", image: hennaCone },
  { id: 2, name: "Rose Perfume", description: "Long-lasting floral rose eau de parfum", price: 599, originalPrice: 999, rating: 4, reviews: 198, badge: null, image: rosePerfume },
  { id: 3, name: "Body Spray Set", description: "Set of 3 fresh body mist sprays", price: 349, originalPrice: 599, rating: 4, reviews: 143, badge: "Sale", image: bodySpray },
  { id: 4, name: "Herbal Face Wash", description: "Neem & turmeric gentle face cleanser", price: 149, originalPrice: 249, rating: 4, reviews: 312, badge: null, image: faceWash },
  { id: 5, name: "Hair Shampoo", description: "Argan oil moisturizing shampoo 300ml", price: 249, originalPrice: 399, rating: 4, reviews: 167, badge: "New", image: shampoo },
  { id: 6, name: "Deodorant Roll-On", description: "48hr protection fresh deodorant", price: 179, originalPrice: 299, rating: 4, reviews: 89, badge: null, image: deodorant },
];

export default function PersonalCare() {
  return <CategoryProductPage title="Personal Care & Fragrances" products={products} />;
}