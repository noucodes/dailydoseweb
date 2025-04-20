"use client";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function Password() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        name="password"
        required
        minLength={6}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOffIcon className="h-4 w-4 text-gray-400" />
        ) : (
          <EyeIcon className="h-4 w-4 text-gray-400" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  );
}
