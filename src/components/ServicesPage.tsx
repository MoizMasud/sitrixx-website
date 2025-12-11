import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  Sparkles,
  ArrowDown,
  Package,
  Monitor,
  Phone,
  Star,
  Rocket,
  Smartphone
} from 'lucide-react';
import { baseUrl } from '../lib/base-url';

const pricingPlans = [
  {
    name: "Monthly Subscription",
    subtitle: "Plan A",
    price: "$149/month",
    term: "12-month minimum commitment",
    description: "Perfect for businesses wanting a low upfront cost with managed website service",
    features: [
      "Custom website build included",
      "2 small edits per month",
      "Hosting & backups",
      "Basic support",
      "Google review automation (email & SMS)"
    ],
    icon: RefreshCw,
    gradient: "from-primary to-purple-600",
    bestFor: "Ideal for businesses that want zero upfront costs and prefer monthly payments"
  },
  {
    name: "One-Time Build + Maintenance",
    subtitle: "Plan B",
    price: "$1,499",
    term: "One-time + $100/month (3-month minimum)",
    description: "Complete custom website with ongoing support and maintenance",
    features: [
      "Full custom website build",
      "1-2 edits per month included",
      "Hosting & security monitoring",
      "Priority support",
      "Monthly maintenance & updates",
      "Own your website outright"
    ],
    popular: true,
    icon: Building2,
    gradient: "from-primary to-purple-600",
    bestFor: "Best for businesses that want to own the site outright with optional ongoing support"
  }
];

const addOns = [
  {
    name: "Extra Website Page",
    description: "Add another custom page to your website",
    price: "$150",
    icon: Globe,
  },
  {
    name: "Additional Automation Workflow",
    description: "Custom automation tailored to your business needs",
    price: "$100",
    icon: Zap,
  },
  {
    name: "Branding Palette",
    description: "Professional color scheme and brand identity design",
    price: "$100",
    icon: Palette,
  }
];

