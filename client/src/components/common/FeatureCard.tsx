import { motion } from "framer-motion";

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: Props) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8"
    >
      <div className="text-cyan-400 text-4xl mb-4">{icon}</div>

      <h3 className="text-2xl font-bold mb-3">{title}</h3>

      <p className="text-slate-400">{description}</p>
    </motion.div>
  );
}
