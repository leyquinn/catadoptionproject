import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div>
            <h3>
              <Link
                to="/"
                className="footer-title-link"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Purrfect Match
              </Link>
            </h3>
            <p>Giving every rescued cat a loving forever home.</p>
            <p className="footer-credits">
              Credits: Purrfect Match Team • Rescue Volunteers • Community Foster Network
            </p>
          </div>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>Email: hello@purrfectmatch.org</p>
          <p>Phone: +63 900 123 4567</p>
          <p>Location: Davao City, Philippines</p>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <a className="footer-social-link" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a className="footer-social-link" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a className="footer-social-link" href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
          <Link to="/about">About Purrfect Match</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
