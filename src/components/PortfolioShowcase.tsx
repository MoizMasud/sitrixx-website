import { useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Star,
  ArrowRight,
  Bot,
  BellRing,
  Clock,
  Phone,
  TrendingUp,
  Zap,
  Check,
  Calendar as CalendarIcon,
  Search,
  Heart,
  Users,
  Palette,
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { baseUrl } from '../lib/base-url';
import Navigation from './Navigation';
import { ThemeProvider } from './ThemeProvider';

const portfolioItems = [
  {
    title: "Barber Shop",
    category: "Hair & Beauty",
    description: "Modern booking site with automated reminders",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80",
    technologies: ["Astro", "TypeScript", "Calendly API", "SMS Automation"],
    details: "A sleek, mobile-optimized barbershop website featuring integrated booking calendar, automated SMS appointment reminders, and a modern UI that converts visitors into customers.",
    results: ["50% more online bookings", "Zero missed appointments", "Mobile-first design"]
  },
  {
    title: "Real Estate",
    category: "Real Estate",
    description: "Full IDX integration with lead automation",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    technologies: ["Astro", "TypeScript", "Tailwind CSS", "Framer Motion"],
    details: "Complete realtor website with automatic MLS listing updates, book-a-showing calendar, AI chatbot for 24/7 lead engagement, and full CRM pipeline connection.",
    results: ["Live listing updates", "3x more qualified leads", "24/7 AI assistance"]
  },
  {
    title: "Dental Practice",
    category: "Healthcare",
    description: "Appointment booking with review automation",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
    technologies: ["Astro", "TypeScript", "TidyCal API", "Zapier"],
    details: "Professional dental practice website with embedded booking calendar, automated patient reminders, review collection system, and new patient pipeline automation.",
    results: ["40% increase in appointments", "5-star review growth", "Automated follow-ups"]
  },
];

const reviews = [
  {
    name: "Marcus Williams",
    business: "Elite Cuts Barbershop",
    rating: 5,
    text: "The team took time to understand my vision and brand. They delivered a custom site that perfectly represents my shop with booking automations that work flawlessly!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  },
  {
    name: "Jennifer Rodriguez",
    business: "Rodriguez Realty Group",
    rating: 5,
    text: "From our first meeting to launch, everything was personalized to our needs. The IDX integration and lead automation they built is exactly what we asked for.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer"
  },
  {
    name: "Dr. Sarah Chen",
    business: "Bright Smile Dental",
    rating: 5,
    text: "They listened to every detail I wanted and created a website that matches my practice's personality. The automated reminders have reduced no-shows dramatically.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    name: "Mike Thompson",
    business: "Thompson Construction",
    rating: 5,
    text: "Truly custom experience from start to finish. They asked about my pain points, understood my goals, and delivered beyond expectations. Plus I own all the code!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
  }
];

const problems = [
  {
    icon: Clock,
    title: "Missing Appointments",
    description: "No-shows cost you time and money every single day"
  },
  {
    icon: Phone,
    title: "Constant Phone Tag",
    description: "Chasing missed calls wastes time and drives customers away."
  },
  {
    icon: TrendingUp,
    title: "Not Enough Leads",
    description: "Your website isn't converting visitors into customers"
  },
  {
    icon: Star,
    title: "Need More Reviews",
    description: "Struggling to get reviews from happy customers"
  }
];

const solutions = [
  {
    icon: Bot,
    title: "AI Chatbot",
    description: "Answer questions 24/7, qualify leads, and schedule appointments automatically while you sleep",
    features: ["24/7 availability", "Instant responses", "Lead qualification", "Appointment booking"]
  },
  {
    icon: CalendarIcon,
    title: "Smart Booking Calendar",
    description: "Customers book instantly online 24/7 without calling you",
    features: ["Real-time availability", "Auto confirmations", "Calendar sync", "No double bookings"]
  },
  {
    icon: BellRing,
    title: "SMS Reminders",
    description: "Automated text reminders reduce no-shows by up to 80%. Customers get reminded, you get more revenue",
    features: ["Automatic reminders", "Custom timing", "Two-way messaging", "Reduce no-shows 80%"]
  },
  {
    icon: Star,
    title: "Review Automation",
    description: "Automatically request reviews from happy customers. Build trust and rank higher on Google",
    features: ["Auto review requests", "Google integration", "Timing optimization", "Increase 5-star reviews"]
  },
  {
    icon: Zap,
    title: "Lead Capture & Nurture",
    description: "Capture every lead and automatically follow up with emails and SMS. Never miss an opportunity",
    features: ["Smart forms", "Auto follow-ups", "Email & SMS sequences", "Lead scoring"]
  },
  {
    icon: Search,
    title: "SEO Automation",
    description: "Get found on Google with automated SEO optimization. Higher rankings, more organic traffic, more customers",
    features: ["Keyword optimization", "Meta tags automation", "Schema markup", "Local SEO boost"]
  }
];

const customizationHighlights = [
  {
    icon: Heart,
    title: "Your Vision, Your Brand",
    description: "We start by understanding your pain points, goals, and what makes your business unique. Every color, font, and layout is tailored to you."
  },
  {
    icon: Users,
    title: "Collaborative Process",
    description: "From the initial discovery call to final handoff, you're involved at every step. We listen, iterate, and refine until it's perfect."
  },
  {
    icon: Palette,
    title: "Fully Custom Design",
    description: "No templates. No shortcuts. We design every element from scratch based on your preferences, brand identity, and target audience."
  }
];

// Animation variants with luxury feel
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
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

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
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

function PortfolioShowcaseContent() {
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);

  const reviewsRef = useRef(null);
  const isReviewsInView = useInView(reviewsRef, { once: true, margin: "-100px" });

  const portfolioRef = useRef(null);
  const isPortfolioInView = useInView(portfolioRef, { once: true, margin: "-100px" });

  const problemsRef = useRef(null);
  const isProblemsInView = useInView(problemsRef, { once: true, margin: "-100px" });

  const solutionsRef = useRef(null);
  const isSolutionsInView = useInView(solutionsRef, { once: true, margin: "-100px" });

  const customizationRef = useRef(null);
  const isCustomizationInView = useInView(customizationRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        {/* Animated background gradient */}
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
          {/* Typing Animation Above Main Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4"
          >
            <div className="text-xl md:text-2xl font-light text-muted-foreground min-h-[2rem]">
              <TypeAnimation
                sequence={[
                  'Custom Websites Built for You',
                  2000,
                  'Your Vision, Our Expertise',
                  2000,
                  'Tailored Design + Smart Automation',
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
            Websites Designed Around You
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-6 max-w-4xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Every website we build is fully customized to your brand, goals, and vision — with powerful automation that works 24/7
          </motion.p>
          
          <motion.div 
            className="flex gap-6 justify-center flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Button 
              size="lg" 
              asChild
              className="group rounded-2xl px-10 h-14 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all bg-gradient-to-r from-primary to-purple-600 hover:scale-105"
            >
              <a href={`${baseUrl}/services`}>
                View Packages
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
              </a>
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="relative rounded-2xl px-10 h-14 text-lg font-bold border-2 overflow-hidden group"
              >
                <a href={`${baseUrl}/contact`} className="relative z-10">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Get in Touch</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Reviews Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-muted/30 to-transparent" ref={reviewsRef}>
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
                  Client Success Stories
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">Trusted by Business Owners Like You</h2>
            <p className="text-muted-foreground text-2xl font-light">
              Real transformations from clients who got exactly what they needed
            </p>
          </AnimatedSection>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={isReviewsInView ? "visible" : "hidden"}
          >
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.4 } }}
                className="bg-gradient-to-br from-card via-card to-muted/20 border-2 rounded-3xl p-8 shadow-xl hover:shadow-3xl transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-16 h-16 rounded-full border-4 border-primary/30 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div>
                    <div className="font-bold text-base text-foreground">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.business}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground font-light leading-relaxed italic">"{review.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-32 px-4" ref={problemsRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={problemsRef}
            initial="hidden"
            animate={isProblemsInView ? "visible" : "hidden"}
            variants={slideInLeft}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative inline-block mb-6"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-destructive/20 to-red-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <div className="relative bg-gradient-to-r from-destructive/10 to-red-500/10 backdrop-blur-sm border border-destructive/30 px-8 py-3 rounded-full shadow-lg">
                <span className="text-sm font-black tracking-widest uppercase text-foreground">
                  Common Challenges
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">What's Holding You Back?</h2>
            <p className="text-muted-foreground text-2xl font-light">
              We understand your pain points — and we build solutions around them
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isProblemsInView ? "visible" : "hidden"}
          >
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.4 } }}
                  className="relative bg-gradient-to-br from-card to-muted/30 border-2 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all overflow-hidden group"
                >
                  <motion.div
                    className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />
                  <div className="relative z-10">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-8 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="text-primary" size={32} strokeWidth={2.5} />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight text-foreground">{problem.title}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed text-base">{problem.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Customization Process Highlight Section - MOVED HERE */}
      <section className="py-32 px-4 bg-gradient-to-b from-muted/30 to-transparent" ref={customizationRef}>
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
                  Fully Custom Process
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">Built Exactly How You Want It</h2>
            <p className="text-muted-foreground text-2xl font-light max-w-4xl mx-auto">
              From the first conversation to the final handoff, everything is personalized to your needs. We start by understanding your pain points, your style preferences, and your business goals — then we build it your way.
            </p>
          </AnimatedSection>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate={isCustomizationInView ? "visible" : "hidden"}
          >
            {customizationHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.4 } }}
                  className="relative bg-gradient-to-br from-card via-card to-primary/5 border-2 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all overflow-hidden group"
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
                      <Icon className="text-primary-foreground" size={32} strokeWidth={2.5} />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed text-base">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <AnimatedSection className="text-center bg-gradient-to-br from-primary/5 to-purple-500/5 border-2 border-primary/20 rounded-3xl p-12" delay={0.3}>
            <h3 className="text-3xl font-black mb-6 text-foreground">You Own Everything</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 font-light leading-relaxed">
              After launch, you can take your code and host it anywhere — or we can maintain and update it for you. It's your choice, your way.
            </p>
            <Button size="lg" asChild className="group rounded-2xl px-10 h-14 font-bold shadow-2xl bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-all">
              <a href={`${baseUrl}/about`}>
                Learn About Our Process
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-32 px-4" ref={solutionsRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isSolutionsInView ? "visible" : "hidden"}
            variants={slideInRight}
            className="text-center mb-20"
          >
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
                  Custom Automation Solutions
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">Automation That Works for You</h2>
            <p className="text-muted-foreground text-2xl font-light">
              We build the tools you need — customized to your workflow and business model
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isSolutionsInView ? "visible" : "hidden"}
          >
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.4 } }}
                  className="relative bg-gradient-to-br from-card via-card to-primary/5 border-2 rounded-3xl p-10 shadow-xl hover:shadow-3xl transition-all overflow-hidden group"
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
                      <Icon className="text-primary-foreground" size={32} strokeWidth={2.5} />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight text-foreground">{solution.title}</h3>
                    <p className="text-muted-foreground mb-8 font-light leading-relaxed text-base">{solution.description}</p>
                    <ul className="space-y-4">
                      {solution.features.map((feature, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="text-primary" size={16} strokeWidth={3} />
                          </div>
                          <span className="text-sm font-medium text-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <AnimatedSection className="text-center mt-20" delay={0.3}>
            <Button size="lg" asChild className="group rounded-2xl px-10 h-14 font-bold shadow-2xl bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-all">
              <a href={`${baseUrl}/services`}>
                Explore All Solutions
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Projects Section - Only 3 projects */}
      <section id="portfolio" className="py-32 px-4 bg-gradient-to-b from-muted/30 to-transparent" ref={portfolioRef}>
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
                  Featured Work
                </span>
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter text-foreground">Custom Solutions in Action</h2>
            <p className="text-muted-foreground text-2xl font-light">
              Every project tailored to the client's unique needs and vision
            </p>
          </AnimatedSection>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isPortfolioInView ? "visible" : "hidden"}
          >
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -12, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                className="cursor-pointer group"
                onClick={() => setSelectedProject(item)}
              >
                <div className="bg-card border-2 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all">
                  <div className="relative h-72 overflow-hidden">
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
                      className="absolute top-6 left-6 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground px-5 py-2 rounded-xl text-xs font-black shadow-2xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.category}
                    </motion.div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black mb-3 tracking-tight text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 font-light leading-relaxed">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.slice(0, 2).map((tech, i) => (
                        <motion.span 
                          key={i} 
                          className="bg-gradient-to-r from-muted to-muted/50 border px-4 py-2 rounded-xl text-xs font-bold shadow-md"
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

          {/* View All Projects Button - Updated styling for dark mode */}
          <AnimatedSection className="text-center mt-16" delay={0.3}>
            <Button 
              size="lg" 
              asChild 
              className="group rounded-2xl px-10 h-14 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all bg-gradient-to-r from-primary to-purple-600 hover:scale-105"
            >
              <a href={`${baseUrl}/portfolio`} className="inline-flex items-center justify-center gap-2">
                <span>View All Projects</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </a>
            </Button>
          </AnimatedSection>
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
                    Start Your Custom Project
                    <ArrowRight className="ml-2" size={20} />
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <motion.div 
              className="relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 border-2 rounded-3xl p-12 md:p-20 text-center shadow-3xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              {/* Animated background elements */}
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
                <motion.h2 
                  className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Ready to Build Your Custom Website?
                </motion.h2>
                <motion.p 
                  className="text-muted-foreground text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Let's talk about your vision, your pain points, and how we can create the perfect solution for your business
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center"
                >
                  <Button 
                    size="lg" 
                    asChild 
                    className="group rounded-2xl px-8 md:px-10 h-12 md:h-14 text-base md:text-lg font-bold shadow-2xl bg-gradient-to-r from-primary to-purple-600 hover:scale-110 transition-all inline-flex items-center justify-center"
                  >
                    <a href={`${baseUrl}/contact`} className="inline-flex items-center justify-center gap-2">
                      <span>Get Started Today</span>
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                    </a>
                  </Button>
                </motion.div>
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

export default function PortfolioShowcase() {
  return (
    <ThemeProvider>
      <PortfolioShowcaseContent />
    </ThemeProvider>
  );
}
