import { useContext, useEffect, useMemo, useState } from "react"
import { CasosContext } from "../context/casoContext"
import { getNotisById } from "../api/auth"



export function useAlarmas (){
    const { casos } = useContext(CasosContext);
    const [alarmas, setAlarmas] = useState([]);
    const arrayCasosyAlarmas = casos.map(caso => ( {idAlarma : caso.alarmas, caso : caso.apellido} ) || []);
    const arrayCasos = arrayCasosyAlarmas.map(casoyAlarma => ( casoyAlarma.idAlarma));
    const idsCasos = [...arrayCasos.flat()]

    function getApellidoCaso(id){
        const index = arrayCasosyAlarmas.findIndex(con => con.idAlarma.includes(id))
        return arrayCasosyAlarmas[index]?.caso
    }

    useEffect(() => {
        async function getNotis (){
            if(casos.length == 0 || idsCasos.length == 0) return
                try {
                    const rta = await getNotisById(idsCasos);
                    if(rta.data.ok && !rta.data.notificaciones.length == 0){
                        setAlarmas(rta.data.notificaciones)        
                    }
                } catch (error) {
                    
                }
        }
        getNotis()
    }, [casos])





    return {getApellidoCaso, alarmas, setAlarmas}
}