import { useContext, useState } from "react";
import { ModalComponente } from "./ModalComponente";
import { ModalConfirmarBorradoComponente } from "./ModalConfirmarBorradoComponente";
import { ComercioContext } from "../context/ComercioContext";

export const ListadoComponente = ({ productos, isLoading, errors, deleteProducto, updateProducto, comercios: comerciosProps }) => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Usar destructuring para asignar comercios del contexto
    const { comercios } = useContext(ComercioContext);

    const calcularTotal = () => {
        return productos.reduce((total, item) => total + parseFloat(item.precio), 0).toFixed(2);
    }

    // Ordenar productos por ID de manera ascendente
    const productosOrdenados = [...productos].sort((a, b) => a.id - b.id);

    const handleUpdateClick = (productoId) => {
        const productToUpdate = productos.find(producto => producto.id === productoId)
        setSelectedProduct(productToUpdate)
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

    const handleUpdate = (productoModificado) => {
        updateProducto(productoModificado)
        setShowModal(false)
    }

    return (
        <>
            <h3>Hasta ahora tenemos...</h3>
            <ModalComponente
                showModal={showModal}
                setShowModal={setShowModal}
                onUpdate={handleUpdate}
                productoId={selectedId}
                initialProductData={selectedProduct}
                comercios={comercios} // Pasar comercios como prop
            />

            <ModalConfirmarBorradoComponente
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={() => handleDeleteConfirm(selectedId)}
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
                        {productosOrdenados.map((producto) => (
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
