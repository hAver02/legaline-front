import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import Cookies from "js-cookie"
import { validateToken } from "../api/auth"
import { CasosContext } from "../context/casoContext"

export function useAuthValidation (){
    const {idUser, refresh, setRefresh,setIsAuth, setIdUser, setUser, setIsLoading, isAuth} = useContext(UserContext)
    // console.log(idUser);
    const { setCasos } = useContext(CasosContext)
    const baseUrl = import.meta.env.VITE_BASE_URL || "https://srv471383.hstgr.cloud:3000/";
    useEffect(() => {
        if(idUser == "") return 
        fetch(`${baseUrl}user/${idUser}`, {credentials : "include"})
        .then(res => res.json())
        .then(data => {
            if(!data.ok) return // Mostrar algun tipo de error.
            setUser(data.user)
            setCasos(data.user.casos)
            if(refresh) setRefresh(false)
        })
        .catch(err => console.log(err))
    }, [idUser, refresh])   

    useEffect(() => {
        async function checkToken (){
            if(isAuth && idUser) return setIsLoading(false)
            setIsLoading(true)

            const cookies = Cookies.get()
            // console.log(cookies);
            if(cookies?.token){
                const res = await validateToken(cookies.token)

                if (res.data.ok) {
                    setIdUser(res.data.id)
                    setIsAuth(true)
                }
            } 
            setIsLoading(false)
        }

        checkToken()

    },[refresh])
    

    return 
}
