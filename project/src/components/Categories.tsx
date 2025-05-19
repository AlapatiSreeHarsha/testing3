import React from 'react';
import { Music2, Palette, Code, Camera, Mic, Video } from 'lucide-react';

const categories = [
  { icon: Music2, name: 'Music', color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-600' },
  { icon: Palette, name: 'Art', color: 'bg-purple-500', gradient: 'from-purple-500 to-purple-600' },
  { icon: Code, name: 'Development', color: 'bg-green-500', gradient: 'from-green-500 to-green-600' },
  { icon: Camera, name: 'Photography', color: 'bg-red-500', gradient: 'from-red-500 to-red-600' },
  { icon: Mic, name: 'Voice', color: 'bg-yellow-500', gradient: 'from-yellow-500 to-yellow-600' },
  { icon: Video, name: 'Video', color: 'bg-pink-500', gradient: 'from-pink-500 to-pink-600' },
];

const Categories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Explore Categories</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Discover talented creators across different domains and find your perfect collaboration match</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="flex flex-col items-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group backdrop-blur-sm hover:bg-white/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-br ${category.gradient} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-500 ease-out`}>
                <category.icon size={28} className="group-hover:animate-bounce" />
              </div>
              <h3 className="mt-4 font-medium text-gray-900 group-hover:text-purple-600 transition-colors duration-300">{category.name}</h3>
              <div className="h-0.5 w-0 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300 mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;