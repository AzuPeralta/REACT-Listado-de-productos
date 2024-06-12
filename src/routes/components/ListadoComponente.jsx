import { useState } from "react"
import { ModalComponente } from "./ModalComponente"
import { ModalConfirmarBorradoComponente } from "./ModalConfirmarBorradoComponente"

export const ListadoComponente = ({ productos, isLoading, errors, deleteProducto, updateProducto }) => {

    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedId, setSelectedId] = useState()

    const calcularTotal = () => {
        return productos.reduce((total, item) => total + item.precio, 0).toFixed(2)
    }

    // Ordenar productos por ID de manera ascendente
   const productosOrdenados = [...productos].sort((a, b) => a.id - b.id)


    const handleUpdateClick = (productoId) => {
        setSelectedId(productoId)
        setShowModal(true)
    }

    const handleDeleteClick = (productoId) => {
        setSelectedId(productoId)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = (productoId) => {
        deleteProducto(productoId)
        setShowDeleteModal(false)
    }

    return (
        <>
            <h3>Hasta ahora tenemos...</h3>
            <ModalComponente
                showModal={showModal}
                setShowModal={setShowModal}
                productoId={selectedId}
                onUpdate={updateProducto}
            />

            <ModalConfirmarBorradoComponente
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                productoId={selectedId}
            />
            {isLoading ? (
                <h4>Cargando...</h4>
            ) : errors ? (
                <p>Ha Ocurrido un error: {errors}</p>
            ) : (
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Se vende en</th>
                            <th scope="col">Acciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {productosOrdenados.map(producto => (
                            <tr key={producto.id}>
                                <th scope="row">{producto.id}</th>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.nombreComercio}</td>

                                <td>
                                    <button type="button" className="btn btn-warning btn-sm" onClick={() => handleUpdateClick(producto.id)}>Modificar</button>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(producto.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td colSpan="1" className="calcTotal">Total: </td>
                            <td className="calcTotal">{calcularTotal()}</td>
                            <td></td>
                            <td></td>


                        </tr>
                    </tfoot>
                </table>
            )}
        </>
    )
}
