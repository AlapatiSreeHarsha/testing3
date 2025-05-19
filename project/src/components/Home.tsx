import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, Bookmark, Music2, Video, Camera, Code, Palette } from 'lucide-react';

interface TalentPost {
  id: number;
  username: string;
  userAvatar: string;
  type: string;
  title: string;
  description: string;
  mediaUrl: string;
  likes: number;
  comments: number;
  shares: number;
}

const dummyTalents: TalentPost[] = [
  {
    id: 1,
    username: "melody_maker",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3",
    type: "Music",
    title: "Original Piano Composition - 'Rainy Days'",
    description: "A melancholic piece inspired by rainy afternoons. Let me know what you think! 🎹✨",
    mediaUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3",
    likes: 234,
    comments: 45,
    shares: 12
  },
  {
    id: 2,
    username: "digital_artist",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
    type: "Art",
    title: "Digital Art Series - 'Future Cities'",
    description: "Exploring the intersection of nature and technology in future urban landscapes. Created using Procreate. 🎨",
    mediaUrl: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?ixlib=rb-4.0.3",
    likes: 567,
    comments: 89,
    shares: 34
  },
  {
    id: 3,
    username: "dance_spirit",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3",
    type: "Dance",
    title: "Contemporary Dance - 'Freedom'",
    description: "A piece about breaking free from constraints. Music: 'Liberation' by SoundArtist 💃",
    mediaUrl: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-4.0.3",
    likes: 789,
    comments: 123,
    shares: 56
  },
  {
    id: 4,
    username: "code_ninja",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
    type: "Development",
    title: "Interactive 3D Portfolio",
    description: "Built with Three.js and React. Check out this 3D interactive portfolio I created! 💻",
    mediaUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3",
    likes: 345,
    comments: 67,
    shares: 23
  },
  {
    id: 5,
    username: "photo_storyteller",
    userAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3",
    type: "Photography",
    title: "Street Life Series",
    description: "Capturing the essence of city life. Shot on Sony A7III. 📸",
    mediaUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3",
    likes: 678,
    comments: 91,
    shares: 45
  }
];

const Home: React.FC = () => {
  const [talents] = useState<TalentPost[]>(dummyTalents);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Music':
        return <Music2 className="h-5 w-5 text-blue-500" />;
      case 'Art':
        return <Palette className="h-5 w-5 text-purple-500" />;
      case 'Development':
        return <Code className="h-5 w-5 text-green-500" />;
      case 'Photography':
        return <Camera className="h-5 w-5 text-red-500" />;
      case 'Video':
        return <Video className="h-5 w-5 text-pink-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4">
      {talents.map((talent) => (
        <div key={talent.id} className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          {/* Post Header */}
          <div className="flex items-center p-4">
            <img 
              src={talent.userAvatar} 
              alt={talent.username}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <p className="font-semibold text-gray-900">{talent.username}</p>
                <span className="ml-2 flex items-center text-sm text-gray-500">
                  {getIcon(talent.type)}
                  <span className="ml-1">{talent.type}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Media Content */}
          <div className="relative pb-[56.25%] bg-gray-100">
            <img 
              src={talent.mediaUrl} 
              alt={talent.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Action Buttons */}
          <div className="px-4 py-2 flex items-center space-x-4 border-t border-gray-100">
            <button className="flex items-center text-gray-700 hover:text-blue-500">
              <ThumbsUp className="h-5 w-5" />
              <span className="ml-2 text-sm">{talent.likes}</span>
            </button>
            <button className="flex items-center text-gray-700 hover:text-blue-500">
              <MessageCircle className="h-5 w-5" />
              <span className="ml-2 text-sm">{talent.comments}</span>
            </button>
            <button className="flex items-center text-gray-700 hover:text-blue-500">
              <Share2 className="h-5 w-5" />
              <span className="ml-2 text-sm">{talent.shares}</span>
            </button>
            <div className="flex-1 text-right">
              <button className="text-gray-700 hover:text-blue-500">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-4 border-t border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-2">{talent.title}</h2>
            <p className="text-gray-600 text-sm">{talent.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
