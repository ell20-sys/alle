import { Link } from "@remix-run/react"

export default function Notfound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <span className="py-6 px-12 bg-blue-600 text-white rounded-full transition-transform duration-300 ease-in-out transform hover:scale-105">
            Go Back Home
        </span>
      </Link>
    </div>
  )
}




