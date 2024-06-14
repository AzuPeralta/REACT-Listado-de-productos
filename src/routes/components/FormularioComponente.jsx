import { useState } from "react";

export const FormularioComponente = ({ addProducto, addRelacion, comercios }) => {
    const initialForm = {
        nombre: '',
        precio: '',
        nombreComercio: '',
        idComercio: ''
    };
    const [formState, setFormState] = useState(initialForm)

    const onInputChange = ({ target }) => {
        const { name, value } = target
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const onSelectChange = ({ target }) => {
        const selectedComercio = comercios.find(comercio => comercio.id === parseInt(target.value))
        if (selectedComercio) {
            setFormState({
                ...formState,
                nombreComercio: selectedComercio.nombreComercio,
                idComercio: selectedComercio.id
            })
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        const producto = {
            nombre: formState.nombre,
            precio: formState.precio,
            nombreComercio: formState.nombreComercio
        }

        const newProducto = await addProducto(producto)
        if (newProducto && formState.idComercio) {
            await addRelacion(formState.idComercio, newProducto.id)
        }

        // Resetear el formulario
        setFormState(initialForm);
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
            <div className="mb-3">
                <label htmlFor="options">Elegi el comercio donde se vende</label>
                <select
                    className="form-select"
                    value={formState.idComercio}
                    onChange={onSelectChange}
                    name="idComercio"
                >
                    <option value="" disabled>Selecciona uno</option>
                    {comercios.map(comercio => (
                        <option key={comercio.id} value={comercio.id}>
                            {comercio.nombreComercio}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Agregar a la lista</button>
        </form>
    )
}
