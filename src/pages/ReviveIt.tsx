
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, MapPin, ChevronLeft, AlertTriangle } from 'lucide-react';

interface LocationState {
  itemName: string;
  imageUrl: string | null;
  description: string;
}

const ReviveIt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  // If no state, redirect to home
  if (!state) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">No item selected</h1>
          <p className="mb-6">Please return to the home page and upload an item first.</p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const { itemName, imageUrl } = state;

  const handleMarkAsDone = () => {
    // Save to history with the selected action
    const history = JSON.parse(localStorage.getItem('trash2tech_history') || '[]');
    const updatedHistory = history.map((item: any) => {
      if (item.itemName === itemName) {
        return { ...item, action: 'revive-it', actionDate: new Date().toISOString() };
      }
      return item;
    });
    localStorage.setItem('trash2tech_history', JSON.stringify(updatedHistory));
    
    // Navigate back to home
    navigate('/');
  };

  // Mock recycling centers
  const recyclingCenters = [
    {
      id: 1,
      name: "EcoRecycle Center",
      address: "123 Green St, Cityville",
      distance: "0.8 miles",
      hours: "Mon-Sat: 8am-6pm",
      acceptedItems: ["Plastic bottles", "Paper", "Glass", "Metal"]
    },
    {
      id: 2,
      name: "Planet Recyclers",
      address: "456 Earth Way, Countyville",
      distance: "3.2 miles",
      hours: "Mon-Fri: 7am-7pm, Sat: 8am-12pm",
      acceptedItems: ["All plastics", "Cardboard", "Electronics"]
    },
    {
      id: 3,
      name: "Community Recycling Hub",
      address: "789 Sustainable Blvd, Greentown",
      distance: "5.1 miles",
      hours: "Mon-Sun: 9am-5pm",
      acceptedItems: ["Plastic bottles", "Aluminum cans", "Paper products"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Identification
        </Button>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">ReVive It: Recycling</h1>
            <p className="text-muted-foreground">
              Guidelines for properly recycling {itemName}
            </p>
          </div>
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt={itemName} 
              className="w-16 h-16 rounded-md object-cover"
            />
          )}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recycling Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-t2t-green-500">Preparation Steps ✓</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-t2t-green-500 mr-2 mt-0.5" />
                    <span>Rinse the bottle to remove any residual liquid</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-t2t-green-500 mr-2 mt-0.5" />
                    <span>Remove cap (check if your center accepts caps separately)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-t2t-green-500 mr-2 mt-0.5" />
                    <span>Compress the bottle to save space in recycling bins</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-t2t-green-500 mr-2 mt-0.5" />
                    <span>Check for the recycling symbol (#1 PET/PETE for water bottles)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-destructive">Common Mistakes ✗</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-destructive mr-2 font-bold">✗</span>
                    <span>Don't include bottles with food residue</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2 font-bold">✗</span>
                    <span>Don't recycle bottles with straws or non-recyclable attachments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2 font-bold">✗</span>
                    <span>Don't put in plastic bags unless your center specifically accepts them</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-t2t-green-100 rounded-md border border-t2t-green-200">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-t2t-green-600 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-t2t-green-800 font-semibold mb-1">Environmental Impact</h3>
                  <p className="text-t2t-green-700 text-sm">
                    Recycling one plastic bottle saves enough energy to power a 60-watt light bulb for 6 hours, and it reduces the amount of plastic waste in landfills and oceans.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">Nearby Recycling Centers</h2>
        <div className="space-y-4 mb-8">
          {recyclingCenters.map(center => (
            <Card key={center.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="bg-muted p-4 flex items-center justify-center md:w-1/4">
                  <div className="text-center">
                    <MapPin className="h-6 w-6 mx-auto mb-2 text-t2t-green-500" />
                    <span className="text-sm font-medium">{center.distance}</span>
                  </div>
                </div>
                <div className="p-4 md:w-3/4">
                  <h3 className="font-bold text-lg">{center.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{center.address}</p>
                  <p className="text-sm mb-2"><span className="font-medium">Hours:</span> {center.hours}</p>
                  <div>
                    <span className="text-sm font-medium">Accepted items:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {center.acceptedItems.map((item, idx) => (
                        <span 
                          key={idx} 
                          className="text-xs px-2 py-1 bg-secondary rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button size="lg" onClick={handleMarkAsDone}>
            Mark as Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviveIt;
