import Layout from '../components/Layout';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import beefcurryImg from '../assets/images/beefcurry.png';
import butterlambImg from '../assets/images/butterlamb.png';
import chickenburgerImg from '../assets/images/chickenburger.png';
import chickencutletImg from '../assets/images/chickencutlet.png';
import chickenkormaImg from '../assets/images/chickenkorma.png';
import chikencurryImg from '../assets/images/chickencurry.png';
import butterchickenImg from '../assets/images/butterchicken.png';
import kidspizzaImg from '../assets/images/kidspizza.png';
import lambmasalImg from '../assets/images/lambmasal.png';
import malaikoftaImg from '../assets/images/malaikofta.png';
import mixvegImg from '../assets/images/mixveg.png';
import mughlailambImg from '../assets/images/mughlailamb.png';
import nautaburgerImg from '../assets/images/nautaburger.png';
import pepperchickencutletImg from '../assets/images/pepperchickencutlet.png';
import pizzaImg from '../assets/images/pizza.png';
import prawnkormaImg from '../assets/images/prawnkorma.png';
import prawnmasalaImg from '../assets/images/prawnmasala.png';
import salmonsaladImg from '../assets/images/salmonsalad.png';
import spicychickenImg from '../assets/images/spicychicken.png';
import whitewineImg from '../assets/images/whitewine.png';
import redwineImg from '../assets/images/redwine.png';
import beer1Img from '../assets/images/beer1.png';
import beer2Img from '../assets/images/beer2.png';
import ciderImg from '../assets/images/cider.png';
import softdrinkImg from '../assets/images/softdrink.png';
import beefmasalaImg from '../assets/images/beefmasala.png';
import BiriyaniImg from '../assets/images/Biriyani.png';
import salmonpotatoImg from '../assets/images/salmonpotato.png';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("leikkeet");

  const menuCategories = [
    { id: "indian", label: "Intialaiset" },
    { id: "leikkeet", label: "Leikkeet" },
    { id: "burgers", label: "Burgerit" },
    { id: "salads", label: "Salaatit" },
    { id: "pizzas", label: "Pizzat" },
    { id: "beverages", label: "Juomat" }
  ];

  const menuItems = {
    indian: [
      {
        id: 1,
        name: "CHICKEN CURRY",
        description: "Tehty ja keitetty kana spicy curry kastikkeessa",
        price: "16€",
        dietary: "L, G, M, P",
        imageUrl: chikencurryImg
      },
      {
        id: 2,
        name: "BUTTER CHICKEN",
        description: "Marinoitu Tandoori kana paistettu spicy butter kastikkeet",
        price: "18€",
        dietary: "L, G",
        imageUrl: butterchickenImg
      },
      {
        id: 3,
        name: "CHICKEN KORMA",
        description: "Tehty ja keitetty kana maustetulla kookoskastikkeella",
        price: "17€",
        dietary: "L, G",
        imageUrl: chickenkormaImg
      },
      {
        id: 4,
        name: "CHICKEN TIKKA MASALA",
        description: "Marinoitua kanaa paistettua maustekastikkeella",
        price: "22€",
        dietary: "L, G",
        highlight: true,
        imageUrl: spicychickenImg,
      },
      {
        id: 5,
        name: "NAUDANLIHA CURRY",
        description: "Tehty ja keitetty currykastikkeella",
        price: "18€",
        dietary: "L, G, M, P",
        imageUrl: beefcurryImg
      },
      {
        id: 6,
        name: "NAUDANLIHA MASALA",
        description: "Tehty ja keitetty mausteisella masalakastikkeessa",
        price: "19€",
        dietary: "L, G, M, P",
        imageUrl: beefmasalaImg
      },
      {
        id: 7,
        name: "NAUDANLIHA MALAI KOFTA",
        description: "Lihakeema prosessoitu kofta 4 kpl malai-kastikkeella",
        price: "20€",
        dietary: "L, G",
        imageUrl: malaikoftaImg
      },
      {
        id: 8,
        name: "LAMB MUGHLAI",
        description: "Hienosti maustettu lampaan curry kermalla, kananmunalla ja mantelilla",
        price: "22€",
        dietary: "L, G",
        imageUrl: mughlailambImg
      },
      {
        id: 9,
        name: "LAMB BUTTER",
        description: "Tehty ja keitetyt lammat kastikkeella, cashewpähkinöillä",
        price: "21€",
        dietary: "L, G",
        imageUrl: butterlambImg
      },
      {
        id: 10,
        name: "LAMB MASALA",
        description: "Tehty ja keitetyt lammat mausteisella masala kastikkeessa",
        price: "20€",
        dietary: "L, G",
        imageUrl: lambmasalImg
      },
      {
        id: 11,
        name: "PRAWN KORMA",
        description: "Jättikatkaravut/katkaravut kookosmaidolla, maustekastikkeella",
        price: "24€",
        dietary: "L, G",
        imageUrl: prawnkormaImg,
      },
      {
        id: 12,
        name: "PRAWN MASALA",
        description: "Jättikatkaravut/katkaravut mausteisella masalakastikkeessa",
        price: "24€",
        dietary: "L, G",
        imageUrl: prawnmasalaImg
      },
      {
        id: 13,
        name: "KASVIS SEKOITUS MASALA",
        description: "Peruna, Tomaatti, Gobi, Porkkana, Pavut masalakastikkeessa",
        price: "15€",
        dietary: "L, G",
        imageUrl: mixvegImg
      },
      {
        id: 14,
        name: "MALAI KOFTA",
        description: "Tehty kofta (peruna, tomaatti, gobi, porkkana, pavut) malai-kastikkeella",
        price: "16€",
        dietary: "L, G, M, P",
        imageUrl: malaikoftaImg
      },
      {
        id: 15,
        name: "BIRIYANI",
        description: "Marinoitu enimmäkseen mausteinen kana / lammas / Naudanliha / katkaravut & kasvissekoitukset Jugurttikastike pulao-riisin kanssa",
        price: "22€",
        dietary: "L, G",
        imageUrl: BiriyaniImg
      }
    ],
    leikkeet: [
      {
        id: 1,
        name: "PIPPURI LEIKE",
        description: "Kanasta. Tarjoillaan ranskalaisten / lohkoperunoiden / perunamuusin tai kermaperunoiden kanssa",
        price: "18€",
        dietary: "",
        imageUrl: pepperchickencutletImg
      },
      {
        id: 2,
        name: "WIENARI LEIKE",
        description: "Kanasta. Tarjoillaan ranskalaisten / lohkoperunoiden / perunamuusin tai kermaperunoiden kanssa",
        price: "18€",
        dietary: "",
        imageUrl: chickencutletImg
      },
      {
        id: 3,
        name: "HAWAI LEIKE",
        description: "Kanasta. Tarjoillaan ranskalaisten / lohkoperunoiden / perunamuusin tai kermaperunoiden kanssa",
        price: "18€",
        dietary: "",
        imageUrl: chickencutletImg
      },
      {
        id: 4,
        name: "METSASIAN LEIKE",
        description: "Kanasta. Tarjoillaan ranskalaisten / lohkoperunoiden / perunamuusin tai kermaperunoiden kanssa",
        price: "18€",
        dietary: "",
        imageUrl: chickencutletImg
      },
      {
        id: 5,
        name: "SPICY LEIKE",
        description: "Kanasta. Tarjoillaan ranskalaisten / lohkoperunoiden / perunamuusin tai kermaperunoiden kanssa",
        price: "18€",
        dietary: "",
        imageUrl: spicychickenImg
      }
    ],
    burgers: [
      {
        id: 21,
        name: "NAUTA BURGERI",
        description: "Sampula, American Salatti, Tupla chader, Talon Maonesi, Tomatti, Mautekurku. Tarjoillaan ranskalaisten tai lohkoperunoiden kanssa",
        price: "16€",
        dietary: "L.",
        imageUrl: nautaburgerImg
      },
      {
        id: 22,
        name: "KANA BURGERI",
        description: "Sampula, American Salatti, Tupla chader, Talon Maonesi, Tomatti, Mautekurku. Tarjoillaan ranskalaisten tai lohkoperunoiden kanssa",
        price: "16€",
        dietary: "L",
        imageUrl: chickenburgerImg
      }
    ],
    salads: [
      {
        id: 1,
        name: "KANA SALAATTI",
        description: "Sisältää Amerikan salaattia, tomaattia ja rucolaa",
        price: "15€",
        dietary: "",
        imageUrl: chickenkormaImg
      },
      {
        id: 2,
        name: "KATKARAPUSALAATTI",
        description: "Sisältää Amerikan salaattia, tomaattia ja rucolaa",
        price: "15€",
        dietary: "",
        imageUrl: prawnkormaImg
      },
      {
        id: 3,
        name: "KIRJOLOHENSALAATTI",
        description: "Sisältää Amerikan salaattia, tomaattia ja rucolaa",
        price: "15€",
        dietary: "",
        imageUrl: salmonsaladImg
      },
      {
        id: 4,
        name: "LOHENSALAATTI",
        description: "Pariloitu lohi, kerma peruna, Kurkku, Salaatti",
        price: "15€",
        dietary: "",
        imageUrl: salmonpotatoImg
      }
    ],
    pizzas: [
      {
        id: 1,
        name: "LASTENPIZZA",
        description: "Sisältää neljä vapaavalintaista täytettä. Lisätäyte +1€",
        price: "7€",
        dietary: "",
        imageUrl: kidspizzaImg
      },
      {
        id: 2,
        name: "NORMAALIPIZZA",
        description: "Sisältää neljä vapaavalintaista täytettä. Lisätäyte +2€",
        price: "12€",
        dietary: "",
        imageUrl: pizzaImg
      },
      {
        id: 3,
        name: "PERHEPIZZA",
        description: "Sisältää neljä vapaavalintaista täytettä. Lisätäyte +3€",
        price: "20€",
        dietary: "",
        imageUrl: pizzaImg
      }
    ],
    beverages: [
      {
        id: 29,
        name: "OLUT, III",
        description: "Pullo",
        price: "5€",
        dietary: "",
        imageUrl: beer1Img
      },
      {
        id: 30,
        name: "OLUT, IV",
        description: "Pullo",
        price: "5,50€",
        dietary: "",
        imageUrl: beer2Img
      },
      {
        id: 31,
        name: "SIIDERI",
        description: "Sommersby Omena tai Päärynä",
        price: "6€",
        dietary: "",
        imageUrl: ciderImg
      },
      {
        id: 32,
        name: "VALKOVIINI",
        description: "Pullo",
        price: "25€",
        dietary: "",
        imageUrl: whitewineImg
      },
      {
        id: 33,
        name: "PUNAVIINI",
        description: "Pullo",
        price: "25€",
        dietary: "",
        imageUrl: redwineImg
      },
      {
        id: 34,
        name: "VIRVOITUSJUOMAT (0,5L)",
        description: "Coca Cola / Fanta / Sprite",
        price: "4€",
        dietary: "",
        imageUrl: softdrinkImg
      },
      {
        id: 35,
        name: "VIRVOITUSJUOMAT (1,5L)",
        description: "Coca Cola / Fanta / Sprite",
        price: "7€",
        dietary: "",
        imageUrl: softdrinkImg
      }
    ]
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Ruokalista</h1>
          <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
            Tutustu huolella laadittuun ruokalistaamme, jossa on käytetty parhaita raaka-aineita ja kulinaarisia perinteitä.
          </p>
          <Tabs defaultValue={activeCategory} className="w-full max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {menuCategories.map(category => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(menuItems).map(([category, items]) => (
              <TabsContent key={category} value={category} className="pt-2 pb-2 md:pt-5 md:pb-5">
                <div className="flex justify-center items-center mt-8 mb-8 pb-5 w-full">
                  <h2 className="text-fuchsia-500 text-2xl font-bold text-center w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl mt-4 px-2 py-2 md:mt-8 md:mb-8 md:px-0 md:py-0">
                    {menuCategories.find(c => c.id === category)?.label}
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-10">
                  {items.map(item => (
                    <div key={item.id} className="flex bg-white rounded-lg overflow-hidden shadow-md">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.name} className="w-1/3 object-cover" />
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <span className="text-primary font-medium">{item.price}</span>
                        </div>
                        <p className="text-muted-foreground text-sm flex-1">{item.description}</p>
                        {item.dietary && (
                          <div className="mt-2 text-xs text-gray-500 font-medium">{item.dietary}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      {/*
      <div className="flex justify-end w-full mt-8">
        <div className="border border-fuchsia-400 rounded-lg shadow-lg w-40 h-24 flex items-center justify-center">
          <span className="text-fuchsia-700 font-bold">Order Online</span>
        </div>
      </div>
      */}
    </Layout>
  );
};
