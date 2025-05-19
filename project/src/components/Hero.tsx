import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
      <div 
        className="absolute top-0 w-full h-full bg-center bg-cover animate-[kenburns_20s_ease-in-out_infinite]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80')"
        }}>
        <span className="w-full h-full absolute opacity-50 bg-gradient-to-br from-black via-black/70 to-purple-900/50"></span>
      </div>
      
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div className="text-white animate-fade-in-up">
              <h1 className="text-5xl font-bold leading-tight text-white">
                Showcase Your <span className=" bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Talent.</span> Connect. Create.
              </h1>
              <p className="mt-6 text-xl text-gray-200 opacity-0 animate-[slideUp_0.5s_ease-out_0.5s_forwards]">
                Join a community of creators, artists, and innovators. Share your work,
                find collaborators, and bring your ideas to life.
              </p>
              <button 
                onClick={onGetStarted}
                className="mt-10 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-xl hover:from-purple-500 hover:to-blue-400 transition-all duration-300 transform flex items-center mx-auto group"
              >
                <span className="opacity-0 animate-[fadeIn_0.5s_ease-out_1s_forwards]">Get Started</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;