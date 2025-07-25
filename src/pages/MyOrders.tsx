import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus } from 'lucide-react';

interface Order {
  id: number;
  date: string;
  product: string;
  quantity: number;
  comments: string;
}

export const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      date: '2024-01-15',
      product: 'Laptop Dell XPS 13',
      quantity: 2,
      comments: 'Urgent delivery required'
    },
    {
      id: 2,
      date: '2024-01-10',
      product: 'Office Chair',
      quantity: 5,
      comments: 'For new office setup'
    },
    {
      id: 3,
      date: '2024-01-05',
      product: 'Monitor 24"',
      quantity: 3,
      comments: 'Development team requirements'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);

  useEffect(() => {
    const filtered = orders.filter(order =>
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.comments.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm)
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">My Orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders by ID, product, or comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          {/* Orders Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell className="max-w-xs truncate">{order.comments}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Add New Order Button */}
          <div className="flex justify-end">
            <Link to="/add-order">
              <Button variant="success" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Order
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};