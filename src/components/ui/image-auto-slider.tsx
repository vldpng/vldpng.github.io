import React from 'react';

export const ImageAutoSlider = () => {
  // Images for the infinite scroll
  const images = [
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604399723049-74d3eff7a13c?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532938911079-1b06ac7ce122?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1445527815219-ec9fc122cb43?q=80&w=2000&auto=format&fit=crop",
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 40s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

      `}</style>
      
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center py-12 rounded-3xl">
        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="scroll-container w-full max-w-[100vw] lg:max-w-6xl">
            <div className="infinite-scroll flex gap-6 w-max">
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="image-item flex-shrink-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-lg border border-zinc-200"
                >
                  <img
                    src={image}
                    alt={`Gallery image ${(index % images.length) + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
