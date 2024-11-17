import Image from "next/image";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const items = [
  { id: 1, imageSrc: "/hero_1.png", altText: "Project visualization 1" },
  { id: 2, imageSrc: "/hero_2.png", altText: "Project visualization 2" },
  { id: 3, imageSrc: "/hero_3.png", altText: "Project visualization 3" },
];

const AboutUs = () => {
  return (
    <section className="bg-white py-12 px-6 flex justify-center items-center sm:px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section: Statistics */}
        <div className="space-y-6 my-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">ABOUT US</h2>
          <p className="text-gray-700 mb-8 max-w-4xl">
            Urankhilts LLC was established in 2018 and operates in the fields of
            architecture, interior and exterior design, and technical
            engineering services. Our company has successfully completed over
            120 projects. Our strengths lie in our innovative ideas, adherence
            to high standards, and effective collaboration. We continue to
            operate with the goal of thoroughly understanding project
            objectives, carefully analyzing client requirements, and bringing in
            creative ideas.
          </p>
          <div className="flex gap-8">
            {" "}
            <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                60+ interior design projects
              </h3>
              <p className="text-gray-600">
                Our team has delivered creative interior solutions for 60
                diverse spaces, from coffee shops and stores to luxury homes and
                corporate offices.
              </p>
            </div>
            <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                120+ completed projects
              </h3>
              <p className="text-gray-600">
                Urankhilts has completed a total of over 120 unique projects,
                contributing to the development of Mongolia's architectural and
                interior design landscape.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Images */}
        <InfiniteMovingCards
          items={items}
          direction="down"
          speed="normal"
          pauseOnHover={true}
          className="my-custom-class"
        />
      </div>
    </section>
  );
};

export default AboutUs;
