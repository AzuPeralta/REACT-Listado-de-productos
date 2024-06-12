import React from 'react'
import { useState, useEffect } from "react"
import { FormularioComponente } from "./components/FormularioComponente"
import { ListadoComponente } from "./components/ListadoComponente"

export const ListadoProductos = () => {
    const [productos, setProductos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState(null)

    const fetchProductos = async () => {
        try {
            const response = await fetch('https://java-railwaw-crud-apirest-production.up.railway.app/productos')
            if (!response.ok) {
                throw new Error('Error al obtener los productos')
            }
            const data = await response.json()
            setProductos(data)
            setIsLoading(false)
        } catch (error) {
            setErrors(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProductos()
    }, [])

    const comercios = [{ "id": 1, "nombreComercio": "Compumundo", "direccion": "Calchaqui 3950", "comercioProductos": [{ "id": 4 }, { "id": 1 }] }, { "id": 2, "nombreComercio": "Fravega", "direccion": "Rivadavia 199", "comercioProductos": [{ "id": 2 }] }, { "id": 4, "nombreComercio": "Garbarino", "direccion": "Alem 119", "comercioProductos": [] }]

    const addProducto = async (producto) => {
        try {
            const response = await fetch('https://java-railwaw-crud-apirest-production.up.railway.app/productos', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })
            if (!response.ok) {
                throw new Error('Error al agregar el producto')
            }
            const newProducto = await response.json()
            setProductos([...productos, newProducto])
        } catch (error) {
            setErrors(error.message)
        }
    }

    const addRelacion = () => {
        console.log('Esto agregaria una relacion del producto y el comercio')
    }

    const deleteProducto = async (id) => {
        try {
            const response = await fetch(`https://java-railwaw-crud-apirest-production.up.railway.app/productos/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error('Error al eliminar el producto')
            }
            setProductos(productos.filter(producto => producto.id !== id))
        } catch (error) {
            setErrors(error.message)
        }
    }

    const updateProducto = async (productoModificado) => {

        try {
            const response = await fetch(`https://java-railwaw-crud-apirest-production.up.railway.app/productos/${productoModificado.productoId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productoModificado)
            })
            if (!response.ok) {
                throw new Error('Error al actualizar el producto')
            }
            const updatedProducto = await response.json()
            const updatedProductos = productos.map(producto => (producto.id === updatedProducto.id ? updatedProducto : producto));
            setProductos(updatedProductos);
        } catch (error) {
            setErrors(error.message)
        }
    }

    return (
        <>
            <h1>Listado de productos</h1>
            <div>
                <FormularioComponente
                    addProducto={addProducto}
                    addRelacion={addRelacion}
                    comercios={comercios} />
                <hr />
                <ListadoComponente
                    productos={productos}
                    isLoading={isLoading}
                    errors={errors}
                    deleteProducto={deleteProducto}
                    updateProducto={updateProducto}
                />
            </div>
        </>
    )
}
