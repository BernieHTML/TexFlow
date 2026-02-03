'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700',
      glass: 'glass',
      gradient: 'bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-gray-700',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl shadow-sm',
          variants[variant],
          hover && 'card-hover cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
