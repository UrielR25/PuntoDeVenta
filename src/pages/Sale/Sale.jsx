import { useEffect, useRef, useState } from 'react'
import { getItem } from '../../store/items'
import Scanner from '../../shared/Scanner'
import SaleLogic from './Sale.logic'

export default function Sale() {
  
  const {barcode, setBarcode, message, setMessage, cart, setCart, inputRef, addByBarcode, handleEnter, increment, removeLine, clearCart, total} = SaleLogic()

  return (
    <section>
      <h2>Venta</h2>

      <div className="two-col">
        <div className="card md3">
          <label className="md3-field">
            <span className="label">Código de barras (escáner o teclado)</span>
            <input
              ref={inputRef}
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="Enfoca aquí y escanea / escribe"
            />
            <span className="supporting">Presiona Enter para agregar</span>
          </label>
          <div className="form-actions">
            <button className="filled" onClick={() => { if (barcode) { addByBarcode(barcode); setBarcode('') } }}>Agregar</button>
            <button className="outlined" onClick={() => setBarcode('')}>Limpiar</button>
          </div>
        </div>

        <div className="card md3">
          <Scanner compact onDetected={(code) => { setBarcode(code); addByBarcode(code); setBarcode('') }} />
        </div>
      </div>

      {message && <p className="message" style={{ marginTop: 8 }}>{message}</p>}

      <div className="card md3" style={{ marginTop: 16 }}>
        <h3 style={{ margin: 0 }}>Carrito</h3>
        {cart.length === 0 ? (
          <p className="message">Aún no hay productos</p>
        ) : (
          <div className="cart">
            <div className="cart-head">
              <span>Producto</span>
              <span>Código</span>
              <span>Precio</span>
              <span>Cantidad</span>
              <span>Importe</span>
              <span></span>
            </div>
            {cart.map((p) => (
              <div className="cart-row" key={p.barcode}>
                <span className="name">{p.name}</span>
                <span className="code">{p.barcode}</span>
                <span className="price">${p.price.toFixed(2)}</span>
                <span className="qty">
                  <button className="tonal" onClick={() => increment(p.barcode, -1)}>-</button>
                  <input type="number" min="1" value={p.qty} onChange={(e) => increment(p.barcode, Number(e.target.value) - p.qty)} />
                  <button className="tonal" onClick={() => increment(p.barcode, 1)}>+</button>
                </span>
                <span className="amount">${(p.price * p.qty).toFixed(2)}</span>
                <span className="actions"><button className="outlined" onClick={() => removeLine(p.barcode)}>Quitar</button></span>
              </div>
            ))}
          </div>
        )}

        <div className="checkout">
          <div className="total">Total: <strong>${total.toFixed(2)}</strong></div>
          <div className="form-actions">
            <button className="outlined" onClick={clearCart}>Vaciar</button>
            <button className="filled">Cobrar</button>
          </div>
        </div>
      </div>
    </section>
  )
}
