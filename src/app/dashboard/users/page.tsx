import { NextPage } from 'next'
import { cookies } from 'next/headers'

import { getConnectedUser } from '~/app/shared/services/users'
import { getAllUsersServerAction } from '~/app/shared/actions/dashboard/user'
import CustomTable from '~/app/dashboard/components/CustomTable/index'

const UsersPage: NextPage = async () => {
  const cookieStore = cookies()
  const connectedUser: any = await getConnectedUser(cookieStore.get('at')?.value || '')
  const {
    data: { items: users }
  } = await getAllUsersServerAction()

  const headerMapping = [
    {
      key: 'id',
      tableLabel: null
    },
    {
      key: 'fullName',
      tableLabel: 'Name',
      action: {
        type: 'link',
        href: `user/profile/`
      }
    },
    {
      key: 'tier',
      tableLabel: 'Tier'
    },
    {
      key: 'role',
      tableLabel: 'Role'
    },
    {
      key: 'email',
      tableLabel: 'Email'
    },
    {
      key: 'phone',
      tableLabel: 'Phone'
    },
    {
      key: 'website',
      tableLabel: 'Website'
    },
    {
      key: 'birthday',
      tableLabel: 'Birthday'
    }
  ]

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 flex-col">
      <CustomTable
        headerMapping={headerMapping}
        data={users}
        deleteServerAction={''}
        connectedUser={connectedUser}
        refetch={getAllUsersServerAction}
      />
    </div>
  )
}

export default UsersPage
