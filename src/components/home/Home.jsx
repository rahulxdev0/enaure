import React from 'react';
import { Gem, Leaf, Zap, TrendingUp, Shield, Truck } from 'lucide-react';
import DepartmentCard from '../common/DepartmentCard';

const Home = () => {
  const departments = [
    {
      name: 'Jewellery',
      description: 'Exquisite designs, timeless elegance',
      icon: Gem,
      path: '/jewellery',
      color: 'from-amber-500 to-orange-600',
    },
    {
      name: 'Organic',
      description: 'Pure, natural, and sustainable',
      icon: Leaf,
      path: '/organic',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      name: 'Green Energy',
      description: 'Sustainable solutions for tomorrow',
      icon: Zap,
      path: '/green-energy',
      color: 'from-lime-500 to-green-600',
    },
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $100',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure transactions',
    },
    {
      icon: TrendingUp,
      title: 'Best Quality',
      description: 'Premium products guaranteed',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Enaure</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover premium jewellery, organic products, and green energy solutions all in one place
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#departments"
                className="bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Explore Departments
              </a>
              <a
                href="#features"
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl border-2 border-emerald-600"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Departments</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our three unique departments, each offering carefully curated products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {departments.map((dept, index) => (
              <DepartmentCard key={index} {...dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Enaure?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Enaure for their shopping needs
          </p>
          <a
            href="/jewellery"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Shopping Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
