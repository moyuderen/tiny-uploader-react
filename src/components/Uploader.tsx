import { createContext, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import {
  create,
  Callbacks,
  type Uploader as Sdk,
  FileContext,
  type UserFile
} from '@tinyuploader/sdk'
import { Drop } from './Drop'
import { FileList } from './FileList'
import { defaults } from '../config'
import type { UploaderProps, UploaderHandle } from '../types'

export const SdkContext = createContext<null | Sdk>(null)

export const Uploader = forwardRef<UploaderHandle, UploaderProps>(
  (
    {
      options,
      defaultFileList,
      onClick,
      onChange,
      onExceed,
      onFileAdded,
      onFilesAdded,
      onRemoved,
      onProgress,
      onUploaded,
      onSuccess,
      onFail,
      onAllFilesSuccess
    }: UploaderProps,
    ref
  ) => {
    const finalOptions = Object.assign(defaults, options)
    const [sdk, setSdk] = useState<Sdk | null>(null)
    const [files, setFiles] = useState<FileContext[]>([])

    useEffect(() => {
      const sdkInstance = sdk || create(finalOptions)

      sdkInstance.on(Callbacks.FileChange, (file: FileContext, fileList: FileContext[]) => {
        const timer = setTimeout(() => {
          clearTimeout(timer)
          onChange?.(file, fileList)
          setFiles([...fileList])
        }, 0)
      })

      sdkInstance.on(Callbacks.Exceed, (selectedFiles: FileContext[], fileList: FileContext[]) =>
        onExceed?.(selectedFiles, fileList)
      )

      sdkInstance.on(Callbacks.FileAdded, (file: FileContext, fileList: FileContext[]) =>
        onFileAdded?.(file, fileList)
      )

      sdkInstance.on(Callbacks.FilesAdded, (fileList: FileContext[]) => onFilesAdded?.(fileList))

      sdkInstance.on(Callbacks.FileRemove, (file: FileContext, fileList: FileContext[]) =>
        onRemoved?.(file, fileList)
      )

      sdkInstance.on(Callbacks.FileProgress, (file: FileContext, fileList: FileContext[]) => {
        setFiles([...fileList])
        onProgress?.(file, fileList)
      })

      sdkInstance.on(Callbacks.FileUploadSuccess, (file: FileContext, fileList: FileContext[]) =>
        onUploaded?.(file, fileList)
      )

      const failCallbacks = [Callbacks.FileAddFail, Callbacks.FileUploadFail, Callbacks.FileFail]
      failCallbacks.forEach((callbackName) => {
        sdkInstance.on(callbackName, (file: FileContext, fileList: FileContext[]) => {
          onFail?.(file, fileList)
        })
      })

      sdkInstance.on(Callbacks.FileSuccess, (file: FileContext, fileList: FileContext[]) =>
        onSuccess?.(file, fileList)
      )

      sdkInstance.on(Callbacks.AllFileSuccess, (fileList: FileContext[]) =>
        onAllFilesSuccess?.(fileList)
      )

      setSdk(sdkInstance)
    }, [])

    useEffect(() => {
      if (sdk) {
        sdk.setDefaultFileList(defaultFileList as UserFile[])
      }
    }, [defaultFileList])

    useImperativeHandle(
      ref,
      () => ({
        clear() {
          sdk?.clear()
        },
        submit() {
          sdk?.submit()
        }
      }),
      [sdk]
    )

    return (
      <SdkContext.Provider value={sdk}>
        <div className="tiny-uploader-container">
          {finalOptions.drag ? <Drop /> : 'Click Upload'}
          <FileList fileList={files} onClick={(file) => onClick?.(file)} />
        </div>
      </SdkContext.Provider>
    )
  }
)
