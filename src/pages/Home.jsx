import Hero from '../components/Hero.jsx';
import LogoStrip from '../components/LogoStrip.jsx';
import Metrics from '../components/Metrics.jsx';
import About from '../components/About.jsx';
import Capabilities from '../components/Capabilities.jsx';
import Experience from '../components/Experience.jsx';
import Projects from '../components/Projects.jsx';
import Stack from '../components/Stack.jsx';
import Recognition from '../components/Recognition.jsx';
import Writing from '../components/Writing.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Metrics />
      <About />
      <Capabilities />
      <Experience />
      <Projects />
      <Stack />
      <Recognition />
      <Writing />
      <Contact />
    </>
  );
}
