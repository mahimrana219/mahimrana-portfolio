import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, Phone, Loader2, CheckCircle2 } from "lucide-react";
import { useForm, ValidationError } from '@formspree/react';

export const ContactSection = () => {
  // Formspree form key
  const [state, handleSubmit] = useForm("xnjezwka");

  // Local success state so the form can reset after 1 minute
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setIsSubmitted(true);
      // 1 minute (60,000 ms) timer
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        // Reset Formspree state by reloading the page
        window.location.reload(); // Optional: refresh the page so the form starts fresh
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "backOut" as const }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-24 [&_*]:[--primary:var(--color-primary,#00E4FF)]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="glass-panel p-8 md:p-12 rounded-[3rem] border border-foreground/10 relative overflow-hidden bg-background/50 dark:bg-card/30 backdrop-blur-md"
      >
        {/* Background Gradients (Theme Adaptive) */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00E4FF]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Contact Info */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                Let's <span className="text-[#00E4FF]">Connect</span>
              </h2>
              <p className="text-muted-foreground">
                Currently open for new opportunities and exciting collaborations. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-6">
              <a href="mailto:mahimrana219@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-[#00E4FF] transition-colors group">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform border border-[#00E4FF]/20 bg-[#00E4FF]/5">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium">mahimrana219@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 text-muted-foreground hover:text-[#00E4FF] transition-colors group cursor-pointer">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform border border-[#00E4FF]/20 bg-[#00E4FF]/5">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-medium">+92 336 7389032</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground group cursor-default">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center border border-[#00E4FF]/20 bg-[#00E4FF]/5">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-medium">Pakistan, Karachi</span>
              </div>
            </div>
          </div>

          {/* Form / Success Message Area */}
          <div className="flex-1 glass-panel p-8 rounded-[2rem] border border-foreground/10 relative bg-background dark:bg-card/50">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Animated Success Message */
                <motion.div
                  key="success"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center justify-center h-full text-center py-12 space-y-4"
                >
                  <div className="w-20 h-20 rounded-full bg-[#00E4FF]/10 border-2 border-[#00E4FF]/30 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-[#00E4FF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out. I will respond to you as soon as possible.
                  </p>
                  <span className="text-xs text-muted-foreground/60 pt-2">Form will reset automatically in 1 minute...</span>
                </motion.div>
              ) : (
                /* Contact Form with Validations */
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4" 
                  onSubmit={handleSubmit}
                >
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Your Name</label>
                    <input 
                      id="name"
                      name="name"
                      type="text" 
                      required
                      minLength={2}
                      className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF] transition-all placeholder:text-muted-foreground/50"
                      placeholder="John Doe"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Your Email</label>
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      required
                      className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF] transition-all placeholder:text-muted-foreground/50"
                      placeholder="john@example.com"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">Phone Number (Optional)</label>
                    <input 
                      id="phone"
                      name="phone"
                      type="tel" 
                      className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF] transition-all placeholder:text-muted-foreground/50"
                      placeholder="+92 300 1234567"
                    />
                    <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>
                  
                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      rows={4}
                      className="w-full bg-background border border-foreground/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-[#00E4FF] focus:ring-1 focus:ring-[#00E4FF] transition-all resize-none placeholder:text-muted-foreground/50"
                      placeholder="How can I help you?"
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Submit Button with Loading State */}
                  <button 
                    type="submit" 
                    disabled={state.submitting}
                    className="w-full h-12 rounded-xl bg-[#00E4FF] text-background font-bold flex items-center justify-center gap-2 hover:bg-[#00E4FF]/90 transition-all disabled:opacity-70 shadow-sm mt-6 cursor-pointer"
                  >
                    {state.submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </section>
  );
};