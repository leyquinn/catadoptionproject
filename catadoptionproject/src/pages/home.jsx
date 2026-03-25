import React, { useState, useEffect, useRef } from "react";
import cats from "../data/cats"; 
import { Link } from "react-router-dom";

function Home() {
  const FADE_DURATION_MS = 650;
  const images = [
    "/straycatshero3.jpeg",
    "/straycatshero.jpg",
    "/straycatshero1.jpg",
    "/straycatshero2.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const adoptCarouselRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  const changeSlide = (getNextIndex) => {
    if (isFading) return;

    setIsFading(true);

    fadeTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => getNextIndex(prevIndex));
      setIsFading(false);
    }, FADE_DURATION_MS);
  };

  const nextSlide = () => {
    changeSlide((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    changeSlide((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const scrollAdoptLeft = () => {
    if (!adoptCarouselRef.current) return;
    adoptCarouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollAdoptRight = () => {
    if (!adoptCarouselRef.current) return;
    adoptCarouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [images.length, isFading]);

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container" id="home">
      {/* --- HERO SECTION --- */}
      <header className="hero-wrapper">
        <div 
          className={`hero-slide ${isFading ? "is-fading" : ""}`}
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${images[currentIndex]}')` }}
        >
          <button className="carousel-arrow left" onClick={prevSlide} aria-label="Previous slide">
            &#10094;
          </button>

          <div className="hero-content">
            <h1>Adopt, Don't Shop</h1>
            <p>Find your perfect cat and give them a forever home.</p>
            <a href="#adopt" className="hero-btn">Adopt Now!</a>
          </div>

          <button className="carousel-arrow right" onClick={nextSlide} aria-label="Next slide">
            &#10095;
          </button>
        </div>
        
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <span 
              key={index} 
              className={`indicator-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => changeSlide(() => index)}
            ></span>
          ))}
        </div>
      </header>

      {/* --- SPLIT ABOUT SECTION --- */}
      <section className="home-about-section reveal-on-scroll" id="about">
        <div className="home-about-container">
          <div
            className="about-image-wrapper"
            role="button"
            tabIndex={0}
            onClick={() => setIsVideoOpen(true)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setIsVideoOpen(true)}
            aria-label="Open rescue video"
          >
            <img src="/straycatshero3.jpeg" alt="Rescued cats" className="about-preview-img" />
            <div className="play-button-overlay">
              <div className="play-triangle"></div>
            </div>
          </div>

          <div className="home-about-content">
            <p className="about-kicker">About Us</p>
            <h2>Purrfect Match Project</h2>
            <p>
              Purrfect Match is a non-profit organization focused on giving stray and 
              abandoned cats a second chance. Sparked by the heartbreaking reality of 
              animals on the streets, we work to provide a safe haven for every feline in need.
            </p>
            <p>
              What started with hope and courage has grown into a dedicated movement. 
              Following that first life-saving rescue, the outpouring of support 
              became impossible to ignore.
            </p>
            <p className="about-summary">
              Join us in giving every animal the second chance they deserve. 
              We have found loving homes for hundreds of cats already.
            </p>
            <Link to="/about" className="about-link-btn">Learn More About Us</Link>
          </div>
        </div>
      </section>

      {/* --- FEATURED ADOPT SECTION --- */}
      <section className="home-adopt-preview reveal-on-scroll" id="adopt">
        <div className="adopt-preview-header">
          <p className="about-kicker-small">Available for Adoption</p>
          <h2>Meet Our Cats</h2>
        </div>

        <div className="home-adopt-carousel">
          <button
            className="adopt-carousel-arrow left"
            onClick={scrollAdoptLeft}
            aria-label="Scroll cats left"
            type="button"
          >
            &#10094;
          </button>

          <div className="home-adopt-track" ref={adoptCarouselRef}>
            {cats.map((cat) => (
            <div key={cat.id} className="cat-card">
              <div className="cat-card-image">
                <img src={cat.image} alt={cat.name} />
              </div>
              <div className="cat-info">
                <h3>{cat.name}</h3>
                <p className="cat-meta"><strong>{cat.breed}</strong> • {cat.age} Year</p>
                <p className="cat-desc">{cat.description}</p>
                <div className="cat-action-row">
                  <button
                    className="view-details-btn"
                    type="button"
                    onClick={() => setSelectedCat(cat)}
                  >
                    View Details
                  </button>
                  <Link className="adopt-btn" to="/adoption-process">Adopt {cat.name.split(' ')[0]}</Link>
                </div>
              </div>
            </div>
            ))}
          </div>

          <button
            className="adopt-carousel-arrow right"
            onClick={scrollAdoptRight}
            aria-label="Scroll cats right"
            type="button"
          >
            &#10095;
          </button>
        </div>

        <div className="view-all-container">
          <Link to="/adopt" className="view-all-btn">View All Felines</Link>
        </div>
      </section>

      {/* --- VIDEO MODAL --- */}
      {isVideoOpen && (
        <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="video-modal-close"
              onClick={() => setIsVideoOpen(false)}
            >
              ×
            </button>
            <iframe
              className="video-modal-frame"
              src="https://www.youtube.com/embed/4lnzkBrYrvo?autoplay=1"
              title="Purrfect Match Rescue Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {selectedCat && (
        <div className="cat-details-modal-overlay" onClick={() => setSelectedCat(null)}>
          <div className="cat-details-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="video-modal-close"
              onClick={() => setSelectedCat(null)}
              aria-label="Close details modal"
              type="button"
            >
              ×
            </button>

            <h2 className="cat-details-title">Feline Information Details</h2>
            <h3>{selectedCat.name}</h3>
            <p><strong>Breed:</strong> {selectedCat.breed}</p>
            <p><strong>Age:</strong> {selectedCat.age} year(s)</p>
            <p>{selectedCat.description}</p>

            <div className="adoption-info-grid">
              <div className="adoption-info-card">
                <p className="adoption-info-label">Breed (or mixed breed)</p>
                <p className="adoption-info-value">{selectedCat.breed || "Not specified"}</p>
              </div>
              <div className="adoption-info-card">
                <p className="adoption-info-label">Age (kitten, adult, senior)</p>
                <p className="adoption-info-value">{selectedCat.ageGroup || `${selectedCat.age} year(s)`}</p>
              </div>
              <div className="adoption-info-card">
                <p className="adoption-info-label">Sex (male/female)</p>
                <p className="adoption-info-value">{selectedCat.sex || "Not specified"}</p>
              </div>
              <div className="adoption-info-card">
                <p className="adoption-info-label">Size/Weight</p>
                <p className="adoption-info-value">{selectedCat.sizeWeight || "Not specified"}</p>
              </div>
              <div className="adoption-info-card full-width">
                <p className="adoption-info-label">Color/Markings</p>
                <p className="adoption-info-value">{selectedCat.colorMarkings || "Not specified"}</p>
              </div>
              <div className="adoption-info-card full-width">
                <p className="adoption-info-label">Health status</p>
                <p className="adoption-info-value">{selectedCat.healthStatus || "Not specified"}</p>
              </div>
              <div className="adoption-info-card">
                <p className="adoption-info-label">Vaccinated (yes/no)</p>
                <p className="adoption-info-value">{selectedCat.vaccinated || "Not specified"}</p>
              </div>
              <div className="adoption-info-card">
                <p className="adoption-info-label">Spayed/neutered</p>
                <p className="adoption-info-value">{selectedCat.spayedNeutered || "Not specified"}</p>
              </div>
              <div className="adoption-info-card full-width">
                <p className="adoption-info-label">Any medical conditions</p>
                <p className="adoption-info-value">{selectedCat.medicalConditions || "None"}</p>
              </div>
              <div className="adoption-info-card full-width">
                <p className="adoption-info-label">Temperament/Behavior (friendly, shy, aggressive, playful, etc.)</p>
                <p className="adoption-info-value">{selectedCat.temperament || "Not specified"}</p>
              </div>
              <div className="adoption-info-card">
                <p className="adoption-info-label">Litter-trained (yes/no)</p>
                <p className="adoption-info-value">{selectedCat.litterTrained || "Not specified"}</p>
              </div>
              <div className="adoption-info-card">
                <p className="adoption-info-label">Good with kids?</p>
                <p className="adoption-info-value">{selectedCat.goodWithKids || "Not specified"}</p>
              </div>
              <div className="adoption-info-card">
                <p className="adoption-info-label">Good with other pets?</p>
                <p className="adoption-info-value">{selectedCat.goodWithOtherPets || "Not specified"}</p>
              </div>
              <div className="adoption-info-card full-width">
                <p className="adoption-info-label">Special needs (if any)</p>
                <p className="adoption-info-value">{selectedCat.specialNeeds || "None"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;