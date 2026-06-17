import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* Components */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import FashionAccessories from "./pages/FashionAccessories";
import HairAccessories from "./pages/HairAccessories";
import EverydayEssentials from "./pages/EverydayEssentials";
import Cosmetics from "./pages/Cosmetics";
import PersonalCare from "./pages/PersonalCare";
import Gifts from "./pages/Gifts";
import Decoratives from "./pages/Decoratives";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";


/* Admin Pages */
import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/Products";
import Categories from "./admin/Categories";
import Customers from "./admin/Customers";
import AdminOrders from "./admin/Orders";

function App() {
  return (
    <BrowserRouter>

      {/* Navbar */}
      <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/products"
          element={<Products />}
        />
       <Route  
          path="/fashion-accessories"
          element={<FashionAccessories />} 
        />
       <Route
         path="/hair-accessories" 
         element={<HairAccessories />}
       />
       <Route 
         path="/everyday-essentials"
         element={<EverydayEssentials />}
       />
       <Route
         path="/cosmetics" 
         element={<Cosmetics />}
       />
       <Route
        path="/personal-care" 
        element={<PersonalCare />} 
      />
       <Route 
         path="/gifts" 
         element={<Gifts />} 
      />
       <Route 
       path="/decoratives" 
       element={<Decoratives />}
     />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />
        <Route
          path="/auth"
          element={<Auth />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Admin Routes */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      {/* Footer */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;