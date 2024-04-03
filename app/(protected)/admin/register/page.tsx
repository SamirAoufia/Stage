"use client"

import { RegisterForm } from "@/components/auth/register-form";
import { RoleGate } from "@/components/auth/role-gate";





const RegisterPage = () => {
  return (
    <div className="flex justify-center">
    <RoleGate allowedRole="Admin">
      <RegisterForm />
    </RoleGate>
    </div>
  );
};

export default RegisterPage;

