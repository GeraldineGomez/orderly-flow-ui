import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Products = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Products page - Coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
};