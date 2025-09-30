import { upsertItem, getItem } from '../../store/items'
import { useState } from 'react'

const CreateItemLogic = () => {
 const [barcode, setBarcode] = useState('')
   const [name, setName] = useState('')
   const [price, setPrice] = useState('')
   const [stock, setStock] = useState('')
   const [wholesalePrice, setWholesalePrice] = useState('')
   const [purchasePrice, setPurchasePrice] = useState('')
   const [department, setDepartment] = useState('Abarrotes')
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
     const parsedStock = stock === '' ? 0 : Number(stock)
     if (Number.isNaN(parsedStock) || parsedStock < 0) {
       setMessage('La cantidad debe ser un número mayor o igual a 0')
       return
     }
     const parsedWholesalePrice = wholesalePrice === '' ? null : Number(wholesalePrice)
     if (wholesalePrice !== '' && Number.isNaN(parsedWholesalePrice)) {
       setMessage('El precio de mayoreo debe ser un número')
       return
     }
     const parsedPurchasePrice = purchasePrice === '' ? null : Number(purchasePrice)
     if (purchasePrice !== '' && Number.isNaN(parsedPurchasePrice)) {
       setMessage('El precio de compra debe ser un número')
       return
     }
 
     upsertItem({ barcode, name, price: parsedPrice, stock: parsedStock, wholesalePrice: parsedWholesalePrice, purchasePrice: parsedPurchasePrice, department })
     setMessage('Artículo guardado')
     setBarcode('')
     setName('')
     setPrice('')
     setStock('')
     setWholesalePrice('')
     setPurchasePrice('')
     setDepartment('Abarrotes')
   }
 
   const handleCheck = () => {
     if (!barcode) return
     const item = getItem(barcode)
     if (item) {
       setName(item.name)
       setPrice(String(item.price))
       setStock(String(item.stock ?? ''))
       setWholesalePrice(item.wholesalePrice != null ? String(item.wholesalePrice) : '')
       setPurchasePrice(item.purchasePrice != null ? String(item.purchasePrice) : '')
       setDepartment(item.department || 'Abarrotes')
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
    stock,
    setStock,
    wholesalePrice,
    setWholesalePrice,
    purchasePrice,
    setPurchasePrice,
    department,
    setDepartment,
    message,
    setMessage,
   }
};

export default CreateItemLogic;