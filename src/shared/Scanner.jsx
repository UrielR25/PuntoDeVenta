import { useEffect, useRef, useState } from 'react'

// NOTE: Do NOT use top-level await here because some build targets don't support it.
// We'll dynamically import inside start() when needed.

export default function Scanner({ onDetected, compact = false }) {
  const videoRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [error, setError] = useState('')
  const readerRef = useRef(null)
  const controlsRef = useRef(null)

  useEffect(() => {
    return () => {
      stop()
    }
  }, [])

  const start = async () => {
    try {
      setError('')
      // Dynamically import inside function scope to avoid top-level await
      const { BrowserMultiFormatReader } = await import('@zxing/browser')
      readerRef.current = new BrowserMultiFormatReader()
      const devices = await BrowserMultiFormatReader.listVideoInputDevices()
      const deviceId = devices?.[0]?.deviceId
      const controls = await readerRef.current.decodeFromVideoDevice(deviceId, videoRef.current, (result, err) => {
        if (result) {
          onDetected?.(result.getText())
        }
      })
      controlsRef.current = controls
      setEnabled(true)
    } catch (e) {
      setError(e?.message || 'Error iniciando cámara')
      stop()
    }
  }

  const stop = async () => {
    try {
      // Stop scanning loop via ZXing controls (preferred)
      controlsRef.current?.stop?.()
      controlsRef.current = null
      // Reset the reader
      await readerRef.current?.reset?.()
      readerRef.current = null
      // Stop all media tracks tied to the video element
      const stream = videoRef.current?.srcObject
      if (stream) {
        const tracks = stream.getTracks?.() || []
        for (const t of tracks) t.stop?.()
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null
        try { videoRef.current.pause?.() } catch {}
      }
    } catch {}
    setEnabled(false)
  }

  return (
    <div className={`scanner card${compact ? ' compact' : ''}`}>
      <div className="scanner-actions">
        {!enabled ? (
          <button className="outlined" onClick={start}> Iniciar cámara</button>
        ) : (
          <button className="outlined" onClick={stop}> Detener cámara</button>
        )}
      </div>
      {error && <p className="error">{error}</p>}
      <video ref={videoRef} className="preview" />
      <p className="hint">Si no usas cámara, puedes escanear con un lector USB o escribir el código.</p>
    </div>
  )
}
