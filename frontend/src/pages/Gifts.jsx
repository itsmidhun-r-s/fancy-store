import CategoryProductPage from "../components/CategoryProductPage";

import giftHamper from "../assets/gifts.webp";
import greetingCard from "../assets/Greeting Card Set.webp";
import decorativePen from "../assets/decorative pen set.jpg";
import notebook from "../assets/Designer Notebook.jpg";
import wallClock from "../assets/Wall Clock.jpg";
import keychain from "../assets/Souvenir Keychain.webp";

const products = [
  { id: 1, name: "Gift Hamper Box", description: "Premium curated gift hamper for all occasions", price: 999, originalPrice: 1599, rating: 5, reviews: 234, badge: "New", image: giftHamper },
  { id: 2, name: "Greeting Card Set", description: "Pack of 10 handcrafted greeting cards", price: 199, originalPrice: 349, rating: 4, reviews: 112, badge: null, image: greetingCard },
  { id: 3, name: "Decorative Pen Set", description: "Beautiful floral design writing pens", price: 149, originalPrice: 249, rating: 4, reviews: 87, badge: "Sale", image: decorativePen },
  { id: 4, name: "Designer Notebook", description: "Hardcover lined notebook 200 pages", price: 299, originalPrice: 449, rating: 4, reviews: 156, badge: null, image: notebook },
  { id: 5, name: "Wall Clock", description: "Elegant wooden wall clock 30cm", price: 799, originalPrice: 1299, rating: 5, reviews: 198, badge: "New", image: wallClock },
  { id: 6, name: "Souvenir Keychain", description: "Handcrafted metal souvenir keychains", price: 99, originalPrice: 199, rating: 4, reviews: 243, badge: null, image: keychain },
];

export default function Gifts() {
  return <CategoryProductPage title="Gifts & Novelties" products={products} />;
}