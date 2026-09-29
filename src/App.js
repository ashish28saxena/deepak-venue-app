import logo from './logo.svg';
import './App.css';
 
import VenueCarousel from "./Component/VenueCarousel";
import BanquetHalls from "./Component/BanquetHalls"
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import AboutUs from "./Component/AboutUs"
import ContactUs from "./Component/ContactUs"
import Resort from "./Component/Resort";
import Gardens from "./Component/Gardens"

function App() {
  return (
    <div className="App">
      <Header/>
      <VenueCarousel/>
      <BanquetHalls/>
      <Resort/>
      <Gardens/>
      <AboutUs/>
      <ContactUs/>
      <Footer/>
    </div>
  );
}

export default App;
