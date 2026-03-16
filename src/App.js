import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar/navbar";
import Landing from "./pages/landing/landing";
import ProductDetails from "./pages/Product/productDetatils";
import Checkout from "./pages/checkout/Checkout";
import CartPage from "./pages/cart/CartPage";
import CategoryPage from "./components/product/product";
import PaymentSuccess from "./pages/checkout/PaymentSuccess";
import  Orders from "./pages/profile/Orders";
function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    
    <BrowserRouter>
    
        <>
          <Navbar />
               <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </>

    </BrowserRouter>
  );
}

export default App;