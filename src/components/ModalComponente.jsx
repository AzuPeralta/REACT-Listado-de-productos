import { useState } from 'react'

export const ModalComponente = ({ showModal, setShowModal, onUpdate, productoId }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        productoId: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            productoId,
            [name]: value
        })
    }

    const handleUpdate = () => {
        onUpdate(formData)
        setShowModal(false)
    }

    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modificar producto {productoId}</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre del producto</label>
                                    <input type="text"
                                        className="form-control"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        placeholder="Nuevo nombre del producto" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="precio" className="form-label">Precio</label>
                                    <input type="number"
                                        className="form-control"
                                        id="precio"
                                        name="precio"
                                        value={formData.precio}
                                        onChange={handleChange}
                                        placeholder="Nuevo precio" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
