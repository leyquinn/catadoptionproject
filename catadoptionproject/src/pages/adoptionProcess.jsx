import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdoptionProcess() {
  const initialFormData = {
    fullName: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    livingSituation: "",
    ownership: "",
    landlordAllowsPets: "",
    householdMembers: "",
    childrenAtHome: "",
    otherPets: [],
    petExperience: "",
    catStay: "",
    dailyAvailability: "",
    reasonForAdopting: [],
    reasonOtherText: "",
    properCare: false,
    vetVisits: false,
    adoptionFee: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const textFields = ["fullName", "age", "phone", "email", "address"];
  const singleChoiceFields = [
    "livingSituation",
    "ownership",
    "landlordAllowsPets",
    "householdMembers",
    "childrenAtHome",
    "petExperience",
    "catStay",
    "dailyAvailability",
  ];
  const multiChoiceFields = ["otherPets", "reasonForAdopting"];
  const agreementFields = ["properCare", "vetVisits", "adoptionFee"];

  const fieldLabels = {
    fullName: "Full name",
    age: "Age",
    phone: "Phone number",
    email: "Email",
    address: "Home address",
    livingSituation: "Living Situation",
    ownership: "Ownership",
    landlordAllowsPets: "Landlord Allows Pets",
    householdMembers: "Household Members",
    childrenAtHome: "Children at Home",
    otherPets: "Other Pets",
    petExperience: "Pet Experience",
    catStay: "Where will the cat stay?",
    dailyAvailability: "Daily Availability",
    reasonForAdopting: "Reason for Adopting",
    reasonOtherText: "Other reason",
    properCare: "Agreement to provide proper care",
    vetVisits: "Willingness for vet visits",
    adoptionFee: "Adoption fee agreement",
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length === 11;
  };

  const validateAge = (age) => {
    if (!/^\d+$/.test(age)) {
      return false;
    }
    const ageNum = parseInt(age, 10);
    return !isNaN(ageNum) && ageNum >= 18 && ageNum <= 120;
  };

  const validateName = (name) => {
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length < 2) {
      return false;
    }
    return nameParts.every((part) => {
      if (part.length < 2) return false;
      if (/^[-']|[-']$/.test(part)) return false;
      return /^[a-zA-Z]+$/.test(part);
    });
  };

  const validateForm = () => {
    const newErrors = {};

    textFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = `${fieldLabels[field]} is required`;
      }
    });

    if (formData.fullName && !validateName(formData.fullName)) {
      newErrors.fullName = "Please enter a valid first and last name (letters only, no symbols)";
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address with @";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (exactly 11 digits)";
    }

    if (formData.age && !validateAge(formData.age)) {
      newErrors.age = "Age must be a whole number between 18 and 120";
    }

    singleChoiceFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${fieldLabels[field]} is required`;
      }
    });

    multiChoiceFields.forEach((field) => {
      if (!Array.isArray(formData[field]) || formData[field].length === 0) {
        newErrors[field] = `${fieldLabels[field]} is required`;
      }
    });

    if (
      formData.reasonForAdopting.includes("other") &&
      (!formData.reasonOtherText || formData.reasonOtherText.trim() === "")
    ) {
      newErrors.reasonOtherText = "Please specify your reason for choosing Other";
    }

    agreementFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${fieldLabels[field]} must be checked`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let fieldValue = type === "checkbox" ? checked : value;

    if (name === "age" || name === "phone") {
      fieldValue = value.replace(/[^0-9]/g, "");
    }

    if (name === "phone") {
      fieldValue = fieldValue.slice(0, 11);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleMultiCheckboxChange = (fieldName, optionValue, checked) => {
    setFormData((prev) => {
      const currentValues = prev[fieldName] || [];
      let nextValues;

      if (checked) {
        nextValues = [...currentValues, optionValue];
      } else {
        nextValues = currentValues.filter((item) => item !== optionValue);
      }

      if (fieldName === "otherPets") {
        if (optionValue === "none" && checked) {
          nextValues = ["none"];
        } else if (optionValue !== "none" && checked) {
          nextValues = nextValues.filter((item) => item !== "none");
        }
      }

      if (fieldName === "reasonForAdopting" && optionValue === "other" && !checked) {
        return {
          ...prev,
          [fieldName]: nextValues,
          reasonOtherText: "",
        };
      }

      return {
        ...prev,
        [fieldName]: nextValues,
      };
    });

    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setShowSuccessModal(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <section className="adoption-process-page">
      <div className="adoption-process-container">
        <Link to="/adopt" className="adoption-close-btn" aria-label="Back to adoption page">
          ×
        </Link>

        <div className="adoption-process-heading">
          <h1>Adoption Information Form</h1>
          <p className="adoption-process-subtitle">
            Please complete the details below. These ensure every cat goes to a safe and loving home.
          </p>
        </div>

        <form className="adoption-process-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="First and Last Name"
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </label>

          <label>
            Age
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              maxLength="3"
              placeholder="18 and above"
            />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </label>

          <label>
            Phone number
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              maxLength="11"
              placeholder="11 digits (e.g., 08123456789)"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </label>

          <label>
            Email
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@domain.com"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </label>

          <label className="adoption-full-width">
            Home address
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </label>

          <div className="section-block adoption-full-width">
            <h2 className="section-title">Living Situation</h2>

            <div className="option-group adoption-full-width">
              <p className="option-group-title">Type of Residence</p>
              <div className="option-grid">
                <label className="option-item"><input type="radio" name="livingSituation" value="house" checked={formData.livingSituation === "house"} onChange={handleInputChange} /> House</label>
                <label className="option-item"><input type="radio" name="livingSituation" value="apartment" checked={formData.livingSituation === "apartment"} onChange={handleInputChange} /> Apartment</label>
                <label className="option-item"><input type="radio" name="livingSituation" value="condo" checked={formData.livingSituation === "condo"} onChange={handleInputChange} /> Condo</label>
                <label className="option-item"><input type="radio" name="livingSituation" value="other" checked={formData.livingSituation === "other"} onChange={handleInputChange} /> Other</label>
              </div>
              {errors.livingSituation && <span className="error-message">{errors.livingSituation}</span>}
            </div>

            <div className="option-group adoption-full-width">
              <p className="option-group-title">Ownership</p>
              <div className="option-grid">
                <label className="option-item"><input type="radio" name="ownership" value="own" checked={formData.ownership === "own"} onChange={handleInputChange} /> Own</label>
                <label className="option-item"><input type="radio" name="ownership" value="rent" checked={formData.ownership === "rent"} onChange={handleInputChange} /> Rent</label>
              </div>
              {errors.ownership && <span className="error-message">{errors.ownership}</span>}
            </div>

            <div className="option-group adoption-full-width">
              <p className="option-group-title">Landlord Allows Pets</p>
              <div className="option-grid">
                <label className="option-item"><input type="radio" name="landlordAllowsPets" value="yes" checked={formData.landlordAllowsPets === "yes"} onChange={handleInputChange} /> Yes</label>
                <label className="option-item"><input type="radio" name="landlordAllowsPets" value="no" checked={formData.landlordAllowsPets === "no"} onChange={handleInputChange} /> No</label>
                <label className="option-item"><input type="radio" name="landlordAllowsPets" value="not-applicable" checked={formData.landlordAllowsPets === "not-applicable"} onChange={handleInputChange} /> Not Applicable</label>
              </div>
              {errors.landlordAllowsPets && <span className="error-message">{errors.landlordAllowsPets}</span>}
            </div>
          </div>

          <div className="option-group adoption-full-width">
            <p className="option-group-title">Household Members</p>
            <div className="option-grid">
              <label className="option-item"><input type="radio" name="householdMembers" value="alone" checked={formData.householdMembers === "alone"} onChange={handleInputChange} /> Living Alone</label>
              <label className="option-item"><input type="radio" name="householdMembers" value="family" checked={formData.householdMembers === "family"} onChange={handleInputChange} /> With Family</label>
              <label className="option-item"><input type="radio" name="householdMembers" value="roommates" checked={formData.householdMembers === "roommates"} onChange={handleInputChange} /> With Roommates</label>
            </div>
            {errors.householdMembers && <span className="error-message">{errors.householdMembers}</span>}
          </div>

          <div className="option-group adoption-full-width">
            <p className="option-group-title">Children at Home</p>
            <div className="option-grid">
              <label className="option-item"><input type="radio" name="childrenAtHome" value="none" checked={formData.childrenAtHome === "none"} onChange={handleInputChange} /> None</label>
              <label className="option-item"><input type="radio" name="childrenAtHome" value="0-5" checked={formData.childrenAtHome === "0-5"} onChange={handleInputChange} /> Yes (0–5 yrs)</label>
              <label className="option-item"><input type="radio" name="childrenAtHome" value="6-12" checked={formData.childrenAtHome === "6-12"} onChange={handleInputChange} /> Yes (6–12 yrs)</label>
              <label className="option-item"><input type="radio" name="childrenAtHome" value="13+" checked={formData.childrenAtHome === "13+"} onChange={handleInputChange} /> Yes (13+)</label>
            </div>
            {errors.childrenAtHome && <span className="error-message">{errors.childrenAtHome}</span>}
          </div>

          <div className="option-group adoption-full-width">
            <p className="option-group-title">Other Pets</p>
            <div className="option-grid">
              <label className="option-item"><input type="checkbox" checked={formData.otherPets.includes("none")} onChange={(e) => handleMultiCheckboxChange("otherPets", "none", e.target.checked)} /> None</label>
              <label className="option-item"><input type="checkbox" checked={formData.otherPets.includes("cats")} onChange={(e) => handleMultiCheckboxChange("otherPets", "cats", e.target.checked)} /> Cats</label>
              <label className="option-item"><input type="checkbox" checked={formData.otherPets.includes("dogs")} onChange={(e) => handleMultiCheckboxChange("otherPets", "dogs", e.target.checked)} /> Dogs</label>
              <label className="option-item"><input type="checkbox" checked={formData.otherPets.includes("other")} onChange={(e) => handleMultiCheckboxChange("otherPets", "other", e.target.checked)} /> Other</label>
            </div>
            {errors.otherPets && <span className="error-message">{errors.otherPets}</span>}
          </div>

          <div className="section-block adoption-full-width">
            <h2 className="section-title">Pet Experience & Care</h2>

            <div className="option-group adoption-full-width">
              <p className="option-group-title">Pet Experience</p>
              <div className="option-grid">
                <label className="option-item"><input type="radio" name="petExperience" value="first-time" checked={formData.petExperience === "first-time"} onChange={handleInputChange} /> First-time owner</label>
                <label className="option-item"><input type="radio" name="petExperience" value="had-before" checked={formData.petExperience === "had-before"} onChange={handleInputChange} /> Had pets before</label>
                <label className="option-item"><input type="radio" name="petExperience" value="currently-have" checked={formData.petExperience === "currently-have"} onChange={handleInputChange} /> Currently have pets</label>
              </div>
              {errors.petExperience && <span className="error-message">{errors.petExperience}</span>}
            </div>

            <div className="option-group adoption-full-width">
              <p className="option-group-title">Where will the cat stay?</p>
              <div className="option-grid">
                <label className="option-item"><input type="radio" name="catStay" value="indoors" checked={formData.catStay === "indoors"} onChange={handleInputChange} /> Indoors</label>
                <label className="option-item"><input type="radio" name="catStay" value="outdoors" checked={formData.catStay === "outdoors"} onChange={handleInputChange} /> Outdoors</label>
                <label className="option-item"><input type="radio" name="catStay" value="both" checked={formData.catStay === "both"} onChange={handleInputChange} /> Both</label>
              </div>
              {errors.catStay && <span className="error-message">{errors.catStay}</span>}
            </div>

            <div className="option-group adoption-full-width">
              <p className="option-group-title">Daily Availability</p>
              <div className="option-grid">
                <label className="option-item"><input type="radio" name="dailyAvailability" value="mostly-home" checked={formData.dailyAvailability === "mostly-home"} onChange={handleInputChange} /> Mostly at home</label>
                <label className="option-item"><input type="radio" name="dailyAvailability" value="away-4-8" checked={formData.dailyAvailability === "away-4-8"} onChange={handleInputChange} /> Away 4–8 hours</label>
                <label className="option-item"><input type="radio" name="dailyAvailability" value="away-most-day" checked={formData.dailyAvailability === "away-most-day"} onChange={handleInputChange} /> Away most of the day</label>
              </div>
              {errors.dailyAvailability && <span className="error-message">{errors.dailyAvailability}</span>}
            </div>

            <div className="option-group adoption-full-width">
              <p className="option-group-title">Reason for Adopting</p>
              <div className="option-grid">
                <label className="option-item"><input type="checkbox" checked={formData.reasonForAdopting.includes("companion")} onChange={(e) => handleMultiCheckboxChange("reasonForAdopting", "companion", e.target.checked)} /> Companion</label>
                <label className="option-item"><input type="checkbox" checked={formData.reasonForAdopting.includes("family")} onChange={(e) => handleMultiCheckboxChange("reasonForAdopting", "family", e.target.checked)} /> For family</label>
                <label className="option-item"><input type="checkbox" checked={formData.reasonForAdopting.includes("rescue")} onChange={(e) => handleMultiCheckboxChange("reasonForAdopting", "rescue", e.target.checked)} /> Rescue</label>
                <label className="option-item"><input type="checkbox" checked={formData.reasonForAdopting.includes("emotional-support")} onChange={(e) => handleMultiCheckboxChange("reasonForAdopting", "emotional-support", e.target.checked)} /> Emotional support</label>
                <label className="option-item"><input type="checkbox" checked={formData.reasonForAdopting.includes("other")} onChange={(e) => handleMultiCheckboxChange("reasonForAdopting", "other", e.target.checked)} /> Other</label>
              </div>
              {formData.reasonForAdopting.includes("other") && (
                <div className="other-reason-input">
                  <label>
                    Specify other reason
                    <input
                      type="text"
                      name="reasonOtherText"
                      value={formData.reasonOtherText}
                      onChange={handleInputChange}
                      placeholder="Enter your reason"
                    />
                  </label>
                </div>
              )}
              {errors.reasonForAdopting && <span className="error-message">{errors.reasonForAdopting}</span>}
              {errors.reasonOtherText && <span className="error-message">{errors.reasonOtherText}</span>}
            </div>
          </div>

          <div className="adoption-agreements adoption-full-width">
            <h2>Agreement Requirements</h2>

            <label className="agreement-check">
              <input type="checkbox" name="properCare" checked={formData.properCare} onChange={handleInputChange} />
              <span className="agreement-check-text">Agreement to provide proper care</span>
              <span className="agreement-info-wrap" tabIndex={0} aria-label="More details for proper care agreement">
                ?
                <span className="agreement-tooltip">
                  You commit to providing safe shelter, quality food, clean drinking water, and daily attention.
                </span>
              </span>
              {errors.properCare && <span className="error-message">{errors.properCare}</span>}
            </label>

            <label className="agreement-check">
              <input type="checkbox" name="vetVisits" checked={formData.vetVisits} onChange={handleInputChange} />
              <span className="agreement-check-text">Willingness for vet visits</span>
              <span className="agreement-info-wrap" tabIndex={0} aria-label="More details for vet visits agreement">
                ?
                <span className="agreement-tooltip">
                  You agree to regular veterinary checkups and immediate treatment when the cat is sick or injured.
                </span>
              </span>
              {errors.vetVisits && <span className="error-message">{errors.vetVisits}</span>}
            </label>

            <label className="agreement-check">
              <input type="checkbox" name="adoptionFee" checked={formData.adoptionFee} onChange={handleInputChange} />
              <span className="agreement-check-text">Adoption fee agreement</span>
              <span className="agreement-info-wrap" tabIndex={0} aria-label="More details for adoption fee agreement">
                ?
                <span className="agreement-tooltip">
                  You acknowledge and accept the required adoption fee that helps support rescue, vaccination, and medical care.
                </span>
              </span>
              {errors.adoptionFee && <span className="error-message">{errors.adoptionFee}</span>}
            </label>
          </div>

          <div className="adoption-actions-row adoption-full-width">
            <button type="submit" className="about-link-btn adoption-submit-btn">Submit Application</button>
            <Link to="/adopt" className="view-all-btn adoption-back-btn">Back</Link>
          </div>
        </form>

        {showSuccessModal && (
          <div className="success-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="success-modal-title">
            <div className="success-modal-box">
              <div className="success-check-icon" aria-hidden="true">✓</div>
              <h2 id="success-modal-title">Application Submitted Successfully </h2>
              <p>
                Thank you for applying to adopt. We received your application and will contact you soon.
              </p>
              <button type="button" className="about-link-btn success-modal-close-btn" onClick={handleCloseSuccessModal}>
                Exit
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdoptionProcess;
