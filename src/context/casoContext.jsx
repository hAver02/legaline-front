import { createContext, useState } from "react";


export const CasosContext = createContext()

export function CasosProvider ({ children }) {
    const [casos, setCasos] = useState([])
    const [infoCaso, setInfoCaso] = useState('')
    const [idCaso, setIdCaso] = useState([])
    
    const [datosCaso, setDatosCaso] = useState({})
    const [isEditing, setIsEditing] = useState(false)

    const deleteCaso = (idCase) => {
        if(casos.length == 0) return;

        const copyCasos = structuredClone(casos);
        const index = copyCasos.findIndex(caso => caso._id == idCase);
        if(index == -1) return;

        copyCasos.splice(index, 1);
        setCasos(copyCasos);
    }
    return (
        <CasosContext.Provider value={{casos, setCasos, infoCaso, setInfoCaso, idCaso, setIdCaso,
            datosCaso, setDatosCaso, isEditing, setIsEditing,deleteCaso
        }}>
            {children}
        </CasosContext.Provider>
    )
}