import React from 'react';
import { Star, MessageSquare, Heart } from 'lucide-react';

const talents = [
  {
    name: 'Sarah Chen',
    title: 'Digital Artist',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    rating: 4.9,
    reviews: 128,
    tags: ['Digital Art', 'Illustration', '3D Design']
  },
  {
    name: 'Marcus Rodriguez',
    title: 'Music Producer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    rating: 4.8,
    reviews: 93,
    tags: ['Electronic', 'Hip Hop', 'Mixing']
  },
  {
    name: 'Emily Watson',
    title: 'Full Stack Developer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    rating: 4.7,
    reviews: 156,
    tags: ['React', 'Node.js', 'TypeScript']
  },
  {
    name: 'David Kim',
    title: 'Photographer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    rating: 4.9,
    reviews: 201,
    tags: ['Portrait', 'Landscape', 'Events']
  }
];

const FeaturedTalents = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Featured Talents</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Connect with our most talented creators and bring your ideas to life</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {talents.map((talent, index) => (
            <div
              key={talent.name}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                  className="h-64 w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  src={talent.image}
                  alt={talent.name}
                />
                <button className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Heart className="h-6 w-6 text-white hover:text-red-500 transition-colors duration-300 cursor-pointer" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">{talent.name}</h3>
                <p className="text-purple-600 font-medium">{talent.title}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {talent.tags.map(tag => (
                    <span key={tag} className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-2 font-medium">{talent.rating}</span>
                    <span className="mx-1 text-gray-400">·</span>
                    <span className="text-gray-600">{talent.reviews} reviews</span>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 transform hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTalents;