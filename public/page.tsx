"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

// Animation variants
// Only keeping the animation variants that are actually used in the code
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }
  }
};

const revealFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.6, 0.05, 0.01, 0.9] 
    } 
  }
};

const revealFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.6, 0.05, 0.01, 0.9] 
    } 
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      duration: 0.6, 
      ease: [0.34, 1.56, 0.64, 1] // Spring-like effect
    } 
  }
};

const rotateIn = {
  hidden: { rotate: -5, opacity: 0 },
  visible: { 
    rotate: 0, 
    opacity: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.6, 0.05, 0.01, 0.9] 
    } 
  }
};

const imageReveal = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] } }
};


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-[#3a0a14] text-white py-4 px-4 sm:px-6 md:px-12 lg:px-20 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Mobile menu button and logo container */}
          <div className="flex justify-between items-center w-full lg:hidden">
            <div className="w-10">
              <button 
                className="text-white focus:outline-none" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <div className="w-5 h-0.5 bg-white"></div>
                    <div className="w-5 h-0.5 bg-white"></div>
                    <div className="w-5 h-0.5 bg-white"></div>
                  </div>
                )}
              </button>
            </div>
            
            <div className="text-center">
              <img src="/Images/nirvana-logo.png" alt="Nirvana" className="h-10 brightness-0 invert" />
            </div>
            
            <div className="w-10">
              {/* Empty div to balance the layout */}
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center justify-between w-full">
            <div className="flex items-center space-x-12 text-sm">
              <Link href="/" className="text-white hover:text-[#d4af37] transition-colors uppercase font-light tracking-wider">Home</Link>
              <Link href="/about" className="text-white hover:text-[#d4af37] transition-colors uppercase font-light tracking-wider">About Us</Link>
              <Link href="/menu" className="text-white hover:text-[#d4af37] transition-colors uppercase font-light tracking-wider">Menu</Link>
            </div>
            
            <div className="mx-4">
              <img src="/Images/nirvana-logo.png" alt="Nirvana" className="h-10 md:h-12 brightness-0 invert" />
            </div>
            
            <div className="flex items-center space-x-12 text-sm">
              <Link href="/gallery" className="text-white hover:text-[#d4af37] transition-colors uppercase font-light tracking-wider">Gallery</Link>
              <Link href="/reservations" className="text-white hover:text-[#d4af37] transition-colors uppercase font-light tracking-wider">Reservations</Link>
              <Link href="/contact" className="text-white hover:text-[#d4af37] transition-colors uppercase font-light tracking-wider">Contact</Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 w-full"
          >
            <div className="flex flex-col space-y-6 px-2 items-center max-w-[200px] mx-auto">
              <Link href="/" className="text-white hover:text-[#d4af37] transition-colors py-2 font-light uppercase tracking-wider text-xs w-full text-center">Home</Link>
              <Link href="/about" className="text-white hover:text-[#d4af37] transition-colors py-2 font-light uppercase tracking-wider text-xs w-full text-center">About Us</Link>
              <Link href="/menu" className="text-white hover:text-[#d4af37] transition-colors py-2 font-light uppercase tracking-wider text-xs w-full text-center">Menu</Link>
              <Link href="/gallery" className="text-white hover:text-[#d4af37] transition-colors py-2 font-light uppercase tracking-wider text-xs w-full text-center">Gallery</Link>
              <Link href="/reservations" className="text-white hover:text-[#d4af37] transition-colors py-2 font-light uppercase tracking-wider text-xs w-full text-center">Reservations</Link>
              <Link href="/contact" className="text-white hover:text-[#d4af37] transition-colors py-2 font-light uppercase tracking-wider text-xs w-full text-center">Contact</Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[500px] mt-0">
        {/* Hero background image */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/Images/image2.jpg" 
            alt="Nirvana Fusion Restaurant" 
            className="w-full h-full object-cover brightness-50"
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-white text-center"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.2 }}
              className="h-px bg-[#d4af37] mx-auto mb-6 max-w-[120px]"
            />
            
            <motion.p 
              variants={staggerItem}
              className="text-sm sm:text-base tracking-widest mb-4"
            >
              WELCOME TO
            </motion.p>
            
            <div className="overflow-hidden mb-6">
              <motion.h2 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider"
              >
                NIRVANA FUSION
              </motion.h2>
            </div>
            
            <motion.p 
              variants={staggerItem}
              className="text-sm sm:text-base tracking-widest mb-8"
            >
              CULINARY EXCELLENCE
            </motion.p>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.6 }}
              className="h-px bg-[#d4af37] mx-auto mb-8 max-w-[120px]"
            />
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="mt-4"
            >
              <Link href="/reservations" className="inline-block bg-[#3a0a14] border border-[#d4af37] text-white py-3 px-8 text-sm uppercase tracking-widest hover:bg-[#4a1a24] transition-colors">
                Book a Table
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealFromLeft}
            className="h-[300px] sm:h-[350px] overflow-hidden shadow-md order-1 md:order-1 rounded-sm">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <motion.img 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={imageReveal}
                src="/Images/image3.jpg" 
                alt="Chef preparing food" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="order-2 md:order-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
              className="h-px bg-[#3a0a14] mb-6"
            />
            <motion.h2 
              variants={rotateIn}
              className="text-2xl sm:text-3xl font-medium text-black mb-6 sm:mb-8"
            >
              Nirvana Fusion
            </motion.h2>
            <motion.p 
              variants={staggerItem}
              className="text-gray-700 mb-4 sm:mb-6"
            >
              A dining experience unlike any other, where culinary artistry meets exceptional service in a sophisticated atmosphere.
            </motion.p>
            <motion.p 
              variants={staggerItem}
              className="text-gray-700 mb-4 sm:mb-6"
            >
              Our chefs combine traditional techniques with innovative approaches to create dishes that delight the senses and nourish the soul.
            </motion.p>
            <motion.p 
              variants={staggerItem}
              className="text-gray-700"
            >
              Each ingredient is carefully selected for quality and sustainability, ensuring that every meal tells a story of passion and respect for food.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#3a0a14] text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="order-2 md:order-1">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
              className="h-px bg-[#d4af37] mb-6"
            />
            <motion.h2 
              variants={rotateIn}
              className="text-2xl sm:text-3xl font-medium text-white mb-6 sm:mb-8">Our food philosophy</motion.h2>
            <motion.p 
              variants={staggerItem}
              className="text-gray-200 mb-4 sm:mb-6"
            >
              At Nirvana Fusion, we believe that food should be more than just sustenance—it should be an experience that engages all the senses and creates lasting memories.
            </motion.p>
            <motion.p 
              variants={staggerItem}
              className="text-gray-200 mb-4 sm:mb-6"
            >
              Our culinary approach is rooted in respect for ingredients, innovative techniques, and a deep appreciation for the cultural heritage of each dish we serve.
            </motion.p>
            <motion.p 
              variants={staggerItem}
              className="text-gray-200"
            >
              We are committed to sustainability and ethical sourcing, working closely with local farmers and producers to bring the freshest seasonal ingredients to your table.
            </motion.p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealFromRight}
            className="h-[300px] sm:h-[350px] overflow-hidden shadow-xl order-1 md:order-2 rounded-sm"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <motion.img 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={imageReveal}
                src="/Images/image4.jpg" 
                alt="Gourmet dish" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
              className="h-px bg-[#3a0a14] mx-auto mb-6"
            />
            <motion.h2 
              variants={rotateIn}
              className="text-2xl sm:text-3xl tracking-widest text-gray-800 uppercase font-light"
            >
              OUR MENUS
            </motion.h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto"
          >
            {/* Menu Category 1 */}
            <motion.div 
              variants={staggerItem}
              className="mb-6 sm:mb-8"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="border-8 border-[#3a0a14] overflow-hidden h-[350px] sm:h-[400px] rounded-sm"
              >
                <motion.img 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={imageReveal}
                  src="/Images/image5.jpg" 
                  alt="À La Carte Menu" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-6 text-center"
              >
                <h3 className="text-base sm:text-lg tracking-widest text-gray-700 uppercase">A LA CARTE</h3>
                <div className="w-24 h-0.5 bg-[#3a0a14] mx-auto mt-2"></div>
              </motion.div>
            </motion.div>
            
            {/* Menu Category 2 */}
            <motion.div 
              variants={staggerItem}
              className="mb-6 sm:mb-8"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="border-8 border-[#3a0a14] overflow-hidden h-[350px] sm:h-[400px] rounded-sm"
              >
                <motion.img 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={imageReveal}
                  src="/Images/image6.jpg" 
                  alt="Drinks Menu" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 text-center"
              >
                <h3 className="text-base sm:text-lg tracking-widest text-gray-700 uppercase">DRINKS</h3>
                <div className="w-24 h-0.5 bg-[#3a0a14] mx-auto mt-2"></div>
              </motion.div>
            </motion.div>
            
            {/* Menu Category 3 */}
            <motion.div 
              variants={staggerItem}
              className="mb-6 sm:mb-8"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="border-8 border-[#3a0a14] overflow-hidden h-[350px] sm:h-[400px] rounded-sm"
              >
                <motion.img 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={imageReveal}
                  src="/Images/image4.jpg" 
                  alt="Desserts Menu" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 text-center"
              >
                <h3 className="text-base sm:text-lg tracking-widest text-gray-700 uppercase">DESSERTS</h3>
                <div className="w-24 h-0.5 bg-[#3a0a14] mx-auto mt-2"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
              className="h-px bg-[#3a0a14] mx-auto mb-6"
            />
            <motion.h2 
              variants={rotateIn}
              className="text-2xl sm:text-3xl tracking-widest text-gray-800 uppercase font-light"
            >
              GALLERY
            </motion.h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* First row - top left */}
              <motion.div variants={staggerItem}>
                <motion.div 
                  className="mb-4 overflow-hidden rounded-sm"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={imageReveal}
                    src="/Images/image3.jpg" 
                    alt="Restaurant Terrace" 
                    className="w-full h-[200px] object-cover" 
                  />
                </motion.div>
                <motion.div 
                  className="overflow-hidden rounded-sm"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={imageReveal}
                    transition={{ delay: 0.2 }}
                    src="/Images/image4.jpg" 
                    alt="Gourmet Dish" 
                    className="w-full h-[250px] object-cover" 
                  />
                </motion.div>
              </motion.div>
              
              {/* Middle column */}
              <motion.div variants={staggerItem}>
                <motion.div 
                  className="h-[465px] overflow-hidden rounded-sm"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={imageReveal}
                    transition={{ delay: 0.3 }}
                    src="/Images/image5.jpg" 
                    alt="Sushi Platter" 
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
              </motion.div>
              
              {/* Right column */}
              <motion.div variants={staggerItem}>
                <motion.div 
                  className="mb-4 overflow-hidden rounded-sm"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={imageReveal}
                    transition={{ delay: 0.4 }}
                    src="/Images/image2.jpg" 
                    alt="Restaurant Interior" 
                    className="w-full h-[200px] object-cover" 
                  />
                </motion.div>
                <motion.div 
                  className="overflow-hidden rounded-sm"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={imageReveal}
                    transition={{ delay: 0.5 }}
                    src="/Images/image1.png" 
                    alt="Dining Experience" 
                    className="w-full h-[250px] object-cover" 
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      


      {/* Footer */}
      <footer className="pt-16 pb-8 bg-[#3a0a14] text-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Logo and About */}
            <div className="md:col-span-1">
              <div className="flex justify-center md:justify-start mb-6">
                <img src="/Images/nirvana-logo.png" alt="Nirvana" className="h-16" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed text-center md:text-left">
                Experience the perfect fusion of flavors at Nirvana, where culinary excellence meets exceptional service in an elegant atmosphere.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="md:col-span-1 text-center md:text-left">
              <h3 className="text-lg font-light tracking-widest uppercase mb-6">Contact</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-center justify-center md:justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Gourmet Street, Culinary City</span>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@nirvanafusion.com</span>
                </li>
              </ul>
            </div>
            
            {/* Opening Hours */}
            <div className="md:col-span-1 text-center md:text-left">
              <h3 className="text-lg font-light tracking-widest uppercase mb-6">Hours</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>5:00 PM - 10:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday - Saturday</span>
                  <span>5:00 PM - 11:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>5:00 PM - 9:00 PM</span>
                </li>
                <li className="flex justify-between pt-2">
                  <span>Lunch (Fri-Sun)</span>
                  <span>12:00 PM - 2:30 PM</span>
                </li>
              </ul>
            </div>
            
            {/* Follow Us */}
            <div className="md:col-span-1 text-center md:text-left">
              <h3 className="text-lg font-light tracking-widest uppercase mb-6">Follow Us</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <Link href="#" className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-400 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-400 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-400 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-400 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </Link>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-light tracking-widest uppercase mb-4">Newsletter</h3>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-[#4a1a24] border-0 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#d4af37] w-full"
                  />
                  <button className="bg-[#d4af37] text-[#3a0a14] px-4 py-2 text-sm font-medium hover:bg-[#c4a027] transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Nirvana Fusion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}