import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              About Educate2Youth
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn more about our mission, vision, and the driving force behind our 
              commitment to educational equity.
            </p>
          </div>
        </div>
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;