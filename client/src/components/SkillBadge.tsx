import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
  delay?: number;
}

export function SkillBadge({ name, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-default"
    >
      {name}
    </motion.div>
  );
}
