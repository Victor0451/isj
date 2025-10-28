import { useState, useEffect, createContext } from 'react'
import useUser from '@/hook/useUser'
import jsCookies from 'js-cookie'

const WerchowContext = createContext()

const WerchowProvider = ({ children }) => {

    const [usu, guardarUsu] = useState(null)

    const datosUsu = () => {
        if (jsCookies.get('usuario')) {
            const usuario = jsCookies.get('usuario')
            guardarUsu(JSON.parse(usuario))
        }
    }

    useEffect(() => {

        datosUsu()

    }, [])

    return (
        <WerchowContext.Provider
            value={{
                usu
            }}
        >
            {children}
        </WerchowContext.Provider>
    )
}

export {
    WerchowProvider
}
export default WerchowContext