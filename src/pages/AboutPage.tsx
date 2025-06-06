import Layout from '../components/Layout';
import sofiaGarciaImg from '../assets/images/sofia_garcia.png';
import amitSharmaImg from '../assets/images/amit_sharma.png';

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-10">TIETOA MEISTA</h1>
        
        {/* Our Story Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6 text-center">Tarinamme</h2>
              <p className="text-lg mb-4">
              Perustamisestamme lähtien baarimme ja ravintolamme on noudattanut yksinkertaista missiota:
               valmistaa poikkeuksellisia juomia parhaista paikallisista raaka-aineista
                ja tarjota unohtumaton vieraanvaraisuuskokemus.
              </p>
              <p className="text-lg mb-4">
              Vuosien varrella omistautumisemme cocktailien valmistuksen huippuosaamiseen sekä lämmin ja
               toivottava palveluasenteemme on tehnyt meistä yhden alueen arvostetuimmista kohteista 
               niin cocktailien ystäville kuin baarikulttuurin harrastajille.
                Se, mikä alkoi intohimoprojektina, on kasvanut rakastetuksi kohtaamispaikaksi,
               jossa ystävät, kollegat ja naapurit kokoontuvat nauttimaan huolella valmistetuista juomista ja eloisasta tunnelmasta.
              </p>
              <p className="text-lg">
              Tänä päivänä, vaikka olemme kasvaneet niin kooltamme kuin maineeltamme, pysymme uskollisina
               juurillemme – sitoutuneina kestävään kehitykseen,
               paikallisten tislaamojen ja tuottajien tukemiseen sekä luomaan ainutlaatuisia cocktaileja,
               jotka juhlistavat yhteisöämme ja käsityöläisbaarimestaruuden rikasta perinnettä.
              Jokainen, joka vierailee luonamme, tuntee olonsa kuin kotonaan.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="Restaurant founding" 
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </section>
        
        {/* Meet the Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-center mb-10">Arvomme</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Intohimo vieraanvaraisuuteen</h3>
              <p>Uskomme, että jokainen vieras ansaitsee lämpimän vastaanoton ja unohtumattoman kokemuksen. Tiimimme on omistautunut saamaan sinut tuntemaan olosi kotoisaksi, olitpa sitten nopealla drinkillä tai juhlistamassa erityistä hetkeä.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Lähituotetut raaka-aineet</h3>
              <p>Olemme sitoutuneet tukemaan paikallisia viljelijöitä ja tuottajia. Menumme perustuu tuoreimpiin kauden raaka-aineisiin, mikä takaa laadun ja kestävyyden jokaisessa annoksessa ja juomassa.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Yhteisön juhlistaminen</h3>
              <p>Ravintolamme on kohtaamispaikka ystäville, perheille ja naapureille. Arvostamme täällä syntyviä yhteyksiä ja haluamme luoda tilan, jossa jokainen tuntee kuuluvansa joukkoon.</p>
            </div>
          </div>
        </section>
        
        {/* Our Philosophy Section */}
        <section className="mb-20 bg-gray-50 p-10 rounded-lg">
          <h2 className="text-3xl font-semibold text-center mb-8">Työtapamme ja uskomme</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tuoreita ainesosia</h3>
              <p>Hankimme tuoreimmat kauden raaka-aineet paikallisilta viljelijöiltä ja tuottajilta, jotka jakavat sitoutumisemme laatuun ja kestävyyteen.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Kulinaarinen käsityötaito</h3>
              <p>Jokainen annoksemme on huolellisesti suunniteltu tasapainottamaan maut, koostumukset ja esillepano – luoden unohtumattoman ruokailukokemuksen kaikille aisteille. Reseptimme ovat monilta osin kansainvälisiä, mutta pyrimme aina säilyttämään niissä suomalaisen vivahteen.</p>
                 
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Lämmin vieraanvaraisuus</h3>
              <p>Uskomme, että erinomainen ruoka kuuluu yhdistää aitoon vieraanvaraisuuteen, jotta jokainen tuntee olonsa tervetulleeksi.</p>
            </div>
          </div>
        </section>
        
        {/* Awards Section */}
        <section>
          <h2 className="text-3xl font-semibold text-center mb-10">Tunnustukset ja Velvollisuudet</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                </svg>
                <h3 className="text-xl font-semibold">A-oikeudet</h3>
              </div>
              <p className="text-muted-foreground">Suomessa alkoholijuomien anniskeluoikeudet <strong>A-oikeudet</strong> ovat laajin ja kattavin anniskelulupa.
                 <strong>  A-oikeudet</strong> sallivat ravintolan tarjoilla kaikkia alkoholijuomia, mukaan lukien:
                 Olut ja siideri
                 <br/>Viini ja kuohuviini
                 <br/>Väkevät alkoholijuomat (yli 22 % alkoholipitoisuus)</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                </svg>
                <h3 className="text-xl font-semibold">Hygienpassi</h3>
              </div>
              <p className="text-muted-foreground">Noudatamme hygieniaa ruoanvalmistuksessa. Kaikilla tiimimme jäsenillä on hygieniapassi.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                </svg>
                <h3 className="text-xl font-semibold">Ympäristöystävällistä</h3>
              </div>
              <p className="text-muted-foreground">Tunnustus sitoutumisestamme ympäristöystävällisiin käytäntöihin ja paikallisten tuottajien tukemiseen.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                </svg>
                <h3 className="text-xl font-semibold">OIVA Todistus</h3>
              </div>
              <p className="text-muted-foreground">Ravintolamme hygienia ja elintarviketurvallisuus tarkastetaan säännöllisesti. OIVA-todistus kertoo viranomaisen arvion puhtaudestamme ja turvallisuudestamme. Voit luottaa siihen, että tarjoamme laadukasta ja turvallista ruokaa.</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
