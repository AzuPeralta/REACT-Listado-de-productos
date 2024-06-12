import { useEffect, useState } from 'react'

export const ModalComercioComponente = ({ showModal, setShowModal, onUpdate, comercioId }) => {

    const initialFormData = {
        nombreComercio: '',
        direccion: '',
        comercioId: ''
    }

    const [formData, setFormData] = useState(initialFormData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            comercioId,
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

    useEffect(() => {
        if (showModal) setFormData(initialFormData)
    }, [showModal])

    return (
        <>
            {showModal && (
                <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modificar comercio {comercioId}</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre del comercio</label>
                                    <input type="text"
                                        className="form-control"
                                        id="nombreComercio"
                                        name="nombreComercio"
                                        value={formData.nombreComercio}
                                        onChange={handleChange}
                                        placeholder="Nuevo nombre del comercio" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="direccion" className="form-label">Dirección</label>
                                    <input type="text"
                                        className="form-control"
                                        id="direccion"
                                        name="direccion"
                                        value={formData.direccion}
                                        onChange={handleChange}
                                        placeholder="Nueva dirección" />
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
