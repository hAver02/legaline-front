
import { Chat } from '../componentes/chat/Chat'
import { ListaDeCasos } from '../componentes/ListaDeCasos'
import { Alarmas } from '../componentes/Alarmas'
import  { InfoCaso } from '../componentes/infocasos/InfoCaso'
import { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'

import { CasosContext } from '../context/casoContext'
import { useAuthValidation } from '../hooks/useAuthValidation'
import { deleteCase } from '../api/auth'


export function Main () {
    const { pageAlarmas }  = useContext(UserContext);
    const {infoCaso, deleteCaso} = useContext(CasosContext);
    const [currentChat, setCurrentChat] = useState('')
    useAuthValidation();
    const [eliminarCaso, setEliminarCaso ] = useState(false);
    const [idCasoEliminar, setIdCasoEliminar] = useState([]);

    // console.log(infoCaso);
    return (
      <div className={`flex flex-col h-[85vh] relative`}>
        <section className={`main flex justify-between gap-3 h-full ${eliminarCaso && "opacity-70"}`}>
            <ListaDeCasos setCurrentChat={setCurrentChat} eliminarCaso={setEliminarCaso} setIdCasoEliminar={setIdCasoEliminar} />
            <div className='section-derecha flex-2 items-center h-full overflow-y-auto pt-5'>
                {infoCaso && <InfoCaso caso={infoCaso} /> || (pageAlarmas ? <Alarmas /> : <Chat currentChat={currentChat}/>) }
            </div>
        </section>
        {eliminarCaso && 
          <div className="h-1/4  w-1/4 border-2 absolute z-10 bottom-1/2 right-1/3 rounded-lg bg-gray-300 flex flex-col gap-2 justify-between ">
              <span className='text-center text-lg text-red-500 font-bold mt-2' >Estas seguro de eliminar el caso {idCasoEliminar[1]}?</span>
              
              <div className='flex justify-center gap-5 mb-4'>
                <button onClick={() => setEliminarCaso(false)} className='border-2 border-black px-2 py-1 rounded-md hover:bg-gray-800 hover:text-red-500 hover:font-semibold'>Cancelar</button>
                <button onClick={async () => {

                  const data = await deleteCase(idCasoEliminar[0])
                  console.log(data);
                  if(data.data.ok){
                    deleteCaso(idCasoEliminar[0]);
                  }
                  setEliminarCaso(false);

                }} className='border-2 border-black px-2 py-1 rounded-md  hover:bg-gray-800 hover:text-red-500 hover:font-semibold'>Eliminar</button>
              </div> 
          </div>
          
}
      </div>
  )
}