import { useRef } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { ImageWithFallback } from "../ui-helpers/ImageWithFallback";
import logoImg from "@/imports/logoCH-removebg-preview.png";

export function InteractiveLogo({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx  = useSpring(0, { stiffness: 260, damping: 18 });
  const my  = useSpring(0, { stiffness: 260, damping: 18 });
  const rx  = useTransform(my, [-50, 50], [14, -14]);
  const ry  = useTransform(mx, [-50, 50], [-14, 14]);

  function onMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width  / 2);
    my.set(e.clientY - r.top  - r.height / 2);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", cursor: "pointer" }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      className={className}
    >
      <ImageWithFallback src={logoImg} alt="Conecta Hogar" className="w-full h-full object-contain drop-shadow-lg" />
    </motion.div>
  );
}
