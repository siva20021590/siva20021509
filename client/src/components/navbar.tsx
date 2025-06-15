import { useState } from "react";
import { Link } from "wouter";
import { Search, Heart, User, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getItemCount, setIsOpen } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleCartClick = () => {
    setIsOpen(true);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="text-2xl font-bold text-primary cursor-pointer">
              ModernMart
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium">
              Products
            </Link>
            <a
              href="#categories"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              Deals
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
            >
              About
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-primary transition-colors duration-200 hidden md:flex"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:text-primary transition-colors duration-200 hidden md:flex"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCartClick}
              className="relative text-gray-700 hover:text-primary transition-colors duration-200"
            >
              <ShoppingCart className="h-5 w-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Button>
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-primary"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden bg-white border-t border-gray-200", isMobileMenuOpen ? "block" : "hidden")}>
        <div className="px-4 py-2 space-y-2">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </form>
          <Link href="/" className="block py-2 text-gray-700 hover:text-primary font-medium" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/products" className="block py-2 text-gray-700 hover:text-primary font-medium" onClick={() => setIsMobileMenuOpen(false)}>
            Products
          </Link>
          <a href="#categories" className="block py-2 text-gray-700 hover:text-primary font-medium">
            Categories
          </a>
          <a href="#" className="block py-2 text-gray-700 hover:text-primary font-medium">
            Deals
          </a>
          <a href="#" className="block py-2 text-gray-700 hover:text-primary font-medium">
            About
          </a>
        </div>
      </div>
    </header>
  );
}
