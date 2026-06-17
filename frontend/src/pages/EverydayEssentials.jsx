import CategoryProductPage from "../components/CategoryProductPage";

import canvasBelt from "../assets/Canvas Belt.jpg";
import coinPurse from "../assets/Coin Purse.webp";

const products = [
  { id: 1, name: "Leather Wallet", description: "Slim bifold leather wallet with card slots", price: 499, originalPrice: 799, rating: 5, reviews: 287, badge: null, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400" },
  { id: 2, name: "Canvas Belt", description: "Durable canvas belt with metal buckle", price: 249, originalPrice: 399, rating: 4, reviews: 134, badge: "Sale", image: canvasBelt },
  { id: 3, name: "Mini Crossbody Bag", description: "Compact zip crossbody bag for daily use", price: 599, originalPrice: 899, rating: 4, reviews: 198, badge: "New", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
  { id: 4, name: "Coin Purse", description: "Cute zipper coin purse with keyring", price: 149, originalPrice: 249, rating: 4, reviews: 76, badge: null, image: coinPurse },
  { id: 5, name: "Sunglasses", description: "UV400 protection stylish sunglasses", price: 399, originalPrice: 699, rating: 4, reviews: 221, badge: "Sale", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400" },
  { id: 6, name: "Wrist Watch", description: "Elegant analog watch with leather strap", price: 1299, originalPrice: 1999, rating: 5, reviews: 345, badge: "New", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
];

export default function EverydayEssentials() {
  return <CategoryProductPage title="Everyday Essentials" products={products} />;
}