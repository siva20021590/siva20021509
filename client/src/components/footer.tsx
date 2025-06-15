import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest deals, new arrivals, and exclusive offers delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
              required
            />
            <Button
              type="submit"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-bold text-primary mb-4">ModernMart</div>
              <p className="text-gray-300 mb-4">
                Your premier destination for quality products, exceptional service, and unbeatable prices.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  📘
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  🐦
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  📷
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  📺
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Press</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Blog</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Shipping Info</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Returns</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Size Guide</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Track Order</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-primary mr-3">📞</span>
                  <span className="text-gray-300">1-800-MODERN-1</span>
                </div>
                <div className="flex items-center">
                  <span className="text-primary mr-3">✉️</span>
                  <span className="text-gray-300">hello@modernmart.com</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-3 mt-1">📍</span>
                  <span className="text-gray-300">
                    123 Commerce St<br />
                    Suite 100<br />
                    New York, NY 10001
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 ModernMart. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
