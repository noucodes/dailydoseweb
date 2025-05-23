"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-green-600 hover:bg-green-700"
      aria-disabled={pending}
      disabled={pending}
      {...props}
    >
      {pending ? pendingText : children}
    </Button>
  );
}
