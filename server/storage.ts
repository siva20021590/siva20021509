import { 
  categories, 
  products, 
  cartItems, 
  orders, 
  orderItems,
  type Category, 
  type Product, 
  type CartItem, 
  type Order, 
  type OrderItem,
  type InsertCategory, 
  type InsertProduct, 
  type InsertCartItem, 
  type InsertOrder, 
  type InsertOrderItem 
} from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Products
  getProducts(categoryId?: number, search?: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;

  // Orders
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getOrder(id: number): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentCartItemId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;

    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categoryData: InsertCategory[] = [
      { name: "Fashion", slug: "fashion", description: "Latest trends", icon: "fas fa-tshirt", gradient: "from-pink-100 to-purple-100" },
      { name: "Electronics", slug: "electronics", description: "Tech gadgets", icon: "fas fa-laptop", gradient: "from-blue-100 to-indigo-100" },
      { name: "Home & Decor", slug: "home-decor", description: "Beautiful spaces", icon: "fas fa-home", gradient: "from-green-100 to-emerald-100" },
      { name: "Accessories", slug: "accessories", description: "Perfect touches", icon: "fas fa-watch", gradient: "from-orange-100 to-red-100" }
    ];

    categoryData.forEach(cat => {
      const category: Category = { 
        ...cat, 
        id: this.currentCategoryId++,
        description: cat.description || null
      };
      this.categories.set(category.id, category);
    });

    // Seed products
    const productData: InsertProduct[] = [
      {
        name: "Elegant Summer Dress",
        description: "A beautiful, flowing summer dress perfect for any occasion. Made from premium cotton blend with exceptional comfort and style.",
        price: "89.99",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        categoryId: 1,
        featured: true,
        badge: "New",
        rating: "5.0",
        reviewCount: 42,
        inStock: true
      },
      {
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.",
        price: "199.99",
        originalPrice: "249.99",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        categoryId: 2,
        featured: true,
        badge: "Sale",
        rating: "4.8",
        reviewCount: 128,
        inStock: true
      },
      {
        name: "Modern Table Lamp",
        description: "Sleek and modern table lamp that adds elegance to any room. Features adjustable brightness and contemporary design.",
        price: "75.00",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        categoryId: 3,
        featured: true,
        rating: "5.0",
        reviewCount: 67,
        inStock: true
      },
      {
        name: "Premium Sneakers",
        description: "Comfortable and stylish sneakers perfect for everyday wear. Premium materials and superior craftsmanship.",
        price: "129.99",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        categoryId: 1,
        featured: true,
        badge: "Best Seller",
        rating: "5.0",
        reviewCount: 203,
        inStock: true
      },
      {
        name: "Classic Denim Jacket",
        description: "Timeless denim jacket that never goes out of style. Perfect for layering and casual wear.",
        price: "69.99",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        categoryId: 1,
        rating: "4.2",
        reviewCount: 89,
        inStock: true
      },
      {
        name: "Smart Fitness Watch",
        description: "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone integration.",
        price: "299.99",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        categoryId: 2,
        badge: "Tech",
        rating: "5.0",
        reviewCount: 156,
        inStock: true
      },
      {
        name: "Ceramic Plant Pot",
        description: "Beautiful ceramic plant pot perfect for indoor plants. Elegant design that complements any decor.",
        price: "35.00",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        categoryId: 3,
        badge: "Eco",
        rating: "4.5",
        reviewCount: 34,
        inStock: true
      },
      {
        name: "Premium Leather Handbag",
        description: "Luxurious leather handbag with premium craftsmanship. Spacious interior and elegant design.",
        price: "189.99",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        categoryId: 4,
        badge: "Luxury",
        rating: "5.0",
        reviewCount: 78,
        inStock: true
      },
      {
        name: "Latest Smartphone",
        description: "Cutting-edge smartphone with advanced camera system and lightning-fast performance.",
        price: "699.99",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        categoryId: 2,
        badge: "Hot",
        rating: "4.7",
        reviewCount: 245,
        inStock: true
      },
      {
        name: "Abstract Wall Art",
        description: "Contemporary abstract wall art that adds personality to any space. High-quality print on premium canvas.",
        price: "120.00",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        categoryId: 3,
        rating: "5.0",
        reviewCount: 52,
        inStock: true
      },
      {
        name: "Wireless Bluetooth Speaker",
        description: "Portable wireless speaker with exceptional sound quality and long battery life.",
        price: "89.99",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        categoryId: 2,
        badge: "Audio",
        rating: "4.6",
        reviewCount: 93,
        inStock: true
      },
      {
        name: "Luxury Candle Set",
        description: "Premium scented candles in elegant glass holders. Perfect for creating a relaxing atmosphere.",
        price: "45.00",
        image: "https://images.unsplash.com/photo-1602874801006-52c45bf50e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        categoryId: 3,
        badge: "Aromatherapy",
        rating: "5.0",
        reviewCount: 27,
        inStock: true
      }
    ];

    productData.forEach(prod => {
      const product: Product = { 
        ...prod, 
        id: this.currentProductId++,
        categoryId: prod.categoryId || null,
        originalPrice: prod.originalPrice || null,
        featured: prod.featured || null,
        badge: prod.badge || null,
        rating: prod.rating || null,
        reviewCount: prod.reviewCount || null,
        inStock: prod.inStock || null
      };
      this.products.set(product.id, product);
    });
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getProducts(categoryId?: number, search?: string): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (categoryId) {
      products = products.filter(p => p.categoryId === categoryId);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    return products;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.featured);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    return items.map(item => ({
      ...item,
      product: this.products.get(item.productId)!
    }));
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.productId === insertCartItem.productId && item.sessionId === insertCartItem.sessionId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += insertCartItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    } else {
      // Create new cart item
      const id = this.currentCartItemId++;
      const cartItem: CartItem = { ...insertCartItem, id };
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem> {
    const item = this.cartItems.get(id);
    if (!item) {
      throw new Error("Cart item not found");
    }
    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToDelete = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    itemsToDelete.forEach(item => this.cartItems.delete(item.id));
  }

  async createOrder(insertOrder: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const orderId = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id: orderId,
      createdAt: new Date()
    };
    this.orders.set(orderId, order);

    // Create order items
    items.forEach(insertItem => {
      const itemId = this.currentOrderItemId++;
      const orderItem: OrderItem = { ...insertItem, id: itemId, orderId };
      this.orderItems.set(itemId, orderItem);
    });

    return order;
  }

  async getOrder(id: number): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const items = Array.from(this.orderItems.values())
      .filter(item => item.orderId === id)
      .map(item => ({
        ...item,
        product: this.products.get(item.productId)!
      }));

    return { ...order, items };
  }
}

export const storage = new MemStorage();
