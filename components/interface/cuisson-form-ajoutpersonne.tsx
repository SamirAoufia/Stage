import { CuissonFormAjoutPersonne } from "@/components/ajout/addcuisson";


const CuissonForm = () => {
  return (
    <main >
      <h1 className='text-center my-3 text-3xl md:text-4xl lg:text-5xl text-[#AB9D62] underline' >Ajout Cuisson</h1>
      <div className="flex justify-center mt-6">
      <CuissonFormAjoutPersonne/>
    </div>
    </main>
  );
}



export default CuissonForm