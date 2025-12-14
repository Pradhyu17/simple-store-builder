import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Order, ShippingAddress } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrderConfirmation() {
  const { orderId } = useParams<{ orderId: string }>();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('id', orderId)
        .single();
      
      if (error) throw error;
      return data as unknown as Order;
    },
    enabled: !!orderId
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16 max-w-2xl">
          <div className="text-center space-y-4">
            <Skeleton className="h-20 w-20 rounded-full mx-auto" />
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const shippingAddress = order.shipping_address as ShippingAddress;

  return (
    <Layout>
      <div className="container py-16 max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-success/10 mb-6">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        <div className="border border-border rounded-xl bg-card p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Order Details</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <p className="text-muted-foreground">Order Number</p>
              <p className="font-medium">{order.id.slice(0, 8).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Order Date</p>
              <p className="font-medium">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium capitalize">{order.status}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total</p>
              <p className="font-medium">${order.total_amount.toFixed(2)}</p>
            </div>
          </div>

          {shippingAddress && (
            <div className="border-t pt-4">
              <p className="text-muted-foreground text-sm mb-2">Shipping Address</p>
              <p className="text-sm">
                {shippingAddress.firstName} {shippingAddress.lastName}<br />
                {shippingAddress.address}<br />
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                {shippingAddress.country}
              </p>
            </div>
          )}
        </div>

        {order.order_items && order.order_items.length > 0 && (
          <div className="border border-border rounded-xl bg-card p-6 mb-8">
            <h2 className="font-semibold mb-4">Items Ordered</h2>
            <div className="space-y-3">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.product_title} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.product_price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/orders" className="flex-1">
            <Button variant="outline" className="w-full">
              View All Orders
            </Button>
          </Link>
          <Link to="/products" className="flex-1">
            <Button className="w-full">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
