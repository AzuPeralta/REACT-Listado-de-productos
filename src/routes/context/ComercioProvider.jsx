import React from 'react'
import { useState, useEffect } from 'react'
import { ComercioContext } from './ComercioContext'

export const ComercioProvider = ({ children }) => {
    const [comercios, setComercios] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState(null)

    const fetchComercios = async () => {
        try {
            const response = await fetch('https://java-railwaw-crud-apirest-production.up.railway.app/comercios');
            if (!response.ok) {
                throw new Error('Error al obtener los comercios')
            }
            const data = await response.json()
            setComercios(data)
            setIsLoading(false)
        } catch (error) {
            setErrors(error.message)
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchComercios()
    }, [])

    const addComercio = async (comercio) => {
        try {
            const response = await fetch('https://java-railwaw-crud-apirest-production.up.railway.app/comercios', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comercio)
            });
            if (!response.ok) {
                throw new Error('Error al agregar el comercio')
            }
            const newComercio = await response.json()
            setComercios(prevComercios => [...prevComercios, newComercio])
        } catch (error) {
            setErrors(error.message)
        }
    }

    const deleteComercio = async (id) => {
        try {
            const response = await fetch(`https://java-railwaw-crud-apirest-production.up.railway.app/comercios/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error('Error al eliminar el comercio')
            }
            setComercios(comercios.filter(comercio => comercio.id !== id))
        } catch (error) {
            setErrors(error.message)
        }
    }

    const updateComercio = async (comercioModificado) => {

        try {
            const response = await fetch(`https://java-railwaw-crud-apirest-production.up.railway.app/comercios/${comercioModificado.comercioId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comercioModificado)
            })
            if (!response.ok) {
                throw new Error('Error al actualizar el comercio')
            }
            const updatedComercio = await response.json()
            const updatedComercios = comercios.map(comercio => (comercio.id === updatedComercio.id ? updatedComercio : comercio));
            setComercios(updatedComercios);
        } catch (error) {
            setErrors(error.message)
        }
    }



    return (
        <ComercioContext.Provider value={{ comercios, isLoading, errors, addComercio, deleteComercio, updateComercio }}>
            {children}
        </ComercioContext.Provider>
    );
}
