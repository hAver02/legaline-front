import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"
import { CasosContext } from "../context/casoContext"
import { useListaCasos } from "../hooks/useListaCasos"
import { ChatContext } from "../context/chatContext"

export function ListaDeCasos ({setCurrentChat}) {

    const { setPageAlarmas } = useContext(UserContext);
    const { setInfoCaso, setIdCaso} = useContext(CasosContext);
    const {setNombreChat} = useContext(ChatContext);
    
    const [ searchCaso, setSearchCaso ] = useState('');
    const[tipoCasoSearch, setTipoCasoSearch] = useState('administrativo');

    const { addCaso, isThereNoti, marcarLeido, filterCasos} = useListaCasos({searchCaso, tipoCasoSearch});
    
    

    return(
        <aside className="flex flex-col gap-5 justify-start px-5 flex-1 min-h-[85vh] h-full pt-5">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col items-center justify-between rounded-xl border-2 border-green-300 gap-3 p-1">
                    <div className="flex-1  flex justify-center w-full gap-1 ">
                        <input className=" border-2 border-gray-900 text-black rounded-xl w-full py-1 px-2" type='text' placeholder="Busque un caso" onChange={(e) => setSearchCaso(e.target.value)}/>  
                        <svg  onClick={addCaso} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 border-2  cursor-pointer border-gray-900 bg-zinc-400 rounded-xl text-black hover:text-green-300 hover:bg-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </div>
                    <div className="w-full flex justify-evenly gap-1" >
                        <button onClick={() => setTipoCasoSearch('administrativo')} className={`${tipoCasoSearch =='administrativo' ? 'bg-green-300 text-black' : ''} border w-full rounded-lg text-lg`}>Administrativo</button>
                        <button onClick={() => setTipoCasoSearch('judicial')} className={`${tipoCasoSearch =='judicial' ? 'bg-green-300 text-black' : ''} border w-full rounded-lg text-lg`}>Judicial</button>
                    </div>
                    {/* <button onClick={addCaso} className="border-2 border-gray-900 py-1 px-3 rounded-xl bg-zinc-400 text-black hover:text-green-300 hover:bg-black hover:border-green-300 ">Crear caso</button> */}
                </div>   
            </div>
            <div className="h-full overflow-y-auto">
                {/* VER SI HAY CASOS. */}
                <ul className="flex flex-col gap-1 list-none">
                    {filterCasos.map(caso => (
                        <li key={caso?.apellido} className="lista-casos flex items-center py-2 justify-around w-full border-2 cursor-pointer border-green-300 rounded-2xl hover:bg-gray-900">
                            <span onClick={(e) => {
                                setNombreChat(caso.apellido)
                                setPageAlarmas(false)
                                setCurrentChat(caso.chat)
                                setInfoCaso("")
                                setIdCaso([caso._id, caso.apellido])
                                marcarLeido(caso?.chat)
                            }}>
                                {caso.apellido}
                            </span>
                            <div className="flex items-center gap-2">

                                {isThereNoti(caso.chat) && <span className="h-4 w-4 rounded-full bg-green-400"></span>}
                                <button onClick={() => setInfoCaso(caso._id)} className='px-2 py-1 bg-gray-700 rounded-full'>
                                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    )
                    )}
                </ul>
            </div>
        </aside>
    )
}


