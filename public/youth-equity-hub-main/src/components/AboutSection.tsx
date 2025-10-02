import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Eye } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        {/* About Us Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 animate-fade-in">
            About Us
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8 animate-scale-in"></div>
        </div>
        
        {/* Who are we for section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-slide-in-left">
            <div className="flex items-center gap-4 mb-6">
              <Users className="h-8 w-8 text-primary" />
              <h3 className="text-2xl md:text-3xl font-bold text-primary">
                Who are we for?
              </h3>
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Educate2Youth is for everyone who believes in building a fairer education system. 
                At our core, we are a youth-led organisation working to expose and tackle the disparities 
                in knowledge, resources, and opportunities that exist between communities of different 
                socio-economic backgrounds.
              </p>
              <p>
                We foster and lead targeted campaigns that push for meaningful change in education. 
                Our current flagship campaign, <span className="font-semibold text-primary">Every Child's Chance</span>, 
                advocates for equitable funding of extracurricular activities - because opportunity 
                shouldn't depend on your postcode.
              </p>
            </div>
          </div>
          <div className="bg-muted/30 rounded-2xl p-8 animate-slide-in-right">
            <div className="aspect-square bg-gradient-to-br from-brand-green-light/20 to-brand-yellow/20 rounded-xl flex items-center justify-center text-muted-foreground hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  📚
                </div>
                <p className="text-lg font-medium">Team Photo</p>
                <p className="text-sm opacity-75">Add your team image here</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vision and Goal Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Our Vision */}
          <Card className="shadow-soft border-0 animate-fade-in-delay-1">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Eye className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We envision a world where every young person has equal access to knowledge, 
                  opportunities, and the confidence to shape their future - regardless of their 
                  socio-economic background.
                </p>
                <p>
                  While the national curriculum may be the same, the system is not. Financial and 
                  emotional barriers often make key resources inaccessible, especially for those 
                  in underserved communities.
                </p>
                <p>
                  This inequality shapes mindsets: young people in well-resourced areas are encouraged 
                  to be ambitious and aspirational, while those in less affluent communities are too 
                  often made to feel like their potential has a ceiling.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Our Goal */}
          <Card className="shadow-soft border-0 animate-fade-in-delay-2">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Target className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold text-primary">Our Goal</h3>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Educate2Youth exists to challenge and dismantle the limitations society places 
                  on young people based on their background. We strive to build a world where 
                  no one's potential is defined by their postcode or background.
                </p>
                <p>
                  Through awareness-raising, inclusive advocacy, and a relentless belief in the 
                  power of young people, we are working towards a future where every youth - 
                  regardless of where they come from - can believe in, pursue, and achieve their 
                  full potential.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;