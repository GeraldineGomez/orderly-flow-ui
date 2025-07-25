import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const UserManagement = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">User Management page - Admin only</p>
        </CardContent>
      </Card>
    </div>
  );
};