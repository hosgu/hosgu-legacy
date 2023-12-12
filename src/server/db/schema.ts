import { customType } from 'drizzle-orm/pg-core'

export const customJsonb = <TData>(name: string) =>
  customType<{ data: TData; driverData: string }>({
    dataType() {
      return 'jsonb'
    },
    toDriver(value: TData): string {
      return JSON.stringify(value)
    }
  })(name)

type Note = {
  text: string
  createdAt: string
}

export type Notes = Note[]
