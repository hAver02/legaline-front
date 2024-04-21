import { useContext } from "react"
import { CasosContext } from "../../context/casoContext"
import { formatDateToYYYYMMDD} from '../../utils/formatear.Date'

export function InfoJuicio ({handleInputChange}) {
    const {datosCaso, isEditing, setDatosCaso} = useContext(CasosContext)
    if (datosCaso.tipo != "judicial") return 
    return (
        <div className="info-reco w-full flex items-center py-4 px-5 gap-10 my-2 rounded-3xl">
            <div>
                <label className="font-bold text-base text-white">AUTOS: </label>
                    {isEditing ? 
                        <input className="text-base border-2 border-gray-900 px-2 py-1 text-black rounded-xl" defaultValue={datosCaso.autos} type="text" name="autos" onChange={handleInputChange} />
                        : <span className="px-2 text-base">{datosCaso.autos}</span>
                    }
            </div>
            <div>
                <label className="font-bold text-base text-white">Juzgado</label>
                {isEditing ? 
                    <input className="text-base border-2 border-gray-900 px-2 py-1 text-black rounded-xl" defaultValue={datosCaso.juzgado} type="text" name="juzgado" onChange={handleInputChange} />
                    : <span className="px-2 text-base">{datosCaso.juzgado}</span>
                }
            </div>
            <div>
                <label className="font-bold text-base text-white">Fecha inicio</label>
                {isEditing ? 
                    <input className="text-base border-2 border-gray-900 px-2 py-1 text-black rounded-xl" defaultValue={datosCaso.fechaInicio ? datosCaso.fechaInicio.slice(0,10) : 0} type="date" name="fechaInicio" onChange={handleInputChange} />
                    : <span className="px-2 text-base">{datosCaso.fechaInicio ? formatDateToYYYYMMDD(datosCaso.fechaInicio) : 0}</span>
                }
            </div>
        </div>
    )
}