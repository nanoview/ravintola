import { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Insert contact message into Supabase
    const { error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);
    if (error) {
      toast({
        title: "Virhe! Error!",
        description: `Viestin lähetys epäonnistui. Message sending failed. (${error.message})`,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Viesti lähetetty! Message Sent! ",
      description:
        " Kiitos, että otit meihin yhteyttä. Palaamme asiaan pian. Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4">Ota yhteyttä</h1>
        <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
          Haluaisimme kuulla sinusta! Olipa sinulla kysyttävää ruokalistastamme,
          haluat tiedustella tapahtumia tai vain sanoa hei, älä epäröi ottaa
          meihin yhteyttä.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">
              Lähetä meille viesti
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Sinun nimesi</Label>
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
                <Label htmlFor="email">Sähköpostiosoite</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@esimerkki.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Aihe</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Varaustiedustelut tai muut asiat"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Viestisi</Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full min-h-[100px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Kerro meille, kuinka voimme auttaa sinua..."
                  required
                ></textarea>
              </div>

              <Button type="submit" className="w-full">
                Lähetä viesti
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-6">Yhteystiedot</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Katuosoite</h3>
                    <p className="text-muted-foreground">
                      Vieraskuja 4 (2 krs)
                      <br />
                      02770 Espoo, Finland
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Puhelin</h3>
                    <p className="text-muted-foreground">+358 45 116 9090</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Sähköposti</h3>
                    <p className="text-muted-foreground">
                      info@Ravintolamummuntupa.fi
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Hours - Aukioloajat</h3>
                    <p className="text-muted-foreground">
                      Maanantai - perjantai: klo 11.00 - 22.00
                      <br />
                      Lauantai: klo 10-23
                      <br />
                      Sunnuntai: klo 10-21
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-200 h-[300px] rounded-lg overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.1234567890123!2d24.123456789!3d60.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x123456789abcdef%3A0xabcdef123456789!2sVieraskuja%204%2C%2002770%20Espoo%2C%20Finland!5e0!3m2!1sen!2sfi!4v1234567890123"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
