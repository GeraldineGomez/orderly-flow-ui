import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormErrors {
  orderDate?: string;
  product?: string;
  quantity?: string;
  comments?: string;
}

export const AddNewOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderDate: '',
    product: '',
    quantity: '',
    comments: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const products = [
    'Laptop Dell XPS 13',
    'Laptop HP Pavilion',
    'Monitor 24"',
    'Monitor 27"',
    'Office Chair',
    'Desk Lamp',
    'Keyboard',
    'Mouse',
    'Webcam',
    'Headphones'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate order date
    if (!formData.orderDate) {
      newErrors.orderDate = 'Order date is required';
    } else {
      const selectedDate = new Date(formData.orderDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.orderDate = 'Order date must be today or in the future';
      }
    }

    // Validate product
    if (!formData.product) {
      newErrors.product = 'Product is required';
    }

    // Validate quantity
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else {
      const qty = parseInt(formData.quantity);
      if (isNaN(qty) || qty < 1) {
        newErrors.quantity = 'Quantity must be a positive integer';
      }
    }

    // Validate comments
    if (formData.comments.length > 1000) {
      newErrors.comments = 'Comments must be 1000 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Order saved:', formData);
      navigate('/my-orders');
    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/my-orders');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Add New Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order Date */}
            <div className="space-y-2">
              <Label htmlFor="orderDate">Order Date *</Label>
              <Input
                id="orderDate"
                type="date"
                value={formData.orderDate}
                onChange={(e) => setFormData(prev => ({ ...prev, orderDate: e.target.value }))}
                className={`h-10 px-3 ${errors.orderDate ? 'border-destructive' : ''}`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.orderDate && (
                <span className="text-destructive text-sm">{errors.orderDate}</span>
              )}
            </div>

            {/* Product */}
            <div className="space-y-2">
              <Label htmlFor="product">Product *</Label>
              <Select 
                value={formData.product} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, product: value }))}
              >
                <SelectTrigger className={`h-10 ${errors.product ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.product && (
                <span className="text-destructive text-sm">{errors.product}</span>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                className={`h-10 px-3 ${errors.quantity ? 'border-destructive' : ''}`}
                placeholder="Enter quantity"
              />
              {errors.quantity && (
                <span className="text-destructive text-sm">{errors.quantity}</span>
              )}
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments">
                Comments
                <span className="text-muted-foreground ml-1">
                  ({formData.comments.length}/1000)
                </span>
              </Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                className={`min-h-24 px-3 py-2 resize-y ${errors.comments ? 'border-destructive' : ''}`}
                placeholder="Enter any additional comments (optional)"
                maxLength={1000}
              />
              {errors.comments && (
                <span className="text-destructive text-sm">{errors.comments}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                variant="success" 
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Saving...' : 'Save Order'}
              </Button>
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleCancel}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};