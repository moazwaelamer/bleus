import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const isCartPage = location.pathname === "/CartPage";

  const CART_KEY = currentUser ? `cart_${currentUser.username}` : "cart_guest";

 const handleNavClick = (e, targetId) => {
  e.preventDefault();
  setMenuOpen(false);

  if (location.pathname === "/") {
    const target = document.getElementById(targetId);
    if (target) {
      // بنحسب مكان السكشن ونطرح منه ارتفاع الناف بار (مثلاً 80 بيكسل)
      const offset = 80; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  } else {
    navigate(`/#${targetId}`);
  }
};

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
    const esc = (e) => {
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
    return () => window.removeEventListener("openLogin", openLoginHandler);
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
        
        <div className="center-logo" onClick={() => navigate("/")}>
          <img src="/assest/blue.jpg" alt="Center logo" />
        </div>

        <div className="nav-icons">
          {!isCartPage && (
            <button className="icon-btn">
              <SearchIcon />
            </button>
          )}

          <button
            className="icon-btn cart-btn"
            onClick={() => {
              setCartOpen(true);
              setMenuOpen(false);
              setAccountOpen(false);
            }}
          >
            <CartIcon />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {currentUser ? (
            <div className="user-name" onClick={() => setAccountOpen(!accountOpen)}>
              <span className="username-text">Hi {currentUser.username}</span>
              <span className="blue-heart">💙</span>
            </div>
          ) : (
            <button className="icon-btn" onClick={() => setOpenLogin(true)}>
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
                <div className="dropdown-item">Hello, {currentUser.username}</div>
                <div className="dropdown-item logout" onClick={logout}>Logout</div>
              </motion.div>
            )}
          </AnimatePresence>

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

      {/* مـنـيـو الـتـنـقـل */}
      <AnimatePresence>
  {menuOpen && (
    <motion.div
      className="menu-overlay"
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
    >
      {/* زرار القفل X */}
      <button className="close-menu-btn" onClick={() => setMenuOpen(false)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="menu-content">
        <div className="menu-left">
          {[
            { name: "Home", id: "hero" },
            { name: "Collections", id: "categories-section" },
            { name: "Experience", id: "video" },
            { name: "Products", id: "products-section" },
            { name: "Contact", id: "footer" },
          ].map((item, index) => (
            <motion.a
              key={item.id}
              href={`/#${item.id}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.name}
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