// src/pages/adopt.jsx
import React, { useState } from "react";
import cats from "../data/cats";
import { Link } from "react-router-dom";

function Adopt() {
  const [selectedCat, setSelectedCat] = useState(null);

  return (
    <>
      <header className="adopt-hero-wrapper">
        <div
          className="adopt-hero-slide"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/straycatshero2.jpg')",
          }}
        >
          <div className="hero-content">
            <h1>Find Your New Best Friend</h1>
            <p>Browse rescued felines ready for a forever home.</p>
          </div>
        </div>
      </header>

      <div className="adopt-container">
        <div className="cat-grid adopt-grid-four">
          {cats.map((cat) => (
            <div key={cat.id} className="cat-card">
              <img src={cat.image} alt={cat.name} />
              <div className="cat-info">
                <h3>{cat.name}</h3>
                <p><strong>{cat.breed}</strong> • {cat.age} years old</p>
                <p>{cat.description}</p>
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
      </div>

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
    </>
  );
}

export default Adopt;