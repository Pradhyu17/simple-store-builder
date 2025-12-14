import { Link, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Package, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function Orders() {
  const { user, loading: authLoading } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user
  });

  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (isLoading || authLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <h1 className="text-3xl font-display font-bold mb-8">My Orders</h1>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-secondary mb-6">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-2">No orders yet</h1>
          <p className="text-muted-foreground mb-8">
            When you place an order, it will appear here.
          </p>
          <Link to="/products">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-display font-bold mb-8">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/order-confirmation/${order.id}`}
              className="block border border-border rounded-xl bg-card p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()} •{' '}
                    {order.order_items?.length || 0} items
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">${order.total_amount.toFixed(2)}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
