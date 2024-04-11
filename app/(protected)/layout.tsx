import { Navbar } from "@/app/(protected)/_components/navbar2";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <main className=" flex flex-col">
    <Navbar />
    <div className="justify-center items-center mt-5 ">
      {children}
    </div>
  </main>
    
    );
}

export default ProtectedLayout;