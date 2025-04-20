import Link from "next/link";
import DropdownAccount from "@/components/dropdown-account";

export default function Header() {
  return (
    <header className="sticky top-5 z-50 w-full -mt-16">
      <div className="container w-2xl mx-auto h-16 px-4 md:px-6 flex items-center bg-gray-200/80 backdrop-blur-sm rounded-full">
        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-6 items-center justify-around w-full">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-500">
              Daily Dose
            </span>
          </Link>
          <Link
            href="/menu"
            className="text-md font-medium hover:text-orange-500 transition-colors"
          >
            Menu
          </Link>
          <DropdownAccount />
        </nav>
      </div>
    </header>
  );
}
