import { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    // Your Vercel backend API URL
    const FORM_API_URL = 'https://sitrixx-website-backend.vercel.app/api/contact?client=sitrixx';
    
    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch(FORM_API_URL, {
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
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      // Try to get the response body for more details
      const responseText = await response.text();
      console.log('Response body:', responseText);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}: ${responseText}`);
      }

      // Success!
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
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setErrorMessage(`Failed to send message: ${errorMsg}. Please try again or email us directly at sitrixx1@gmail.com`);
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

      {/* Hero Section with luxury styling - Updated to match ServicesPage */}
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
                  'Get In Touch',
                  2000,
                  'Let\'s Connect',
                  2000,
                  'Start Your Project',
                  2000,
                  'Schedule a Consultation',
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
            Let's Build Together
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-6 max-w-4xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
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
                        We've received your message and will get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      {errorMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl"
                        >
                          <p className="text-xs text-red-600 dark:text-red-400">{errorMessage}</p>
                        </motion.div>
                      )}
                      
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
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calendar Booking Section - TEMPORARY FOR TESTING */}
      <section className="px-4 pb-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-card via-card to-muted/20 border-2 rounded-3xl shadow-2xl overflow-hidden p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black mb-3 tracking-tight text-foreground">
                Schedule a Consultation
              </h2>
              <p className="text-muted-foreground font-light text-sm">
                Pick a time that works best for you
              </p>
            </div>
            
            <div className="w-full" style={{ minHeight: '800px' }}>
              <iframe 
                src="https://api.leadconnectorhq.com/widget/group/uVEm6c7YjOtSWb58hc4u" 
                style={{ width: '100%', height: '800px', border: 'none', overflow: 'hidden' }}
                scrolling="no" 
                id="uVEm6c7YjOtSWb58hc4u_1764878357865"
                title="Schedule a Consultation"
              />
            </div>
          </motion.div>
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
