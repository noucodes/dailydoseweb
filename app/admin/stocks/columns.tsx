"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  Coffee,
  GlassWater,
  MoreVerticalIcon,
  PencilIcon,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { addItemAction, deleteItem, updateItem } from "@/app/actions";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  category: "coffee" | "specialty" | "fruit" | "classic";
  stock: number;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.image}
        alt={row.original.name || "Product Image"} // add alt for accessibility
        width={50}
        height={50}
        className="rounded-md object-cover"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Beverage price",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex justify-center gap-2 px-2 text-muted-foreground [&_svg]:size-3 w-fit text-bold text-"
      >
        $ {row.original.price}
      </Badge>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex gap-2 px-1.5 text-muted-foreground [&_svg]:size-3 w-20"
      >
        {row.original.category === "coffee" ? (
          <Coffee className="text-green-500 dark:text-green-400" />
        ) : (
          <GlassWater />
        )}
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const itemId = row.original.id;

      // Handle delete item async
      const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Deleting item ID:", itemId);
        await deleteItem(itemId); // Call deleteItem with the itemId
        // Optionally, refetch items or handle state changes after deletion
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
              size="icon"
            >
              <MoreVerticalIcon />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <PencilIcon />

                  <span className="hidden lg:inline">Edit</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Item</DialogTitle>
                  <DialogDescription>
                    You can update your item here.
                  </DialogDescription>
                </DialogHeader>
                <form action={updateItem} method="post">
                  <div className="grid gap-4 py-4">
                    <Input
                      id="id"
                      name="id"
                      type="text"
                      className="col-span-3"
                      value={row.original.id}
                      hidden
                      readOnly
                    />
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="image" className="text-right">
                        Images
                      </Label>
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Boba Milk Tea"
                        className="col-span-3"
                        defaultValue={row.original.name}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        name="description"
                        placeholder="Rich boba flavor milk tea"
                        className="col-span-3"
                        defaultValue={row.original.description}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        placeholder="$12.3"
                        className="col-span-3"
                        defaultValue={row.original.price}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Select
                        name="category"
                        defaultValue={row.original.category}
                        required
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="classic">Classic</SelectItem>
                            <SelectItem value="specialty">Specialty</SelectItem>
                            <SelectItem value="fruit">Fruit</SelectItem>
                            <SelectItem value="coffee">Coffee</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="stock" className="text-right">
                        Stock
                      </Label>
                      <Input
                        id="stock"
                        name="stock"
                        placeholder="22"
                        className="col-span-3"
                        defaultValue={row.original.stock}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Update Item</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the item.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <form onSubmit={handleDelete}>
                    <AlertDialogAction type="submit">Delete</AlertDialogAction>
                  </form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
