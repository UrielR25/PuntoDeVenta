import Scanner from '../../shared/Scanner'
import CreateItemLogic from './CreateItem.logic'

export default function CreateItem() {
  const {handleSubmit, handleCheck, barcode, setBarcode, name, setName, price, setPrice, cantidad, setCantidad, precioMayoreo, setPrecioMayoreo, message, setMessage} = CreateItemLogic()

  return (
    <section>
      <h2>Crear / Editar Artículo</h2>
      <form onSubmit={handleSubmit} className="card md3">
        <div className="field-row">
          <div className="main-col">
            <div className="input-with-button">
              <label className="md3-field">
                <span className="label">Código de barras</span>
                <input
                  autoFocus
                  type="text"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder="Escanea o escribe"
                />
                <span className="supporting">Puedes usar lector USB o la cámara</span>
              </label>
              <button type="button" className="filled small" onClick={handleCheck}>Buscar</button>
            </div>
            
            <label className="md3-field">
              <span className="label">Nombre</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del artículo"
              />
            </label>

            <label className="md3-field">
            <span className="label">Precio</span>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                />
            </label>


            <label className="md3-field">
             <span className="label">Precio mayoreo (opcional)</span>
                <input
                  type="number"
                  step="0.01"
                  value={precioMayoreo}
                  onChange={(e) => setPrecioMayoreo(e.target.value)}
                  placeholder="0.00"
                />
            </label>

            <label className="md3-field">
              <span className="label">Cantidad en stock</span>
              <input
                type="number"
                step="1"
                min="0"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                placeholder="0"
              />
            </label>
          </div>
          
          <div className="actions-col">
            <Scanner onDetected={(code) => { setBarcode(code); setMessage('Código detectado con cámara'); }} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="filled">Guardar</button>
          <button type="button" className="outlined" onClick={() => { setBarcode(''); setName(''); setPrice(''); setCantidad(''); setPrecioMayoreo(''); setMessage('Formulario limpio') }}>Limpiar</button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </section>
  )
}
