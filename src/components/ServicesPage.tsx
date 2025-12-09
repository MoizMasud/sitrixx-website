import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Button } from './ui/button';
import { 
  RefreshCw,
  Building2,
  Check,
  ArrowRight,
  Globe,
  Zap,
  Palette,
  Crown,
  Sparkles
} from 'lucide-react';
import { baseUrl } from '../lib/base-url';
import Navigation from './Navigation';
import { ThemeProvider } from './ThemeProvider';

const pricingPlans = [
  {
    name: "Monthly Subscription",
    subtitle: "Plan A",
    description: "Best for clients who want low upfront cost and a fully managed website",
    features: [
      "Custom website build included",
      "Unlimited edits & updates",
      "Hosting, security & backups",
      "Google review automation (email & SMS)",
      "Month-to-month after minimum term"
    ],
    icon: RefreshCw,
    gradient: "from-primary to-purple-600",
    bestFor: "Ideal for businesses that want zero upfront costs and prefer monthly payments"
  },
  {
    name: "One-Time Build + Maintenance",
    subtitle: "Plan B",
    description: "Complete custom website with ongoing support",
    features: [
      "One-time custom build",
      "Monthly maintenance included",
      "Website updates & changes",
      "Security monitoring",
      "Hosting & backups",
      "Priority support"
    ],
    popular: true,
    gradient: "from-primary to-purple-600",
    bestFor: "Best for businesses that want to own the site outright with optional ongoing support"
  }
];

const addOns = [
  {
    name: "Extra Website Page",
    description: "Add another custom page to your website",
    icon: Globe,
    gradient: "from-primary to-purple-600"
  },
  {
    name: "Additional Automation Workflow",
    description: "Custom automation tailored to your business needs",
    icon: Zap,
    gradient: "from-primary to-purple-600"
  },
  {
    name: "Branding Palette",
    description: "Professional color scheme and brand identity design",
    icon: Palette,
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

  const addOnsRef = useRef(null);
  const isAddOnsInView = useInView(addOnsRef, { once: true, margin: "-100px" });

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
                  'Flexible Service Plans',
                  2000,
                  'Built Around Your Needs',
                  2000,
                  'Your Vision, Our Expertise',
                  2000,
                  'Custom Websites, Smart Solutions',
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
            Choose the plan that fits your needs — every website is fully customized to your brand and goals
          </motion.p>
        </motion.div>
      </section>

      {/* Service Plans Section */}
      <section className="py-32 px-4" ref={servicesRef}>
        <div className="max-w-6xl mx-auto">
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
                  Flexible Plans
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">Choose Your Plan</h2>
            <p className="text-muted-foreground text-2xl font-light max-w-4xl mx-auto">
              Every website is fully customized — pick the structure that works best for you
            </p>
          </AnimatedSection>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
          >
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="h-full"
                >
                  <div className={`relative h-full bg-card border rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden ${plan.popular ? 'ring-2 ring-primary/50' : ''}`}>
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                        <span className="text-primary-foreground text-xs font-black tracking-wider flex items-center gap-2">
                          <Crown size={16} />
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    <div className={`p-8 ${plan.popular ? 'pt-20' : ''}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <Icon className="text-white" size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground font-bold tracking-wider uppercase">{plan.subtitle}</div>
                          <h3 className="text-2xl font-black tracking-tight text-foreground">{plan.name}</h3>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground font-light text-sm leading-relaxed mb-6">{plan.description}</p>

                      <div className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="text-primary" size={12} strokeWidth={3} />
                            </div>
                            <span className="text-sm text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-muted/50 border rounded-xl p-4 mb-6">
                        <p className="text-xs text-muted-foreground font-medium text-center leading-relaxed">
                          {plan.bestFor}
                        </p>
                      </div>

                      <Button 
                        className={`w-full group rounded-2xl h-12 font-bold shadow-lg hover:scale-105 transition-all ${
                          plan.popular 
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

      {/* Add-Ons Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-muted/30 to-transparent" ref={addOnsRef}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
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
                  Optional Add-Ons
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">Enhance Your Website</h2>
            <p className="text-muted-foreground text-2xl font-light max-w-4xl mx-auto">
              Customize your website even further with these optional extras
            </p>
          </AnimatedSection>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isAddOnsInView ? "visible" : "hidden"}
          >
            {addOns.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative bg-card border rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${addon.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="text-white" size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-foreground">{addon.name}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{addon.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
              
              <div className="relative z-10">
                <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter text-foreground">Ready to Get Started?</h2>
                <p className="text-muted-foreground text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                  Schedule a discovery call and tell us about your vision and goals
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
