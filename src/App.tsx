import Layout from './components/Layout';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ChatAssistant from './components/ChatAssistant';

function App() {
  return (
    <Layout>
      <Hero />
      <Timeline />
      <Projects />
      <Skills />
      <Contact />
      <ChatAssistant />
    </Layout>
  );
}

export default App;
