// src/components/Permission.tsx
import React, { ReactNode } from 'react';
import { useAuth } from '../../modules/AuthContext';

interface PermissionProps {
  roles: string[];
  children: ReactNode;
}

const Permission: React.FC<PermissionProps> = ({ roles, children }) => {
  const { user } = useAuth();

  if (user && roles.some(role => user.roles.includes(role))) {
    return <>{children}</>;
  }

  return null;
};

export default Permission;
