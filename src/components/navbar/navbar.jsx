import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { SearchIcon, CartIcon, UserIcon } from "../icons/icons";
import Login from "../../pages/login/login";
import CartPanel from "../cart/cart";
import "./navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();
 const isCartPage = location.pathname === "/CartPage";


  const CART_KEY = currentUser
    ? `cart_${currentUser.username}`
    : "cart_guest";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
    setCartOpen(false);
  }, [location]);

  useEffect(() => {
    const esc = e => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setAccountOpen(false);
        setCartOpen(false);
      }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [openLogin]);

  useEffect(() => {
    const openLoginHandler = () => {
      setOpenLogin(true);
      setMenuOpen(false);
      setAccountOpen(false);
      setCartOpen(false);
    };

    window.addEventListener("openLogin", openLoginHandler);
    return () =>
      window.removeEventListener("openLogin", openLoginHandler);
  }, []);

  useEffect(() => {
    const loadCount = () => {
      const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      const count = cart.reduce((a, i) => a + i.quantity, 0);
      setCartCount(count);
    };

    loadCount();
    window.addEventListener("storage", loadCount);
    return () => window.removeEventListener("storage", loadCount);
  }, [CART_KEY, cartOpen]);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen || openLogin || cartOpen ? "hidden" : "auto";
  }, [menuOpen, openLogin, cartOpen]);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setAccountOpen(false);
  };
 const navigate = useNavigate();
  return (
    <>
      <header
  className={`navbar 
    ${scrolled && !isCartPage ? "scrolled" : ""}
    ${isCartPage ? "cart-mode" : ""}
  `}
>

       

<div className="logo" onClick={() => navigate("/")}>
  <img src="/assest/IMG_0709.PNG" alt="logo" />
</div>


        <div className="nav-icons">
          {/* SEARCH */}
          <button className="icon-btn">
            <SearchIcon />
          </button>

          {/* CART */}
          <button
            className="icon-btn cart-btn"
            onClick={() => {
              setCartOpen(true);
              setMenuOpen(false);
              setAccountOpen(false);
            }}
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>

          {/* ACCOUNT */}
          {currentUser ? (
            <div
  className="user-name"
  onClick={() => setAccountOpen(!accountOpen)}
>
  <span className="username-text">Hi {currentUser.username}</span>
  <span className="blue-heart">💙</span>
</div>

          ) : (
            <button
              className="icon-btn"
              onClick={() => setOpenLogin(true)}
            >
              <UserIcon />
            </button>
          )}

          <AnimatePresence>
            {accountOpen && currentUser && (
              <motion.div
                className="account-dropdown"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="dropdown-item">
                  Hello, {currentUser.username}
                </div>
                <div className="dropdown-item logout" onClick={logout}>
                  Logout
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MENU */}
          <button
            className={`icon-btn menu-toggle ${menuOpen ? "open" : ""}`}
            onClick={() => {
              setMenuOpen(!menuOpen);
              setAccountOpen(false);
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="menu-content">
              <div className="menu-left">
                {[
                  "commercial products",
                  "la marzocco home",
                  "accademia",
                  "news",
                  "about us",
                  "bookings",
                  "store",
                ].map(item => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>

              <div className="menu-right">
<img
  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93"
  alt="Cup of coffee"
/>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && <CartPanel onClose={() => setCartOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {openLogin && <Login onClose={() => setOpenLogin(false)} />}
      </AnimatePresence>
    </>
  );
}
