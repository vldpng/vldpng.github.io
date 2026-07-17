"use client";
import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: { text: string; image: string; name: string; role: string }[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-8 rounded-[2rem] border border-zinc-800 bg-zinc-900 shadow-xl max-w-[320px] w-full" key={i}>
                  <div className="mb-5 flex gap-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <div className="text-zinc-300 leading-relaxed text-[15px]">"{text}"</div>
                  <div className="flex items-center gap-4 mt-8">
                    <img
                      width={48}
                      height={48}
                      src={image}
                      alt={name}
                      className="h-12 w-12 rounded-full border border-zinc-800 object-cover"
                    />
                    <div className="flex flex-col text-left">
                      <div className="font-semibold tracking-tight text-white leading-tight">{name}</div>
                      <div className="text-[13px] text-zinc-500 tracking-tight mt-0.5">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
