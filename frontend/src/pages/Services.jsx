import React from 'react';
import Card from '../components/Card';

const Services = () => {
  const services = [
    {
      icon: '🤝',
      title: 'Companionship Visits',
      description: 'Regular friendly visits to provide emotional support and combat loneliness. Our volunteers engage in meaningful conversations and activities.',
      features: ['Weekly visits', 'Phone check-ins', 'Social activities', 'Emotional support']
    },
    {
      icon: '🛒',
      title: 'Grocery & Errand Assistance',
      description: 'Help with shopping, picking up prescriptions, and running other essential errands to maintain independence.',
      features: ['Grocery shopping', 'Prescription pickup', 'Bank visits', 'Post office runs']
    },
    {
      icon: '🏠',
      title: 'Household Help',
      description: 'Light household tasks and maintenance to keep homes safe and comfortable.',
      features: ['Light cleaning', 'Laundry assistance', 'Basic repairs', 'Home organization']
    },
    {
      icon: '💊',
      title: 'Medical Support',
      description: 'Assistance with medical appointments, medication management, and understanding health information.',
      features: ['Appointment reminders', 'Medical transport', 'Medication management', 'Health education']
    },
    {
      icon: '📚',
      title: 'Technology Assistance',
      description: 'Help with smartphones, computers, and online services to stay connected in the digital age.',
      features: ['Device setup', 'Video calling', 'Online banking', 'Email assistance']
    },
    {
      icon: '🎨',
      title: 'Recreational Activities',
      description: 'Organized activities and outings to promote social engagement and mental well-being.',
      features: ['Group activities', 'Day trips', 'Arts & crafts', 'Exercise classes']
    }
  ];

  return (
    <div>
      {/* Header */}
      <section className="text-center py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-text mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive support services designed to enhance the quality of life for seniors
            while providing meaningful opportunities for volunteers to make a difference.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              >
                <ul className="space-y-1 text-sm text-gray-600">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-accent mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Register</h3>
              <p>Create your profile as a senior or volunteer</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p>Seniors post requests, volunteers browse opportunities</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Match</h3>
              <p>Our system connects compatible seniors and volunteers</p>
            </div>
            <div>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Support</h3>
              <p>Provide/receive help and leave feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-text mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community today and experience the difference compassionate connections can make.
          </p>
          <a href="/register" className="btn-primary">
            Join Senior Saathi
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
