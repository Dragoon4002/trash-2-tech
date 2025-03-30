
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ActionOptionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

const ActionOption: React.FC<ActionOptionProps> = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
}) => {
  return (
    <Card className="flex flex-col items-center p-6 cursor-pointer hover:shadow-md transition-all duration-200" onClick={onClick}>
      <div 
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${color}`}
      >
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground text-center mb-4">{description}</p>
      <Button variant="outline" className="mt-auto">
        Select
      </Button>
    </Card>
  );
};

export default ActionOption;
