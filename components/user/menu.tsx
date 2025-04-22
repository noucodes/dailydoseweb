"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/components/cart-provider";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
};

type ProductCardProps = {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: number, change: number) => void;
  onAddToCart: (product: Product) => void;
};

type ProductListProps = {
  products: Product[];
};

export default function Menu({ products }: ProductListProps) {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group products by category
  const classicTeas = filteredProducts.filter((p) => p.category === "classic");
  const fruitTeas = filteredProducts.filter((p) => p.category === "fruit");
  const specialtyTeas = filteredProducts.filter(
    (p) => p.category === "specialty"
  );
  const coffees = filteredProducts.filter((p) => p.category === "coffee");

  // Handle quantity change
  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities((prev) => {
      const currentQuantity = prev[productId] || 1;
      const newQuantity = Math.max(0, currentQuantity + change);
      return { ...prev, [productId]: newQuantity };
    });
  };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    if (quantity > 0) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      // Reset quantity after adding to cart
      setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
    } else {
      // If no quantity selected, add 1
      addToCart(product);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 mt-16">
      <div className="flex flex-col items-center space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-orange-600">
          Our Menu
        </h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl">
          Explore our delicious selection of handcrafted beverage and find your
          perfect sip.
        </p>
        <div className="w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search drinks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-8">
        <TabsList className="grid mx-auto w-[60%] grid-cols-5 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="classic">Classic</TabsTrigger>
          <TabsTrigger value="coffee">Coffee</TabsTrigger>
          <TabsTrigger value="fruit">Fruit</TabsTrigger>
          <TabsTrigger value="specialty">Specialty</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantities[product.id] || 1}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="classic" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classicTeas.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantities[product.id] || 1}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coffee" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coffees.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantities[product.id] || 1}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fruit" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fruitTeas.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantities[product.id] || 1}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="specialty" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialtyTeas.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={quantities[product.id] || 1}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProductCard({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
}: ProductCardProps) {
  const stockStatus =
    product.stock > 10
      ? "In Stock"
      : product.stock > 0
      ? `Only ${product.stock} left`
      : "Out of Stock";

  const stockColor =
    product.stock > 10
      ? "bg-green-100 text-green-800"
      : product.stock > 0
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="flex flex-col rounded-xl border border-orange-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl mb-4">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill={true}
          className="object-cover"
        />
        <Badge className={`absolute top-2 right-2 ${stockColor}`}>
          {stockStatus}
        </Badge>
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="text-xl font-bold text-orange-600">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="font-bold text-orange-500">${product.price.toFixed(2)}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none rounded-l-md"
              onClick={() => onQuantityChange(product.id, -1)}
              disabled={quantity === 0}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none rounded-r-md"
              onClick={() => onQuantityChange(product.id, 1)}
              disabled={product.stock === 0 || quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>

          <Button
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
