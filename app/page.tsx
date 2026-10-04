import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Snapshot from "@/components/Snapshot";
import Work from "@/components/Work";
import Build from "@/components/Build";
import Stack from "@/components/Stack";
import Journey from "@/components/Journey";
import Workspace from "@/components/Workspace";
import Contact from "@/components/Contact";
import QuickView from "@/components/QuickView";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Snapshot />
        <Work />
        <Build />
        <Stack />
        <Journey />
        <Workspace />
        <Contact />
      </main>
      <QuickView />
    </>
  );
}
