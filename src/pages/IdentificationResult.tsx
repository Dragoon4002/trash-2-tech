
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import ActionOption from '@/components/actions/ActionOption';
import { Trash2, Recycle, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LocationState {
  itemName: string;
  confidenceScore: number;
  imageUrl: string | null;
  description: string;
}

const IdentificationResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  // Handle case where user navigates directly to this page without state
  if (!state) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">No item identified</h1>
          <p className="mb-6">Please go back to the home page and upload an item for identification.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const { itemName, confidenceScore, imageUrl, description } = state;

  const handleScrapIt = () => {
    navigate('/scrap-it', { state: { itemName, imageUrl, description } });
  };

  const handleReviveIt = () => {
    navigate('/revive-it', { state: { itemName, imageUrl, description } });
  };

  const handleHackIt = () => {
    navigate('/hack-it', { state: { itemName, imageUrl, description } });
  };

  // Save to history
  React.useEffect(() => {
    if (state) {
      const historyItem = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        itemName,
        imageUrl,
        description,
      };
      
      const history = JSON.parse(localStorage.getItem('trash2tech_history') || '[]');
      history.unshift(historyItem);
      localStorage.setItem('trash2tech_history', JSON.stringify(history.slice(0, 50)));
    }
  }, [state]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">We Identified Your Item</h1>
          <p className="text-muted-foreground">
            Now choose what you'd like to do with it
          </p>
        </div>

        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {imageUrl && (
              <div className="md:w-1/3">
                <img 
                  src={imageUrl} 
                  alt={itemName} 
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">{itemName}</h2>
                <Badge className="bg-t2t-blue-400">
                  {confidenceScore}% confident
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">{description}</p>
              
              <div className="bg-secondary/50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Material Properties</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Single-use plastic</li>
                  <li>PET (Polyethylene Terephthalate)</li>
                  <li>Recyclable in most areas</li>
                  <li>Can take up to 450 years to decompose naturally</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <h2 className="text-2xl font-bold mb-4 text-center">Choose an Option</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionOption
            title="Scrap It"
            description="Find proper disposal methods and nearby dump locations"
            icon={Trash2}
            color="bg-t2t-brown-500"
            onClick={handleScrapIt}
          />
          <ActionOption
            title="ReVive It"
            description="Learn how to recycle and find nearby recycling centers"
            icon={Recycle}
            color="bg-t2t-green-500"
            onClick={handleReviveIt}
          />
          <ActionOption
            title="Hack It"
            description="Discover creative DIY ways to repurpose this item"
            icon={Lightbulb}
            color="bg-t2t-orange-500"
            onClick={handleHackIt}
          />
        </div>
      </div>
    </div>
  );
};

export default IdentificationResult;
