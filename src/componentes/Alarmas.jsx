
import {isPast, isToday, isTomorrow} from 'date-fns'
import { formatDateToYYYYMMDD } from "../utils/formatear.Date"
import { useAlarmas } from "../hooks/useAlarmas"
import { useMemo, useState } from 'react'
import { TableAlarmas } from './Alarmas/TableAlarmas'


export function Alarmas() { 
    const { alarmas, setAlarmas }= useAlarmas()
    const [tipoAlarma, setTipoAlarma] = useState("proximas");

    const alarmasProximas =  useMemo(() => {
        return alarmas.filter(alarm => !isPast(new Date(alarm.vencimiento)));
    },[alarmas])
    const alarmasVencidas =  useMemo(() => {
        return alarmas.filter(alarm => isPast(new Date(alarm.vencimiento)));
    },[alarmas])

    function deleteAlarma (id) {
        const copyAlarmas = structuredClone(alarmas);
        // console.log(copyAlarmas);
        const index = copyAlarmas.findIndex(alar => alar._id == id);
        if (index == -1) return;
        copyAlarmas.splice(index,1);
        console.log(copyAlarmas);
        setAlarmas(copyAlarmas);
        return;
    }
    return(
        <section className="flex flex-col gap-2 mr-4 h-full">
            <div className="px-3 text-center rounded-3xl bg-pink-200 py-5">
                <h1 className="text-gray-500 text-3xl font-semibold mb-5">Legal-Line Chat.</h1>
                <p className="text-black text-xl font-normal">Esta aplicación te permite centralizar casos legales, chats y cálculos.</p>
                <p className="text-black text-xl font-normal">Te simplifica la colaboración entre colegas abogados y optimiza tu práctica legal.</p>
            </div>
            <div className='flex w-full justify-center gap-4'>
                <button 
                    onClick={() => setTipoAlarma("proximas")} 
                    className={`w-1/5 px-2 py-1 border border-green-300 rounded-md ${tipoAlarma == "proximas" && 'bg-green-300 text-black font-semibold'}`}
                >
                    Proximas
                </button>
                <button 
                    onClick={() => setTipoAlarma("vencidas")} 
                    className={`w-1/5 px-2 py-1 border border-green-300 rounded-md ${tipoAlarma == "vencidas" && 'bg-green-300 text-black font-semibold'}`}
                >
                    Vencidas
                </button>
            </div>
            {/* <div className="body-alarmas h-full flex flex-col gap-4 items-center px-2">
                <h2 className="text-gray-400 text-3xl font-semibold mt-2">VENCIMIENTOS PROXIMOS DE ALARMAS</h2>
                <div className="container-alarmas flex flex-col gap-2 w-full">
                    {alarmasProximas.map(alarm => (
                        <div key={alarm._id} className="flex justify-around items-center border-2 border-pink-200 rounded-3xl ">
                            <div className="flex flex-col">
                                <label>Titulo: </label>
                                <p>{alarm.mensaje}</p>
                            </div>
                            <div className="alarma-item alarmas-caso"> 
                                <label>Caso:</label>
                                <p>{getApellidoCaso(alarm._id)}</p>
                            </div>
                            <div 
                                className={isToday(new Date(alarm.vencimiento)) || isTomorrow(new Date(alarm.vencimiento)) ? "alarma-item alarmas-vencimiento-pronto" : "alarma-item"}
                            >
                                <label>Vencimiento:</label>
                                <p>{formatDateToYYYYMMDD(alarm.vencimiento)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
            {tipoAlarma == "proximas" ? <TableAlarmas alarmas={alarmasProximas} deleteAlarma={deleteAlarma} /> : <TableAlarmas  deleteAlarma={deleteAlarma} alarmas={alarmasVencidas}/> }
        </section>
    )
}