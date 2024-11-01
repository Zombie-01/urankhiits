import React from "react";
import ContactCard from "./ContactCard";

const contactData = [
  {
    type: "Email",
    value: "office@uranhoots.com",
  },
  {
    type: "Address",
    value: "35 M Str, New York, USA",
  },
  {
    type: "Phone",
    value: "0040 (7763) 574-8901",
  },
];

const ContactSection: React.FC = () => {
  return (
    <div
      className="flex flex-wrap justify-center sm:space-x-4 md:space-x-12 lg:space-x-24 xl:space-x-36 px-2 sm:px-4 md:px-6 
my-4 sm:my-8 md:my-12 lg:my-16 space-y-1 sm:space-y-4 md:space-y-4 lg:space-y-4">
      {contactData.map((item, index) => (
        <ContactCard key={index} type={item.type} value={item.value} />
      ))}
    </div>
  );
};

export default ContactSection;
