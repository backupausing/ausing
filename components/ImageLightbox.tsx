"use client";

import { useState } from "react";

export default function ImageLightbox({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Trigger */}
      <div
        className="aspect-[4/3] bg-cover bg-center rounded-2xl cursor-pointer"
        style={{ backgroundImage: `url(${images[0]})` }}
        onClick={() => setOpen(true)}
      />

      {/* Modal Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setOpen(false)}
        >
          <img
            src={images[active]}
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-xl"
            alt=""
          />

          {/* Prev */}
          {active > 0 && (
            <button
              className="absolute left-5 text-white text-4xl"
              onClick={(e) => {
                e.stopPropagation();
                setActive((prev) => prev - 1);
              }}
            >
              ‹
            </button>
          )}

          {/* Next */}
          {active < images.length - 1 && (
            <button
              className="absolute right-5 text-white text-4xl"
              onClick={(e) => {
                e.stopPropagation();
                setActive((prev) => prev + 1);
              }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
