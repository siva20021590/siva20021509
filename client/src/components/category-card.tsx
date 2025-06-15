import { Link } from "wouter";
import { cn } from "@/lib/utils";
import type { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const getIconClass = (icon: string) => {
    switch (icon) {
      case "fas fa-tshirt":
        return "👕";
      case "fas fa-laptop":
        return "💻";
      case "fas fa-home":
        return "🏠";
      case "fas fa-watch":
        return "⌚";
      default:
        return "📦";
    }
  };

  const getGradientClass = (gradient: string) => {
    switch (gradient) {
      case "from-pink-100 to-purple-100":
        return "bg-gradient-to-br from-pink-100 to-purple-100";
      case "from-blue-100 to-indigo-100":
        return "bg-gradient-to-br from-blue-100 to-indigo-100";
      case "from-green-100 to-emerald-100":
        return "bg-gradient-to-br from-green-100 to-emerald-100";
      case "from-orange-100 to-red-100":
        return "bg-gradient-to-br from-orange-100 to-red-100";
      default:
        return "bg-gradient-to-br from-blue-100 to-indigo-100";
    }
  };

  return (
    <Link href={`/products?category=${category.id}`}>
      <div className="group cursor-pointer">
        <div className={cn(
          "rounded-2xl p-8 text-center transition-transform duration-200 group-hover:scale-105 group-hover:shadow-lg",
          getGradientClass(category.gradient)
        )}>
          <div className="text-4xl mb-4">{getIconClass(category.icon)}</div>
          <h3 className="font-semibold text-lg text-gray-800">{category.name}</h3>
          <p className="text-gray-600 text-sm mt-2">{category.description}</p>
        </div>
      </div>
    </Link>
  );
}
