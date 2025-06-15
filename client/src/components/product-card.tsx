import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product.id);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    });
  };

  const renderStars = () => {
    const rating = parseFloat(product.rating || "5");
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex text-yellow-400 text-sm">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i}>⭐</span>
        ))}
        {hasHalfStar && <span>⭐</span>}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <span key={i} className="text-gray-300">⭐</span>
        ))}
      </div>
    );
  };

  const getBadgeVariant = (badge: string | null) => {
    switch (badge) {
      case "New":
        return "bg-orange-500";
      case "Sale":
        return "bg-red-500";
      case "Best Seller":
        return "bg-green-500";
      case "Hot":
        return "bg-red-500";
      case "Tech":
        return "bg-blue-500";
      case "Eco":
        return "bg-green-500";
      case "Luxury":
        return "bg-purple-500";
      case "Audio":
        return "bg-indigo-500";
      case "Aromatherapy":
        return "bg-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden cursor-pointer">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <Badge className={`text-white px-2 py-1 rounded-full text-xs font-semibold ${getBadgeVariant(product.badge)}`}>
                {product.badge}
              </Badge>
            </div>
          )}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleWishlistToggle}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "text-red-500 fill-current" : "text-gray-400"}`} />
            </Button>
          </div>
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Add to Cart
            </Button>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center mb-2">
            {renderStars()}
            <span className="text-gray-500 text-sm ml-2">
              ({product.reviewCount} reviews)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-primary"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
