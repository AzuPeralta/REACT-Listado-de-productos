import React from 'react'
import { useContext } from "react"
import { FormularioComercioComponente } from "./components/FormularioComercioComponente"
import { ListadoComerciosComponente } from "./components/ListadoComerciosComponente"
import { ComercioContext } from './context/ComercioContext'

export const ListadoComercios = () => {

  const { comercios, isLoading, errors, addComercio, deleteComercio, updateComercio } = useContext(ComercioContext)

  return (
    <>
      <h1>Listado de Comercios</h1>
      <div>
        <FormularioComercioComponente addComercio={addComercio} />
        <hr />
        <ListadoComerciosComponente
          comercios={comercios}
          isLoading={isLoading}
          errors={errors}
          deleteComercio={deleteComercio}
          updateComercio={updateComercio}
        ></ListadoComerciosComponente>
      </div>
    </>
  )
}
