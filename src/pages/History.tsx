
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trash2, 
  Recycle, 
  Lightbulb, 
  ChevronRight, 
  AlertCircle,
  Clock,
  TrashIcon
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HistoryItem {
  id: string;
  date: string;
  itemName: string;
  imageUrl: string | null;
  description: string;
  action?: string;
  actionDate?: string;
  diyProject?: any;
}

const History = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load history from localStorage
    const storedHistory = localStorage.getItem('trash2tech_history');
    if (storedHistory) {
      setHistoryItems(JSON.parse(storedHistory));
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('trash2tech_history');
    setHistoryItems([]);
  };

  const getActionIcon = (action?: string) => {
    switch(action) {
      case 'scrap-it':
        return <Trash2 className="h-5 w-5 text-t2t-brown-500" />;
      case 'revive-it':
        return <Recycle className="h-5 w-5 text-t2t-green-500" />;
      case 'hack-it':
        return <Lightbulb className="h-5 w-5 text-t2t-orange-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleItemClick = (item: HistoryItem) => {
    // If item has action, navigate to the corresponding page
    if (item.action) {
      switch (item.action) {
        case 'scrap-it':
          navigate('/scrap-it', { state: item });
          break;
        case 'revive-it':
          navigate('/revive-it', { state: item });
          break;
        case 'hack-it':
          navigate('/hack-it', { state: item });
          break;
        default:
          navigate('/identification', { state: item });
      }
    } else {
      // If no action yet, navigate to identification
      navigate('/identification', { state: item });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your History</h1>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                <TrashIcon className="h-4 w-4 mr-2" />
                Clear History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your entire history. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearHistory} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Yes, delete all
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {historyItems.length === 0 ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No History Yet</h2>
            <p className="text-muted-foreground mb-6">
              Items you identify will appear here
            </p>
            <Button onClick={() => navigate('/')}>
              Identify an Item
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {historyItems.map((item) => (
              <Card 
                key={item.id} 
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center gap-4">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.itemName} 
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{item.itemName}</h3>
                      {item.action && (
                        <Badge className="ml-2 flex items-center gap-1">
                          {getActionIcon(item.action)}
                          <span>
                            {item.action === 'scrap-it' ? 'Scrapped' : 
                             item.action === 'revive-it' ? 'Recycled' : 
                             item.action === 'hack-it' ? 'DIY Project' : 'Identified'}
                          </span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mb-1">
                      {item.description}
                    </p>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(item.date)}
                    </div>
                  </div>
                  
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Explicitly import ImageIcon to avoid confusion
import { ImageIcon } from 'lucide-react';

export default History;
