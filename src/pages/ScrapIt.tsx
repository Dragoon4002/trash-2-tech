
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, MapPin, ChevronLeft } from 'lucide-react';

interface LocationState {
  itemName: string;
  imageUrl: string | null;
  description: string;
}

const ScrapIt = () => {
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
        return { ...item, action: 'scrap-it', actionDate: new Date().toISOString() };
      }
      return item;
    });
    localStorage.setItem('trash2tech_history', JSON.stringify(updatedHistory));
    
    // Navigate back to home
    navigate('/');
  };

  // Mock dump site data
  const dumpSites = [
    {
      id: 1,
      name: "City Waste Management Center",
      address: "123 Disposal Rd, Cityville",
      distance: "1.2 miles",
      hours: "Mon-Sat: 8am-6pm",
      acceptedItems: ["Household waste", "Non-recyclable plastics"]
    },
    {
      id: 2,
      name: "County Landfill",
      address: "456 Dump Way, Countyville",
      distance: "5.6 miles",
      hours: "Mon-Fri: 7am-4pm, Sat: 8am-12pm",
      acceptedItems: ["General waste", "Construction debris", "Furniture"]
    },
    {
      id: 3,
      name: "GreenWaste Processing Center",
      address: "789 Eco Boulevard, Greentown",
      distance: "3.8 miles",
      hours: "Mon-Sun: 9am-5pm",
      acceptedItems: ["Food waste", "Yard waste", "Non-recyclable materials"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 text-xl" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Back to Identification
        </Button>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Scrap It: Proper Disposal</h1>
            <p className="text-muted-foreground">
              Guidelines for properly disposing of {itemName}
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
            <CardTitle>Disposal Do's & Don'ts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-t2t-green-500">Do's ✓</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-t2t-green-500 mr-2 mt-0.5" />
                    <span>Compress the bottle to save space in waste bins</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-t2t-green-500 mr-2 mt-0.5" />
                    <span>Remove any non-plastic parts (like metal rings) before disposal</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-t2t-green-500 mr-2 mt-0.5" />
                    <span>Consider recycling instead if your area accepts PET plastics</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-destructive">Don'ts ✗</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-destructive mr-2 font-bold">✗</span>
                    <span>Don't dispose with hazardous waste</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2 font-bold">✗</span>
                    <span>Don't burn plastic as it releases toxic fumes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2 font-bold">✗</span>
                    <span>Don't throw in waterways or natural environments</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-md border border-amber-200">
              <h3 className="text-amber-800 font-semibold mb-2">Environmental Impact</h3>
              <p className="text-amber-700 text-sm">
                Single-use plastic bottles take hundreds of years to decompose and contribute to land and ocean pollution. Consider switching to reusable bottles when possible.
              </p>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">Nearby Disposal Locations</h2>
        <div className="space-y-4 mb-8">
          {dumpSites.map(site => (
            <Card key={site.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="bg-muted p-4 flex items-center justify-center md:w-1/4">
                  <div className="text-center">
                    <MapPin className="h-6 w-6 mx-auto mb-2 text-t2t-brown-500" />
                    <span className="text-sm font-medium">{site.distance}</span>
                  </div>
                </div>
                <div className="p-4 md:w-3/4">
                  <h3 className="font-bold text-lg">{site.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{site.address}</p>
                  <p className="text-sm mb-2"><span className="font-medium">Hours:</span> {site.hours}</p>
                  <div>
                    <span className="text-sm font-medium">Accepted items:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {site.acceptedItems.map((item, idx) => (
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

export default ScrapIt;
