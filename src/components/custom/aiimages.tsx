import React, { useState } from "react";
import Image from "next/image";
import { Compare } from "../ui/compare";

const images = [
  {
    id: 1,
    src: "/images/images.jpg",
    out: "/images/output.png",
    alt: "Image 1",
  },
  {
    id: 2,
    src: "/images/bedroom.jpg",
    out: "/images/bedoutreal.png",
    alt: "Image of a bedroom",
  },
  {
    id: 3,
    src: "/images/kitchen.jpg",
    out: "/images/kitchenout.png",
    alt: "Image of a kitchen",
  },
  {
    id: 4,
    src: "/images/bathroom.jpg",
    out: "/images/bathout.png",
    alt: "Image of a bathroom",
  },
  {
    id: 5,
    src: "/images/sketch.jpg",
    out: "/images/sketchout.png",
    alt: "Sketch image",
  },
  {
    id: 6,
    src: "/images/hand.jpg",
    out: "/images/handout.png",
    alt: "Image of a hand",
  },
];

const ImageSelector: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className=" px-4 py-10 text-center">
        <h1 className="text-xl w-full font-bold lg:text-2xl">
          Make Your Dreams Come True
        </h1>
        <p className="w-full">
          We can create your desired design from any image you have.
        </p>
      </div>
      <div className="relative w-full max-w-4xl  rounded-lg shadow-md">
        {/* Pass selectedImage props correctly */}
        <Compare
          firstImage={selectedImage.src}
          secondImage={selectedImage.out}
        />
      </div>

      <div className="flex space-x-2 mt-4 overflow-x-auto">
        <div className="flex flex-nowrap space-x-2">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`relative w-10 h-10 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 rounded-lg overflow-hidden focus:outline-none ${
                selectedImage.id === image.id
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              aria-label={`Select ${image.alt}`}>
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className={`rounded-lg overflow-hidden ${
                  selectedImage.id === image.id
                    ? "opacity-100"
                    : "opacity-75 hover:opacity-100"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSelector;
