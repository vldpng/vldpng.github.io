"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from "@/components/ui/carousel";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  demoUrl?: string;
  items?: GalleryItem[];
}

const Gallery6 = ({
  heading = "Галерея",
  demoUrl = "#",
  items = [
    {
      id: "item-1",
      title: "Build Modern UIs",
      summary:
        "Create stunning user interfaces with our comprehensive design system.",
      url: "#",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "item-2",
      title: "Computer Vision Technology",
      summary:
        "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
      url: "#",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "item-3",
      title: "Machine Learning Automation",
      summary:
        "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
      url: "#",
      image: "https://images.unsplash.com/photo-1563223771-5fe4038fbfc9?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "item-4",
      title: "Predictive Analytics",
      summary:
        "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
      url: "#",
      image: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "item-5",
      title: "Neural Network Architecture",
      summary:
        "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
      url: "#",
      image: "https://images.unsplash.com/photo-1598256989441-11d20dd56ab2?auto=format&fit=crop&q=80&w=800",
    },
  ],
}: Gallery6Props) => {
  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
        <div>
          <h3 className="h-card mb-3 md:mb-4 lg:mb-6 text-zinc-900 dark:text-zinc-50">
            {heading}
          </h3>
        </div>
      </div>

      <div className="w-full mx-auto relative group">
        <Carousel className="relative">
          <CarouselContent className="">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3">
                <a
                  href={item.url}
                  className="group flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex aspect-[3/4] overflow-clip rounded-2xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-xl text-zinc-900 dark:text-zinc-50">
                    {item.title}
                  </div>
                  <div className="mb-4 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {item.summary}
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNavigation alwaysShow={true} className="w-[110%] left-[-5%] hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export { Gallery6 };
