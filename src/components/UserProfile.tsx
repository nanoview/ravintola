
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

export function UserProfile() {
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile saved",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="cms-heading">User Profile</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your account information
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSave}>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" defaultValue="Admin User" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="admin@example.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="bio">Biographical Info</Label>
                <textarea 
                  id="bio" 
                  className="w-full min-h-[100px] p-2 border rounded-md" 
                  defaultValue="Content creator and editor."
                ></textarea>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Profile
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Update your password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Password</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
