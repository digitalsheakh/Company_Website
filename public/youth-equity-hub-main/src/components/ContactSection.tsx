import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary/90">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Contact Info */}
          <div className="text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Want to get involved, collaborate or sponsor us?
            </p>
            <p className="text-lg mb-12 opacity-90">
              Be sure to contact us :)
            </p>
            
            {/* Contact Links */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6" />
                <a 
                  href="mailto:educate2youth@gmail.com" 
                  className="text-lg hover:opacity-80 transition-opacity"
                >
                  educate2youth@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Linkedin className="h-6 w-6" />
                <span className="text-lg">LinkedIn</span>
              </div>
              <div className="flex items-center gap-4">
                <Instagram className="h-6 w-6" />
                <span className="text-lg">@educate2youth</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Contact Form */}
          <Card className="shadow-elevated border-0">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-muted-foreground">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-muted-foreground">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                
                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                
                {/* Message Field */}
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="mt-1 resize-none"
                  />
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="w-full bg-gradient-hero hover:opacity-90 transition-opacity text-lg py-6"
                >
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;