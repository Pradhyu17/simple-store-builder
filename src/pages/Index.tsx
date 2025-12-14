import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

export default function Index() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .limit(4);
      
      if (error) throw error;
      return data as Product[];
    }
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background">
        <div className="container py-24 md:py-32">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight animate-fade-in">
              Shop the Best
              <span className="block text-primary">Quality Products</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Discover our curated collection of premium products. 
              From electronics to fashion, find everything you need.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/products">
                <Button variant="hero" size="lg">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/products?category=electronics">
                <Button variant="hero-outline" size="lg">
                  Browse Electronics
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-2/3 bg-primary/5 rounded-l-[100px] -z-10" />
      </section>

      {/* Features */}
      <section className="border-y border-border bg-card">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Checkout</h3>
                <p className="text-sm text-muted-foreground">100% protected payments</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold">Featured Products</h2>
            <Link to="/products">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <ProductGrid products={products} loading={isLoading} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container text-center">
          <h2 className="text-2xl md:text-4xl font-display font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-background/70 mb-8 max-w-md mx-auto">
            Create an account today and get exclusive access to deals and early releases.
          </p>
          <Link to="/auth">
            <Button variant="secondary" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
