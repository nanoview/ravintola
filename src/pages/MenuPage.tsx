
import Layout from '../components/Layout';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("PIZZAT");
  
  const menuCategories = [ 
    { id: "PIZZAT", name: "PIZZAT" },
    { id: "KEBABIT", name: "KEBABIT" },
    { id: "JUOMAT", name: "JUOMAT" },
    { id: "SALAATIT", name: "SALAATIT" },
    { id: "KANARUOAT", name: "KANARUOAT" },
    { id: "KANALEIKKEET", name: "KANALEIKKEET" },
    { id: "PIHIVIT", name: "PIHIVIT" },
    { id: "BURGERIT", name: "BURGERIT" }
  ];

  const menuItems = {
    PIZZAT: [
      {
        id: 1,
        name: "Bruschetta",
        description: "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil.",
        price: "$8.99",
        image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: 2,
        name: "Arancini",
        description: "Crispy fried rice balls stuffed with mozzarella, peas, and a touch of saffron.",
        price: "$10.99",
        image: "https://images.unsplash.com/photo-1599789197514-47270cd526b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: 3,
        name: "Calamari Fritti",
        description: "Lightly battered and fried calamari served with lemon aioli and marinara sauce.",
        price: "$12.99",
        image: "https://images.unsplash.com/photo-1584947897558-4e06f5024915?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    ],
    KEBABIT: [
      {
        id: 1,
        name: "Herb-Crusted Salmon",
        description: "Fresh Atlantic salmon with a crispy herb crust, served with roasted vegetables and lemon butter sauce.",
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: 2,
        name: "Truffle Risotto",
        description: "Creamy Arborio rice cooked with wild mushrooms, finished with truffle oil and parmesan.",
        price: "$22.99",
        image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: 3,
        name: "Filet Mignon",
        description: "Prime cut filet mignon cooked to perfection, served with mashed potatoes and seasonal vegetables.",
        price: "$34.99",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: 4,
        name: "Chicken Parmesan",
        description: "Breaded chicken breast topped with marinara sauce and melted mozzarella, served with spaghetti.",
        price: "$21.99",
        image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    ],
    SALAATIT: [
      {
        id: 1,
        name: "Tiramisu",
        description: "Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream.",
        price: "$9.99",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: 2,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
        price: "$10.99",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: 3,
        name: "Crème Brûlée",
        description: "Rich custard base topped with a layer of hardened caramelized sugar.",
        price: "$8.99",
        image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    ],
    JUOMAT: [
      {
        id: 1,
        name: "Signature Sangria",
        description: "Our house specialty with red wine, fresh fruit, and a splash of brandy.",
        price: "$12.99",
        image: "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: 2,
        name: "Espresso Martini",
        description: "A sophisticated mix of vodka, coffee liqueur, and freshly brewed espresso.",
        price: "$14.99",
        image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: 3,
        name: "Craft Beer Selection",
        description: "Rotating selection of local craft beers. Ask your server for today's options.",
        price: "$7.99",
        image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    ]
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Ruokalista</h1>
          <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
          Tutustu huolella laadittuun ruokalistaamme,
           jossa on käytetty parhaita raaka-aineita ja kulinaarisia perinteitä.
          </p>

          <Tabs defaultValue="PIZZAT" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              {menuCategories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.keys(menuItems).map(category => (
              <TabsContent key={category} value={category} className="pt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {menuItems[category as keyof typeof menuItems].map(item => (
                    <div key={item.id} className="flex bg-white rounded-lg overflow-hidden shadow-md">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-1/3 object-cover"
                      />
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <span className="text-primary font-medium">{item.price}</span>
                        </div>
                        <p className="text-muted-foreground text-sm flex-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
