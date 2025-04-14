"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-5 z-50 w-full -mt-16">
      <div className="container w-2xl mx-auto h-16 px-4 md:px-6 flex items-center bg-white/80 backdrop-blur-sm rounded-full">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-6 items-center justify-around w-full">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-500">
              Daily Dose
            </span>
          </Link>
          <Link
            href="/"
            className="text-md font-medium hover:text-orange-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="text-md font-medium hover:text-orange-500 transition-colors"
          >
            Menu
          </Link>
          <Link href="/checkout">
            <Button variant="ghost" size="icon" className="relative p-0">
              <ShoppingBag className="h-40 w-40" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </nav>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 p-4 bg-white border-t">
            <Link
              href="/"
              className="text-sm font-medium hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-sm font-medium hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-orange-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
