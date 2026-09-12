import Nav from './components/Nav'
import Hero from './components/Hero'
import Education from './components/Education'
import Gallery from './components/Gallery'
import Protocols from './components/Protocols'
import Consultations from './components/Consultations'
import Booking from './components/Booking'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream text-charcoal">
      <Nav />
      <Hero />
      <Education />
      <Gallery />
      <Protocols />
      <Consultations />
      <Booking />
      <Footer />
    </div>
  )
}
