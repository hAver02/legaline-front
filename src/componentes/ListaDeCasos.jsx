import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"
import { CasosContext } from "../context/casoContext"
import { useListaCasos } from "../hooks/useListaCasos"
import { ChatContext } from "../context/chatContext"

export function ListaDeCasos ({setCurrentChat, eliminarCaso, setIdCasoEliminar}) {

    const { setPageAlarmas, idUser } = useContext(UserContext);
    const { setInfoCaso, setIdCaso,} = useContext(CasosContext);
    const {setNombreChat} = useContext(ChatContext);
    
    const [ searchCaso, setSearchCaso ] = useState('');
    const[tipoCasoSearch, setTipoCasoSearch] = useState('administrativo');

    const { addCaso, isThereNoti, marcarLeido, filterCasos} = useListaCasos({searchCaso, tipoCasoSearch});
    
    

    return(
        <aside className="flex flex-col gap-5 justify-start px-5 flex-1 min-h-[85vh] h-full pt-5 relative rounded-md">
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
                        <li key={caso?.apellido} className="lista-casos px-2 flex items-center py-2 justify-evenly w-full border-2 cursor-pointer border-green-300 rounded-2xl hover:bg-gray-900">
                            <span onClick={(e) => {
                                setNombreChat(caso.apellido)
                                setPageAlarmas(false)
                                setCurrentChat(caso.chat)
                                setInfoCaso("")
                                setIdCaso([caso._id, caso.apellido])
                                marcarLeido(caso?.chat)
                            }} className="flex-1">
                                {caso.apellido}
                            </span>
                            <div className="flex gap-2 items-center ">
                                {isThereNoti(caso.chat) && <span className="h-4 w-4 rounded-full bg-green-400"></span>}
                                <button onClick={() => setInfoCaso(caso._id)} className='px-2 py-1 bg-gray-700 rounded-full'>
                                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                                <button className="px-2 py-1 bg-gray-700 rounded-full" onClick={(e) => {
                                setNombreChat(caso.apellido)
                                setPageAlarmas(false)
                                setCurrentChat(caso.chat)
                                setInfoCaso("")
                                setIdCaso([caso._id, caso.apellido])
                                marcarLeido(caso?.chat)
                            }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                </button>
                                { idUser == caso.creador &&
                                <button className="px-2 py-1 bg-gray-700 rounded-full" onClick={() => {
                                    eliminarCaso(true);
                                    setIdCasoEliminar([caso._id, caso.apellido]);
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                                }
                            </div>
                        </li>
                    )
                    )}
                </ul>
            </div>
        </aside>
    )
}


