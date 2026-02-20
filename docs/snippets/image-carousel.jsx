import { useState, useEffect } from "react";

export const ImageCarousel = ({ items, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="image-carousel not-prose rounded-xl border border-zinc-950/10 dark:border-white/10 overflow-hidden">
      {title && (
        <h3 className="px-6 py-4 text-lg font-semibold text-zinc-950 dark:text-white border-b border-zinc-950/10 dark:border-white/10">
          {title}
        </h3>
      )}
      <div className="relative">
        <div className="overflow-hidden">
          {items.map((item, index) => {
            const src = typeof item === "string" ? item : item?.src;
            const alt =
              typeof item === "string"
                ? `Slide ${index + 1}`
                : item?.alt || `Slide ${index + 1}`;
            const caption = typeof item === "object" ? item?.caption : null;
            return (
              <div
                key={index}
                className={`transition-opacity duration-300 ${
                  index === currentIndex ? "block" : "hidden"
                }`}
              >
                {caption ? (
                  <div className="p-6">
                    <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                      {caption}
                    </p>
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                ) : (
                  <img src={src} alt={alt} className="w-full h-auto" />
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 shadow-sm backdrop-blur-sm">
            <button
            onClick={goToPrev}
            className="p-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="flex items-center gap-1.5">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-zinc-950 dark:bg-white"
                    : "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={goToNext}
            className="p-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
            aria-label="Next slide"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
