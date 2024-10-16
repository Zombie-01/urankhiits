"use client";
import React, { ReactNode, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Bomb, CheckCircle, Loader2, Pen, Table, User, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/moving-border";
import { CanvasRevealEffect } from "../ui/canvas-reveal-effect";

const cardData = [
  {
    title: "First Furniture Set",
    amount: 15000,
    details: [
      "Elegant design for modern spaces",
      "Includes a sofa, coffee table, and chairs",
      "High-quality materials for durability",
      "Custom color options available",
    ],
    buttonLabel: "Purchase",
    icon: "User", // Use string for easier rendering
    animationSpeed: 5.1,
    containerClassName: "bg-emerald-900",
  },
  {
    title: "Office Furniture Set",
    amount: 25000,
    details: [
      "Ergonomic chair and desk combination",
      "250 Uran AI Insights for workspace optimization",
      "Stylish storage solutions included",
      "Available in multiple finishes",
    ],
    buttonLabel: "Purchase",
    icon: "Table", // Use string for easier rendering
    animationSpeed: 3,
    containerClassName: "bg-black",
    colors: [
      [236, 72, 153],
      [232, 121, 249],
    ],
  },
  {
    title: "Custom Furniture Set",
    amount: 0,
    details: [
      "Tailored to your unique specifications",
      "Select materials, colors, and styles",
      "Personal consultation included",
      "Design your perfect furniture set",
    ],
    buttonLabel: "Purchase",
    icon: "Pen", // Use string for easier rendering
    animationSpeed: 3,
    containerClassName: "bg-sky-600",
    colors: [[125, 211, 252]],
  },
];

export function CanvasRevealCard() {
  const [data, setResult] = useState<any>();
  const [load, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [checkDone, setCheckDone] = useState<any>();

  const [amount, setAmount] = useState<number>();

  const Reset = () => {
    setAmount(undefined);
    setLoading(false);
    setOpenDialog(false);
    setCheckDone(undefined); // Reset check done status
    setResult(undefined);
  };

  return (
    <>
      <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto">
        {cardData.map((card: any, index: number) => (
          <Card
            key={index}
            title={
              <div className="p-4 rounded-lg  shadow">
                <ul className="mt-2 list-disc list-inside">
                  {card.details.map((detail: any, i: number) => (
                    <li key={i} className="text-[12plgx] md:text-base">
                      {detail}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[10px] md:text-base">lorem ipsum</p>
                <Button
                  onClick={async () => {
                    if (card.amount === 0) {
                      setOpenDialog(true);
                    } else {
                      setAmount(card.amount);
                      // await SetInvoice(card.amount);
                      setOpenDialog(true);
                    }
                  }}
                  className="w-min max-w-[400px] bg-gray-800/10 px-4 whitespace-nowrap rounded-xl"
                  variant="outline">
                  {card.buttonLabel}
                </Button>
              </div>
            }
            icon={card.title}>
            <CanvasRevealEffect
              animationSpeed={card.animationSpeed}
              containerClassName={card.containerClassName}
              colors={card.colors}
            />
            {card.title === "Office Bagts" && (
              <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
            )}
          </Card>
        ))}
      </div>
      {/* <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black opacity-50" />
          <Dialog.Content className="fixed z-[9999999] inset-0 flex justify-center items-center">
            <div className="relative bg-white dark:bg-black p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
              <div className="p-4 absolute right-1 -top-4">
                <button
                  onClick={() => Reset()}
                  className="mt-4 bg-gradient-to-r from-[#56586980] via-[#56586999] to-[#565869b3] p-2 rounded">
                  <X className="text-white" />
                </button>
              </div>
              {data ? (
                checkDone?.paid || checkDone?.error ? (
                  <>
                    {!checkDone?.paid ? (
                      <div className="flex flex-col justify-center items-center mt-6 p-4 border border-red-200 rounded-lg bg-red-50">
                        <Bomb className="text-red-500 h-12 w-12" />
                        <h2 className="text-lg font-semibold mt-2 text-red-700">
                          Payment Failed!
                        </h2>
                        <p className="text-sm text-red-600">
                          There was an issue processing your payment. Please try
                          again.
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center items-center mt-6 p-4 border border-green-200 rounded-lg bg-green-50">
                        <CheckCircle className="text-green-500 h-12 w-12" />
                        <h2 className="text-lg font-semibold mt-2 text-green-700">
                          Payment Completed!
                        </h2>
                        <p className="text-sm text-green-600">
                          Thank you for your purchase. Your order is being
                          processed.
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="mt-6 p-4">
                    <a
                      href={data.qpay_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline">
                      Банкны апп нээх
                    </a>
                    <div className="mt-4 bg-white rounded-lg text-center">
                      <img
                        src={`data:image/png;base64,${data.qr_image}`}
                        alt="QR Code"
                        className="w-64 h-64 mx-auto mt-4"
                      />
                    </div>
                  </div>
                )
              ) : (
                <div className="flex flex-col gap-4 py-2 sm:py-6 w-full">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-semibold">Дүн</h1>
                    <div>
                      <Input
                        type="text"
                        value={amount}
                        placeholder="10,000"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!isNaN(+value)) {
                            setAmount(+value);
                          }
                        }}
                        className="border-gray-600"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => SetInvoice()}
                    disabled={load || (amount ? amount < 1 : true)}
                    size="sm">
                    {load ? <Loader2 className="animate-spin " /> : "Цэнэглэх"}
                  </Button>
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root> */}
    </>
  );
}

const Card = ({
  title,
  icon,
  children,
}: {
  title: ReactNode;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  lg:max-w-sm w-full mx-auto p-4 relative lg:h-[30rem] ">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0">
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </div>
  );
};

const AceternityIcon = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white ">
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
        style={{ mixBlendMode: "darken" }}
      />
    </svg>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
