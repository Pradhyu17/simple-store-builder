import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link 
      to={`/products/${product.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl bg-secondary/50 aspect-square mb-4">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
        
        <Button
          variant="default"
          size="icon"
          className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>

        {product.stock === 0 && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded">
            Out of Stock
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-lg font-semibold text-foreground">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
