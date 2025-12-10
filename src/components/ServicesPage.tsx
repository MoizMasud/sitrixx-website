import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
    icon: Building2,
    gradient: "from-primary to-purple-600",
    bestFor: "Best for businesses that want to own the site outright with optional ongoing support"
  }
];

const addOns = [
  {
    name: "Extra Website Page",
    description: "Add another custom page to your website",
    icon: Globe,
  },
  {
    name: "Additional Automation Workflow",
    description: "Custom automation tailored to your business needs",
    icon: Zap,
  },
  {
    name: "Branding Palette",
    description: "Professional color scheme and brand identity design",
    icon: Palette,
  }
];

export default function ServicesPage() {
  const plansRef = useRef(null);
  const addOnsRef = useRef(null);
  const plansInView = useInView(plansRef, { once: true, amount: 0.2 });
  const addOnsInView = useInView(addOnsRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-primary to-purple-600 px-6 py-3 rounded-full shadow-lg">
              <span className="text-sm font-bold tracking-wider uppercase flex items-center gap-2 text-white">
                <Sparkles size={16} />
                Flexible Plans
              </span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Services
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose the plan that fits your needs — every website is fully customized to your brand and goals
          </motion.p>
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
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Choose Your Plan</h2>
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
                          <h3 className="text-2xl md:text-3xl font-black tracking-tight">{plan.name}</h3>
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
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Enhance Your Website</h2>
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
                  <h3 className="text-xl font-bold mb-3 tracking-tight">{addon.name}</h3>
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
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to Get Started?</h2>
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
