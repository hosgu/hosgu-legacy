import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800">Not Found</h2>
      <p className="text-gray-600">Could not find requested resource</p>
      <Link href="/" className="mt-4 text-blue-600 hover:underline">
        Return Home
      </Link>
    </div>
  )
}

export default NotFound
