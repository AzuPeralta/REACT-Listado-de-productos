import { useState } from "react"

export const FormularioComponente = ({ addProducto }) => {
    const initialForm = {
        nombre: '',
        precio: ''
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

        const producto = {
            nombre: formState.nombre,
            precio: formState.precio
        }

        addProducto(producto)

        // Resetear el formulario
        setFormState(initialForm)
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre del producto</label>
                <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Ingresa el nombre del producto"
                    value={formState.nombre}
                    onChange={onInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="precio" className="form-label">Precio</label>
                <input
                    type="number"
                    className="form-control"
                    name="precio"
                    placeholder="Ingresa el precio de tu producto"
                    value={formState.precio}
                    onChange={onInputChange}
                />
            </div>

            <button type="submit" className="btn btn-primary">Agregar a la lista</button>
        </form>
    )
}