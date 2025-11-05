import React from 'react';
import Card from '../components/Card';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-text mb-6">
            About Senior Saathi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our mission is to bridge the gap between seniors and compassionate volunteers,
            creating meaningful connections that enrich lives on both sides.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card
              title="Our Mission"
              description="To create a supportive community where seniors can access the help they need while volunteers find purpose through meaningful service. We believe that everyone deserves dignity, companionship, and assistance in their later years."
            />
            <Card
              title="Our Vision"
              description="A world where no senior feels isolated or unsupported. Through our platform, we envision a society where intergenerational connections thrive and everyone can age with grace and dignity."
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-xl">Seniors Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-xl">Active Volunteers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-xl">Requests Fulfilled</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-xl">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-text mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Dr. Sarah Johnson"
              description="Founder & CEO - Geriatric specialist with 15+ years of experience in elderly care."
            />
            <Card
              title="Michael Chen"
              description="Head of Operations - Former social worker passionate about community building."
            />
            <Card
              title="Priya Patel"
              description="Technology Lead - Software engineer dedicated to creating accessible platforms."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
