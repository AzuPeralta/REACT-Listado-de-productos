import { useState } from "react"

export const FormularioComercioComponente = ({ addComercio }) => {
    const initialForm = {
        nombreComercio: '',
        direccion: ''
    }
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value } = target
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const comercio = {
            nombreComercio: formState.nombreComercio,
            direccion: formState.direccion
        }

        addComercio(comercio)

        // Resetear el formulario
        setFormState(initialForm)
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="nombreComercio" className="form-label">Nombre del comercio</label>
                <input
                    type="text"
                    className="form-control"
                    name="nombreComercio"
                    placeholder="Ingresa el nombre del comercio"
                    value={formState.nombreComercio}
                    onChange={onInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Dirección</label>
                <input
                    type="text"
                    className="form-control"
                    name="direccion"
                    placeholder="Ingresa la direccion del comercio"
                    value={formState.direccion}
                    onChange={onInputChange}
                />
            </div>

            <button type="submit" className="btn btn-primary">Agregar a la lista</button>
        </form>
    )
}