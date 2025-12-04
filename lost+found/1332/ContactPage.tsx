import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Mail,
  Phone,
  User,
  Check,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { Label } from './ui/label';
import Navigation from './Navigation';
import { ThemeProvider } from './ThemeProvider';

function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Your Formspree form ID
    const FORMSPREE_FORM_ID = 'xqarlzak';
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _replyto: formData.email, // This sets the reply-to field
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            service: '',
            message: ''
          });
        }, 5000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again or email us directly at sitrixx1@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with luxury styling */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
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

        {[...Array(20)].map((_, i) => (
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
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-6 py-3 rounded-full mb-8"
          >
            <Sparkles className="text-primary" size={20} />
            <span className="text-sm font-bold tracking-wide uppercase text-foreground">Get In Touch</span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl font-black mb-6 tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Let's Build Together
          </motion.h1>
          
          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Schedule a consultation and let's bring your digital vision to life
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 pb-32 pt-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-black mb-3 tracking-tight text-foreground">Connect With Us</h2>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>

              <motion.div 
                className="bg-gradient-to-br from-card via-card to-primary/5 border-2 rounded-3xl shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-5">
                  <div className="space-y-4">
                    <motion.div 
                      className="flex items-start gap-3"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-xl">
                        <Mail className="text-white" size={16} />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-foreground">Email</div>
                        <div className="text-xs text-muted-foreground font-light">sitrixx1@gmail.com</div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-3"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-xl">
                        <Phone className="text-white" size={16} />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-foreground">Phone</div>
                        <div className="text-xs text-muted-foreground font-light">+1 519-212-2962</div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-3"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 shadow-xl">
                        <Clock className="text-white" size={16} />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-foreground">Business Hours</div>
                        <div className="text-xs text-muted-foreground font-light">Mon-Fri: 9am-6pm EST</div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start gap-3"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-xl">
                        <MapPin className="text-white" size={16} />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-foreground">Location</div>
                        <div className="text-xs text-muted-foreground font-light">Remote - Serving Nationwide</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 rounded-3xl shadow-xl p-5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-bold text-sm mb-2 text-foreground">Quick Response</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  We typically respond within 2-4 hours during business hours. For urgent inquiries, please call us directly.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:mt-0"
            >
              <div className="bg-gradient-to-br from-card via-card to-muted/20 border-2 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-6">
                  {submitted ? (
                    <motion.div 
                      className="text-center py-12"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                    >
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-2xl"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Check className="text-white" size={32} strokeWidth={3} />
                      </motion.div>
                      <h3 className="text-2xl font-black mb-3 tracking-tight text-foreground">Thank You!</h3>
                      <p className="text-muted-foreground text-sm font-light">
                        We've received your message and will get back to you at <strong>{formData.email}</strong> within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-bold text-foreground">Full Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-9 h-10 rounded-2xl border-2 text-xs shadow-md focus:shadow-xl transition-all"
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-bold text-foreground">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-9 h-10 rounded-2xl border-2 text-xs shadow-md focus:shadow-xl transition-all"
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-xs font-bold text-foreground">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="pl-9 h-10 rounded-2xl border-2 text-xs shadow-md focus:shadow-xl transition-all"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="service" className="text-xs font-bold text-foreground">Package *</Label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange as any}
                          className="w-full h-10 px-3 rounded-2xl border-2 border-input bg-background text-foreground text-xs shadow-md focus:shadow-xl transition-all"
                          required
                          disabled={isSubmitting}
                        >
                          <option value="">Select a package</option>
                          <option value="starter">Package 1 - Starter Website</option>
                          <option value="smart">Package 2 - Smart Website + Automations</option>
                          <option value="advanced">Package 3 - Advanced + IDX (Realtors)</option>
                          <option value="not-sure">Not sure yet</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-xs font-bold text-foreground">Tell Us About Your Project *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="What kind of website do you need? What features are most important?"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={3}
                          className="rounded-2xl border-2 text-xs shadow-md focus:shadow-xl transition-all resize-none"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="pt-1">
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full group rounded-2xl h-10 text-sm font-bold shadow-2xl bg-gradient-to-r from-primary to-purple-600 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full mr-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              Submit Request
                              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
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
        </motion.div>
      </footer>
    </div>
  );
}

export default function ContactPage() {
  return (
    <ThemeProvider>
      <ContactPageContent />
    </ThemeProvider>
  );
}
