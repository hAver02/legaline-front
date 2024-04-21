import { useContext } from "react"
import Cookies from "js-cookie"
import { UserContext } from "../context/userContext"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { validateToken } from "../api/auth"



export function IsAuth() {
    const { isAuth, isLoading, idUser, setIdUser} = useContext(UserContext)
    const cookies = Cookies.get()
    if(!isAuth && !isLoading) return <Navigate to={'/login'} replace/>
    return <Outlet />
}





export function IsThereToken () {

    const {isAuth, setIsAuth, setIdUser} = useContext(UserContext)
    const navigate = useNavigate()

    async function checkToken (){
        if(isAuth) return <Navigate to={'/'} replace/>
        const cookies = Cookies.get()
        if(cookies?.token){
            const res = await validateToken(cookies.token)

            if (res.data.ok) {
                setIsAuth(true)
                setIdUser(res.data.id)
                navigate('/')
            }

        }
    }
    checkToken()
    return <Outlet />
}