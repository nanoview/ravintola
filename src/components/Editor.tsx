
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Eye, Image, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Editor() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('main');
  const [isPreview, setIsPreview] = useState(false);
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Menu item saved",
      description: "Your menu item has been saved as a draft.",
    });
  };
  
  const handlePublish = () => {
    toast({
      title: "Menu item published",
      description: "Your menu item has been added to the menu!",
    });
  };

  if (isPreview) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setIsPreview(false)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Editor
          </Button>
        </div>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-2">{name || 'Menu Item Title'}</h2>
          <p className="text-muted-foreground mb-4">{description || 'Menu item description will appear here'}</p>
          <p className="font-medium text-lg">${price || '0.00'}</p>
          <p className="text-sm text-muted-foreground mt-2">Category: {category || 'Uncategorized'}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setIsPreview(true)}>
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save Draft
          </Button>
          <Button onClick={handlePublish}>Publish to Menu</Button>
        </div>
      </div>
      
      <div className="cms-editor bg-card">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Menu Item Name"
          className="w-full p-2 text-3xl font-bold border-none focus:outline-none mb-4"
        />
        
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-4">
            <div className="grid gap-4 grid-cols-1">
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this menu item..."
                  className="w-full p-2 border rounded-md h-32 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-2">
                <Button variant="outline" size="sm">
                  <Image className="mr-2 h-4 w-4" /> Add Image
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="appetizer">Appetizer</option>
                      <option value="main">Main Course</option>
                      <option value="dessert">Dessert</option>
                      <option value="beverage">Beverage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Dietary Tags
                    </label>
                    <input
                      type="text"
                      placeholder="vegetarian, gluten-free, etc."
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Special Notes
                    </label>
                    <textarea
                      placeholder="Spicy, Chef's special, etc."
                      className="w-full p-2 border rounded-md h-24 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
