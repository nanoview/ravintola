import Layout from '../components/Layout';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        imageUrl: "https://media.istockphoto.com/id/2151903091/cs/fotografie/fresh-chicken-breast-curry-with-herbs-and-spices.jpg?s=1024x1024&w=is&k=20&c=h5yXUn3UiwerpfNBF1gvIxadFDOtsOxFm34VV4BNbSE="
      },
      {
        id: 2,
        name: "BUTTER CHICKEN",
        description: "Marinoitu Tandoori kana paistettu spicy butter kastikkeet",
        price: "18€",
        dietary: "L, G",
        imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 3,
        name: "CHICKEN KORMA",
        description: "Tehty ja keitetty kana maustetulla kookoskastikkeella",
        price: "17€",
        dietary: "L, G",
        imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 4,
        name: "CHICKEN TIKKA MASALA",
        description: "Marinoitua kanaa paistettua maustekastikkeella",
        price: "22€",
        dietary: "L, G",
        highlight: true,
        imageUrl: "https://media.istockphoto.com/id/1735046457/cs/fotografie/tradi%C4%8Dn%C3%AD-indick%C3%A9-j%C3%ADdlo-ku%C5%99ec%C3%AD-tikka-masala-s-pikantn%C3%ADm-kari-masem-v-misce-detail.jpg?s=1024x1024&w=is&k=20&c=8FOJyV3a_pzXKiOMG3e_vfmmnmRC7dAjHYPbRTk-XtU=",
      },
      {
        id: 5,
        name: "NAUDANLIHA CURRY",
        description: "Tehty ja keitetty currykastikkeella",
        price: "18€",
        dietary: "L, G, M, P",
        imageUrl: "https://images.unsplash.com/photo-1545247181-516773cae754?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 6,
        name: "NAUDANLIHA MASALA",
        description: "Tehty ja keitetty mausteisella masalakastikkeessa",
        price: "19€",
        dietary: "L, G, M, P",
        imageUrl: "https://th.bing.com/th/id/OIP.uO7TLR7-nC4fbIqQztwkUwHaE7?r=0&rs=1&pid=ImgDetMain"
      },
      {
        id: 7,
        name: "NAUDANLIHA MALAI KOFTA",
        description: "Lihakeema prosessoitu kofta 4 kpl malai-kastikkeella",
        price: "20€",
        dietary: "L, G",
        imageUrl: "https://media.istockphoto.com/id/1397648059/cs/fotografie/malajsk%C3%A9-kofta-kari.jpg?s=1024x1024&w=is&k=20&c=UdS0GtVrN0BQ4dDw1M64lHvWAb8hxwyALylXyGBMOws="
      },
      {
        id: 8,
        name: "LAMB MUGHLAI",
        description: "Hienosti maustettu lampaan curry kermalla, kananmunalla ja mantelilla",
        price: "22€",
        dietary: "L, G",
        imageUrl:"https://bing.com/th?id=OSK.34fc0932db0447a82202bedd252bbe48"
      },
      {
        id: 9,
        name: "LAMB BUTTER",
        description: "Tehty ja keitetyt lammat kastikkeella, cashewpähkinöillä",
        price: "21€",
        dietary: "L, G",
        imageUrl: "https://bing.com/th?id=OSK.b02f81a5430597b51df38d7fa5a1ce8a"
      },
      {
        id: 10,
        name: "LAMB MASALA",
        description: "Tehty ja keitetyt lammat mausteisella masala kastikkeessa",
        price: "20€",
        dietary: "L, G",
        imageUrl:"https://bing.com/th?id=OSK.e57429a1d9a2739cb9d12e1a6339c064"

      },
      {
        id: 11,
        name: "PRAWN KORMA",
        description: "Jättikatkaravut/katkaravut kookosmaidolla, maustekastikkeella",
        price: "24€",
        dietary: "L, G",
        imageUrl:"https://th.bing.com/th/id/R.212d1e73645b077467e16a15384436d6?rik=GkNNP2POhEFlfw&pid=ImgRaw&r=0",
      },
      {
        id: 12,
        name: "PRAWN MASALA",
        description: "Jättikatkaravut/katkaravut mausteisella masalakastikkeessa",
        price: "24€",
        dietary: "L, G",
        imageUrl:"https://th.bing.com/th/id/R.9ed54774c9cd4048a9e79498bad7273d?rik=TgiIsuLhMlHzfg&riu=http%3a%2f%2fwww.nnisha.com%2fwp-content%2fuploads%2f2021%2f08%2f4A2D511F-F467-4387-A9C7-65A279580D43-1536x1152.jpeg&ehk=41o2bkSngSEgy5Y%2fxOdKLaLBJsk5XebaeywzTNfkbiw%3d&risl=&pid=ImgRaw&r=0"
      },
      {
        id: 13,
        name: "Kasvis Sekoitettu MASALA",
        description: "Peruna, Tomaatti, Gobi, Porkkana, Pavut masalakastikkeessa",
        price: "15€",
        dietary: "L, G",
        imageUrl: "https://healthiersteps.com/wp-content/uploads/2022/09/mixed-vegetables-864x1536.jpg"
      },
      {
        id: 14,
        name: "MALAI KOFTA",
        description: "Tehty kofta (peruna, tomaatti, gobi, porkkana, pavut) malai-kastikkeella",
        price: "16€",
        dietary: "L, G, M, P",
        imageUrl:"https://th.bing.com/th/id/OIP.26HHcFn0VGmFFozol-QLSQHaJQ?rs=1&pid=ImgDetMain"
      },
      {
        id: 15,
        name: "BIRIYANI",
        description: "Marinoitu enimmäkseen mausteinen kana / lammas / Naudanliha / katkaravut & kasvissekoitukset Jugurttikastike pulao-riisin kanssa",
        price: "22€",
        dietary: "L, G",
        imageUrl:"https://d36tnp772eyphs.cloudfront.net/blogs/1/2019/09/Hyderabadi-biryani.jpg"
      }
    ],
    leikkeet: [
      {
        id: 16,
        name: "PIPPURI LEIKE",
        description: "Kanasta. Tarjoillaan ranskalaisten / lohkoperunoiden / perunamuusin tai kermaperunoiden kanssa",
        price: "18€",
        dietary: "",
        imageUrl: "https://sliceofjess.com/wp-content/uploads/2022/12/IMG_9908.jpg"
      },
      {
        id: 17,
        name: "WIENARI LEIKE",
        description: "Kanasta. Tarjoillaan ranskalaisten / lohkoperunoiden / perunamuusin tai kermaperunoiden kanssa",
        price: "18€",
        dietary: "",
        imageUrl:"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/12/20/0/FNK_Chicken-Cutlet_H_s4x3.jpg.rend.hgtvcom.616.462.suffix/1576855328048.jpeg"
      },
      {
        id: 18,
        name: "HAWAI LEIKE",
        description: "Kanasta. Tarjoillaan ranskalaisten / lohkoperunoiden / perunamuusin tai kermaperunoiden kanssa",
        price: "18€",
        dietary: "",
        imageUrl:"https://bing.com/th?id=OSK.7ac8ec4efb9d7d1cef4b439f0fa29639"
      },
      {
        id: 19,
        name: "METSASIAN LEIKE",
        description: "Kanasta. Tarjoillaan ranskalaisten / lohkoperunoiden / perunamuusin tai kermaperunoiden kanssa",
        price: "18€",
        dietary: "",
        imageUrl:"https://bing.com/th?id=OSK.7ac8ec4efb9d7d1cef4b439f0fa29639"
      },
      {
        id: 20,
        name: "SPICY LEIKE",
        description: "Kanasta. Tarjoillaan ranskalaisten / lohkoperunoiden / perunamuusin tai kermaperunoiden kanssa",
        price: "18€",
        dietary: "",
        imageUrl:"https://bing.com/th?id=OSK.cf88993b36a5d4c7988275f2353149b1"
      }
    ],
    burgers: [
      {
        id: 21,
        name: "NAUTA BURGERI",
        description: "Sampula, American Salatti, Tupla chader, Talon Maonesi, Tomatti, Mautekurku. Tarjoillaan ranskalaisten tai lohkoperunoiden kanssa",
        price: "16€",
        dietary: "L.",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 22,
        name: "KANA BURGERI",
        description: "Sampula, American Salatti, Tupla chader, Talon Maonesi, Tomatti, Mautekurku. Tarjoillaan ranskalaisten tai lohkoperunoiden kanssa",
        price: "16€",
        dietary: "L",
        imageUrl:"https://bing.com/th?id=OSK.d0d4819a59beff41d2f3e70725d1b5b0"

      }
    ],
    salads: [
      {
        id: 23,
        name: "KANA SALAATTI",
        description: "Sisältää Amerikan salaattia, tomaattia ja rucolaa",
        price: "15€",
        dietary: "",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 24,
        name: "KATKARAPUSALAATTI",
        description: "Sisältää Amerikan salaattia, tomaattia ja rucolaa",
        price: "15€",
        dietary: "",
        imageUrl:"https://th.bing.com/th/id/OIP.2cnzjX9Abcuqh72AScTA9AHaHa?rs=1&pid=ImgDetMain"
      },
      {
        id: 25,
        name: "KIRJOLOHENSALAATTI",
        description: "Sisältää Amerikan salaattia, tomaattia ja rucolaa",
        price: "15€",
        dietary: "",
        imageUrl:"https://th.bing.com/th/id/OIP.wEm5Hlp8hXReo7y-zUSOQQHaG_?rs=1&pid=ImgDetMain"
      }
    ],
    pizzas: [
      {
        id: 26,
        name: "LASTENPIZZA",
        description: "Sisältää neljä vapaavalintaista täytettä. Lisätäyte +1€",
        price: "7€",
        dietary: "",
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 27,
        name: "NORMAALIPIZZA",
        description: "Sisältää neljä vapaavalintaista täytettä. Lisätäyte +2€",
        price: "12€",
        dietary: ""
      },
      {
        id: 28,
        name: "PERHEPIZZA",
        description: "Sisältää neljä vapaavalintaista täytettä. Lisätäyte +3€",
        price: "20€",
        dietary: ""
      }
    ],
    beverages: [
      {
        id: 29,
        name: "OLUT, III",
        description: "Pullo",
        price: "5€",
        dietary: "",
        imageUrl: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&w=500&q=80"
      },
      {
        id: 30,
        name: "OLUT, IV",
        description: "Pullo",
        price: "5,50€",
        dietary: "",
        
       imageUrl: "https://i.colnect.net/f/8172/685/Karhu-Olut-IV-A-Beer.jpg"
      },
      {
        id: 31,
        name: "SIIDERI",
        description: "Sommersby Omena tai Päärynä",
        price: "6€",
        dietary: "",
        imageUrl: "https://th.bing.com/th/id/OIP.BroudF6-h_NuC82YZ97TSAHaHa?rs=1&pid=ImgDetMain"
      },
      {
        id: 32,
        name: "VALKOVIINI",
        description: "Pullo",
        price: "25€",
        dietary: "",
        imageUrl:"https://th.bing.com/th/id/R.a8b7e895811a59351dff6fb8ae84c4aa?rik=sCpt%2f2Y7cLb9Tg&pid=ImgRaw&r=0"
      },
      {
        id: 33,
        name: "PUNAVIINI",
        description: "Pullo",
        price: "25€",
        dietary: "",
        imageUrl: "https://th.bing.com/th/id/OIP.aaqgl4B95vmsUzaOz1DiVQHaN1?rs=1&pid=ImgDetMain"
      },
      {
        id: 34,
        name: "VIRVOITUSJUOMAT (0,5L)",
        description: "Coca Cola / Fanta / Sprite",
        price: "4€",
        dietary: "",
        imageUrl:"https://th.bing.com/th/id/OIP.eWw0kGyREfAvQaMZKYomGwHaE8?rs=1&pid=ImgDetMain"
      },
      {
        id: 35,
        name: "VIRVOITUSJUOMAT (1,5L)",
        description: "Coca Cola / Fanta / Sprite",
        price: "7€",
        dietary: "",
        imageUrl:"https://th.bing.com/th/id/OIP.eWw0kGyREfAvQaMZKYomGwHaE8?rs=1&pid=ImgDetMain"
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
    </Layout>
  );
};
