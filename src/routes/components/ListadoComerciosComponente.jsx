import { useState } from "react"
import { ModalComercioComponente } from "./ModalComercioComponente"
import { ModalComercioBorradoComponente } from "./ModalComercioBorradoComponente"

export const ListadoComerciosComponente = ({ comercios, isLoading, errors, deleteComercio, updateComercio }) => {

    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedId, setSelectedId] = useState()

    // Ordenar productos por ID de manera ascendente
    const comerciosOrdenados = [...comercios].sort((a, b) => a.id - b.id)


    const handleUpdateClick = (comercioId) => {
        setSelectedId(comercioId)
        setShowModal(true)
    }

    const handleDeleteClick = (comercioId) => {
        setSelectedId(comercioId)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = (comercioId) => {
        deleteComercio(comercioId)
        setShowDeleteModal(false)
    }

    return (
        <>
            <h3>Estos son los comercios registrados:</h3>
            <ModalComercioComponente
                showModal={showModal}
                setShowModal={setShowModal}
                comercioId={selectedId}
                onUpdate={updateComercio}
            />

            <ModalComercioBorradoComponente
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                comercioId={selectedId}
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
                            <th scope="col">Direccion</th>
                            <th scope="col">Acciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {comerciosOrdenados.map(comercio => (
                            <tr key={comercio.id}>
                                <th scope="row">{comercio.id}</th>
                                <td>{comercio.nombreComercio}</td>
                                <td>{comercio.direccion}</td>

                                <td>
                                    <button type="button" className="btn btn-warning btn-sm" onClick={() => handleUpdateClick(comercio.id)}>Modificar</button>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(comercio.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
