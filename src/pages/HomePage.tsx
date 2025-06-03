import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import salmonsaladImg from "../assets/images/salmonsalad.png";
import chickenkormaImg from "../assets/images/chickenkorma.png";
import beefmasalaImg from "../assets/images/beefmasala.png";
import terraceImg from "../assets/images/terrace.jpg";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function HomePage() {
  // Example featured menu items
  const featuredItems = [
    {
      id: 1,
      name: "KIRJOLOHENSALAATTI",
      description: "Sisältää Amerikan salaattia, tomaattia ja rucolaa",
      price: "$24.99",
      image: salmonsaladImg,
    },
    {
      id: 2,
      name: "CHICKEN TIKKA MASALA",
      description: "Marinoitua kanaa paistettua maustekastikkeella.",
      price: "$22.99",
      image: chickenkormaImg,
    },
    {
      id: 3,
      name: "NAUDANLIHA MASALA",
      description: "Tehty ja keitetty mausteisella masalakastikkeessa.",
      price: "$34.99",
      image: beefmasalaImg,
    },
  ];

  const [activeOffer, setActiveOffer] = useState(null);
  const [offerLoading, setOfferLoading] = useState(true);

  useEffect(() => {
    async function fetchActiveOffer() {
      setOfferLoading(true);
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("offers")
        .select("*")
        .gte("start_date", now)
        .lte("end_date", now)
        .order("end_date", { ascending: true });
      setActiveOffer(data && data.length > 0 ? data[0] : null);
      setOfferLoading(false);
    }
    fetchActiveOffer();
  }, []);

  return (
    <Layout darkHeader={true}>
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Ruoka- ja juoma elämys
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in">
            "Nauti parhaista ruoista ja juomista, valmistetuista tuoreimmista
            suomalaisista raaka-aineista. The Finnish way."
          </p>
          <div className="flex justify-center gap-4 animate-fade-in">
            <Button size="lg" asChild>
              <Link to="/reservation">Varaa Pöytä</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-fuchsia-500 border-white hover:bg-white hover:text-foreground"
              asChild
            >
              <Link to="/menu">Tutustu ruokalistaan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Meidän pieni tarina</h2>
              <p className="mb-4 text-lg">
                Perustamisestamme lähtien baarimme ja ravintolamme on
                noudattanut yksinkertaista missiota: valmistaa poikkeuksellisia
                juomia parhaista paikallisista raaka-aineista ja tarjota
                unohtumaton vieraanvaraisuuskokemus.
              </p>
              <p className="mb-6 text-lg">
                Meidän intohimomme on luoda makuja, jotka vievät sinut matkalle
                ympäri maailmaa, ja jokainen annos on suunniteltu herättämään
                aistisi henkiin.
              </p>
              <Button asChild>
                <Link to="/about">Lue lisää meistä</Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={terraceImg}
                alt="Terrace"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Esittelyssä olevat ruoat
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-60 w-full object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <span className="text-primary font-medium">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" asChild>
              <Link
                to="/menu"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Näytä koko valikko
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-foreground text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Mitä vieraamme sanovat !
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-foreground/80 p-6 rounded-lg border border-white/10">
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="font-semibold">Aino Lehtonen</h4>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="italic">
                "Ruoka oli aivan herkullista ja palvelu oli erinomaista.
              </p>
            </div>
            <div className="bg-foreground/80 p-6 rounded-lg border border-white/10">
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="font-semibold">Michael Thompson</h4>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="italic">
                "There was a wide variety of drinks and cocktails. I had a
                pleasant evening with local Finnish people and felt a warm,
                home-like atmosphere."
              </p>
            </div>
            <div className="bg-foreground/80 p-6 rounded-lg border border-white/10">
              <div className="flex items-center mb-4">
                <div>
                  <h4 className="font-semibold">Helmi Mäkinen</h4>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="italic">
                "Juhlimme syntymäpäivääni täällä ystävien kanssa. Henkilökunta
                teki kaikkensa tehdäkseen illastamme erityisen."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section (only if offer exists) */}
      {!offerLoading && activeOffer && (
        <section className="py-20 bg-yellow-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-yellow-700">
              Erikoistarjoukset
            </h2>
            <p className="mb-6 text-lg text-yellow-800">
              Katso tämän viikon parhaat tarjoukset ja alennetut annokset!
            </p>
            <Button
              size="lg"
              asChild
              className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold"
            >
              <Link
                to="/offer"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Näytä tarjoukset
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section
        className="py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mummuntupa &#128522; Grandma's Cottage
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            "Tule mummon tupalle tänään! Koe upeat maut ja tunnelma. Varaa pöytä
            tai tule suoraan ja hemmottele itseäsi jollakin hyvällä."
          </p>
        </div>
      </section>
    </Layout>
  );
}
