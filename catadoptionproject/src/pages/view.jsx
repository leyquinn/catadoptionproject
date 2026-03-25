import React from "react";
import { Link, useParams } from "react-router-dom";
import cats from "../data/cats";

function View() {
	const { catId } = useParams();
	const selectedCat = cats.find((cat) => String(cat.id) === String(catId));

	if (!selectedCat) {
		return (
			<section className="cat-view-page">
				<div className="cat-view-container">
					<h1>Cat not found</h1>
					<p>The cat details you are looking for are not available.</p>
					<Link to="/" className="about-link-btn">Back to Home</Link>
				</div>
			</section>
		);
	}

	return (
		<section className="cat-view-page">
			<div className="cat-view-container">
				<div className="cat-view-image-wrap">
					<img src={selectedCat.image} alt={selectedCat.name} className="cat-view-image" />
				</div>

				<div className="cat-view-details">
					<p className="about-kicker">Cat Information</p>
					<h1>{selectedCat.name}</h1>

					<div className="cat-info-grid">
						<p><strong>Breed:</strong> {selectedCat.breed}</p>
						<p><strong>Age:</strong> {selectedCat.ageGroup} ({selectedCat.age} year old)</p>
						<p><strong>Sex:</strong> {selectedCat.sex}</p>
						<p><strong>Size / Weight:</strong> {selectedCat.sizeWeight}</p>
						<p><strong>Color / Markings:</strong> {selectedCat.colorMarkings}</p>
						<p><strong>Health status:</strong> {selectedCat.healthStatus}</p>
						<p><strong>Vaccinated:</strong> {selectedCat.vaccinated}</p>
						<p><strong>Spayed / Neutered:</strong> {selectedCat.spayedNeutered}</p>
						<p><strong>Medical conditions:</strong> {selectedCat.medicalConditions}</p>
						<p><strong>Temperament / Behavior:</strong> {selectedCat.temperament}</p>
						<p><strong>Litter-trained:</strong> {selectedCat.litterTrained}</p>
						<p><strong>Good with kids:</strong> {selectedCat.goodWithKids}</p>
						<p><strong>Good with other pets:</strong> {selectedCat.goodWithOtherPets}</p>
						<p><strong>Special needs:</strong> {selectedCat.specialNeeds}</p>
					</div>

					<p className="cat-view-description">{selectedCat.description}</p>

					<div className="cat-view-actions">
						<Link to="/" className="view-details-btn">Back to Home</Link>
						<Link to="/adopt" className="adopt-btn">Proceed to Adopt</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default View;
