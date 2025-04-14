import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-xl font-bold text-orange-500">
              Daily Dose
            </Link>
            <p className="text-sm text-gray-500">
              Handcrafted milk teas made with love, served with joy!
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-orange-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-orange-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-orange-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-orange-500"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-sm text-gray-500 hover:text-orange-500"
            >
              Menu
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-orange-500"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-orange-500"
            >
              Contact
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-medium">Contact Us</h3>
            <p className="text-sm text-gray-500">
              123 Dose Street
              <br />
              Tea City, TC 12345
            </p>
            <p className="text-sm text-gray-500">
              Phone: (123) 456-7890
              <br />
              Email: hello@dailydose.com
            </p>
            <p className="text-sm text-gray-500">Hours: Mon-Sun 10am-9pm</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Daily Dose. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
