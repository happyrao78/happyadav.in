import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import About from '../components/About.jsx';
import Capabilities from '../components/Capabilities.jsx';
import Experience from '../components/Experience.jsx';
import Projects from '../components/Projects.jsx';
import Stack from '../components/Stack.jsx';
import Recognition from '../components/Recognition.jsx';
import WritingPreview from '../components/WritingPreview.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Capabilities />
      <Experience />
      <Projects />
      <Stack />
      <Recognition />
      <WritingPreview />
      <Contact />
    </>
  );
}
