
import { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our menu, want to inquire about events, 
          or just want to say hello, please don't hesitate to reach out.
        </p>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="John Smith" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange}
                  placeholder="Reservation Inquiry" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full min-h-[100px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Let us know how we can help you..."
                  required
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-muted-foreground">123 Gourmet Avenue<br />Culinary District<br />Foodville, FL 34567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-muted-foreground">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">info@savoriabistro.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 11am - 10pm<br />
                      Saturday: 10am - 11pm<br />
                      Sunday: 10am - 9pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-gray-200 h-[300px] rounded-lg overflow-hidden relative">
              {/* Ideally, we would embed an actual map here with a service like Google Maps */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center px-6">
                  <MapPin className="mx-auto h-10 w-10 text-primary mb-3" />
                  <p className="text-muted-foreground">
                    Map would be embedded here using Google Maps or a similar service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
