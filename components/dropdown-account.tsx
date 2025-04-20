import { signOutAction } from "@/app/actions";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { User, Link, ShoppingBag } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import TotalItems from "@/components/total-items";

export default function DropdownAccount() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" className="relative px-3">
            <User className="h-6 w-6" />
            <TotalItems />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="h-6 w-6" />
              Account
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              {/* <Link
                href="/checkout"
                className="cursor-pointer flex w-full justify-between"
              >
                <div className="flex justify-end items-center gap-2">
                  <ShoppingBag className="h-20 w-20" />
                  Orders
                </div>

                <TotalItems />
              </Link> */}
              <Link href="/checkout">
                <ShoppingBag className="h-20 w-20" />
                Orders
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form action={signOutAction} className="">
              <Button type="submit" variant="ghost" className="p-0">
                Sign out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
