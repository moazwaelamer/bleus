import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/navbar/navbar";
import Landing from "./pages/landing/landing";
import ProductDetails from "./pages/Product/productDetatils";
import Checkout from "./pages/checkout/Checkout";
import CartPage from "./pages/cart/CartPage";
import CategoryPage from "./components/product/product";
import Intro from "./pages/intro/intro";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <BrowserRouter>
      {showIntro && <Intro onFinish={() => setShowIntro(false)} />}

      {!showIntro && (
        <>
          <Navbar />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;