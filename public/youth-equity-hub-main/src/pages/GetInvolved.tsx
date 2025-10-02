import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Megaphone, Calendar, ArrowRight } from "lucide-react";

const GetInvolved = () => {
  const opportunities = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Join Our Team",
      description: "Become a core member and help shape our campaigns and initiatives",
      action: "Apply Now",
      color: "from-brand-green to-brand-green-light"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Volunteer",
      description: "Support our events, campaigns, and community outreach programs",
      action: "Sign Up",
      color: "from-brand-yellow to-brand-coral"
    },
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: "Advocate",
      description: "Help spread awareness about educational inequality in your community",
      action: "Get Started",
      color: "from-brand-coral to-primary"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Organize Events",
      description: "Host workshops, fundraisers, or awareness events in your area",
      action: "Plan Event",
      color: "from-primary to-brand-green"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-brand-green-light/20 to-background">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 animate-fade-in-up">
              Ready to Make a{" "}
              <span className="text-transparent bg-gradient-accent bg-clip-text">
                Difference?
              </span>
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8 animate-scale-in"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in-delay-1">
              Join the movement to create educational equity for all young people. 
              Every voice matters, every action counts.
            </p>
          </div>
        </section>

        {/* Opportunities Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fade-in">
                Ways to Get Involved
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-delay-1">
                Choose how you want to contribute to educational equity
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {opportunities.map((opportunity, index) => (
                <Card 
                  key={opportunity.title} 
                  className="group hover:shadow-elevated transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20 animate-fade-in-delay-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${opportunity.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {opportunity.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      {opportunity.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {opportunity.description}
                    </p>
                    <Button 
                      asChild 
                      className="w-full bg-gradient-hero hover:opacity-90 hover:scale-105 transition-all duration-300 group"
                    >
                      <a href="/contact">
                        {opportunity.action}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-12 text-primary-foreground animate-fade-in-delay-2">
              <h3 className="text-3xl font-bold mb-4">
                Still not sure how to help?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Get in touch with us and we'll find the perfect way for you to contribute!
              </p>
              <Button 
                asChild 
                size="lg" 
                variant="secondary"
                className="hover:scale-105 transition-all duration-300 text-lg px-8 py-6 group"
              >
                <a href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Impact Stats Placeholder */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fade-in">
                Our Growing Impact
              </h2>
              <p className="text-lg text-muted-foreground animate-fade-in-delay-1">
                Together, we're making a real difference
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: "500+", label: "Young People Reached", icon: "👥" },
                { number: "15", label: "Schools Partnered", icon: "🏫" },
                { number: "£10K+", label: "Funding Secured", icon: "💰" }
              ].map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="text-center animate-bounce-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetInvolved;