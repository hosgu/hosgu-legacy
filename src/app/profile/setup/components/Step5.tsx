'use client'
import React, { FC } from 'react'
import Link from '~/app/components/Link'

const Step: FC = () => (
  <div className="flex flex-col justify-center items-center text-center w-full">
    <p className="mb-5">
      Su negocio ha sido registrado exitosamente.
      <br />
      Acceda al{' '}
      <Link href="/dashboard">
        <b>dashboard</b>
      </Link>{' '}
      para comenzar a utilizar la plataforma.
    </p>
  </div>
)

export default Step
