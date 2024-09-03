'use client';
import React, { ComponentType, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';

type WithRoleGuardProps = {
  allowedRoles: string[];
};

function withRoleComponentGuard<T extends object>(
  WrappedComponent: ComponentType<T>,
  allowedRoles: string[]
) {
  const WithRoleGuardComponent: React.FC<Omit<T, keyof WithRoleGuardProps>> = (props) => {
    const { role, fetchRoles } = useAuth();

    useEffect(() => {
      if (!role) {
        fetchRoles();
      }
    }, [role, fetchRoles]);

    if (!role) {
      return null; 
    }

    if (!allowedRoles.includes(role)) {
      return null; 
    }

    return <WrappedComponent {...(props as T)} />;
  };

  return WithRoleGuardComponent;
}

export default withRoleComponentGuard;
