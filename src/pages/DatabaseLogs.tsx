import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DatabaseLogs = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Database Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Database Logs page - Admin only</p>
        </CardContent>
      </Card>
    </div>
  );
};