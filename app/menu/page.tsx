"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/components/cart-provider";

export default function MenuPage() {
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
      const currentQuantity = prev[productId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      return { ...prev, [productId]: newQuantity };
    });
  };

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 0;
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
                quantity={quantities[product.id] || 0}
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
                quantity={quantities[product.id] || 0}
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
                quantity={quantities[product.id] || 0}
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
                quantity={quantities[product.id] || 0}
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
                quantity={quantities[product.id] || 0}
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

const products: Product[] = [
  {
    id: 1,
    name: "Classic Brown Sugar",
    description: "Our signature milk tea with brown sugar pearls",
    price: 5.99,
    image: "/brownsugar.jpg?height=300&width=300",
    stock: 50,
    category: "classic",
  },
  {
    id: 2,
    name: "Taro Milk Tea",
    description: "Creamy taro flavor with chewy pearls",
    price: 6.49,
    image: "/taromilktea.jpg?height=300&width=300",
    stock: 35,
    category: "classic",
  },
  {
    id: 3,
    name: "Strawberry Matcha",
    description: "Fresh strawberry with premium matcha",
    price: 6.99,
    image: "/strawberrymatcha.jpg?height=300&width=300",
    stock: 25,
    category: "specialty",
  },
  {
    id: 4,
    name: "Mango Passion Fruit",
    description: "Tropical mango and passion fruit blend",
    price: 6.49,
    image: "/mangopassionfruit.jpg?height=300&width=300",
    stock: 40,
    category: "fruit",
  },
  {
    id: 5,
    name: "Honey Oolong Tea",
    description: "Premium oolong tea with honey",
    price: 5.49,
    image: "/honeyoolongtea.jpg?height=300&width=300",
    stock: 30,
    category: "classic",
  },
  {
    id: 6,
    name: "Lychee Fruit Tea",
    description: "Refreshing lychee tea with fruit bits",
    price: 5.99,
    image: "/lycheefruittea.jpg?height=300&width=300",
    stock: 20,
    category: "fruit",
  },
  {
    id: 7,
    name: "Coconut Milk Tea",
    description: "Creamy coconut milk with black tea",
    price: 6.49,
    image: "/coconutmilktea.jpg?height=300&width=300",
    stock: 15,
    category: "specialty",
  },
  {
    id: 8,
    name: "Peach Oolong",
    description: "Sweet peach flavor with oolong tea",
    price: 5.99,
    image: "/peachoolongtea.jpg?height=300&width=300",
    stock: 25,
    category: "fruit",
  },
  {
    id: 9,
    name: "Chocolate Milk Tea",
    description: "Rich chocolate flavor with milk tea",
    price: 6.99,
    image: "/chocolatemilktea.jpg?height=300&width=300",
    stock: 5,
    category: "specialty",
  },
  {
    id: 10,
    name: "Caramel Macchiato",
    description:
      "Rich espresso blended with steamed milk and topped with caramel drizzle",
    price: 4.75,
    image: "/caramel-macchiato.jpg?height=300&width=300",
    stock: 30,
    category: "coffee",
  },
  {
    id: 11,
    name: "Iced Americano",
    description: "Bold espresso shots poured over chilled water and ice",
    price: 3.25,
    image: "/iced-americano.jpg?height=300&width=300",
    stock: 40,
    category: "coffee",
  },
  {
    id: 12,
    name: "Vanilla Latte",
    description:
      "Smooth espresso with steamed milk and a hint of vanilla syrup",
    price: 4.5,
    image: "/vanilla-latte.jpg?height=300&width=300",
    stock: 35,
    category: "coffee",
  },
  {
    id: 13,
    name: "Mocha Frappe",
    description: "Chocolatey blended coffee topped with whipped cream",
    price: 5.0,
    image: "/mocha-frappe.jpg?height=300&width=300",
    stock: 20,
    category: "coffee",
  },
  {
    id: 14,
    name: "Espresso Shot",
    description:
      "A strong and concentrated coffee shot for that quick caffeine kick",
    price: 2.0,
    image: "/espresso-shot.jpg?height=300&width=300",
    stock: 50,
    category: "coffee",
  },
];
