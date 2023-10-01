'use client';

import React, { useState, useEffect } from "react";

export default function UseCarousel({ items, interval }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const infiniteScroll = () => {
      if (currentIndex === items.length - 1) {
        return setCurrentIndex(0);
      }
      return setCurrentIndex(currentIndex + 1);
    };

    const ninterval = setInterval(() => {
      infiniteScroll();
    }, interval * 1000);
    return () => {
    clearInterval(ninterval);

    };
  });

  return (
    <div className="flex flex-nowrap overflow-hidden">
      {items.map((item, index) => (
        <div
          key={index}
          style={{ transform: `translate(-${currentIndex * 100}%)` }}
          className={`min-w-full w-[80%] flex transition-all duration-1000 !dration-[${
            interval * 1000
          }] ${
            currentIndex !== index ? "" : ""
          }  items-center   justify-start pl-6 overflow-clip `}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
