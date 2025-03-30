
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import ImageUploader from '@/components/upload/ImageUploader';
import TextInput from '@/components/upload/TextInput';

const Dashboard = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [textDescription, setTextDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleImageSelected = (file: File) => {
    setUploadedImage(file);
  };

  const handleAnalyze = () => {
    // Validate that we have either an image or a description
    if (!uploadedImage && !textDescription.trim()) {
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Navigate to results page
      navigate('/identification', {
        state: {
          itemName: 'Plastic Water Bottle',
          confidenceScore: 95,
          imageUrl: uploadedImage ? URL.createObjectURL(uploadedImage) : null,
          description: textDescription || 'A clear plastic water bottle with a blue cap, partially crushed'
        }
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">What Do You Want to Dispose?</h1>
          <p className="text-muted-foreground">
            Upload an image or describe your item to get waste management recommendations
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload an Image</CardTitle>
            <CardDescription>
              For better results, ensure your item is clearly visible in the image
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUploader onImageSelected={handleImageSelected} />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Describe Your Item</CardTitle>
            <CardDescription>
              What material is it made of? What condition is it in?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TextInput 
              value={textDescription} 
              onChange={setTextDescription} 
            />
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || (!uploadedImage && !textDescription.trim())}
            size="lg"
            className="px-8"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : 'Analyze Item'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
