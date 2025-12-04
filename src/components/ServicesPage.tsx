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
  Crown,
  MessageSquare,
  PenTool,
  Code2,
  FileCheck
} from 'lucide-react';
import { baseUrl } from '../lib/base-url';
import Navigation from './Navigation';
import { ThemeProvider } from './ThemeProvider';

const serviceTiers = [
  {
    name: "Starter Website",
    subtitle: "Package 1",
    description: "A clean, modern site for small businesses — fully customized to your brand",
    features: [
      "1 page layout tailored to you",
      "Mobile-optimized design",
      "Custom colors & fonts",
      "Basic edits included",
      "You own the code"
    ],
    icon: Globe,
    color: "text-primary",
    gradient: "from-primary to-purple-600",
    bestFor: "Perfect for barbers, salons, contractors, freelancers, and small shops"
  },
  {
    name: "Smart Website + Automations",
    subtitle: "Package 2",
    description: "Custom multi-page website with automation built for your workflow",
    features: [
      "2–4 custom pages designed for you",
      "Booking calendar embedded",
      "SMS reminders configured",
      "Google review automation",
      "Lead capture forms",
      "Custom automation flows",
      "You own everything"
    ],
    icon: Zap,
    color: "text-purple-600",
    gradient: "from-primary to-purple-600",
    popular: true,
    bestFor: "Ideal for service businesses wanting more bookings and automated client follow-ups"
  },
  {
    name: "Advanced Website + Automations",
    subtitle: "Package 3",
    description: "Premium custom website with advanced integrations built around your needs",
    features: [
      "4+ custom pages",
      "Advanced booking system",
      "AI chatbot trained for your business",
      "SMS updates & reminders",
      "Lead capture & nurture flows",
      "Review automation",
      "SEO optimization",
      "Full code ownership & maintenance options"
    ],
    icon: Building2,
    color: "text-primary",
    gradient: "from-primary to-purple-600",
    bestFor: "Best for established businesses, agencies, and enterprises needing complete automation"
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We meet with you to discuss your pain points, goals, and vision. What problems do you need solved? What features matter most? We listen and take notes.",
    icon: MessageSquare,
    gradient: "from-primary to-purple-600"
  },
  {
    number: "02",
    title: "Design Your Way",
    description: "You share your color preferences, design style, and brand identity. We create a custom layout that matches your vision — no templates, no shortcuts.",
    icon: Palette,
    gradient: "from-primary to-purple-600"
  },
  {
    number: "03",
    title: "Custom Development",
    description: "We build every page, feature, and automation exactly as planned. Booking calendars, chatbots, SMS flows — all configured for your business model.",
    icon: Code2,
    gradient: "from-primary to-purple-600"
  },
  {
    number: "04",
    title: "Review & Refine",
    description: "You review the site and we make adjustments until it's perfect. We iterate based on your feedback — this is your website, your way.",
    icon: PenTool,
    gradient: "from-primary to-purple-600"
  },
  {
    number: "05",
    title: "Launch & Handoff",
    description: "We connect your domain and launch your site. You can take the code and host it yourself, or we can maintain and update it for you — your choice.",
    icon: Rocket,
    gradient: "from-primary to-purple-600"
  },
  {
    number: "06",
    title: "Ongoing Support (Optional)",
    description: "Need updates or want us to manage it? We offer monthly maintenance packages so you can focus on your business while we handle the tech.",
    icon: FileCheck,
    gradient: "from-primary to-purple-600"
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
                  'Custom Service Packages',
                  2000,
                  'Built Around Your Needs',
                  2000,
                  'Your Vision, Our Expertise',
                  2000,
                  'Flexible & Personalized',
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
            Every package is fully customized to your brand, goals, and workflow — with smart automation built your way
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
                  Fully Custom Packages
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">Choose Your Starting Point</h2>
            <p className="text-muted-foreground text-2xl font-light max-w-4xl mx-auto">
              Each package is a foundation — we customize everything to match your vision, brand, and business needs
            </p>
          </AnimatedSection>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
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
                  whileHover={{ y: -16, scale: 1.02, transition: { duration: 0.4 } }}
                  className="h-full"
                >
                  <div className={`relative h-full bg-gradient-to-br from-card via-card to-muted/20 border-2 rounded-3xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden ${tier.popular ? 'ring-4 ring-primary/30 scale-105' : ''}`}>
                    {tier.popular && (
                      <motion.div 
                        className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <motion.span 
                          className="text-primary-foreground text-sm font-black tracking-wider flex items-center gap-2"
                          animate={{ 
                            scale: [1, 1.05, 1],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <Crown size={18} />
                          MOST POPULAR
                        </motion.span>
                      </motion.div>
                    )}

                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <div className={`relative p-8 ${tier.popular ? 'pt-24' : ''}`}>
                      <motion.div 
                        className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-2xl`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="text-white" size={40} strokeWidth={2.5} />
                      </motion.div>
                      
                      <div className="text-center mb-8">
                        <div className="text-xs text-muted-foreground mb-2 font-bold tracking-wider uppercase">{tier.subtitle}</div>
                        <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tight text-foreground">{tier.name}</h3>
                        <p className="text-muted-foreground font-light text-sm leading-relaxed">{tier.description}</p>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isServicesInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="text-primary" size={12} strokeWidth={3} />
                            </div>
                            <span className="text-sm font-medium text-foreground">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.div 
                        className="bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20 p-4 rounded-2xl mb-6 relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-600/5"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        <p className="text-xs text-muted-foreground font-semibold leading-relaxed text-center relative z-10">
                          <span className="block mb-1 text-primary font-bold uppercase tracking-wide" style={{ fontSize: '10px' }}>
                            Perfect For
                          </span>
                          {tier.bestFor}
                        </p>
                      </motion.div>

                      <Button 
                        className={`w-full group rounded-2xl h-12 font-bold shadow-xl hover:scale-105 transition-all ${
                          tier.popular 
                            ? 'bg-gradient-to-r from-primary to-purple-600 text-primary-foreground' 
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        }`}
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
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative inline-block mb-6"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <div className="relative bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm border border-primary/30 px-8 py-3 rounded-full shadow-lg">
                <span className="text-sm font-black tracking-widest uppercase text-foreground">
                  Our Custom Process
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">From Vision to Launch</h2>
            <p className="text-muted-foreground text-2xl font-light max-w-4xl mx-auto">
              A transparent, collaborative process where your input guides every decision from discovery to final handoff
            </p>
          </AnimatedSection>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              
              <div className="relative z-10">
                <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter text-foreground">Let's Build It Together</h2>
                <p className="text-muted-foreground text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                  Schedule a discovery call and tell us about your vision, pain points, and goals
                </p>
                <Button size="lg" asChild className="group rounded-2xl px-10 h-14 font-bold shadow-2xl text-lg bg-gradient-to-r from-primary to-purple-600 text-primary-foreground hover:scale-110 transition-all">
                  <a href={`${baseUrl}/contact`}>
                    Start Your Custom Project
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

export default function ServicesPage() {
  return (
    <ThemeProvider>
      <ServicesPageContent />
    </ThemeProvider>
  );
}
