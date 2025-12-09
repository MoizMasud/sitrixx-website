import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from './ui/button';
import { 
  ArrowRight,
  Sparkles,
  Heart,
  Users,
  FileKey,
  Award,
  Briefcase
} from 'lucide-react';
import { baseUrl } from '../lib/base-url';
import Navigation from './Navigation';
import { ThemeProvider } from './ThemeProvider';

const whyChooseUsCards = [
  {
    icon: Briefcase,
    title: "Enterprise-Level Experience",
    description: "With over 10+ years of enterprise-level experience, we bring professional expertise to every project. We've built websites from front to back for businesses of all sizes.",
    gradient: "from-primary to-purple-600"
  },
  {
    icon: Heart,
    title: "Your Vision First",
    description: "We start every project by listening to your pain points, understanding your goals, and learning what makes your business unique. Your vision guides every decision.",
    gradient: "from-primary to-purple-600"
  },
  {
    icon: Users,
    title: "Collaborative Process",
    description: "From color palettes to page layouts, you're involved at every step. We iterate based on your feedback until it's exactly what you envisioned.",
    gradient: "from-primary to-purple-600"
  },
  {
    icon: FileKey,
    title: "You Own Everything",
    description: "After launch, you get the code and can host it anywhere — or we can maintain it for you. It's your project, your choice, your way.",
    gradient: "from-primary to-purple-600"
  }
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AboutPageContent() {
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });

  const whyChooseRef = useRef(null);
  const isWhyChooseInView = useInView(whyChooseRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-primary/10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        {[...Array(15)].map((_, i) => (
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4"
          >
            <div className="text-xl md:text-2xl font-light text-muted-foreground min-h-[2rem]">
              <TypeAnimation
                sequence={[
                  'Meet the Sitrixx Team',
                  2000,
                  '10+ Years of Experience',
                  2000,
                  'Your Partner in Digital Success',
                  2000,
                  'From Discovery to Handoff',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[1.1] bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            About Us
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-6 max-w-4xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            We build websites that are fully customized to your needs — from the first conversation to the final handoff
          </motion.p>
        </motion.div>
      </section>

      {/* About Sitrixx Section */}
      <section className="py-20 px-4" ref={aboutRef}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial="hidden"
              animate={isAboutInView ? "visible" : "hidden"}
              variants={fadeInLeft}
              className="relative px-8"
            >
              <motion.div 
                className="relative rounded-3xl overflow-hidden shadow-3xl"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-[500px] object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isAboutInView ? "visible" : "hidden"}
              variants={fadeInRight}
              className="space-y-6 pt-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={isAboutInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative inline-block"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <div className="relative bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 backdrop-blur-sm border border-primary/30 px-8 py-3 rounded-full shadow-lg">
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={isAboutInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="text-primary" size={18} />
                    </motion.div>
                    <span className="text-sm font-black tracking-widest uppercase text-foreground">
                      Our Mission
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.h2
                className="text-5xl md:text-6xl font-black tracking-tighter leading-[1.1] text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Built Around You
              </motion.h2>
              
              <motion.div 
                className="space-y-6 text-xl text-muted-foreground leading-relaxed font-light"
                initial={{ opacity: 0 }}
                animate={isAboutInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Sitrixx creates custom websites using modern technologies. We bring <strong className="text-foreground">10+ years of enterprise-level experience</strong> building websites from front to back — but we make it personal and accessible for every client.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  We don't use templates or shortcuts. Every project starts with understanding <strong className="text-foreground">your</strong> pain points, <strong className="text-foreground">your</strong> goals, and <strong className="text-foreground">your</strong> vision. From color palettes to automation workflows, everything is designed around your business model and brand identity.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  We collaborate closely throughout the entire process — and at the end, you own all the code. Whether you want to host it yourself or have us maintain it, the choice is yours.
                </motion.p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Button size="lg" asChild className="group mt-6 rounded-2xl px-10 h-14 font-bold shadow-2xl text-lg bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-all">
                  <a href={`${baseUrl}/contact`}>
                    Start Your Custom Project
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-muted/30 to-transparent" ref={whyChooseRef}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative inline-block mb-6"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <div className="relative bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 backdrop-blur-sm border border-primary/30 px-8 py-3 rounded-full shadow-lg">
                <span className="text-sm font-black tracking-widest uppercase text-foreground">
                  Why Choose Us
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">A Personalized Experience</h2>
            <p className="text-muted-foreground text-2xl font-light">
              Every project is a partnership — we listen, collaborate, and build exactly what you need
            </p>
          </AnimatedSection>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isWhyChooseInView ? "visible" : "hidden"}
          >
            {whyChooseUsCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.4 } }}
                  className="relative bg-gradient-to-br from-card via-card to-muted/20 border-2 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all overflow-hidden group"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center mb-8 shadow-2xl`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="text-white" size={32} strokeWidth={2.5} />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight text-foreground">{card.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-light text-base">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <motion.div 
              className="relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/10 border-2 rounded-3xl p-20 text-center shadow-3xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
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
              
              <div className="relative z-10 space-y-8">
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground">
                  Ready to Start Your Custom Project?
                </h2>
                <p className="text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                  Let's discuss your vision, pain points, and goals. We'll build exactly what you need — your way.
                </p>
                <Button size="lg" asChild className="group rounded-2xl px-10 h-14 font-bold shadow-2xl text-lg bg-gradient-to-r from-primary to-purple-600 hover:scale-110 transition-all">
                  <a href={`${baseUrl}/contact`}>
                    Get in Touch
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
                  </a>
                </Button>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4">
        <AnimatedSection className="max-w-6xl mx-auto text-center">
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
            Custom websites with smart automation — built exactly how you want it.
          </p>
        </AnimatedSection>
      </footer>
    </div>
  );
}

export default function AboutPage() {
  return (
    <ThemeProvider>
      <AboutPageContent />
    </ThemeProvider>
  );
}
