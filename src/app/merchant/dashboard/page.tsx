'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Store, 
  Plus, 
  Package, 
  DollarSign, 
  Eye, 
  ShoppingCart,
  LogOut,
  Settings,
  BarChart3
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { formatPrice, formatDate } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  productType: string;
  price: number;
  currency: string;
  status: string;
  views: number;
  purchases: number;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  businessName?: string;
}

interface DashboardStats {
  totalProducts: number;
  liveProducts: number;
  totalViews: number;
  totalPurchases: number;
  totalRevenue: number;
}

export default function MerchantDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    liveProducts: 0,
    totalViews: 0,
    totalPurchases: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user
        const userRes = await fetch('/api/auth/me');
        if (!userRes.ok) {
          router.push('/merchant/login');
          return;
        }
        const userData = await userRes.json();
        setUser(userData.user);

        // Fetch products
        const productsRes = await fetch('/api/products');
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData.products || []);
          
          // Calculate stats
          const prods = productsData.products || [];
          setStats({
            totalProducts: prods.length,
            liveProducts: prods.filter((p: Product) => p.status === 'live').length,
            totalViews: prods.reduce((sum: number, p: Product) => sum + p.views, 0),
            totalPurchases: prods.reduce((sum: number, p: Product) => sum + p.purchases, 0),
            totalRevenue: prods.reduce((sum: number, p: Product) => sum + (p.purchases * p.price * 0.95), 0),
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Store className="w-8 h-8 text-primary-600" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">TexFlowMKT</span>
              </Link>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-gray-600 dark:text-gray-400">Merchant Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your products and track agent purchases
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.liveProducts}
                </div>
                <div className="text-sm text-gray-500">Live Products</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalViews}
                </div>
                <div className="text-sm text-gray-500">Total Views</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalPurchases}
                </div>
                <div className="text-sm text-gray-500">Purchases</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(stats.totalRevenue)}
                </div>
                <div className="text-sm text-gray-500">Revenue (95%)</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Products
            </h2>
            <Link href="/merchant/products/new">
              <Button variant="accent">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>

          {products.length === 0 ? (
            <Card className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No products yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your first product to start selling to AI agents
              </p>
              <Link href="/merchant/products/new">
                <Button variant="accent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Product
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id} hover className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{product.productType}</span>
                          <span>•</span>
                          <span>{formatPrice(product.price, product.currency)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.views}
                        </div>
                        <div className="text-xs text-gray-500">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.purchases}
                        </div>
                        <div className="text-xs text-gray-500">Sales</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'live' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {product.status}
                      </span>
                      <Link href={`/merchant/products/${product.id}`}>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
