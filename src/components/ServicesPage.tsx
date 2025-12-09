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
  FileCheck,
  RefreshCw,
  Repeat,
  DollarSign
} from 'lucide-react';
import { baseUrl } from '../lib/base-url';
import Navigation from './Navigation';
import { ThemeProvider } from './ThemeProvider';

const pricingPlans = [
  {
    name: "Monthly Subscription",
    subtitle: "Plan A",
    price: "$297/month",
    description: "Best for clients who want low upfront cost and a fully managed website",
    features: [
      "Custom website build included",
      "Unlimited edits & updates",
      "Hosting, security & backups",
      "Google review automation (email & SMS)"
    ],
    icon: RefreshCw,
    color: "text-primary",
    gradient: "from-primary to-purple-600",
    bestFor: "Ideal for businesses that want zero upfront costs and prefer monthly payments",
    terms: "Minimum Term: 5 months (total $1,485). After 5 months: month-to-month."
  },
  {
    name: "One-Time Build + Maintenance",
    subtitle: "Plan B",
    price: "$1,250 + $100/mo",
    description: "Complete custom website with ongoing support",
    features: [
      "One-time build fee: $1,250",
      "Monthly maintenance: $100/month",
      "Website updates",
      "Security monitoring",
      "Hosting & backups",
      "Minor content changes"
    ],
    icon: Building2,
    color: "text-purple-600",
    gradient: "from-primary to-purple-600",
    popular: true,
    bestFor: "Best for businesses that want to own the site outright with optional ongoing support",
    terms: "Payment: 50% deposit, 40% on structure completion, 10% before launch"
  }
];

const addOns = [
  {
    name: "Extra Website Page",
    price: "$150",
    description: "Add another custom page to your website",
    icon: Globe
  },
  {
    name: "Additional Automation Workflow",
    price: "$150–$400",
    description: "Custom automation tailored to your business needs",
    icon: Zap
  },
  {
    name: "Branding Palette",
    price: "$80",
    description: "Professional color scheme and brand identity design",
    icon: Palette
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

  const addOnsRef = useRef(null);
  const isAddOnsInView = useInView(addOnsRef, { once: true, margin: "-100px" });

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
                  'Flexible Pricing Plans',
                  2000,
                  'Built Around Your Needs',
                  2000,
                  'Your Vision, Our Expertise',
                  2000,
                  'Custom Websites, Smart Pricing',
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
            Packages & Pricing
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-6 max-w-4xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Choose the plan that fits your budget — every website is fully customized to your brand and goals
          </motion.p>
        </motion.div>
      </section>

      {/* Pricing Plans Section */}
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
                  Flexible Plans
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">Choose Your Plan</h2>
            <p className="text-muted-foreground text-2xl font-light max-w-4xl mx-auto">
              Every website is fully customized — pick the payment structure that works best for you
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
                  whileHover={{ y: -16, scale: 1.02, transition: { duration: 0.4 } }}
                  className="h-full"
                >
                  <div className={`relative h-full bg-gradient-to-br from-card via-card to-muted/20 border-2 rounded-3xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden ${plan.popular ? 'ring-4 ring-primary/30 scale-105' : ''}`}>
                    {plan.popular && (
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
                      className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <div className={`relative p-8 ${plan.popular ? 'pt-24' : ''}`}>
                      <motion.div 
                        className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-2xl`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="text-white" size={40} strokeWidth={2.5} />
                      </motion.div>
                      
                      <div className="text-center mb-8">
                        <div className="text-xs text-muted-foreground mb-2 font-bold tracking-wider uppercase">{plan.subtitle}</div>
                        <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tight text-foreground">{plan.name}</h3>
                        <div className="text-4xl font-black text-primary mb-3">{plan.price}</div>
                        <p className="text-muted-foreground font-light text-sm leading-relaxed">{plan.description}</p>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
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
                        className="bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20 p-4 rounded-2xl mb-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-xs text-muted-foreground font-semibold leading-relaxed text-center">
                          <span className="block mb-1 text-primary font-bold uppercase tracking-wide" style={{ fontSize: '10px' }}>
                            Perfect For
                          </span>
                          {plan.bestFor}
                        </p>
                      </motion.div>

                      {plan.terms && (
                        <motion.div 
                          className="bg-muted/30 border border-border p-3 rounded-xl mb-6"
                          whileHover={{ scale: 1.01 }}
                        >
                          <p className="text-xs text-muted-foreground font-medium text-center leading-relaxed">
                            {plan.terms}
                          </p>
                        </motion.div>
                      )}

                      <Button 
                        className={`w-full group rounded-2xl h-12 font-bold shadow-xl hover:scale-105 transition-all ${
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
      <section className="py-32 px-4" ref={addOnsRef}>
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
                  whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.4 } }}
                  className="relative bg-gradient-to-br from-card via-card to-muted/20 border-2 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="relative z-10">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="text-white" size={32} strokeWidth={2.5} />
                    </motion.div>
                    <div className="text-3xl font-black text-primary mb-3">{addon.price}</div>
                    <h3 className="text-xl font-bold mb-4 tracking-tight text-foreground">{addon.name}</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{addon.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-muted/30 to-transparent" ref={processRef}>
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
