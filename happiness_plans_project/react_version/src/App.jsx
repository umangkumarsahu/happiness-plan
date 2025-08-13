import React, {useState} from 'react'
import TripCard from './components/TripCard'

export default function App(){
  const [showThanks, setShowThanks] = useState(false)
  const services = [
    {title:'Custom Itineraries', desc:'Personalized plans for every traveller.'},
    {title:'Hotel Booking', desc:'Curated stays with easy cancellation.'},
    {title:'24/7 Support', desc:'Local help when you need it.'}
  ]
  function handleContact(e){
    e.preventDefault()
    setShowThanks(true)
    setTimeout(()=>setShowThanks(false),4000)
    e.target.reset()
  }
  return (
    <div>
      <header className="react-header">
        <div className="container">
          <h1 className="logo">Happiness Plans</h1>
          <nav><a href="#services">Services</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
        </div>
      </header>

      <main>
        <section className="hero container">
          <h2>Travel with Joy</h2>
          <p>Create experiences that last a lifetime.</p>
          <a className="btn" href="#services">Explore</a>
        </section>

        <section id="services" className="container services">
          <h3>Services</h3>
          <div className="grid">
            {services.map(s=> <TripCard key={s.title} title={s.title} desc={s.desc} />)}
          </div>
        </section>

        <section id="about" className="container about">
          <h3>About</h3>
          <p>We build travel plans focusing on safety, local culture, and happiness.</p>
        </section>

        <section id="contact" className="container contact">
          <h3>Contact</h3>
          <form onSubmit={handleContact}>
            <input name="name" placeholder="Name" required />
            <input name="email" placeholder="Email" type="email" required />
            <textarea name="message" placeholder="Message" required></textarea>
            <button className="btn" type="submit">Send</button>
          </form>
          {showThanks && <p className="muted">Thanks — we'll get back to you (demo).</p>}
        </section>
      </main>

      <footer className="site-footer container">
        <p>&copy; 2025 Happiness Plans</p>
      </footer>
    </div>
  )
}
