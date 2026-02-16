import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Landing from "./pages/landing/landing";
import ProductPage from "./pages/Product/product";
import ProductDetails from "./pages/Product/productDetatils";
import Checkout from "./pages/checkout/Checkout";
import CartPage from "./pages/cart/CartPage";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/category/:slug" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
         <Route path="/CartPage" element={<CartPage />} />
       <Route path="/checkout" element={<Checkout />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
