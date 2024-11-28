import Image from "next/image";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { useTranslations } from "next-intl";

const AboutUs = () => {
  const t = useTranslations("AboutPage");
  const items = [
    { id: 1, imageSrc: "/hero_1.png", altText: "Project visualization 1" },
    { id: 2, imageSrc: "/hero_2.png", altText: "Project visualization 2" },
    { id: 3, imageSrc: "/hero_3.png", altText: "Project visualization 3" }
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
            <div className="border-l border-gray-300 pl-4 ">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-2">
                {t("experience-title")}{" "}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t("experience-description")}{" "}
              </p>
            </div>
            <div className="border-l border-gray-300 pl-4 ">
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
        <div
          className={
            "scroller relative max-h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]"
          }>
          <ul className={"flex flex-col min-h-full gap-4 py-4 "}>
            a
            {items.map((item) => (
              <li
                key={item.id}
                className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
                <Image
                  src={item.imageSrc}
                  alt={item.altText}
                  layout="fill"
                  objectFit="cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
