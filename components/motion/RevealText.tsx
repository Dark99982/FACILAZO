"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Título que entra palabra por palabra, de desenfocado a nítido
 * (Sección 11 del prompt de dirección: "blur-to-sharp", sin exagerar:
 * una sola pasada, sin loops, se apaga entera con prefers-reduced-motion).
 */
export function RevealText({
  text,
  as: Tag = "span",
  delay = 0,
  className = "",
}: {
  text: string;
  as?: "span" | "h1" | "h2";
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: "0.4em", filter: "blur(10px)" }}
          animate={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
          transition={{
            duration: 0.65,
            delay: delay + index * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block will-change-transform"
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
