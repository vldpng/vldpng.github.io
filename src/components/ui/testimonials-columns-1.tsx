"use client";
import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: {
    text: string;
    image: string;
    name: string;
    role: string;
    rating?: number;
    authorUri?: string;
    reviewUri?: string;
  }[];
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
              {props.testimonials.map(({ text, image, name, role, rating = 5, authorUri, reviewUri }, i) => (
                <div className="p-8 rounded-[2rem] border border-zinc-200 bg-card shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-xl max-w-[320px] w-full" key={i}>
                  <div className="mb-5 flex gap-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`h-4 w-4 ${
                          starIndex < Math.round(rating)
                            ? 'fill-amber-500 text-amber-500'
                            : 'fill-transparent text-zinc-300 dark:text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-[15px]">"{text}"</div>
                  <div className="flex items-center gap-4 mt-8">
                    <a href={authorUri || undefined} target={authorUri ? '_blank' : undefined} rel={authorUri ? 'noreferrer' : undefined}>
                      <img
                        width={48}
                        height={48}
                        src={image}
                        alt={name}
                        className="h-12 w-12 rounded-full border border-zinc-200 dark:border-zinc-800 object-cover"
                      />
                    </a>
                    <div className="flex flex-col text-left">
                      {authorUri ? (
                        <a
                          className="font-semibold tracking-tight text-zinc-900 dark:text-white leading-tight hover:underline"
                          href={authorUri}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {name}
                        </a>
                      ) : (
                        <div className="font-semibold tracking-tight text-zinc-900 dark:text-white leading-tight">{name}</div>
                      )}
                      <div className="text-[13px] text-zinc-500 tracking-tight mt-0.5">{role}</div>
                    </div>
                  </div>
                  {reviewUri && (
                    <a
                      className="mt-5 inline-block text-xs font-semibold text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
                      href={reviewUri}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Открыть отзыв в Google Maps
                    </a>
                  )}
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
