import { Card, CardContent } from "@/components/ui/card";

const ValuesSection = () => {
  const values = [
    {
      title: "Inclusivity",
      description: "Including all types of people, things or ideas and appreciating all contributions equally.",
      icon: "🤝",
      color: "from-brand-green to-brand-green-light"
    },
    {
      title: "Equity", 
      description: "Providing equitable educational opportunities for equal outcomes.",
      icon: "⚖️",
      color: "from-brand-yellow to-brand-coral"
    },
    {
      title: "Collaboration",
      description: "Working collaboratively together to achieve a common vision",
      icon: "🤝",
      color: "from-brand-coral to-primary"
    },
    {
      title: "Curiosity",
      description: "Embracing the curiosity of the youth through respecting and encouraging creative ideas.",
      icon: "💡",
      color: "from-primary to-brand-green"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fade-in">
            Our Values
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-delay-1">
            Empowering the youth through our core principles
          </p>
        </div>
        
        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card 
              key={value.title} 
              className="group hover:shadow-elevated transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20 animate-fade-in-delay-1 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;