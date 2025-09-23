const STORAGE_KEY = 'pos_items_v1'

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeAll(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

export function saveItem({ barcode, name, price }) {
  const map = readAll()
  const prev = map[barcode] || {}
  map[barcode] = {
    barcode,
    name,
    price,
    cantidad: prev.cantidad ?? 0,
    precioMayoreo: prev.precioMayoreo ?? null,
    ...prev,
    // Incoming values should override previous ones if provided
    ...(name !== undefined ? { name } : {}),
    ...(price !== undefined ? { price } : {}),
  }
  writeAll(map)
}

export function getItem(barcode) {
  const map = readAll()
  return map[barcode]
}

export function getAllItems() {
  const map = readAll()
  return Object.values(map)
}

export function upsertItem(fields) {
  const map = readAll()
  const prev = map[fields.barcode] || {}
  map[fields.barcode] = {
    cantidad: 0,
    precioMayoreo: null,
    ...prev,
    ...fields,
  }
  writeAll(map)
}
