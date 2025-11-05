import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-primary to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Senior Saathi
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connecting seniors with compassionate volunteers for emotional support,
            practical help, and meaningful companionship.
          </p>
          <div className="space-x-4">
            <Link to="/register" className="btn-primary bg-white text-primary hover:bg-gray-100">
              Get Started
            </Link>
            <Link to="/about" className="btn-secondary text-white border-white hover:bg-white hover:text-primary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-text mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              icon="🤝"
              title="Companionship"
              description="Regular visits and friendly conversations to combat loneliness and provide emotional support."
            />
            <Card
              icon="🛒"
              title="Practical Help"
              description="Assistance with daily tasks like grocery shopping, medication reminders, and household chores."
            />
            <Card
              icon="💊"
              title="Medical Support"
              description="Help with medical appointments, understanding prescriptions, and health monitoring."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-text mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a senior seeking support or a volunteer ready to help,
            join our community today.
          </p>
          <div className="space-x-4">
            <Link to="/register" className="btn-primary">
              Join as Senior
            </Link>
            <Link to="/register" className="btn-secondary">
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
