import React from 'react';
import { Star, ThumbsUp, Grid, Bookmark, Settings } from 'lucide-react';

interface Talent {
  id: number;
  title: string;
  type: string;
  description: string;
  likes: number;
  views: number;
  imageUrl: string;
}

interface UserProfileProps {
  user: {
    name: string;
    email: string;
  };
  talents?: Talent[];
}

const defaultTalents: Talent[] = [
  {
    id: 1,
    title: "Summer Vibes - Original Song",
    type: "Music",
    description: "An original composition featuring acoustic guitar and vocals",
    likes: 156,
    views: 1200,
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    title: "Contemporary Dance Performance",
    type: "Dance",
    description: "Modern dance routine choreographed to electronic music",
    likes: 89,
    views: 750,
    imageUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    title: "Jazz Piano Improvisation",
    type: "Music",
    description: "Freestyle jazz piano performance at local cafe",
    likes: 234,
    views: 1800,
    imageUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    title: "Street Art Mural",
    type: "Art",
    description: "Urban art piece showcasing local culture",
    likes: 445,
    views: 3200,
    imageUrl: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1415&q=80"
  },
  {
    id: 5,
    title: "Acoustic Cover - 'Wonderwall'",
    type: "Music",
    description: "Acoustic guitar cover with unique arrangement",
    likes: 167,
    views: 980,
    imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 6,
    title: "Ballet Performance",
    type: "Dance",
    description: "Classical ballet piece from Swan Lake",
    likes: 278,
    views: 1500,
    imageUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

const UserProfile: React.FC<UserProfileProps> = ({ user, talents = defaultTalents }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-4xl md:text-5xl text-white font-bold">
              {user.name.charAt(0)}
            </span>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
              <h1 className="text-2xl font-semibold text-gray-900 text-center md:text-left">{user.name}</h1>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center md:justify-start space-x-8 mt-6">
              <div className="text-center">
                <span className="font-semibold text-gray-900">{talents.length}</span>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
              <div className="text-center">
                <span className="font-semibold text-gray-900">2.5k</span>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <span className="font-semibold text-gray-900">1.2k</span>
                <p className="text-sm text-gray-500">Following</p>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6 text-center md:text-left">
              <p className="text-gray-500">Showcasing my creative journey through music, dance, and art. 🎵 🎨 💃</p>
              <p className="text-blue-500 mt-1">www.myportfolio.com</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200 mt-8">
          <div className="flex justify-center space-x-12 -mb-px">
            <button className="border-t-2 border-black px-4 py-4 text-sm font-medium flex items-center space-x-2">
              <Grid className="h-4 w-4" />
              <span>POSTS</span>
            </button>
            <button className="text-gray-500 hover:text-gray-700 px-4 py-4 text-sm font-medium flex items-center space-x-2">
              <Bookmark className="h-4 w-4" />
              <span>SAVED</span>
            </button>
          </div>
        </div>
      </div>

      {/* Talents Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
          {talents.map((talent) => (
            <div 
              key={talent.id} 
              className="relative aspect-square group cursor-pointer"
            >
              <img 
                src={talent.imageUrl} 
                alt={talent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-white flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="h-6 w-6" />
                    <span className="font-semibold">{talent.likes}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-6 w-6" />
                    <span className="font-semibold">{talent.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
