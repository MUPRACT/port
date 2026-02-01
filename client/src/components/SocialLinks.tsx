import { Github, Linkedin, Mail, Twitter } from "lucide-react";

interface SocialLinksProps {
  github?: string;
  linkedin?: string;
  email?: string;
  className?: string;
}

export function SocialLinks({ github, linkedin, email, className = "" }: SocialLinksProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {github && (
        <a 
          href={github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white hover:-translate-y-1 transition-all text-gray-400 border border-white/5"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
      )}
      {linkedin && (
        <a 
          href={linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 bg-white/5 rounded-full hover:bg-[#0077b5]/20 hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:-translate-y-1 transition-all text-gray-400 border border-white/5"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      )}
      {email && (
        <a 
          href={`mailto:${email}`}
          className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary hover:border-primary/50 hover:-translate-y-1 transition-all text-gray-400 border border-white/5"
          aria-label="Email"
        >
          <Mail className="w-5 h-5" />
        </a>
      )}
    </div>
  );
}
