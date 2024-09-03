'use client';
import React, { useEffect, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

type WithAuthProps = {
    requiredRoles?: string[];
};

function withAuth<T extends WithAuthProps>(
    WrappedComponent: ComponentType<T>,
    requiredRoles: string[] = []
) {
    const WithAuthComponent: React.FC<Omit<T, keyof WithAuthProps>> = (props) => {
        const { role, fetchRoles } = useAuth();
        const router = useRouter();
        
        useEffect(() => {
            if (!role) {
                console.log("Roles not fetched yet, fetching...");
                fetchRoles();
            } else {
                const hasRequiredRoles = requiredRoles.includes(role);

                if (!hasRequiredRoles) {
                    router.push("/unauthorized");
                }
            }
        }, [role, fetchRoles, router, requiredRoles]);

        if (!role) {
            return <p>Loading...</p>;
        }

        return <WrappedComponent {...(props as T)} requiredRoles={requiredRoles} />;
    };

    return WithAuthComponent;
}

export default withAuth;
