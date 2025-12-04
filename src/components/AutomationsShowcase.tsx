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
  Gift,
  ArrowRight,
  User
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

// SMS Examples
const smsExamples = [
  {
    title: "Before Appointment",
    message: "Hi Sarah! Reminder: Haircut tomorrow at 2:00 PM. Reply C to confirm or R to reschedule.",
    icon: Clock,
    color: "text-blue-500"
  },
  {
    title: "After Appointment",
    message: "Thanks for visiting! How did everything go? We'd love your feedback.",
    icon: MessageSquare,
    color: "text-green-500"
  },
  {
    title: "Review Request",
    message: "We'd love a review! https://g.page/r/bobjoe-reviews/review ⭐",
    icon: Star,
    color: "text-yellow-500"
  },
  {
    title: "Birthday Message",
    message: "🎉 Happy Birthday, Sarah! Use code BDAY20 for 20% off your next visit.",
    icon: Gift,
    color: "text-pink-500"
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
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Smart Automations
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Calendar booking, AI chatbot, and SMS automation that works 24/7
          </motion.p>
        </div>
      </section>

      {/* Calendar Sync */}
      <section className="py-20 px-6">
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
              <Card className="h-full">
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
              <Card className="h-full">
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
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 flex items-center justify-center mb-4">
                    <MessageSquare className="text-purple-500" size={32} />
                  </div>
                  <CardTitle className="text-xl">Custom Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Works with any calendar system you use. We integrate with your existing workflow seamlessly.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Chatbot */}
      <section className="py-20 px-6 bg-muted/30" ref={chatRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">AI Chatbot</h2>
            <p className="text-lg text-muted-foreground">Trained on your business to answer questions and book appointments</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="overflow-hidden shadow-2xl">
              {/* Chat Header */}
              <div className="bg-primary p-5 text-primary-foreground">
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
                          <Bot size={16} className="text-primary-foreground" />
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
                        <Bot size={16} className="text-primary-foreground" />
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

      {/* SMS Automation */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">SMS Automation</h2>
            <p className="text-lg text-muted-foreground">Automated messages throughout the customer journey</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {smsExamples.map((sms, index) => {
              const Icon = sms.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className={sms.color} size={24} />
                        <CardTitle className="text-lg">{sms.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted rounded-xl p-4">
                        <p className="text-sm text-foreground leading-relaxed">{sms.message}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden border-2">
            <div className="p-12 text-center bg-muted/30">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Automate?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let us handle your bookings, customer service, and follow-ups automatically
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  size="lg" 
                  asChild
                  className="rounded-xl px-8"
                >
                  <a href={`${baseUrl}/contact`}>
                    Get Started
                    <ArrowRight className="ml-2" size={20} />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="rounded-xl px-8"
                >
                  <a href={`${baseUrl}/services`}>
                    View Pricing
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-black mb-2">Sitrixx</div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sitrixx. All rights reserved.
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
