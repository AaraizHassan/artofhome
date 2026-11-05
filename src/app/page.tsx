import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import FAQAccordion from "@/components/FAQAccordion";
import Logos from "@/components/Logos";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Clients from "@/components/Clients";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Logos />
      <Container>
        <Pricing />
        <Benefits />
        <FAQ />
        <Clients />
        <FAQAccordion />
      </Container>
    </>
  );
};

export default HomePage;
