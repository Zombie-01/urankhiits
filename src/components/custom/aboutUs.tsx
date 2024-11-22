import Image from "next/image";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { useTranslations } from "next-intl";

const AboutUs = () => {
  const t = useTranslations("AboutPage");
  const items = [
    { id: 1, imageSrc: "/hero_1.png", altText: "Project visualization 1" },
    { id: 2, imageSrc: "/hero_2.png", altText: "Project visualization 2" },
    { id: 3, imageSrc: "/hero_3.png", altText: "Project visualization 3" },
  ];
  return (
    <section className="py-12 px-6 flex justify-center items-center sm:px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section: Statistics */}
        <div className="space-y-6 my-auto">
          <h2 className="text-3xl font-bold mb-6">{t("aboutUs")}</h2>
          <p className=" mb-8 max-w-4xl">{t("aboutDescription")}</p>
          <div className="flex gap-8">
            {" "}
            <div className="border-l border-gray-300 pl-4 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-2">
                {t("experience-title")}{" "}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("experience-description")}{" "}
              </p>
            </div>
            <div className="border-l border-gray-300 pl-4 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-2">
                {t("sustainableProjects-title")}{" "}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("sustainableProjects-description")}
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
