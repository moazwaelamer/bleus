import { Link } from "react-router-dom";
import { categories } from "../category/category.js";
import "./fotter.css";

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-top">

        {/* LEFT */}
        <div className="footer-left">

          {/* FOLLOW */}
          <div className="follow-us">
            <p>Follow Us</p>

            <div className="social-icons">

              <a
                href="https://www.instagram.com/bleuscoffee.eg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>

              <a
                href="https://www.tiktok.com/@bleuscoffee.eg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-tiktok"></i>
              </a>

            </div>
          </div>

          {/* CONTACT */}
          <div className="footer-contact">

            <p className="contact-title">Contact</p>

            <div className="contact-icons">

              <a
                href="https://wa.me/201558959191"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>

              <a
                href="tel:01558959191"
                title="Delivery"
              >
                <i className="fas fa-motorcycle"></i>
              </a>

              <a
                href="mailto:bleuespressobar@icloud.com"
                title="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>

            </div>

          </div>

          {/* PAYMENTS */}
          <div className="payments">

            <span className="secure">
              Secure <br /> Payments
            </span>

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
            />

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
            />

          </div>

        </div>

        {/* RIGHT */}
        <div className="footer-right">

          <div className="footer-col">
            <h4>Shop</h4>

            {categories.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`}>
                {cat.title}
              </Link>
            ))}

          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">

        <span>© 2025 Blue’s. All rights reserved</span>

        <div className="powered-row">

          <span>Powered by</span>

          <a
            href="https://azteac.com"
            target="_blank"
            rel="noopener noreferrer"
            className="azteac-container"
          >

            <span className="azteac-text">AZTEAC</span>

            <svg
              className="azteac-snake"
              viewBox="0 0 280 80"
              preserveAspectRatio="none"
            >
              <path
                d="M10,40 
                   Q30,0 50,40 
                   Q70,80 90,40 
                   Q110,0 130,40 
                   Q150,80 170,40 
                   Q190,0 210,40 
                   Q230,80 250,40"
                className="snake-path"
              />
            </svg>

          </a>

        </div>

      </div>
    </footer>
  );
}