import { getItem } from '../../store/items'
import { useEffect, useRef, useState } from 'react'


const SaleLogic = () => {
     const [barcode, setBarcode] = useState('')
      const [message, setMessage] = useState('')
      const [cart, setCart] = useState([]) // { barcode, name, price, qty }
      const inputRef = useRef(null)
    
      useEffect(() => {
        // Many USB barcode scanners act as keyboards and end with Enter
        const handler = (e) => {
          if (e.key === 'Enter' && document.activeElement !== inputRef.current) {
            e.preventDefault()
            if (barcode) {
              addByBarcode(barcode)
              setBarcode('')
            }
          }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
      }, [barcode, cart])
    
      const addByBarcode = (code) => {
        const item = getItem(code)
        if (!item) {
          setMessage('Artículo no encontrado: ' + code)
          return
        }
        setCart((prev) => {
          const idx = prev.findIndex((p) => p.barcode === code)
          if (idx >= 0) {
            const copy = [...prev]
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 }
            return copy
          }
          return [...prev, { barcode: item.barcode, name: item.name, price: item.price, qty: 1 }]
        })
        setMessage('Agregado: ' + item.name)
      }
    
      const handleEnter = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          if (barcode) {
            addByBarcode(barcode)
            setBarcode('')
          }
        }
      }
    
      const increment = (code, delta) => {
        setCart((prev) => prev.map((p) => p.barcode === code ? { ...p, qty: Math.max(1, p.qty + delta) } : p))
      }
    
      const removeLine = (code) => {
        setCart((prev) => prev.filter((p) => p.barcode !== code))
      }
    
      const clearCart = () => {
        setCart([])
      }
    
      const total = cart.reduce((acc, p) => acc + p.price * p.qty, 0)

      return{
        barcode,
        setBarcode,
        message,
        setMessage,
        cart,
        setCart,
        inputRef,
        addByBarcode,
        handleEnter,
        increment,
        removeLine,
        clearCart,
        total,
      }
};

export default SaleLogic;