import * as React from "react"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  duration?: number
  delay?: number
  replay?: boolean
  className?: string
  textClassName?: string
  underlineClassName?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  underlineGradient?: string
  underlineHeight?: string
  underlineOffset?: string
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  ({
    text,
    duration = 0.5,
    delay = 0.1,
    replay = true,
    className,
    textClassName,
    underlineClassName,
    as: Component = "h1",
    underlineGradient = "from-blue-500 via-purple-500 to-pink-500",
    underlineHeight = "h-1",
    underlineOffset = "-bottom-2",
    ...props
  }, ref) => {
    const letters = Array.from(text)

    const container: Variants = {
      hidden: { 
        opacity: 0 
      },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: { 
          staggerChildren: duration, 
          delayChildren: i * delay 
        }
      })
    }

    const child: Variants = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200
        }
      },
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 200
        }
      }
    }

    const lineVariants: Variants = {
      hidden: {
        width: "0%",
        left: "50%"
      },
      visible: {
        width: "100%",
        left: "0%",
        transition: {
          delay: letters.length * delay,
          duration: 0.8,
          ease: "easeOut"
        }
      }
    }

    // Рендерим настоящий семантический тег (h1/h2/p/...), а не div —
    // это важно для SEO и доступности. По умолчанию — h1.
    const MotionHeading = (motion as any)[Component] as typeof motion.h1

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-2", className)}
        {...props}
      >
        <div className="relative">
          <MotionHeading
            // Полный текст в aria-label, чтобы скринридеры и поисковые
            // системы получали цельную фразу, а не набор букв.
            aria-label={text.replace(/\n/g, ' ')}
            style={{ display: "block", overflow: "hidden", margin: 0 }}
            variants={container}
            initial="hidden"
            animate={replay ? "visible" : "hidden"}
            className={cn("text-4xl font-bold text-center", textClassName)}
          >
            {text.split('\n').map((line, lineIndex) => (
              <span key={lineIndex} style={{ display: "block" }} aria-hidden="true">
                {line.split(/(\s+)/).map((word, wordIndex) => (
                  <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "pre" }}>
                    {Array.from(word).map((letter, letterIndex) => (
                      <motion.span key={letterIndex} variants={child} style={{ display: "inline-block" }}>
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </span>
            ))}
          </MotionHeading>

          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "absolute",
              underlineHeight,
              underlineOffset,
              "bg-gradient-to-r",
              underlineGradient,
              underlineClassName
            )}
          />
        </div>
      </div>
    )
  }
)
AnimatedText.displayName = "AnimatedText"

export { AnimatedText }
