import CategoryProductPage from "../components/CategoryProductPage";

import kajal from "../assets/Kajal Eyeliner.webp";
import lipstick from "../assets/Lipstick Set.webp";
import eyeshadow from "../assets/Eyeshadow Palette.jpg";
import nailPolish from "../assets/Nail Polish Set.jpg";
import lipGloss from "../assets/Lip Gloss Duo.webp";
import makeupKit from "../assets/Makeup Kit Box.avif";
import mascara from "../assets/Mascara.webp";
import foundation from "../assets/Face Foundation.webp";

const products = [
  { id: 1, name: "Kajal Eyeliner", description: "Smudge-proof intense black kajal", price: 149, originalPrice: 249, rating: 5, reviews: 412, badge: "New", image: kajal },
  { id: 2, name: "Lipstick Set (6 Shades)", description: "Long-lasting matte lipstick collection", price: 499, originalPrice: 799, rating: 4, reviews: 267, badge: "Sale", image: lipstick },
  { id: 3, name: "Eyeshadow Palette", description: "12-color shimmer and matte palette", price: 349, originalPrice: 599, rating: 4, reviews: 189, badge: null, image: eyeshadow },
  { id: 4, name: "Nail Polish Set", description: "Set of 6 vibrant nail polish shades", price: 299, originalPrice: 499, rating: 4, reviews: 143, badge: "New", image: nailPolish },
  { id: 5, name: "Lip Gloss Duo", description: "Plumping glossy lip duo in pink tones", price: 199, originalPrice: 349, rating: 4, reviews: 98, badge: null, image: lipGloss },
  { id: 6, name: "Makeup Kit Box", description: "Complete beginner makeup kit in box", price: 899, originalPrice: 1499, rating: 5, reviews: 321, badge: "Sale", image: makeupKit },
  { id: 7, name: "Mascara", description: "Volumizing & lengthening black mascara", price: 249, originalPrice: 399, rating: 4, reviews: 176, badge: null, image: mascara },
  { id: 8, name: "Face Foundation", description: "Lightweight buildable coverage foundation", price: 449, originalPrice: 699, rating: 4, reviews: 234, badge: "New", image: foundation },
];

export default function Cosmetics() {
  return <CategoryProductPage title="Cosmetics & Makeup" products={products} />;
}