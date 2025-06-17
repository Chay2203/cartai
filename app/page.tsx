import Hero from "./components/Hero";
import FeaturesAndBenefits from "./components/FeaturesAndBenefits";
import Legacy from "./components/Legacy";

export default function Home() {
  return (
    <main>
      <Hero />
      <Legacy />
      <FeaturesAndBenefits />
    </main>
  );
}
