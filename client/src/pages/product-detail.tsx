import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Heart, Minus, Plus, Truck, RotateCcw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import ProductCard from "@/components/product-card";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const productId = params?.id ? parseInt(params.id) : 0;
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['/api/products', productId],
    enabled: !!productId,
  });

  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products', product?.categoryId],
    queryFn: async () => {
      if (!product?.categoryId) return [];
      const response = await fetch(`/api/products?categoryId=${product.categoryId}`);
      if (!response.ok) throw new Error('Failed to fetch related products');
      const products = await response.json();
      return products.filter((p: Product) => p.id !== productId).slice(0, 4);
    },
    enabled: !!product?.categoryId,
  });

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product.id, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product?.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    });
  };

  const renderStars = () => {
    if (!product) return null;
    const rating = parseFloat(product.rating || "5");
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex text-yellow-400 text-lg">
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gray-300 h-80 rounded-lg"></div>
              <div>
                <div className="bg-gray-300 h-8 rounded mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-12 rounded mb-6"></div>
                <div className="bg-gray-300 h-24 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-600 mb-2">Product not found</h2>
            <p className="text-gray-500">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartSidebar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-lg"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge className={`text-white px-3 py-1 rounded-full text-sm font-semibold ${getBadgeVariant(product.badge)}`}>
                      {product.badge}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  {renderStars()}
                  <span className="text-gray-600 ml-2">({product.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-xl">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 border-x border-gray-300 font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleWishlistToggle}
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? "text-red-500 fill-current" : "text-gray-400"}`} />
                  </Button>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-green-500 mr-3" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center">
                    <RotateCcw className="h-5 w-5 text-blue-500 mr-3" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-purple-500 mr-3" />
                    <span>1-year warranty included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
