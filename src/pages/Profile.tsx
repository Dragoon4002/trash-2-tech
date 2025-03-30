import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { LogOut, Trash2, User, Settings, Bell, Shield } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
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

const Profile = () => {
  const { user, signOut } = useAuth();
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  if (!user) {
    return null;
  }

  const handleClearAllData = () => {
    localStorage.removeItem('trash2tech_history');
    // Keep the user logged in, but clear all other app data
    // In a real app, this might involve API calls to clear server-side data
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile & Settings</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.photoURL} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <Separator className="my-6" />

            <Button 
              variant="destructive" 
              className="gap-2"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>App Settings</CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="ai-suggestions" className="text-base flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  AI Suggestions
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enable AI-powered recommendations for waste disposal
                </p>
              </div>
              <Switch 
                id="ai-suggestions" 
                checked={aiSuggestions}
                onCheckedChange={setAiSuggestions}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications" className="text-base flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for recycling events and tips
                </p>
              </div>
              <Switch 
                id="notifications" 
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy & Data</CardTitle>
            <CardDescription>Manage your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <Shield className="h-5 w-5 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <h3 className="text-sm font-medium">Privacy Policy</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Our privacy policy explains how we handle your data
                </p>
                <Button variant="link" className="p-0 h-auto" onClick={() => {}}>
                  View Privacy Policy
                </Button>
              </div>
            </div>

            <Separator />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive/10 gap-2">
                  <Trash2 className="h-4 w-4" />
                  Clear All App Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your app data including history, saved items, and preferences. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAllData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Yes, delete everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
