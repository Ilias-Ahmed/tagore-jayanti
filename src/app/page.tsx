"use client";

import About from "@/components/About";
import Embed from "@/components/Embed";
import FloatingTagore from "@/components/FloatingTagore";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ParticipantCount from "@/components/ParticipantCount";
import RegistrationForm from "@/components/RegistrationForm";
import Resources from "@/components/Resources";
import Winners from "@/components/Winners";
import { useState } from "react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleRegistered() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <>
      <FloatingTagore />
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
