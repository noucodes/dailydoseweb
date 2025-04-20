"use client";
import { useCart } from "@/components/cart-provider";

export default function TotalItems() {
  const { cart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      {totalItems > 0 && (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs text-white ">
          {totalItems}
        </span>
      )}
    </>
  );
}
