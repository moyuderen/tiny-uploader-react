import { useEffect, useState } from 'react'
import { create, type Uploader, type UploaderOptions } from '@tinyuploader/sdk'
export function useSdk(options: UploaderOptions) {
  const [sdk, setSdk] = useState<Uploader | null>(null)

  useEffect(() => {
    setSdk(create(options))
  }, [])

  return sdk
}
