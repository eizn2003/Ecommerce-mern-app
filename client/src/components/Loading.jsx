import { useLocation } from "react-router-dom"
import { UseAppContext } from "../context/AppContext"
import { useEffect } from "react"

export const Loading = () => {
    const {navigate} = UseAppContext()
    let {search} = useLocation()
    const query = new URLSearchParams(search)
    const nextUrl = query.get('next')

    useEffect(() => {
        if(nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`)
            }, 5000)
        }
    }, [nextUrl])
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-green-800 border-t-red-700"></div>
        </div>
    )
}