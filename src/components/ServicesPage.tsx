import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Globe, 
  Zap, 
  Building2,
  Check,
  ArrowRight,
  ClipboardList,
  Palette,
  Wrench,
  Rocket,
  Sparkles,
  Crown
} from 'lucide-react';
import { baseUrl } from '../lib/base-url';
import Navigation from './Navigation';
import { ThemeProvider } from './ThemeProvider';

const serviceTiers = [
  {
    name: "Starter Website",
    subtitle: "Package 1",
    description: "A clean, modern site for small businesses",
    features: [
      "Up to 5 pages layout",
      "Mobile-optimized layout",
      "Contact form",
      "Modern UI/UX",
      "Basic edits included"
    ],
    icon: Globe,
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    bestFor: "Perfect for barbers, salons, contractors, freelancers, and small shops"
  },
  {
    name: "Smart Website + Automations",
    subtitle: "Package 2",
    description: "A custom website connected to automation",
    features: [
      "2–5 custom pages",
      "Booking calendar embedded",
      "AI chatbot embedded",
      "SMS reminders",
      "Lead capture automations",
      "Review automation",
      "New client pipeline"
    ],
    icon: Zap,
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
    popular: true,
    bestFor: "Great for businesses that want more bookings and automated follow-ups"
  },
  {
    name: "Advanced Website + IDX + Automations",
    subtitle: "Package 3 (Realtors)",
    description: "Full Webflow website with IDX listing integration",
    features: [
      "Real estate pages",
      "Automatic listing updates via IDX",
      "Book-a-Showing calendar",
      "Buyer/seller lead forms",
      "SMS updates",
      "AI chatbot on every page",
      "Full CRM connection"
    ],
    icon: Building2,
    color: "text-orange-500",
    gradient: "from-orange-500 to-red-500",
    bestFor: "Best for realtors, brokers, teams, and agencies"
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Onboarding",
    description: "We learn about your business, goals, style, and brand. You fill out our quick onboarding form so we understand your vision.",
    icon: ClipboardList,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    number: "02",
    title: "Design & Preview",
    description: "We design a clean, modern layout inside Webflow. You receive a preview link to approve the look and feel.",
    icon: Palette,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    title: "Build & Automations",
    description: "We build all pages, set up mobile layouts, and embed booking calendar, contact forms, AI chatbot, SMS reminders, and IDX (for realtors). Everything is connected to your CRM.",
    icon: Wrench,
    gradient: "from-orange-500 to-red-500"
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "We connect your domain, publish your website, and test everything. You get full training, plus optional monthly support for updates and automation optimization.",
    icon: Rocket,
    gradient: "from-green-500 to-emerald-500"
  }
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
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

function ServicesPageContent() {
  const servicesRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

  const processRef = useRef(null);
  const isProcessInView = useInView(processRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section - Updated to match About page style */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
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
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4"
          >
            <div className="text-xl md:text-2xl font-light text-muted-foreground min-h-[2rem]">
              <TypeAnimation
                sequence={[
                  'Premium Service Packages',
                  2000,
                  'Tailored Solutions for You',
                  2000,
                  'Choose Your Perfect Plan',
                  2000,
                  'Elevate Your Business',
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
            Our Services
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-6 max-w-4xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Choose the perfect package to elevate your business with cutting-edge automation
          </motion.p>
        </motion.div>
      </section>

      {/* Service Packages Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-muted/30 to-transparent" ref={servicesRef}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20">
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
                  Our Packages
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">Choose Your Path</h2>
            <p className="text-muted-foreground text-2xl font-light">
              Premium solutions designed for every stage of growth
            </p>
          </AnimatedSection>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
          >
            {serviceTiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -16, scale: 1.03, transition: { duration: 0.4 } }}
                  className="h-full"
                >
                  <div className={`relative h-full bg-gradient-to-br from-card via-card to-muted/20 border-2 rounded-3xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden ${tier.popular ? 'ring-4 ring-primary/20' : ''}`}>
                    {tier.popular && (
                      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                        <motion.span 
                          className="text-primary-foreground text-sm font-black tracking-wider flex items-center gap-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Crown size={18} />
                          MOST POPULAR
                        </motion.span>
                      </div>
                    )}

                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <div className={`relative p-10 ${tier.popular ? 'pt-24' : ''}`}>
                      <motion.div 
                        className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-2xl`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="text-white" size={40} strokeWidth={2.5} />
                      </motion.div>
                      
                      <div className="text-center mb-8">
                        <div className="text-sm text-muted-foreground mb-2 font-bold tracking-wide uppercase">{tier.subtitle}</div>
                        <h3 className="text-3xl font-black mb-3 tracking-tight text-foreground">{tier.name}</h3>
                        <p className="text-muted-foreground font-light text-base leading-relaxed">{tier.description}</p>
                      </div>

                      <ul className="space-y-4 mb-8">
                        {tier.features.map((feature, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isServicesInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="text-primary" size={16} strokeWidth={3} />
                            </div>
                            <span className="text-sm font-medium text-foreground">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-2 border-primary/10 p-5 rounded-2xl mb-6">
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">{tier.bestFor}</p>
                      </div>

                      <Button 
                        className={`w-full group rounded-2xl h-12 font-bold shadow-xl hover:scale-105 transition-all ${tier.popular ? 'bg-gradient-to-r from-primary to-purple-600' : ''}`}
                        variant={tier.popular ? "default" : "outline"}
                        size="lg"
                        asChild
                      >
                        <a href={`${baseUrl}/contact`}>
                          Get Started
                          <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={18} />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-4" ref={processRef}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative inline-block mb-6"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <div className="relative bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 px-8 py-3 rounded-full shadow-lg">
                <span className="text-sm font-black tracking-widest uppercase text-foreground">
                  Our Process
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">Seamless Journey</h2>
            <p className="text-muted-foreground text-2xl font-light">
              From vision to reality in four refined steps
            </p>
          </AnimatedSection>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isProcessInView ? "visible" : "hidden"}
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.4 } }}
                  className="relative"
                >
                  <div className="relative h-full bg-gradient-to-br from-card to-muted/20 border-2 rounded-3xl shadow-xl hover:shadow-3xl transition-all overflow-hidden p-8">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 hover:opacity-5 transition-opacity duration-500`}
                    />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className={`w-16 h-16 bg-gradient-to-br ${step.gradient} text-white rounded-2xl flex items-center justify-center mb-6 shadow-2xl`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon size={32} strokeWidth={2.5} />
                      </motion.div>
                      
                      <div className="text-sm font-black text-primary mb-2 tracking-wider">STEP {step.number}</div>
                      <h3 className="text-xl font-black mb-4 tracking-tight text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <motion.div 
              className="relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 border-2 rounded-3xl p-20 text-center shadow-3xl overflow-hidden"
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
              
              <div className="relative z-10">
                <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter text-foreground">Ready to Begin?</h2>
                <p className="text-muted-foreground text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                  Let's collaborate on creating your perfect digital solution
                </p>
                <Button size="lg" asChild className="group rounded-2xl px-10 h-14 font-bold shadow-2xl text-lg bg-gradient-to-r from-primary to-purple-600 hover:scale-110 transition-all">
                  <a href={`${baseUrl}/contact`}>
                    Start Your Project
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
        <AnimatedSection className="max-w-7xl mx-auto text-center">
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
        </AnimatedSection>
      </footer>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <ThemeProvider>
      <ServicesPageContent />
    </ThemeProvider>
  );
}