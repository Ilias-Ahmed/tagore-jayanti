"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import RegistrationForm from "@/components/RegistrationForm";
import ParticipantCount from "@/components/ParticipantCount";
import Winners from "@/components/Winners";
import Resources from "@/components/Resources";
import Embed from "@/components/Embed";
import Footer from "@/components/Footer";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleRegistered() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <>
      <Hero />
      <About />
      <RegistrationForm onRegistered={handleRegistered} />
      <ParticipantCount refreshKey={refreshKey} />
      <Winners />
      <Resources />
      <Embed />
      <Footer />
    </>
  );
}
