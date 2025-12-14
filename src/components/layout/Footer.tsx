import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-display font-bold">Storefront</h3>
            <p className="text-sm text-muted-foreground">
              Quality products for modern living. Shop with confidence.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Shop</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                All Products
              </Link>
              <Link to="/products?category=electronics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Electronics
              </Link>
              <Link to="/products?category=clothing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Clothing
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Account</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </Link>
              <Link to="/orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Order History
              </Link>
              <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cart
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <nav className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">help@storefront.com</span>
              <span className="text-sm text-muted-foreground">1-800-STORE</span>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Storefront. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
