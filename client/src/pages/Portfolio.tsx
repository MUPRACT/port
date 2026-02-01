import { motion } from "framer-motion";
import { usePortfolio, useContact } from "@/hooks/use-portfolio";
import { Navbar } from "@/components/Navbar";
import { SocialLinks } from "@/components/SocialLinks";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillBadge } from "@/components/SkillBadge";
import { Link as ScrollLink } from "react-scroll";
import { ArrowDown, MapPin, Calendar, ExternalLink, Send, Briefcase, GraduationCap } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { Loader2 } from "lucide-react";

export default function Portfolio() {
  const { data, isLoading } = usePortfolio();
  const contactMutation = useContact();
  
  const form = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (values: z.infer<typeof insertContactSchema>) => {
    contactMutation.mutate(values, {
      onSuccess: () => form.reset()
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!data) return null;

  const { profile, experience, education, skills, projects } = data;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={profile.heroImageUrl || "/images/hero-bg.jpg"} 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-block p-1 rounded-full bg-gradient-to-r from-primary/50 to-purple-500/50 backdrop-blur-sm">
              <div className="bg-background/80 rounded-full px-4 py-1.5 text-sm font-medium text-white border border-white/10">
                Available for opportunities
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight leading-tight">
              Hello, I'm <br />
              <span className="text-gradient">{profile.name}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              {profile.headline}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ScrollLink 
                to="contact" 
                smooth={true} 
                duration={500}
                className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all cursor-pointer"
              >
                Get in Touch
              </ScrollLink>
              <ScrollLink 
                to="projects" 
                smooth={true} 
                duration={500}
                className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:-translate-y-1 transition-all cursor-pointer"
              >
                View Projects
              </ScrollLink>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="text-muted-foreground w-6 h-6" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden glass-card p-2">
                <img 
                  src={profile.aboutImageUrl || "/images/abstract-bg.jpg"} 
                  alt="About Me" 
                  className="rounded-xl w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-full" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                About Me
                <span className="text-primary">.</span>
              </h2>
              <div className="prose prose-invert prose-lg text-muted-foreground">
                <p className="mb-6 leading-relaxed">
                  {profile.summary}
                </p>
                <div className="flex items-center gap-2 text-white mb-8">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{profile.location}</span>
                </div>
              </div>
              
              <SocialLinks 
                github={profile.githubUrl || undefined}
                linkedin={profile.linkedinUrl || undefined}
                email={profile.email || undefined}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Experience" 
            subtitle="My professional journey and career highlights." 
          />
          
          <div className="space-y-8">
            {experience?.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card glass-card-hover rounded-2xl p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Briefcase className="w-4 h-4" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-3 py-1 rounded-full border border-white/5 w-fit">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.startDate} - {exp.endDate || "Present"}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Skills & Expertise" 
            subtitle="Technologies and tools I work with." 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills?.map((skillGroup, groupIndex) => (
              <motion.div
                key={skillGroup.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.1 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-white/5">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items?.map((item, itemIndex) => (
                    <SkillBadge key={itemIndex} name={item} delay={groupIndex * 0.1 + itemIndex * 0.05} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Education" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education?.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap className="w-24 h-24 text-primary" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                  <p className="text-lg text-primary mb-1">{edu.institution}</p>
                  <p className="text-muted-foreground text-sm">{edu.location}</p>
                  <div className="mt-4 inline-block px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10">
                    {edu.year}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-bottom-right" />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading 
            title="Get In Touch" 
            subtitle="Have a project in mind or want to say hello? I'd love to hear from you." 
          />
          
          <div className="glass-card p-8 md:p-10 rounded-3xl">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                  <input
                    {...form.register("name")}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 text-white"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                  <input
                    {...form.register("email")}
                    type="email"
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 text-white"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                <textarea
                  {...form.register("message")}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 text-white resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contactMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col items-center">
              <p className="text-muted-foreground mb-4 text-sm">Or connect via social platforms</p>
              <SocialLinks 
                github={profile.githubUrl || undefined}
                linkedin={profile.linkedinUrl || undefined}
                email={profile.email || undefined}
                className="justify-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 bg-black/40 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
