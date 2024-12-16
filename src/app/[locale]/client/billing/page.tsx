// pages/generated-designs.tsx
import React from "react";

const GeneratedDesigns = () => {
  const designs = [
    { id: 1, image: "/images/design1.jpg" },
    { id: 2, image: "/images/design2.jpg" },
    { id: 3, image: "/images/design3.jpg" },
    { id: 4, image: "/images/design4.jpg" },
    { id: 5, image: "/images/design5.jpg" },
    { id: 6, image: "/images/design6.jpg" }
  ];

  return (
    <div className="space-y-4">
    
      <div className="grid grid-cols-3 gap-4">
        {designs.map((design) => (
          <div
            key={design.id}
            className="relative p-2 border rounded bg-white shadow">
            <img
              src={design.image}
              alt={`Design ${design.id}`}
              className="w-full h-32 object-cover rounded"
            />
            <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              #{design.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedDesigns;
