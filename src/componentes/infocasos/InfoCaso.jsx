import { useCaso } from "../../hooks/useCaso";
import { useContext, useState,} from "react";

import { InfoPersonal } from "./InfoPersonal";
import { InfoTrabajo } from "./InfoTrabajo"
import { InfoReco } from "./infoReco";
import { InfoClaves } from "./infoClaves";
import { InfoJuicio } from "./InfoJuicio";
import { useCasoTrabajo } from "../../hooks/useCasoTrabajo";



export function InfoCaso ({caso}) {

  const { claves,isEditing ,addClave, handleEditButtonClick, handleSaveButtonClick, handleInputChange, handleEditUser, handleEditing } = useCaso(caso);
  const [addWork, setAddWork] = useState(false);

  return (
      <section className="flex flex-col h-full gap-3 mr-5">
          
          <InfoPersonal handleInputChange={handleInputChange}/>
          
          <InfoReco handleInputChange={handleInputChange} />

          <InfoJuicio handleInputChange={handleInputChange} />

          <InfoTrabajo  handleEditUser = {handleEditUser} addWork={addWork} setAddWork={setAddWork} />

          {claves.length === 0 ? 
            !isEditing && !addWork && <button onClick={addClave} className='border-2 w-1/5 mx-3 my-2 border-pink-200 py-1 px-3 rounded-xl bg-zinc-400 text-black hover:text-green-300 hover:bg-black'>Agregar clave</button>
            : <InfoClaves claves={claves} addClave={addClave} handleEditUser={handleEditUser}/>
          }
            
          
          <div className="mx-3 pb-5">
              {isEditing 
                ? ( <div className="flex justify-around">
                      <button 
                        className='border-2 w-1/5 border-pink-200 py-1 px-3 rounded-xl bg-zinc-400 text-black hover:text-green-300 hover:bg-black' 
                        onClick={handleSaveButtonClick}>
                        Guardar 
                      </button> 
                      <button className="border-2 w-1/5 px-3 py-1 rounded-2xl bg-red-400 text-black hover:bg-red-500" onClick={handleEditing}>
                        Cancelar
                      </button>
                  </div>)
                : (addWork ? <div></div> :<button onClick={handleEditButtonClick} className='border-2 w-1/5 border-pink-200 py-1 px-3 rounded-xl bg-zinc-400 text-black hover:text-green-300 hover:bg-black'> 
                    Modificar usuario
                  </button>   )
              }
          </div>
        
      </section>
    );
  };
