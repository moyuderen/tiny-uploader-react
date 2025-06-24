import { createContext, useEffect, useState } from 'react'
import { Callbacks, type Uploader, FileContext, type UserFile } from '@tinyuploader/sdk'
import { Drop } from './Drop'
import { FileList } from './FileList'
import { defaultUploaderProps } from '../config'
import { useSdk } from '../hooks/useSdk'
import type { UserOptions, DefaultFile } from '../types'

export const SdkContext = createContext<null | Uploader>(null)

type UploaderReactProps = {
  options?: UserOptions
  defaultFileList?: DefaultFile[]
  onClick?: (file: FileContext) => void
  onChange?: (file: FileContext, fileList: FileContext[]) => void
  onExceed?: (slectedFiles: FileContext[], fileList: FileContext[]) => void
  onFileAdded?: (file: FileContext, fileList: FileContext[]) => void
  onFilesAdded?: (fileList: FileContext[]) => void
  onRemoved?: (file: FileContext, fileList: FileContext[]) => void
  onProgress?: (file: FileContext, fileList: FileContext[]) => void
  onUploaded?: (file: FileContext, fileList: FileContext[]) => void
  onSuccess?: (file: FileContext, fileList: FileContext[]) => void
  onFail?: (file: FileContext, fileList: FileContext[]) => void
  onAllFilesSuccess?: (fileList: FileContext[]) => void
}

export const UploaderReact = ({ options, defaultFileList, onClick }: UploaderReactProps) => {
  const finalOptions = Object.assign(defaultUploaderProps, options)
  const sdk = useSdk(finalOptions)
  const [files, setFiles] = useState<FileContext[]>([])

  useEffect(() => {
    sdk?.on(Callbacks.FileChange, (_file: FileContext, fileList: FileContext[]) => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        setFiles([...fileList])
      }, 0)
    })

    sdk?.on(Callbacks.FileProgress, (_file: FileContext, fileList: FileContext[]) => {
      setFiles([...fileList])
    })
  }, [sdk])

  useEffect(() => {
    if (sdk) {
      sdk.setDefaultFileList(defaultFileList as UserFile[])
    }
  }, [defaultFileList])

  return (
    <SdkContext.Provider value={sdk}>
      <div className="tiny-uploader-container">
        {finalOptions.drag ? <Drop /> : 'Click Upload'}
        <FileList fileList={files} onClick={(file) => onClick?.(file)} />
      </div>
    </SdkContext.Provider>
  )
}
