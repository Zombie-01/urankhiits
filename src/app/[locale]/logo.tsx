"use client";
import useDarkMode from "@/lib/darkmode";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <button className="  rounded-full  z-[9999999] py-2 px-2 text-[9px]">
      <Link href="/" className="block">
        <div className="w-[75px] lg:w-[145px] h-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145.84 34.02">
            <defs>
              <style>
                {`
                  .clssss-1, .clssss-2, .clssssssss-3 {
                    fill: #010101;
                  }
                  .clssss-2 {
                    fill-rule: evenodd;
                  }
                  .clssssssss-3 {
                    font-size: 7.65px;
                    font-family: AeonikFono-Light, Aeonik Fono;
                    font-weight: 300;
                    letter-spacing: 0.25em;
                  }
                  .cls-4 {
                    letter-spacing: 0.23em;
                  }
                  .cls-5, .cls-7 {
                    letter-spacing: -0.07em;
                  }
                  .cls-6 {
                    letter-spacing: 0.18em;
                  }
                  .cls-7 {
                    font-family: GeologicaCursive-Thin, GeologicaCursive Thin;
                    font-weight: 200;
                  }
                  .cls-8 {
                    letter-spacing: 0.18em;
                  }
                  .cls-9 {
                    letter-spacing: 0.25em;
                  }
                  .clssss-10 {
                    letter-spacing: 0.23em;
                  }

                  /* Dark mode styles */
                  .dark .clssss-1, 
                  .dark .clssss-2, 
                  .dark .clssssssss-3 {
                    fill: #f1f1f1; /* Light color for dark mode */
                  }
                `}
              </style>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path
                  className="clssss-1"
                  d="M40.82,20.14a5.93,5.93,0,0,1-2.7-.55,4.75,4.75,0,0,1-1.77-1.48,6.7,6.7,0,0,1-1-2.15,10.31,10.31,0,0,1-.31-2.5V6.69h2.11v6.77a8,8,0,0,0,.19,1.78,4.7,4.7,0,0,0,.6,1.53,3,3,0,0,0,1.12,1.07,3.45,3.45,0,0,0,1.74.4,3.5,3.5,0,0,0,1.76-.41,3,3,0,0,0,1.11-1.09,5.13,5.13,0,0,0,.59-1.53,7.82,7.82,0,0,0,.19-1.75V6.69H46.6v6.77a9.88,9.88,0,0,1-.33,2.59,6.23,6.23,0,0,1-1,2.12,4.77,4.77,0,0,1-1.78,1.44A6,6,0,0,1,40.82,20.14Z"
                />
                <path
                  className="clssss-1"
                  d="M49.4,20V6.69h5.81a3.68,3.68,0,0,1,1.66.37,4.39,4.39,0,0,1,1.3,1A4.79,4.79,0,0,1,59,9.45,4.16,4.16,0,0,1,59.35,11,4.57,4.57,0,0,1,59,12.72a4,4,0,0,1-.91,1.4,3.52,3.52,0,0,1-1.38.84L59.88,20H57.51l-2.9-4.64h-3.1V20Zm2.11-6.51h3.68a1.66,1.66,0,0,0,1-.34,2.18,2.18,0,0,0,.71-.91A2.89,2.89,0,0,0,57.21,11a2.62,2.62,0,0,0-1.09-2.14,1.73,1.73,0,0,0-1-.34H51.51Z"
                />
                <path
                  className="clssss-1"
                  d="M65.69,6.69h2L72.88,20H70.66l-1.31-3.63H64L62.7,20H60.46Zm3.1,8.16L66.69,9l-2.12,5.85Z"
                />
                <path
                  className="clssss-1"
                  d="M76.64,10.6V20H74.53V6.69h1.73l7.57,9.65V6.7H86V20H84.11Z"
                />
                <path
                  className="clssss-1"
                  d="M89,20V6.69h2.11v6.87l6.28-6.89h2.33l-5.26,5.91L100,20H97.6l-4.52-6.12-2,2.09v4Z"
                />
                <path
                  className="clssss-1"
                  d="M112.35,6.69V20h-2.13V14.15h-6.74V20h-2.1V6.69h2.1v5.58h6.74V6.69Z"
                />
                <path className="clssss-1" d="M115.36,20V6.69h2.1V20Z" />
                <path className="clssss-1" d="M120.47,20V6.69h2.11V20Z" />
                <path
                  className="clssss-1"
                  d="M135.39,8.55H131V20h-2.13V8.55h-4.45V6.69h11Z"
                />
                <path
                  className="clssss-1"
                  d="M143.84,16.29c0-1-.7-1.54-1.92-1.84l-2.06-.5c-2-.47-3.36-1.54-3.36-3.61,0-2.26,1.95-3.71,4.5-3.71a4.63,4.63,0,0,1,4.71,3l-1.7.9a2.93,2.93,0,0,0-3-2.12c-1.53,0-2.53.75-2.53,1.9,0,.95.72,1.5,1.82,1.76l2.16.51c2.31.56,3.39,1.89,3.39,3.67,0,2.08-1.68,3.85-5,3.85A5.16,5.16,0,0,1,135.81,17l1.67-.94a3.45,3.45,0,0,0,3.45,2.25C143,18.28,143.84,17.32,143.84,16.29Z"
                />
                <path
                  className="clssss-2"
                  d="M22,9.5a11,11,0,0,1-11,11,10.88,10.88,0,0,1-4-.73,11,11,0,0,1-.73-4V6.33L0,0V9.5a11,11,0,0,0,3.23,7.79h0a11.06,11.06,0,0,0,3.82,2.48,11,11,0,0,0,2.49,3.83h0a11,11,0,0,0,18.81-7.79V6.33L22,0V9.5Z"
                />
                <text
                  className="clssssssss-3"
                  transform="translate(34.64 32.11)">
                  INTER
                  <tspan className="cls-4" x="32" y="0">
                    I
                  </tspan>
                  <tspan x="37.73" y="0">
                    O
                  </tspan>
                  <tspan className="cls-5" x="44.76" y="0">
                    R
                  </tspan>
                  <tspan className="cls-6" x="48.84" y="0">
                    {" "}
                  </tspan>
                  <tspan className="cls-7" x="52.79" y="0">
                    &amp;
                  </tspan>
                  <tspan className="cls-8" x="56.88" y="0">
                    {" "}
                  </tspan>
                  <tspan className="cls-9" x="60.84" y="0">
                    L
                  </tspan>
                  <tspan className="clssss-10" x="66.69" y="0">
                    I
                  </tspan>
                  <tspan className="cls-9" x="72.42" y="0">
                    GHTIN
                  </tspan>
                  <tspan className="cls-5" x="105.53" y="0">
                    G
                  </tspan>
                </text>
              </g>
            </g>
          </svg>
        </div>
      </Link>
      {/* <Link href="/" className="block lg:hidden">
        <Image
          src="/heo_logo.png"
          alt="Uran khiits logo"
          width={32}
          height={32}
        />
      </Link> */}
    </button>
  );
};

export default Logo;
