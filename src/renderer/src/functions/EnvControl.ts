export default function EnvControl() {
  const url = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'not found'
  return url
}
