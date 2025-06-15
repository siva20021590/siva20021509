import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Laptop, ShirtIcon as Shirt, Home, Smartphone } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Discover Amazing Products
            </h1>
            <p className="text-xl mb-8 text-blue-100 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Shop the latest trends in fashion, electronics, and home decor with unbeatable prices and quality.
            </p>
            <Link href="/products">
              <Button 
                size="lg"
                className="bg-orange-500 text-white px-8 py-4 text-lg font-semibold hover:bg-orange-600 transition-colors duration-200 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                Shop Now
              </Button>
            </Link>
          </div>
          <div className="relative animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {/* Modern shopping illustration with geometric shapes */}
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 h-24 flex items-center justify-center">
                  <Laptop className="h-8 w-8" />
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 h-24 flex items-center justify-center">
                  <Shirt className="h-8 w-8" />
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 h-24 flex items-center justify-center">
                  <Home className="h-8 w-8" />
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 h-24 flex items-center justify-center">
                  <Smartphone className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
