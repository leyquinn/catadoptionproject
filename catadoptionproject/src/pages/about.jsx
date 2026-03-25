function About() {
  return (
    <>
      <header className="about-hero-wrapper">
        <div
          className="about-hero-slide"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/straycatshero1.jpg')",
          }}
        >
          <div className="hero-content">
            <h1>About Purrfect Match</h1>
            <p>Our mission is to rescue, protect, and rehome cats in need.</p>
          </div>
        </div>
      </header>

      <section className="about-page-content">
        <div className="about-page-container">
          <h2>Who We Are</h2>
          <p>
            Purrfect Match is a community-led cat rescue initiative based on compassion, action, and responsible care.
            We focus on helping stray, abandoned, and vulnerable felines find safety and stability.
            Our team is made up of volunteers, foster families, veterinarians, and supporters who share the same purpose.
            We believe that every cat deserves food, medical care, emotional healing, and a chance at a forever home.
            Through rescue and adoption, we work every day to turn difficult beginnings into hopeful new chapters.
          </p>

          <h2>Mission</h2>
          <p>
            Our mission is to rescue cats in need and provide immediate support through shelter, treatment, and daily care.
            We aim to rehabilitate each rescued cat physically and emotionally so they can thrive in a family environment.
            We promote responsible adoption by carefully matching cats with homes that can meet their needs.
            We also educate the community about proper pet care, spay and neuter practices, and humane treatment.
            By combining rescue, rehabilitation, and advocacy, we strive to reduce neglect and prevent future abandonment.
          </p>

          <h2>Vision</h2>
          <p>
            Our vision is a future where no cat is left suffering on the streets without care or protection.
            We envision communities where adoption is prioritized over buying pets and where compassion guides action.
            We want every rescued cat to be placed in a safe, loving, and lifelong home.
            We aspire to build a strong network of partners and volunteers that can sustain long-term rescue efforts.
            Ultimately, we see a kinder society where animal welfare is treated as a shared responsibility.
          </p>
        </div>
      </section>
    </>
  );
}

export default About;