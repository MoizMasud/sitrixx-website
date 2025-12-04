import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from './ui/button';
import { 
  Star,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { baseUrl } from '../lib/base-url';
import Navigation from './Navigation';
import { ThemeProvider } from './ThemeProvider';

const portfolioItems = [
  {
    title: "Barber Shop",
    category: "Real Estate",
    description: "Modern booking site with automated reminders",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80",
    technologies: ["Astro", "TypeScript", "Calendly API", "SMS Automation"],
    details: "A sleek, mobile-optimized barbershop website featuring integrated booking calendar, automated SMS appointment reminders, and a modern UI that converts visitors into customers.",
    results: ["50% more online bookings", "Zero missed appointments", "Mobile-first design"]
  },
  {
    title: "Real Estate IDX",
    category: "Real Estate",
    description: "Full IDX integration with lead automation",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    technologies: ["Astro", "TypeScript", "Tailwind CSS", "Framer Motion"],
    details: "Complete realtor website with automatic MLS listing updates, book-a-showing calendar, AI chatbot for 24/7 lead engagement, and full CRM pipeline connection.",
    results: ["Live listing updates", "3x more qualified leads", "24/7 AI assistance"]
  },
  {
    title: "Dental Practice",
    category: "Real Estate",
    description: "Appointment booking with review automation",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
    technologies: ["Astro", "TypeScript", "TidyCal API", "Zapier"],
    details: "Professional dental practice website with embedded booking calendar, automated patient reminders, review collection system, and new patient pipeline automation.",
    results: ["40% increase in appointments", "5-star review growth", "Automated follow-ups"]
  },
  {
    title: "Fitness Studio",
    category: "Real Estate",
    description: "Class booking and membership management",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80",
    technologies: ["Astro", "React", "Calendly API", "SMS Integration"],
    details: "Dynamic fitness studio site with class scheduling, membership sign-ups, automated class reminders, and instructor profiles with a bold, energetic design.",
    results: ["100+ class bookings/month", "Reduced no-shows by 60%", "Streamlined check-ins"]
  },
  {
    title: "Contractor Portfolio",
    category: "Real Estate",
    description: "Project showcase with lead capture",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
    technologies: ["Astro", "TypeScript", "Contact Forms", "Lead Automation"],
    details: "Eye-catching contractor portfolio showcasing completed projects with before/after galleries, service area maps, automated quote requests, and client testimonials.",
    results: ["Professional brand presence", "Quality lead filtering", "Instant quote requests"]
  },
  {
    title: "E-Commerce Store",
    category: "Real Estate",
    description: "Product showcase with simple checkout",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&q=80",
    technologies: ["Astro", "TypeScript", "Stripe API", "AI Chatbot"],
    details: "Clean e-commerce site for small product catalogs with integrated payment processing, AI-powered product recommendations, and abandoned cart recovery.",
    results: ["Simple product management", "Secure checkout", "AI product assistance"]
  },
  {
    title: "Restaurant",
    category: "Real Estate",
    description: "Online ordering with reservation system",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    technologies: ["Astro", "React", "Square API", "Reservation System"],
    details: "Beautiful restaurant site with online ordering, table reservations, menu management, and automated confirmation emails for a seamless dining experience.",
    results: ["30% increase in online orders", "Reduced phone orders", "Automated confirmations"]
  },
  {
    title: "Law Firm",
    category: "Real Estate",
    description: "Attorney profiles with case consultation booking",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
    technologies: ["Astro", "TypeScript", "Calendly", "Contact Forms"],
    details: "Professional law firm website featuring attorney bios, practice areas, case results, consultation booking, and lead capture with automated follow-up sequences.",
    results: ["Professional credibility", "Qualified lead filtering", "Automated consultations"]
  }
];

const categories = ["All", "Real Estate"];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

function PortfolioPageContent() {
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const portfolioRef = useRef(null);
  const isPortfolioInView = useInView(portfolioRef, { once: true, margin: "-100px" });

  const filteredProjects = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block mb-6"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            <div className="relative bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 px-8 py-3 rounded-full shadow-lg">
              <span className="text-sm font-black tracking-widest uppercase text-foreground">
                Our Work
              </span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[1.1] bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Featured Projects
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Exceptional digital experiences crafted for ambitious brands across industries
          </motion.p>
        </motion.div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-xl'
                    : 'bg-muted hover:bg-muted/80 text-foreground border-2 border-transparent hover:border-primary/30'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-4" ref={portfolioRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            variants={staggerContainer}
            initial="hidden"
            animate={isPortfolioInView ? "visible" : "hidden"}
            key={selectedCategory}
          >
            {filteredProjects.map((item, index) => (
              <motion.div
                key={`${selectedCategory}-${index}`}
                variants={scaleIn}
                whileHover={{ y: -16, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                className="cursor-pointer group"
                onClick={() => setSelectedProject(item)}
              >
                <div className="bg-card border-2 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all">
                  <div className="relative h-96 overflow-hidden">
                    <motion.img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute top-8 left-8 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground px-6 py-3 rounded-2xl text-sm font-black shadow-2xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.category}
                    </motion.div>
                  </div>
                  <div className="p-10">
                    <h3 className="text-3xl font-black mb-3 tracking-tight text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-8 font-light text-lg leading-relaxed">{item.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {item.technologies.slice(0, 3).map((tech, i) => (
                        <motion.span 
                          key={i} 
                          className="bg-gradient-to-r from-muted to-muted/50 border-2 px-5 py-2 rounded-xl text-xs font-bold shadow-md"
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-muted-foreground font-light">No projects found in this category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border-2">
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <DialogHeader>
                <DialogTitle className="text-4xl font-black tracking-tight text-foreground">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-xl font-light">
                  {selectedProject.category}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-10 mt-6">
                <motion.img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-96 object-cover rounded-2xl border-2 shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                />
                
                <div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight text-foreground">Project Overview</h3>
                  <p className="text-muted-foreground font-light leading-relaxed text-lg">{selectedProject.details}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6 tracking-tight text-foreground">Technologies & Tools</h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.technologies.map((tech, i) => (
                      <motion.span 
                        key={i} 
                        className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground px-6 py-3 rounded-2xl text-sm font-bold shadow-xl"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6 tracking-tight text-foreground">Measurable Impact</h3>
                  <ul className="space-y-4">
                    {selectedProject.results.map((result, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="text-green-500" size={20} strokeWidth={3} />
                        </div>
                        <span className="font-medium text-lg text-foreground">{result}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full rounded-2xl h-14 font-bold text-lg shadow-2xl bg-gradient-to-r from-primary to-purple-600 hover:scale-[1.02] transition-all"
                  asChild
                  size="lg"
                >
                  <a href={`${baseUrl}/contact`}>
                    Start Your Project Today
                    <ArrowRight className="ml-2" size={20} />
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 border-2 rounded-3xl p-12 md:p-20 text-center shadow-3xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3), transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-foreground">
                Ready for Your Own Success Story?
              </h2>
              <p className="text-muted-foreground text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Let's build something extraordinary together
              </p>
              <Button 
                size="lg" 
                asChild 
                className="group rounded-2xl px-10 h-14 text-lg font-bold shadow-2xl bg-gradient-to-r from-primary to-purple-600 hover:scale-110 transition-all"
              >
                <a href={`${baseUrl}/contact`}>
                  Start Your Project
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4">
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-3xl font-black mb-4 text-foreground"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Sitrixx
          </motion.div>
          <p className="text-muted-foreground font-light text-lg">
            © {new Date().getFullYear()} Sitrixx. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-3 font-light">
            Premium websites with intelligent automation for forward-thinking businesses.
          </p>
        </motion.div>
      </footer>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <ThemeProvider>
      <PortfolioPageContent />
    </ThemeProvider>
  );
}
