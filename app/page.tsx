import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-18 md:py-30 lg:py-40 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="items-center flex flex-col justify-center space-y-4">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-orange-600 text-center">
                Daily Dose
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl text-center">
                Sip into happiness with our handcrafted milk teas. Made with
                love, served with joy!
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/menu">
                <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer">
                  Order Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#featured">
                <Button
                  variant="outline"
                  className="border-orange-200 text-orange-500 hover:bg-orange-50  cursor-pointer"
                >
                  View Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="w-full py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-orange-500">
                Our Featured Drinks
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Discover our most loved milk tea creations that keep our
                customers coming back for more.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {featuredProducts.map((product) => (
              <Link href="/menu" key={product.id} className="group">
                <div className="flex flex-col items-center space-y-2 rounded-xl border border-orange-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill={true}
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col items-center space-y-1 text-center">
                    <h3 className="text-xl font-bold text-orange-600">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <p className="font-bold text-orange-500">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/menu">
              <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer">
                View All Drinks <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24 bg-orange-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="/About.png"
                width={400}
                height={400}
                alt="Our shop"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-orange-600">
                  Our Story
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Daily Dose was born from a passion for authentic milk tea and
                  a desire to bring joy through every sip. We carefully select
                  premium ingredients and craft each drink with love and
                  precision.
                </p>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Our mission is to create a cozy space where friends can
                  gather, students can study, and everyone can enjoy a moment of
                  bliss with our delicious milk tea creations.
                </p>
              </div>
              <div>
                <Link href="/menu">
                  <Button
                    variant="outline"
                    className="border-orange-200 text-orange-500 hover:bg-orange-50"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-orange-500">
                What Our Customers Say
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Don't just take our word for it. Here's what our happy customers
                have to say.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 rounded-xl border border-orange-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-gray-500 italic">"{testimonial.comment}"</p>
                <div className="flex items-center space-x-2">
                  <div className="rounded-full overflow-hidden h-10 w-10">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-orange-600">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-t from-orange-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-orange-600">
                Ready for a Daily Dose Experience?
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Order now and treat yourself to the perfect milk tea moment.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/menu">
                <Button className="bg-orange-500 hover:bg-orange-600 cursor-pointer">
                  Order Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const featuredProducts = [
  {
    id: 1,
    name: "Classic Brown Sugar",
    description: "Our signature milk tea with brown sugar pearls",
    price: 5.99,
    image: "/brownsugar.jpg?height=300&width=300",
  },
  {
    id: 2,
    name: "Taro Milk Tea",
    description: "Creamy taro flavor with chewy pearls",
    price: 6.49,
    image: "/taromilktea.jpg?height=300&width=300",
  },
  {
    id: 3,
    name: "Strawberry Matcha",
    description: "Fresh strawberry with premium matcha",
    price: 6.99,
    image: "/strawberrymatcha.jpg?height=300&width=300",
  },
];

const testimonials = [
  {
    name: "Sarah L.",
    comment:
      "The brown sugar milk tea is absolutely divine! I come here at least twice a week.",
    avatar: "/sarah.jpg?height=40&width=40",
  },
  {
    name: "Mike T.",
    comment:
      "Best boba shop in town! The taro milk tea is my favorite and the staff is always friendly.",
    avatar: "/mike.jpg?height=40&width=40",
  },
  {
    name: "Jessica K.",
    comment:
      "I love the variety of flavors and toppings. The strawberry matcha is a must-try!",
    avatar: "/jessica.jpg?height=40&width=40",
  },
];
