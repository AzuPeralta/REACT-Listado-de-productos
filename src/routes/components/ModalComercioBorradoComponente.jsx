import React from 'react'

export const ModalComercioBorradoComponente = ({ show, onHide, onConfirm, comercioId }) => {

    if(!show) return null;


  return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmar eliminación</h5>
                    </div>
                    <div className="modal-body">
                        <p>¿Estás seguro de que quieres eliminar este comercio?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={() => onConfirm(comercioId)}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

