import Features from "components/Features";
import Hero from "components/Hero";
import Promo from "components/Promo";
import Promotion1 from "components/Promotion1";
import Promotion2 from "components/Promotion2";
import Team from "components/Team";
import Testimonial from "components/Testimonial";

export default function Home() {
  return (
    <>
      <Hero />

      {/* <Promo /> */}

      <Features />

      <Promotion2 />

      <Testimonial />

      <Promotion1 />
    </>
  );
}
