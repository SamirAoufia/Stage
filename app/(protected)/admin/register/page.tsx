"use client"

import { RegisterForm } from "@/components/auth/register-form";
import { RoleGate } from "@/components/auth/role-gate";





const RegisterPage = () => {
  return (
    <RoleGate allowedRole="Admin">
      <RegisterForm />
    </RoleGate>
  );
};

export default RegisterPage;

