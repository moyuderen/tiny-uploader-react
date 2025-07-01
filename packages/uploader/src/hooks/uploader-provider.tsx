import { createContext, useContext, useState, type PropsWithChildren } from 'react'

import { type Uploader } from '@tinyuploader/sdk'

type UploaderProviderState = {
  sdk: null | Uploader
  setUploader: (sdk: Uploader) => void
}

const initialState: UploaderProviderState = {
  sdk: null,
  setUploader: () => null
}

export const UploaderContext = createContext<UploaderProviderState>(initialState)

export function UploaderProvider({ children }: PropsWithChildren) {
  const [sdk, setSdk] = useState<Uploader | null>(null)

  const value = {
    sdk,
    setUploader: (sdk: Uploader) => setSdk(sdk)
  }

  return <UploaderContext.Provider value={value}>{children}</UploaderContext.Provider>
}

export const useUploader = () => {
  const context = useContext(UploaderContext)
  return context
}
