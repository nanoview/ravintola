
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Image, Upload, X } from 'lucide-react';

export function MediaLibrary() {
  const { toast } = useToast();
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  
  // Mock media data
  const mediaItems = [
    { id: 1, name: 'image1.jpg', url: 'https://source.unsplash.com/random/300x200?sig=1', date: '2025-05-01' },
    { id: 2, name: 'image2.jpg', url: 'https://source.unsplash.com/random/300x200?sig=2', date: '2025-04-29' },
    { id: 3, name: 'image3.jpg', url: 'https://source.unsplash.com/random/300x200?sig=3', date: '2025-04-25' },
    { id: 4, name: 'image4.jpg', url: 'https://source.unsplash.com/random/300x200?sig=4', date: '2025-04-20' },
    { id: 5, name: 'image5.jpg', url: 'https://source.unsplash.com/random/300x200?sig=5', date: '2025-04-15' },
    { id: 6, name: 'image6.jpg', url: 'https://source.unsplash.com/random/300x200?sig=6', date: '2025-04-10' },
  ];

  const handleDelete = (id: number) => {
    // In a real app, this would delete the file
    toast({
      title: "Media deleted",
      description: "The media file has been deleted.",
    });
  };

  const handleUpload = () => {
    // In a real app, this would upload a file
    toast({
      title: "Upload initiated",
      description: "Your file is being uploaded.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="cms-heading">Media Library</h1>
        <Button onClick={handleUpload}>
          <Upload className="mr-2 h-4 w-4" /> Upload New
        </Button>
      </div>
      
      <Tabs defaultValue="grid">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaItems.map((item) => (
              <Card 
                key={item.id} 
                className={`overflow-hidden cursor-pointer relative ${selectedMedia === item.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedMedia(item.id === selectedMedia ? null : item.id)}
              >
                <div className="relative pb-[75%]">
                  <img 
                    src={item.url} 
                    alt={item.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-2">
                  <div className="text-sm font-medium truncate">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.date}</div>
                  {selectedMedia === item.id && (
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="absolute top-2 right-2" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                    >
                      <X size={14} />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Preview</th>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mediaItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50">
                  <td className="py-2">
                    <div className="h-10 w-10 relative">
                      <img 
                        src={item.url} 
                        alt={item.name} 
                        className="absolute inset-0 w-full h-full object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="py-2">{item.name}</td>
                  <td className="py-2 text-muted-foreground">{item.date}</td>
                  <td className="py-2">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                      <X size={14} className="mr-1" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
