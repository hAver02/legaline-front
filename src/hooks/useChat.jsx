import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/chatContext";
import { UserContext } from "../context/userContext";
import { getChat } from "../api/auth";


export function useChat({currentChat}){

    const { usersChat, setMessages, setUserChat, setMessage, messages, messagesForChat} = useContext(ChatContext)
    const { user, idUser } = useContext(UserContext)

    const miembros = usersChat.map(user => (user.nombre)).join(', ')

    const chatContainerRef = useRef(null)
    useEffect(() => {
        if(!currentChat) return 
        const messags = messagesForChat[currentChat]
        if(!messags){
            setMessages([])
        }else{
            setMessages(messags)
        }

        const getChat1 = async () => {
            const rta = await getChat(currentChat);
            if(rta.data.ok){
                const otherUsers = rta.data.chat.users.filter(user => user._id != idUser)
                setUserChat(otherUsers.map(user =>( {nombre : user.nombre, id : user._id} )))
        } 

        }
        getChat1()
    
    }, [currentChat])

    const whoSent = (email) =>{
        if(!email) return true
        if(email === user.email) return true
        return false
    }
    useEffect(() => {
        if(!chatContainerRef.current) return 
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages])

    const changeValue = (e) => {
        setMessage(e.target.value)
    }
    // console.log(miembros);
    return {
        whoSent, miembros,chatContainerRef, changeValue
    }
}