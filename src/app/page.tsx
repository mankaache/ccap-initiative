
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import ProjectsGrid from "@/components/ProjectsGrid";
import MapSection from "@/components/MapSection";
import MapSection2 from "@/components/MapSection2";
import Footer from "@/components/layout/Footer";
import FilteredProjects from "@/components/FilteredProjects";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      
      <HeroSection />
      <FilteredProjects/>
      <MapSection />
    </div>
  );
};

export default Index;
