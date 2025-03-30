
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft, Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LocationState {
  itemName: string;
  imageUrl: string | null;
  description: string;
}

interface DiyProject {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeRequired: string;
  materials: string[];
  steps: string[];
  imageUrl: string;
}

const HackIt = () => {
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

  // Mock DIY projects
  const diyProjects: DiyProject[] = [
    {
      id: 1,
      title: "Self-Watering Mini Planter",
      difficulty: "Easy",
      timeRequired: "15 minutes",
      materials: [
        "Plastic water bottle",
        "Scissors or craft knife",
        "String or cotton yarn (about 12 inches)",
        "Potting soil",
        "Small plant or seeds",
        "Decorative tape or paint (optional)"
      ],
      steps: [
        "Cut the water bottle in half horizontally.",
        "Poke a hole in the center of the bottle cap.",
        "Thread the string through the cap hole, leaving equal lengths on both sides.",
        "Invert the top half of the bottle and place it into the bottom half, with the cap facing down.",
        "Fill the bottom half with water up to just below the cap.",
        "Add soil to the top section and plant your seeds or small plant.",
        "The string will draw water up into the soil, keeping your plant watered."
      ],
      imageUrl: "https://images.unsplash.com/photo-1517646331032-9e8d337c95e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGxhbnQlMjBpbiUyMGJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 2,
      title: "Bird Feeder",
      difficulty: "Easy",
      timeRequired: "20 minutes",
      materials: [
        "Plastic water bottle",
        "Two wooden spoons or dowels",
        "String or twine",
        "Scissors or craft knife",
        "Bird seed"
      ],
      steps: [
        "Clean and dry the water bottle thoroughly.",
        "Cut small holes on opposite sides of the bottle, about 1/3 up from the bottom.",
        "Push wooden spoons through the holes so they stick out on both sides (these will be perches and feeding areas).",
        "Cut a few small drainage holes in the bottom of the bottle.",
        "Make two holes near the top for hanging string.",
        "Thread string through the top holes to create a hanger.",
        "Fill the bottle with bird seed through the top.",
        "Hang from a tree branch or hook."
      ],
      imageUrl: "https://images.unsplash.com/photo-1603642218609-1f3750e1ee24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlyZCUyMGZlZWRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 3,
      title: "Bottle Terrarium",
      difficulty: "Medium",
      timeRequired: "45 minutes",
      materials: [
        "Large plastic water bottle",
        "Scissors",
        "Small rocks or pebbles",
        "Activated charcoal",
        "Potting soil",
        "Small plants (moss, tiny ferns, etc.)",
        "Spray bottle with water",
        "Long tweezers or chopsticks"
      ],
      steps: [
        "Cut the water bottle horizontally, leaving a larger bottom section (about 2/3 of the bottle).",
        "Add a 1-inch layer of small rocks to the bottom for drainage.",
        "Add a thin layer of activated charcoal to prevent mold growth.",
        "Add a layer of potting soil, about 2 inches deep.",
        "Use tweezers to place small plants in the soil, arranging as desired.",
        "Spray with water to moisten the soil (not soaking wet).",
        "Optional: You can keep the top part of the bottle to create a closed terrarium, or leave it open."
      ],
      imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVycmFyaXVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
    }
  ];

  const handleTryThis = (projectId: number) => {
    // Save to history with the selected action and DIY project
    const history = JSON.parse(localStorage.getItem('trash2tech_history') || '[]');
    const updatedHistory = history.map((item: any) => {
      if (item.itemName === itemName) {
        return { 
          ...item, 
          action: 'hack-it', 
          actionDate: new Date().toISOString(),
          diyProject: diyProjects.find(p => p.id === projectId)
        };
      }
      return item;
    });
    localStorage.setItem('trash2tech_history', JSON.stringify(updatedHistory));
    
    // Navigate back to home
    navigate('/');
  };

  // Utility function for difficulty stars
  const renderDifficultyStars = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    const filledStars = difficulty === 'Easy' ? 1 : difficulty === 'Medium' ? 2 : 3;
    return (
      <div className="flex items-center">
        {[...Array(3)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < filledStars ? 'text-t2t-orange-500 fill-t2t-orange-500' : 'text-muted-foreground'}`} 
          />
        ))}
        <span className="ml-2 text-sm">{difficulty}</span>
      </div>
    );
  };

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
            <h1 className="text-3xl font-bold mb-2">Hack It: DIY Projects</h1>
            <p className="text-muted-foreground">
              Creative ways to repurpose your {itemName}
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

        <div className="mb-8 space-y-6">
          {diyProjects.map(project => (
            <Card key={project.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-48 md:h-full object-cover" 
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <Badge className="bg-t2t-orange-500">{renderDifficultyStars(project.difficulty)}</Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{project.timeRequired}</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Materials Needed:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {project.materials.map((material, idx) => (
                        <li key={idx}>{material}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Steps:</h4>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                      {project.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <Button 
                    className="mt-4" 
                    onClick={() => handleTryThis(project.id)}
                  >
                    Try This
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackIt;
