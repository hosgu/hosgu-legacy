import { FC } from 'react'
import Button from '~/components/Button'

const Page: FC = async () => {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-6 dark:text-white">
        <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">Sandbox</h1>

        <Button color="success" size="small" shape="circle" fullWidth>
          Button
        </Button>
      </div>
    </div>
  )
}

export default Page
