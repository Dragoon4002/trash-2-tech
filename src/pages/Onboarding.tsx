
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Recycle, Trash2, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Onboarding = () => {
  const { setIsFirstTimeUser } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setIsFirstTimeUser(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 md:p-4 earth-pattern">
      <div className="w-full max-w-3xl p-3 md:p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Trash 2 Tech</h1>
          <p className="mt-2 text-xl text-t2t-green-600">
            Here's how our platform helps you make smarter disposal decisions
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center space-x-0 w-[100px] md:space-x-2 md:w-[150px]">
              <div className="w-10 h-10 rounded-full bg-t2t-brown-500 text-white flex items-center justify-center">
                1
              </div>
              <span className="font-medium pl-1">Upload</span>
            </div>
            <div className="h-1 w-5 md:w-12 bg-gray-400 mx-1 md:mx-4"></div>
            <div className="flex items-center justify-center space-x-0 w-[100px] md:space-x-2 md:w-[150px]">
              <div className="w-10 h-10 rounded-full bg-t2t-green-500 text-white flex items-center justify-center">
                2
              </div>
              <span className="font-medium pl-1">Identify</span>
            </div>
            <div className="h-1 w-5 md:w-12 bg-gray-400 mx-1 md:mx-4"></div>
            <div className="flex items-center justify-center space-x-0 w-[110px] md:space-x-2 md:w-[150px]">
              <div className="w-10 h-10 rounded-full bg-t2t-orange-500 text-white flex items-center justify-center">
                3
              </div>
              <span className="font-medium w-[70px] md:w-[113px] pl-1">Choose Action</span>
            </div>
          </div>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-t2t-brown-500 flex items-center justify-center mb-4">
              <Trash2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-1">Scrap It</h3>
            <p className="text-gray-600">
              Find proper disposal methods and nearby dump locations for items that can't be recycled.
            </p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-t2t-green-500 flex items-center justify-center mb-4">
              <Recycle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-1">ReVive It</h3>
            <p className="text-gray-600">
              Get recycling instructions and find nearby centers for recyclable materials.
            </p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-t2t-orange-500 flex items-center justify-center mb-4">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-1">Hack It</h3>
            <p className="text-gray-600">
              Discover creative DIY ways to repurpose and upcycle your items.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" className='text-xl' onClick={handleGetStarted}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
