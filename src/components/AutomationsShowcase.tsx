import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Bot,
  Calendar as CalendarIcon,
  MessageSquare,
  Star,
  Clock,
  CheckCircle2,
  Send,
  PhoneCall,
  ArrowRight,
  User,
  Mail,
  TrendingUp,
  Shield,
  PhoneMissed
} from 'lucide-react';
import { baseUrl } from '../lib/base-url';
import Navigation from './Navigation';
import { ThemeProvider } from './ThemeProvider';

// AI Chatbot Messages - Faster delays
const chatbotMessages = [
  { type: 'bot', text: "Hi there! 👋 How can I help you today?", delay: 0 },
  { type: 'user', text: "I'd like to book a haircut", delay: 800 },
  { type: 'bot', text: "I'd be happy to help you book a haircut! Let me check our availability for you.", delay: 1600 },
  { type: 'user', text: "Great, thank you", delay: 2400 },
  { type: 'bot', text: "I have openings available:\n• Tomorrow at 10:00 AM\n• Tomorrow at 2:00 PM\n• Friday at 4:00 PM\n\nWhich time works best for you?", delay: 3200 },
  { type: 'user', text: "Tomorrow at 2 PM would be perfect", delay: 4500 },
  { type: 'bot', text: "Excellent choice! I've booked you for tomorrow at 2:00 PM. You'll receive a confirmation text message and a Google Calendar invite within the next minute. Is there anything else I can help you with?", delay: 5500 },
  { type: 'user', text: "No, that's all. Thank you!", delay: 7000 },
  { type: 'bot', text: "You're welcome! We're looking forward to seeing you tomorrow at 2:00 PM. Have a great day! ✂️", delay: 8000 }
];

const automationFeatures = [
  {
    title: "Smart Lead Follow-Up",
    description: "When someone submits your contact form, they instantly receive a personalized text message to keep the conversation going and guide them toward booking.",
    icon: MessageSquare,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Intelligent Review Management",
    description: "5-star reviews? Automatically posted to Google. Lower ratings? Sent privately to your email so you can improve — protecting your reputation while gathering valuable feedback.",
    icon: Star,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    title: "Missed Call Recovery",
    description: "Never lose a lead again. When you miss a call, we automatically send a text to the caller letting them know you'll get back to them — and nudge them to book online.",
    icon: PhoneMissed,
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    title: "SEO Boost from Reviews",
    description: "More 5-star Google reviews = higher search rankings = more organic traffic. Our system helps you rank higher by collecting authentic positive reviews.",
    icon: TrendingUp,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  }
];

