import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-green-light/20 to-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-yellow rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-brand-coral rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-brand-green rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto text-center relative">
        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-8 leading-tight animate-fade-in-up">
          <span className="inline-block animate-text-reveal">Working to make education</span>{" "}
          <br className="hidden sm:block" />
          <span className="text-transparent bg-gradient-accent bg-clip-text animate-bounce-in">
            fairer to all
          </span>
        </h1>
        
        {/* Yellow accent line */}
        <div className="w-24 h-1 bg-secondary mx-auto mb-8 animate-scale-in"></div>
        
        {/* Subtitle */}
        <h2 className="text-xl md:text-3xl text-primary font-semibold mb-8 animate-fade-in-delay-1">
          A youth-led movement driving educational equity!
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-delay-2">
          We believe every young person deserves the same chance to thrive - regardless of their background. 
          Our mission is to close the education gap between communities by empowering voices, 
          challenging inequality, and championing fair access to opportunity.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-delay-3">
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-hero hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-elevated text-lg px-10 py-6 group"
          >
            <Link to="/about">
              Learn About Us
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 text-lg px-10 py-6 group"
          >
            <Link to="/get-involved">
              Get Involved
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Button>
        </div>
        
        {/* Image placeholder */}
        <div className="mt-16 animate-fade-in-delay-3">
          <div className="max-w-4xl mx-auto bg-muted/30 rounded-2xl p-8 backdrop-blur-sm border border-border/50">
            <div className="aspect-video bg-gradient-to-br from-brand-green-light/20 to-brand-yellow/20 rounded-xl flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  📸
                </div>
                <p className="text-lg font-medium">Hero Image Placeholder</p>
                <p className="text-sm opacity-75">Add your campaign or team photo here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;