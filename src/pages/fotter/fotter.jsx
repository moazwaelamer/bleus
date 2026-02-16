import { Link } from "react-router-dom";
import { categories } from "../category/category.js"; // عدل المسار لو مختلف
import "./fotter.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">

        {/* LEFT */}
        <div className="footer-left">
          <div className="follow-us">
            <p>Follow Us</p>
        <div className="social-icons">
  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <i className="fab fa-facebook-f"></i>
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <i className="fab fa-instagram"></i>
  </a>

  <a
    href="https://www.tiktok.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="TikTok"
  >
    <i className="fab fa-tiktok"></i>
  </a>
</div>

          </div>

          <div className="payments">
            <span className="secure">
              Secure <br /> Payments
            </span>

            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="footer-right">

          {/* SHOP */}
          <div className="footer-col">
            <h4>Shop</h4>
            {categories.map(cat => (
              <Link key={cat.id} to={`/category/${cat.slug}`}>
                {cat.title}
              </Link>
            ))}
          </div>

          {/* SUPPORT */}
          <div className="footer-col">
            <h4>Support</h4>
            <Link to="/contact">Contact Us</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/shipping">Shipping & Returns</Link>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <span>© 2025 Blue’s. All rights reserved</span>

        <span className="powered-by">
          Powered by{" "}
          <a
            href="https://azteac.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Azteac
          </a>
        </span>
      </div>
    </footer>
  );
}
