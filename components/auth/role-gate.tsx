import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "@/components/form-error";
import { useEffect } from "react";
import { redirect } from 'next/navigation'

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
};

export const RoleGate = ({
  children,
  allowedRole,
}: RoleGateProps) => {
  const role = useCurrentRole();




    if ( role !== allowedRole) {
      redirect("/notadmin");
    }
    if ( role !== allowedRole) {
      return null
    }


  return (
    <>
      {children}
    </>
  );
};
