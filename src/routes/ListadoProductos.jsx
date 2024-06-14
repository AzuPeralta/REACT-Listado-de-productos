import React, { useState, useEffect, useContext } from 'react';
import { FormularioComponente } from './components/FormularioComponente';
import { ListadoComponente } from './components/ListadoComponente';
import { ComercioContext } from './context/ComercioContext';

export const ListadoProductos = () => {
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const { comercios, isLoading: comerciosLoading, errors: comerciosErrors } = useContext(ComercioContext);
    const fetchProductos = async () => {
        try {
            const response = await fetch('https://java-railwaw-crud-apirest-production.up.railway.app/productos');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const data = await response.json();
            setProductos(data);
            setIsLoading(false);
        } catch (error) {
            setErrors(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);


    const addProducto = async (producto) => {
        try {
            const response = await fetch('https://java-railwaw-crud-apirest-production.up.railway.app/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });
            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }
            const newProducto = await response.json();
            setProductos([...productos, newProducto]);
            return newProducto;
        } catch (error) {
            setErrors(error.message);
            return null;
        }
    };

    const addRelacion = async (idComercio, idProducto) => {
        try {
            const response = await fetch(`https://java-railwaw-crud-apirest-production.up.railway.app/comercio-producto/${idComercio}/productos/${idProducto}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error al agregar la relación');
            }
            console.log('Relación agregada correctamente');
        } catch (error) {
            setErrors(error.message);
        }

    };

    const deleteProducto = async (id) => {
        try {
            const response = await fetch(`https://java-railwaw-crud-apirest-production.up.railway.app/productos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }
            setProductos(productos.filter((producto) => producto.id !== id));
        } catch (error) {
            setErrors(error.message);
        }
    };

    const updateProducto = async (productoModificado) => {
        try {
            // Obtener el producto actual
            const productoActual = productos.find((producto) => producto.id === productoModificado.productoId);
    
            // Crear un nuevo objeto con los valores actualizados, manteniendo los originales si no se han modificado
            const productoActualizado = {
                ...productoActual,
                nombre: productoModificado.nombre || productoActual.nombre,
                precio: productoModificado.precio || productoActual.precio,
            }
    
            const response = await fetch(`https://java-railwaw-crud-apirest-production.up.railway.app/productos/${productoActualizado.productoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productoActualizado),
            })
            if (!response.ok) {
                throw new Error('Error al actualizar el producto')
            }
    
            const updatedProducto = await response.json()
            const updatedProductos = productos.map((producto) =>
                producto.id === updatedProducto.id ? updatedProducto : producto
            );
            setProductos(updatedProductos)
    
            // Actualizar la relación si el comercio ha cambiado
            if (productoModificado.idComercio && productoModificado.idComercio !== productoActual.idComercio) {
                await addRelacion(productoModificado.idComercio, updatedProducto.id)
            }
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
                    comercios={comercios}
                />
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
    );
};