export default function ServicesPage() {
  const plansRef = useRef(null);
  const diagramRef = useRef(null);
  const addOnsRef = useRef(null);
  const plansInView = useInView(plansRef, { once: true, amount: 0.2 });
  const diagramInView = useInView(diagramRef, { once: true, amount: 0.2 });
  const addOnsInView = useInView(addOnsRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-background text-foreground">
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
                  'Flexible Plans',
                  2000,
                  'Built Around You',
                  2000,
                  'Custom Solutions',
                  2000,
                  'Your Choice, Your Way',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[1.1] text-foreground"
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

      {/* Website + Automations Flowchart Diagram */}
      <section ref={diagramRef} className="py-24 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 -left-20 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={diagramInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={diagramInView ? { scale: 1 } : { scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block mb-6"
            >
              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 px-8 py-3 rounded-full shadow-lg">
                <span className="text-sm font-bold tracking-wider uppercase flex items-center gap-2 text-white">
                  <Sparkles size={18} className="animate-pulse" />
                  Complete Package
                </span>
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-foreground">What You Get</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A complete website with powerful automations that work for you 24/7
            </p>
          </motion.div>

          {/* Flowchart Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={diagramInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Grid Background Pattern with gradient overlay */}
            <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
              <div 
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                    linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-transparent" />
            </div>

            {/* Main Flowchart Content */}
            <div className="relative bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-xl border-2 border-border/50 rounded-[3rem] p-8 md:p-16 shadow-2xl">
              <div className="flex flex-col items-center space-y-10 max-w-3xl mx-auto">
                
                {/* Website Package Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                  animate={diagramInView ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.8, rotateX: -20 }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, rotate: 1, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-[2rem] p-10 shadow-2xl w-full max-w-md border-2 border-pink-400/30">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Package className="w-8 h-8" strokeWidth={2.5} />
                      <h3 className="text-3xl md:text-4xl font-black tracking-tight">Website Package</h3>
                    </div>
                    <p className="text-pink-100 text-center text-sm mt-3 font-medium">Everything you need to succeed online</p>
                  </div>
                </motion.div>

                {/* Animated Arrow */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={diagramInView ? { 
                    opacity: 1, 
                    y: 0,
                  } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative"
                >
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowDown className="w-12 h-12 text-gradient-to-b from-pink-500 to-teal-500" strokeWidth={2.5} />
                  </motion.div>
                </motion.div>

                {/* 1 Website Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                  animate={diagramInView ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.8, rotateX: -20 }}
                  transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, rotate: -1, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-[2rem] p-10 shadow-2xl w-full max-w-md border-2 border-teal-400/30">
                    <div className="flex items-center justify-center gap-3">
                      <Monitor className="w-8 h-8" strokeWidth={2.5} />
                      <h3 className="text-3xl md:text-4xl font-black tracking-tight">1 Custom Website</h3>
                    </div>
                    <p className="text-teal-100 text-center text-sm mt-3 font-medium">Professionally designed, fully responsive</p>
                  </div>
                </motion.div>

                {/* Intro Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={diagramInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-center max-w-xl"
                >
                  <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
                    When someone lands on your website, our intelligent automation kicks in:
                  </p>
                </motion.div>

                {/* Animated Arrow */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={diagramInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                  >
                    <ArrowDown className="w-12 h-12 text-teal-500" strokeWidth={2.5} />
                  </motion.div>
                </motion.div>

                {/* Three Automation Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30, rotateY: -20 }}
                    animate={diagramInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 30, rotateY: -20 }}
                    transition={{ duration: 0.6, delay: 0.7, type: "spring", stiffness: 100 }}
                    whileHover={{ 
                      scale: 1.08, 
                      rotate: -2,
                      transition: { duration: 0.2 } 
                    }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="relative bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-2xl p-7 shadow-xl border-2 border-blue-300/30">
                      <Rocket className="w-7 h-7 mb-3 mx-auto" strokeWidth={2.5} />
                      <p className="text-base font-black text-center leading-tight mb-3">Instant Lead<br/>Follow-Up</p>
                      <p className="text-blue-50 text-xs text-center leading-relaxed font-medium">
                        Form submission? We instantly text them to book an appointment
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={diagramInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 100 }}
                    whileHover={{ 
                      scale: 1.08, 
                      y: -5,
                      transition: { duration: 0.2 } 
                    }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="relative bg-gradient-to-br from-purple-400 to-purple-500 text-white rounded-2xl p-7 shadow-xl border-2 border-purple-300/30">
                      <Star className="w-7 h-7 mb-3 mx-auto" strokeWidth={2.5} />
                      <p className="text-base font-black text-center leading-tight mb-3">Smart<br/>Reviews</p>
                      <p className="text-purple-50 text-xs text-center leading-relaxed font-medium">
                        5-star reviews go to Google. Others send feedback privately to help you improve
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30, rotateY: 20 }}
                    animate={diagramInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 30, rotateY: 20 }}
                    transition={{ duration: 0.6, delay: 0.9, type: "spring", stiffness: 100 }}
                    whileHover={{ 
                      scale: 1.08, 
                      rotate: 2,
                      transition: { duration: 0.2 } 
                    }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="relative bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-2xl p-7 shadow-xl border-2 border-pink-300/30">
                      <Phone className="w-7 h-7 mb-3 mx-auto" strokeWidth={2.5} />
                      <p className="text-base font-black text-center leading-tight mb-3">Missed Call<br/>Auto-Response</p>
                      <p className="text-pink-50 text-xs text-center leading-relaxed font-medium">
                        We automatically text them to book an appointment
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Animated Arrow */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={diagramInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6,
                    }}
                  >
                    <ArrowDown className="w-12 h-12 text-purple-500" strokeWidth={2.5} />
                  </motion.div>
                </motion.div>

                {/* Mobile App Card - Updated with better dark mode colors */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                  animate={diagramInView ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.8, rotateX: -20 }}
                  transition={{ duration: 0.6, delay: 1.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, rotate: -1, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-[2rem] p-10 shadow-2xl w-full max-w-lg border-2 border-purple-400/30">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Smartphone className="w-8 h-8" strokeWidth={2.5} />
                      <h3 className="text-3xl md:text-4xl font-black tracking-tight text-center leading-tight">
                        Mobile App
                      </h3>
                    </div>
                    <p className="text-purple-100 text-center text-lg font-bold mt-3">
                      All Your Leads in One Place
                    </p>
                    <p className="text-purple-50 text-center text-sm mt-2 font-medium">
                      Beautiful mobile UI to capture and manage every lead from anywhere
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section ref={plansRef} className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={plansInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every website is fully customized — pick the structure that works best for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={plansInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative h-full"
                >
                  <div className={`relative h-full bg-card border-2 rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden ${
                    plan.popular ? 'border-primary/50 ring-2 ring-primary/20' : 'border-border'
                  }`}>
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                        <span className="text-white text-sm font-black tracking-wider flex items-center gap-2">
                          <Crown size={18} strokeWidth={2.5} />
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    <div className={`p-10 ${plan.popular ? 'pt-24' : 'pt-10'}`}>
                      <div className="flex items-start gap-5 mb-8">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <Icon className="text-white" size={32} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground font-bold tracking-widest uppercase mb-2">{plan.subtitle}</div>
                          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{plan.name}</h3>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="mb-6 pb-6 border-b border-border">
                        <div className="text-4xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                          {plan.price}
                        </div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {plan.term}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-8 text-base">{plan.description}</p>

                      <div className="space-y-4 mb-8">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="text-primary" size={14} strokeWidth={3} />
                            </div>
                            <span className="text-sm leading-relaxed text-foreground/90">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gradient-to-br from-muted/50 to-muted/30 border border-muted rounded-2xl p-5 mb-8">
                        <p className="text-xs text-muted-foreground font-medium text-center leading-relaxed">
                          {plan.bestFor}
                        </p>
                      </div>

                      <Button 
                        className={`w-full rounded-2xl h-14 font-bold text-base shadow-lg hover:shadow-xl transition-all ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-primary to-purple-600 hover:scale-105' 
                            : 'hover:scale-105'
                        }`}
                        size="lg"
                        asChild
                      >
                        <a href={`${baseUrl}/contact`} className="flex items-center justify-center gap-2">
                          Get Started
                          <ArrowRight size={18} />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section ref={addOnsRef} className="py-24 px-4 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={addOnsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-block mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full shadow-lg">
                <span className="text-sm font-bold tracking-wider uppercase flex items-center gap-2 text-white">
                  <Sparkles size={16} />
                  Optional Add-Ons
                </span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">Enhance Your Website</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Customize your website even further with these optional extras
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOns.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={addOnsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-card border-2 border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/30 transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Icon className="text-white" size={26} strokeWidth={2.5} />
                  </div>
                  <div className="mb-4">
                    <div className="text-3xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-1">
                      {addon.price}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight text-foreground">{addon.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{addon.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/10 border-2 border-primary/20 rounded-3xl p-16 md:p-20 text-center overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-50" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-foreground">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Schedule a discovery call and tell us about your vision and goals
              </p>
              <Button 
                size="lg" 
                asChild 
                className="rounded-2xl px-10 h-14 font-bold text-base shadow-xl hover:shadow-2xl bg-gradient-to-r from-primary to-purple-600 hover:scale-110 transition-all"
              >
                <a href={`${baseUrl}/contact`} className="flex items-center justify-center gap-2">
                  Start Your Custom Project
                  <ArrowRight size={20} />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
