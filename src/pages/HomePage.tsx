
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  // Example featured menu items
  const featuredItems = [
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
    }
  ];

  return (
    <Layout darkHeader={true}>
      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            A Culinary Experience Like No Other
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in">
            Indulge in the finest cuisine crafted with passion and the freshest ingredients.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in">
            <Button size="lg" asChild>
              <Link to="/reservation">Reserve a Table</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-foreground" asChild>
              <Link to="/menu">Explore Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Tarinamme</h2>
              <p className="mb-4 text-lg">
              Perustamisestamme lähtien baarimme ja ravintolamme on noudattanut yksinkertaista missiota:
               valmistaa poikkeuksellisia juomia parhaista paikallisista raaka-aineista 
               ja tarjota unohtumaton vieraanvaraisuuskokemus.
              </p>
              <p className="mb-6 text-lg">
                Meidän intohimomme on luoda makuja, jotka vievät sinut matkalle ympäri maailmaa,
                 ja jokainen annos on suunniteltu herättämään aistisi henkiin.
              </p>
              <Button asChild>
                <Link to="/about">Lue lisää meistä</Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" 
                alt="Restaurant interior" 
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Esittelyssä olevat ruoat</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredItems.map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-60 w-full object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <span className="text-primary font-medium">{item.price}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link to="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-foreground text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Guests Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-foreground/80 p-6 rounded-lg border border-white/10">
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="italic">"The food was absolutely delicious and the service was impeccable. 
                I highly recommend the truffle risotto!"</p>
            </div>
            <div className="bg-foreground/80 p-6 rounded-lg border border-white/10">
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="font-semibold">Michael Thompson</h4>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="italic">"An extraordinary dining experience.
                 The atmosphere was elegant yet comfortable,
                  and every dish was a work of art."</p>
            </div>
            <div className="bg-foreground/80 p-6 rounded-lg border border-white/10">
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="italic">"We celebrated our anniversary here and
                 it couldn't have been more perfect.
                  The staff went above and beyond to make our night special."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Reserve Your Table Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the exquisite flavors and ambiance of Savoria Bistro. 
            Make a reservation and treat yourself to an unforgettable dining experience.
          </p>
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90" asChild>
            <Link to="/reservation">Book a Table Now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
