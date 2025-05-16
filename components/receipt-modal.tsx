"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/components/cart-provider";

type ReceiptModalProps = {
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    paymentMethod: string;
  };
  onClose: () => void;
  onFinish: () => void;
};

export default function ReceiptModal({
  cart,
  subtotal,
  shipping,
  tax,
  total,
  customerInfo,
  onClose,
  onFinish,
}: ReceiptModalProps) {
  const [open, setOpen] = useState(true);
  const [orderNumber, setOrderNumber] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  useEffect(() => {
    // Generate random order number
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(`BB-${randomNum}`);

    // Set estimated time (15-30 minutes from now)
    const now = new Date();
    const minTime = new Date(now.getTime() + 15 * 60000);
    const maxTime = new Date(now.getTime() + 30 * 60000);

    const formatTime = (date: Date) => {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    setEstimatedTime(`${formatTime(minTime)} - ${formatTime(maxTime)}`);
  }, []);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleFinish = () => {
    setOpen(false);
    onFinish();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-orange-600">
            Thank You For Your Order!
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Estimated Ready Time
              </p>
              <p className="font-medium">{estimatedTime}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>₱{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>₱{tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₱{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Customer Information</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">Name:</span>{" "}
                {customerInfo.name}
              </p>
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                {customerInfo.email}
              </p>
              <p>
                <span className="text-muted-foreground">Phone:</span>{" "}
                {customerInfo.phone}
              </p>
              <p>
                <span className="text-muted-foreground">Address:</span>{" "}
                {customerInfo.address}
              </p>
              <p>
                <span className="text-muted-foreground">Payment Method:</span>{" "}
                {customerInfo.paymentMethod}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/placeholder.svg?height=100&width=100"
              width={100}
              height={100}
              alt="QR Code"
              className="rounded-lg"
            />
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-orange-200 text-orange-500 hover:bg-orange-50"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
            <Button
              onClick={handleFinish}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Check className="mr-2 h-4 w-4" />
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
