import CategoryProductPage from "../components/CategoryProductPage";

import ceramicVase from "../assets/ceramic vase set.jpg";
import photoFrame from "../assets/Photo Frame Set.webp";
import flowerBunch from "../assets/Artificial Flower Bunch.webp";
import fairyLight from "../assets/Fairy Light String.webp";
import candleSet from "../assets/Scented Candle Set.jpg";
import wallHanging from "../assets/Wall Hanging Decor.avif";

const products = [
  { id: 1, name: "Ceramic Vase Set", description: "Set of 3 minimalist ceramic vases", price: 599, originalPrice: 999, rating: 5, reviews: 167, badge: "New", image: ceramicVase },
  { id: 2, name: "Photo Frame Set", description: "Set of 4 wooden photo frames", price: 449, originalPrice: 699, rating: 4, reviews: 132, badge: null, image: photoFrame },
  { id: 3, name: "Artificial Flower Bunch", description: "Realistic silk flower arrangement", price: 299, originalPrice: 499, rating: 4, reviews: 98, badge: "Sale", image: flowerBunch },
  { id: 4, name: "Fairy Light String", description: "5m warm white LED fairy lights", price: 349, originalPrice: 599, rating: 5, reviews: 287, badge: "New", image: fairyLight },
  { id: 5, name: "Scented Candle Set", description: "Set of 3 soy wax scented candles", price: 499, originalPrice: 799, rating: 5, reviews: 213, badge: null, image: candleSet },
  { id: 6, name: "Wall Hanging Decor", description: "Boho macrame wall hanging decor", price: 649, originalPrice: 999, rating: 4, reviews: 145, badge: "Sale", image: wallHanging },
];

export default function Decoratives() {
  return <CategoryProductPage title="Decoratives" products={products} />;
}