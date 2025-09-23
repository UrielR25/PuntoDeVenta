import { upsertItem, getItem } from '../../store/items'
import { useState } from 'react'

const CreateItemLogic = () => {
 const [barcode, setBarcode] = useState('')
   const [name, setName] = useState('')
   const [price, setPrice] = useState('')
   const [cantidad, setCantidad] = useState('')
   const [precioMayoreo, setPrecioMayoreo] = useState('')
   const [message, setMessage] = useState('')
 
   const handleSubmit = (e) => {
     e.preventDefault()
     if (!barcode || !name || !price) {
       setMessage('Completa al menos: código, nombre y precio')
       return
     }
     const parsedPrice = Number(price)
     if (Number.isNaN(parsedPrice)) {
       setMessage('El precio debe ser un número')
       return
     }
     const parsedCantidad = cantidad === '' ? 0 : Number(cantidad)
     if (Number.isNaN(parsedCantidad) || parsedCantidad < 0) {
       setMessage('La cantidad debe ser un número mayor o igual a 0')
       return
     }
     const parsedMayoreo = precioMayoreo === '' ? null : Number(precioMayoreo)
     if (precioMayoreo !== '' && Number.isNaN(parsedMayoreo)) {
       setMessage('El precio de mayoreo debe ser un número')
       return
     }
 
     upsertItem({ barcode, name, price: parsedPrice, cantidad: parsedCantidad, precioMayoreo: parsedMayoreo })
     setMessage('Artículo guardado')
     setBarcode('')
     setName('')
     setPrice('')
     setCantidad('')
     setPrecioMayoreo('')
   }
 
   const handleCheck = () => {
     if (!barcode) return
     const item = getItem(barcode)
     if (item) {
       setName(item.name)
       setPrice(String(item.price))
       setCantidad(String(item.cantidad ?? ''))
       setPrecioMayoreo(item.precioMayoreo != null ? String(item.precioMayoreo) : '')
       setMessage('Artículo encontrado y cargado')
     } else {
       setMessage('No existe un artículo con ese código')
     }
   }
    

   return {
    handleCheck,
    handleSubmit,
    barcode,
    setBarcode,
    name,
    setName,
    price,
    setPrice,
    cantidad,
    setCantidad,
    precioMayoreo,
    setPrecioMayoreo,
    message,
    setMessage,
   }
};

export default CreateItemLogic;