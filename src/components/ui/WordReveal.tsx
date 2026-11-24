/**
 * WordReveal — matnni so'zlarga bo'lib, ko'rinishga kirganda bir marta
 * stagger bilan ochadi (motion: y + opacity). Sarlavhalar uchun.
 * Matnni o'zgartirmaydi — faqat bo'ladi; matn i18n dan keladi (c.t.* yoki c.*).
 *
 * Usage:
 *   <h2 className="font-display text-5xl"><WordReveal text={t.home.title} /></h2>
 *   <WordReveal as="h1" text={c.site.slogan} className="..." wordClassName="..." delay={0.2} />
 */
"use client";

import { Fragment } from "react";
import { motion, type Variants } from "motion/react";

type Tag = "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";

type Props = {
  text: string;
  as?: Tag;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function WordReveal({ text, as = "span", className, wordClassName = "", delay = 0, stagger = 0.06 }: Props) {
  const MotionTag = motion[as];
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span aria-hidden variants={word} className={`inline-block ${wordClassName}`}>
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}

export default WordReveal;
