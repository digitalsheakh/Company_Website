import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Get Involved
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Want to join the movement? Be sure to click the 'Get Involved' button below and fill out the form!
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-gradient-hero hover:opacity-90 transition-opacity text-lg px-8 py-6"
            >
              <a href="#contact-form">Get involved!</a>
            </Button>
          </div>
        </div>
        <div id="contact-form">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;