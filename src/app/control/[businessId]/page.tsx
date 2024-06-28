import { FC } from 'react'

const Page: FC = async ({ params }: any) => {
  console.log('PARAMS===>', params)

  // Fetch to get Business Data

  // If business data is not found, return 404

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <div className="p-2 dark:text-white w-full">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">
          Business ID: {params.businessId}
        </h1>
      </div>
    </div>
  )
}

export default Page
