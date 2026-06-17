import CategoryProductPage from "../components/CategoryProductPage";

const products = [
  { id: 1, name: "Oxidized Silver Necklace", description: "Elegant oxidized silver with pearl drops", price: 299, originalPrice: 499, rating: 4, reviews: 128, badge: "New", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400" },
  { id: 2, name: "Beaded Bracelet Set", description: "Set of 3 colorful beaded bracelets", price: 199, originalPrice: 350, rating: 4, reviews: 89, badge: "Sale", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400" },
  { id: 3, name: "Jhumka Earrings", description: "Traditional gold-toned jhumka earrings", price: 249, originalPrice: 399, rating: 5, reviews: 210, badge: null, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
  { id: 4, name: "Pearl Anklet", description: "Delicate pearl and silver anklet", price: 179, originalPrice: 299, rating: 4, reviews: 65, badge: "New", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400" },
  { id: 5, name: "Leather Handbag", description: "Genuine leather everyday handbag", price: 899, originalPrice: 1499, rating: 5, reviews: 312, badge: null, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
  { id: 6, name: "Embroidered Clutch", description: "Handcrafted embroidered clutch purse", price: 449, originalPrice: 699, rating: 4, reviews: 97, badge: "Sale", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400" },
  { id: 7, name: "Canvas Tote Bag", description: "Lightweight printed canvas tote bag", price: 349, originalPrice: 499, rating: 4, reviews: 143, badge: null, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400" },
  { id: 8, name: "Boho Ring Set", description: "Set of 5 adjustable boho rings", price: 149, originalPrice: 250, rating: 3, reviews: 54, badge: "New", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400" },
];

export default function FashionAccessories() {
  return <CategoryProductPage title="Fashion Accessories" products={products} />;
}