function AutomationsShowcaseContent() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<typeof chatbotMessages>([]);
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isChatInView = useInView(chatRef, { once: false });

  // Auto-scroll to bottom within the chat container only
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  useEffect(() => {
    if (isChatInView) {
      setVisibleMessages([]);
      setCurrentMessageIndex(0);
      setIsTyping(false);
    }
  }, [isChatInView]);

  useEffect(() => {
    if (isChatInView && currentMessageIndex < chatbotMessages.length) {
      const currentMessage = chatbotMessages[currentMessageIndex];
      const timer = setTimeout(() => {
        if (currentMessage.type === 'bot') {
          setIsTyping(true);
          setTimeout(() => {
            setVisibleMessages(prev => [...prev, currentMessage]);
            setIsTyping(false);
            setCurrentMessageIndex(prev => prev + 1);
          }, 600);
        } else {
          setVisibleMessages(prev => [...prev, currentMessage]);
          setCurrentMessageIndex(prev => prev + 1);
        }
      }, currentMessage.delay);

      return () => clearTimeout(timer);
    }
  }, [isChatInView, currentMessageIndex]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-primary to-purple-600 px-6 py-3 rounded-full shadow-lg">
              <span className="text-sm font-bold tracking-wider uppercase flex items-center gap-2 text-white">
                <Bot size={16} />
                Smart Automation System
              </span>
            </div>
          </motion.div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-full shadow-lg">
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Automation That Converts
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            We've built a custom backend system that automatically follows up with leads, manages your reputation, and never lets a potential customer slip away.
          </motion.p>
        </div>
      </section>

      {/* Core Automation Features */}
      <section className="py-24 px-6 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">How Our System Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built-in backend automation that turns visitors into customers and protects your online reputation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {automationFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Card className="h-full border-2 hover:shadow-xl hover:border-primary/30 transition-all">
                    <CardHeader>
                      <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                        <Icon className={feature.color} size={32} strokeWidth={2.5} />
                      </div>
                      <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lead Follow-Up Process */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">The Lead Follow-Up Journey</h2>
            <p className="text-xl text-muted-foreground">What happens after someone contacts you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Send className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Form Submitted</h3>
              <p className="text-muted-foreground">Customer fills out your contact form with their info and needs</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageSquare className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Instant Text</h3>
              <p className="text-muted-foreground">They receive a personalized SMS within seconds to keep them engaged</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CalendarIcon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Guided to Book</h3>
              <p className="text-muted-foreground">The message includes a direct link to book an appointment online</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Review Management System */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Smart Review Filter</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protect your reputation while collecting valuable feedback
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-2 border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
                      <Star className="text-white" size={28} fill="white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">5-Star Reviews</CardTitle>
                      <p className="text-sm text-muted-foreground">Happy customers</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-green-500" size={20} />
                      <span className="text-sm">Automatically posted to Google</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-green-500" size={20} />
                      <span className="text-sm">Boosts your SEO rankings</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-green-500" size={20} />
                      <span className="text-sm">Increases trust & conversions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2 border-blue-500/30 bg-blue-500/5">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <Mail className="text-white" size={28} />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Lower Ratings</CardTitle>
                      <p className="text-sm text-muted-foreground">Constructive feedback</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Shield className="text-blue-500" size={20} />
                      <span className="text-sm">Sent privately to your email</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="text-blue-500" size={20} />
                      <span className="text-sm">NOT posted publicly</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="text-blue-500" size={20} />
                      <span className="text-sm">Opportunity to improve service</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Card className="inline-block border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-purple-500/5 p-8">
              <div className="flex items-center gap-4">
                <TrendingUp className="text-green-500" size={40} strokeWidth={2.5} />
                <div className="text-left">
                  <p className="text-sm text-muted-foreground mb-1">The Result</p>
                  <p className="text-lg font-bold">Higher Google Rankings = More Organic Traffic = More Leads</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Calendar Sync */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Smart Calendar Integration</h2>
            <p className="text-lg text-muted-foreground mb-2">Automatic sync with Google Calendar, Outlook, Apple Calendar, or any custom system</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card className="h-full border-2 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 flex items-center justify-center mb-4">
                    <CalendarIcon className="text-blue-500" size={32} />
                  </div>
                  <CardTitle className="text-xl">Real-Time Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Customers see only available time slots. No more double bookings or scheduling conflicts.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-2 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-green-500" size={32} />
                  </div>
                  <CardTitle className="text-xl">Instant Sync</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Appointments automatically added to both your calendar and your client's calendar with one click.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-2 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="w-12 h-12 flex items-center justify-center mb-4">
                    <MessageSquare className="text-purple-500" size={32} />
                  </div>
                  <CardTitle className="text-xl">SMS Reminders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Automatic appointment reminders and follow-ups to reduce no-shows and keep clients engaged.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Chatbot */}
      <section className="py-24 px-6 bg-muted/30" ref={chatRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">AI Chatbot</h2>
            <p className="text-lg text-muted-foreground">Trained on your business to answer questions and book appointments 24/7</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden shadow-2xl border-2">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary to-purple-600 p-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-white/30">
                      <Bot size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Business Assistant</div>
                      <div className="text-sm opacity-90 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Always available
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div 
                ref={chatContainerRef}
                className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-background via-muted/20 to-background scroll-smooth"
              >
                {visibleMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-3 max-w-[75%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-purple-500' 
                          : 'bg-primary'
                      }`}>
                        {message.type === 'user' ? (
                          <User size={16} className="text-white" />
                        ) : (
                          <Bot size={16} className="text-white" />
                        )}
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-3 shadow-md ${
                          message.type === 'user'
                            ? 'bg-purple-500 text-white'
                            : 'bg-card border-2 text-foreground'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot size={16} className="text-white" />
                      </div>
                      <div className="bg-card border-2 rounded-2xl px-4 py-3 shadow-md">
                        <div className="flex gap-1.5">
                          {[0, 0.15, 0.3].map((delay, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-muted-foreground rounded-full"
                              animate={{ 
                                opacity: [0.3, 1, 0.3],
                                y: [0, -4, 0]
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 0.8, 
                                delay 
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t-2 flex gap-3 bg-muted/30">
                <input 
                  type="text" 
                  placeholder="Ask me anything..." 
                  className="flex-1 rounded-xl px-4 py-3 text-sm border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled
                />
                <Button size="icon" className="rounded-xl h-12 w-12" disabled>
                  <Send size={20} />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 mb-20">
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
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to Automate Your Business?</h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Let our backend system handle lead follow-ups, reputation management, and customer engagement automatically
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  size="lg" 
                  asChild
                  className="rounded-2xl px-10 h-14 font-bold text-base shadow-xl hover:shadow-2xl bg-gradient-to-r from-primary to-purple-600 hover:scale-110 transition-all"
                >
                  <a href={`${baseUrl}/contact`} className="flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight size={20} />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="rounded-2xl px-10 h-14 font-bold text-base shadow-lg hover:shadow-xl hover:scale-110 transition-all border-2"
                >
                  <a href={`${baseUrl}/services`}>
                    View Pricing
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            className="text-2xl font-black mb-2 text-foreground"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Sitrixx
          </motion.div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sitrixx. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Premium websites with intelligent automation for forward-thinking businesses.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function AutomationsShowcase() {
  return (
    <ThemeProvider>
      <AutomationsShowcaseContent />
    </ThemeProvider>
  );
}
