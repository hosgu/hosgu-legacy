'use server'
import { revalidateTag, revalidatePath } from 'next/cache'
import core from '@architecturex/utils.core'

export const revalidateCacheByTag = async (e: FormData): Promise<any> => {
  const { tag } = core.formData.get(e)

  await revalidateTag(tag)
}
