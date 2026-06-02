"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
const SparklesIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.93 2.25 12 7.5l2.07-5.25a.5.5 0 0 1 .9 0L17.25 8.5l4.16.34a.5.5 0 0 1 .29.88l-3.2 3.1.95 4.5a.5.5 0 0 1-.73.53L12 14.5l-3.72 2.33a.5.5 0 0 1-.73-.53l.95-4.5-3.2-3.1a.5.5 0 0 1 .29-.88l4.16-.34Z" />
  </svg>
);
const ChevronLeftIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const ChevronRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
const Badge = ({ children, className }) => (
  <div
    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${className}`}
  >
    {children}
  </div>
);
const cardData = [
  {
    id: 1,
    imageUrl:
      "https://upgnorthamerica.com/wp-content/uploads/2023/04/MOROCCAN-ARABS-IN-NORTH-AMERICA.jpg",
    user: "Yassine El Ouazari",
    review: "Very professional and friendly service! Highly recommend it",
  },
  {
    id: 2,
    imageUrl:
      "https://www.jabador.com/wp-content/uploads/2023/10/moroccan-thobes.jpg.webp",
    user: "Hicham IBN ABDELOUAHAB",
    review: "Excellent service",
  },
  {
    id: 3,
    imageUrl:
      "https://habibiadventures.wordpress.com/wp-content/uploads/2018/01/faceci-2.jpg",
    user: "مختارات آل الهيطي",
    review: "Perfect ❤️",
  },

  {
    id: 4,
    imageUrl:
      "https://media.gettyimages.com/id/2190239378/photo/a-serene-man-in-traditional-attire-stands-against-a-desert-backdrop-with-a-clear-blue-sky.jpg?s=612x612&w=gi&k=20&c=c3oseWkIuxJjB6oo3x06DhSkmrgxwKta50cL7RHGjuo=",
    user: "braih adnane",
    review:
      "I have already done business with this company...and I discovered that it offers better services in this field.",
  },
  {
    id: 5,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhO3RpnSPIEJJeSmFwihfEvOyRgdM7WUsR1g&s",
    user: "Houria",
    review:
      "Excellent rental service, professional and friendly team. I'm very satisfied with my experience. Best of luck! 😊",
  },
];
export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(cardData.length / 2),
  );
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef(null);
  const autoplayDelay = 3000;
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % cardData.length);
  };
  useEffect(() => {
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, activeIndex]);
  const changeSlide = (newIndex) => {
    const newSafeIndex = (newIndex + cardData.length) % cardData.length;
    setActiveIndex(newSafeIndex);
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
  };
  const onDragEnd = (event, info) => {
    const dragThreshold = 75;
    const dragOffset = info.offset.x;
    if (dragOffset > dragThreshold) {
      changeSlide(activeIndex - 1);
    } else if (dragOffset < -dragThreshold) {
      changeSlide(activeIndex + 1);
    }
  };
  return (
    <section className="w-full  p-5 flex-col items-center justify-center font-Poppins overflow-hidden">
      <h3 className=" text-xl md:text-2xl font-medium text-secondary uppercase w-fit border-b-2">
        Témoignages de nos clients
      </h3>
      <div
        className="w-full mx-auto mt-6 "
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative flex w-full flex-col rounded-xl border border-white/10  bg-ternary  p-4 pt-6 md:p-6">
          <a
            href="https://www.google.com/maps/place/St%C3%A9+OUZLAF+DRIVE/@27.1303634,-13.201556,308m/data=!3m1!1e3!4m17!1m8!3m7!1s0xc3772c616b079c9:0x9bea0d2b555fce5f!2sLaayoune!3b1!8m2!3d27.1500384!4d-13.1990758!16s%2Fg%2F11b6rc7tms!3m7!1s0xc37738ba690eaff:0x15d364ef7c9a343d!8m2!3d27.1303862!4d-13.1985005!9m1!1b1!16s%2Fg%2F11ynzh_73j?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="inline-flex items-center gap-2 bg-secondary w-fit text-ternary py-2 px-4 rounded-lg hover:bg-accent hover:text-secondary duration-300 ease-linear"
          >
            Google Reviews
            <ExternalLink size={18} />
          </a>

          <div className="relative w-full  h-70 md:h-100 flex items-center justify-center overflow-hidden pt-12">
            <motion.div
              className="w-full h-full flex items-center justify-center"
              drag="x"
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
            >
              {cardData.map((card, index) => (
                <Card
                  key={card.id}
                  card={card}
                  index={index}
                  activeIndex={activeIndex}
                  totalCards={cardData.length}
                />
              ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={() => changeSlide(activeIndex - 1)}
              className="p-2 rounded-full bg-gray-100  hover:bg-gray-200 border border-gray-300 text-gray-700  transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-center gap-2">
              {cardData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${activeIndex === index ? "w-6 bg-accent" : "w-2 bg-gray-300  hover:bg-gray-400 "}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => changeSlide(activeIndex + 1)}
              className="p-2 rounded-full bg-gray-100  hover:bg-gray-200  border-gray-300  text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function Card({ card, index, activeIndex, totalCards }) {
  let offset = index - activeIndex;
  if (offset > totalCards / 2) {
    offset -= totalCards;
  } else if (offset < -totalCards / 2) {
    offset += totalCards;
  }
  const isVisible = Math.abs(offset) <= 1;
  const animate = {
    x: `${offset * 50}%`,
    scale: offset === 0 ? 1 : 0.8,
    zIndex: totalCards - Math.abs(offset),
    opacity: isVisible ? 1 : 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 30,
    },
  };
  return (
    <motion.div
      className="absolute w-4/5 p-5  md:w-1/2 h-[95%]"
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={animate}
      initial={false}
    >
      <div className="relative w-full  flex flex-col items-center justify-center h-full  md:h-4/5 rounded-lg shadow-sm overflow-hidden bg-primary">
        <img
          src={card.imageUrl}
          alt={card.title}
          className="w-1/4 lg:w-1/8 rounded-full  aspect-square  pointer-events-none"
          onError={(e) => {
            const target = e.target;
            target.onerror = null;
            target.src =
              "https://placehold.co/400x600/1e1e1e/ffffff?text=Image+Missing";
          }}
        />
        <div className="text-center mt-4">
          <h4 className="text-secondary text-xs md:text-sm font-semibold">
            {card.user}
          </h4>
          <p className="text-text-secondary text-xs w-full mt-2 px-8">
            {card.review}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
