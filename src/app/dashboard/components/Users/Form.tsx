'use client'
import React, { FC, useState } from 'react'
import core from '@architecturex/utils.core'

import { RenderIf } from '@architecturex/components.renderif'
import Notification from '~/components/Notification'
import Button from '~/components/Button'
import Input from '~/components/Input'

type Props = {
  action: 'save' | 'edit'
  data?: any
}

const Form: FC<Props> = ({
  data: {
    id = '',
    tier = '',
    role = '',
    email = '',
    password = '',
    fullName = '',
    phone = '',
    avatar = '',
    birthday = '',
    website = '',
    active = ''
  },
  action = 'save'
}) => {
  const initialValues = {
    id,
    tier,
    role,
    email,
    password,
    fullName,
    phone,
    avatar,
    birthday,
    website,
    active
  }
  const [showNotification, setNotification] = useState(false)
  const [errors, setErrors] = useState({
    tier: '',
    role: '',
    fullName: '',
    email: '',
    password: '',
    phone: '',
    avatar: '',
    birthday: '',
    website: ''
  })

  const validations = {
    tier: (value: string) => {
      if (!value) {
        return 'Please enter a tier'
      }
      if (value.length < 2) {
        return 'Please enter a valid tier'
      }
      return ''
    },
    role: (value: string) => {
      if (!value) {
        return 'Please enter a role'
      }
      if (value.length < 2) {
        return 'Please enter a valid role'
      }
      return ''
    },
    fullName: (value: string) => {
      if (!value) {
        return 'Please enter a fullname'
      }
      if (value.length < 2) {
        return 'Please enter a valid fullname'
      }
      return ''
    },
    email: (value: string) => {
      if (!value) {
        return 'Please enter a email'
      }
      if (value.length < 2) {
        return 'Please enter a valid email'
      }
      return ''
    },
    phone: (value: string) => {
      if (!value) {
        return 'Please enter a phone number'
      }
      if (value.length < 2) {
        return 'Please enter a valid phone number'
      }
      return ''
    },
    avatar: (value: string) => {
      if (!value) {
        return 'Please enter a avatar'
      }
      if (value.length < 2) {
        return 'Please enter a valid avatar'
      }
      return ''
    },
    birthday: (value: string) => {
      if (!value) {
        return 'Please enter a birthday'
      }
      if (value.length < 2) {
        return 'Please enter a valid birthday'
      }
      return ''
    },
    website: (value: string) => {
      if (!value) {
        return 'Please enter a website'
      }
      if (value.length < 2) {
        return 'Please enter a valid website'
      }
      return ''
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const values = core.formData.get(formData)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <RenderIf isTrue={showNotification}>
          <Notification
            message={action == 'save' ? 'Guest saved successfully' : 'Guest edited successfully'}
            type="success"
          />
        </RenderIf>

        <RenderIf isTrue={action === 'edit'}>
          <input type="hidden" name="id" value={initialValues.id} />
        </RenderIf>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              defaultValue={fullName}
              label="Full name"
              name="fullname"
              className={errors.fullName ? 'border-red-500 dark:border-red-500' : ''}
              required
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.fullName}</p>
          </div>
          <div>
            <Input
              defaultValue={tier}
              label="Tier"
              name="tier"
              className={errors.tier ? 'border-red-500 dark:border-red-500' : ''}
              required
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.tier}</p>
          </div>
          <div>
            <Input
              defaultValue={tier}
              label="Role"
              name="tole"
              className={errors.role ? 'border-red-500 dark:border-red-500' : ''}
              required
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.role}</p>
          </div>
          <div>
            <Input
              defaultValue={tier}
              label="Phone"
              name="phone"
              placeholder="+525534567890"
              className={errors.role ? 'border-red-500 dark:border-red-500' : ''}
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.role}</p>
          </div>
          <div>
            <Input
              defaultValue={avatar}
              label="Avatar"
              name="avatar"
              placeholder="https://"
              className={errors.avatar ? 'border-red-500 dark:border-red-500' : ''}
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.avatar}</p>
          </div>
          <div>
            <Input
              defaultValue={birthday}
              label="Birthday"
              name="birthday"
              placeholder="MM/DD/YYYY"
              className={errors.birthday ? 'border-red-500 dark:border-red-500' : ''}
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.birthday}</p>
          </div>
          <div>
            <Input
              defaultValue={website}
              label="Website"
              name="website"
              placeholder="https://"
              className={errors.website ? 'border-red-500 dark:border-red-500' : ''}
            />
            <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.website}</p>
          </div>
          <RenderIf isTrue={action === 'save'}>
            <div>
              <Input
                defaultValue={email}
                label="Email"
                name="email"
                className={errors.email ? 'border-red-500 dark:border-red-500' : ''}
                required
              />
              <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.role}</p>
            </div>
            <div>
              <Input
                defaultValue={password}
                label="Password"
                name="password"
                className={errors.password ? 'border-red-500 dark:border-red-500' : ''}
                required
              />
              <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.role}</p>
            </div>
          </RenderIf>
        </div>
        <div className="flex justify-center">
          <Button type="submit" color="secondary" shape="square" size="large" fullWidth>
            Save
          </Button>
        </div>
      </form>
    </>
  )
}

export default Form
