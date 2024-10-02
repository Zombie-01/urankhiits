import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <button className="fixed top-4 left-4 lg:left-20 z-[999999999999999]  rounded-full py-2 px-2 text-[9px]">
      <Link href="/" className="hidden lg:block">
        <Image
          src="/images/logo.png"
          alt="Uran khiits logo"
          width={160}
          height={35}
        />
      </Link>
      <Link href="/" className="block lg:hidden">
        <Image
          src="/images/logo-mini.png"
          alt="Uran khiits logo"
          width={18}
          height={18}
        />
      </Link>
    </button>
  );
};

export default Logo;
