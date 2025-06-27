import { useEffect, useState, forwardRef, useImperativeHandle, type PropsWithChildren } from 'react'
import { create, Callbacks, FileContext, type UserFile } from '@tinyuploader/sdk'
import { Drop } from './Drop'
import { Trigger } from './Trigger'
import { FileList } from './FileList'
import { defaults } from '../config'
import type { UploaderProps, UploaderHandle } from '../types'
import { UploaderProvider, useUploader } from '../hooks/uploader-provider'

export const Uploader = forwardRef<UploaderHandle, PropsWithChildren<UploaderProps>>(
  (props, ref) => {
    const {
      children,
      tipRender,
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
    } = props
    const { sdk, setUploader } = useUploader()
    const finalOptions = Object.assign(defaults, options)
    const [files, setFiles] = useState<FileContext[]>([])

    useEffect(() => {
      setUploader(create(finalOptions))
    }, [])

    useEffect(() => {
      if (!sdk) return

      sdk.on(Callbacks.FileChange, (file: FileContext, fileList: FileContext[]) => {
        const timer = setTimeout(() => {
          clearTimeout(timer)
          onChange?.(file, fileList)
          setFiles([...fileList])
        }, 0)
      })

      sdk.on(Callbacks.Exceed, (selectedFiles: FileContext[], fileList: FileContext[]) =>
        onExceed?.(selectedFiles, fileList)
      )

      sdk.on(Callbacks.FileAdded, (file: FileContext, fileList: FileContext[]) =>
        onFileAdded?.(file, fileList)
      )

      sdk.on(Callbacks.FilesAdded, (fileList: FileContext[]) => onFilesAdded?.(fileList))

      sdk.on(Callbacks.FileRemove, (file: FileContext, fileList: FileContext[]) =>
        onRemoved?.(file, fileList)
      )

      sdk.on(Callbacks.FileProgress, (file: FileContext, fileList: FileContext[]) => {
        setFiles([...fileList])
        onProgress?.(file, fileList)
      })

      sdk.on(Callbacks.FileUploadSuccess, (file: FileContext, fileList: FileContext[]) =>
        onUploaded?.(file, fileList)
      )

      const failCallbacks = [Callbacks.FileAddFail, Callbacks.FileUploadFail, Callbacks.FileFail]
      failCallbacks.forEach((callbackName) => {
        sdk.on(callbackName, (file: FileContext, fileList: FileContext[]) => {
          onFail?.(file, fileList)
        })
      })

      sdk.on(Callbacks.FileSuccess, (file: FileContext, fileList: FileContext[]) =>
        onSuccess?.(file, fileList)
      )

      sdk.on(Callbacks.AllFileSuccess, (fileList: FileContext[]) => onAllFilesSuccess?.(fileList))

      if (defaultFileList && defaultFileList.length > 0) {
        sdk.setDefaultFileList(defaultFileList as UserFile[])
      }
    }, [sdk])

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
      <div className="tiny-uploader-container">
        {finalOptions.drag ? <Drop>{children}</Drop> : <Trigger>{children}</Trigger>}
        {tipRender?.()}
        <FileList fileList={files} onClick={(file) => onClick?.(file)} />
      </div>
    )
  }
)

export default ({ ...props }) => {
  return (
    <UploaderProvider>
      <Uploader {...props} />
    </UploaderProvider>
  )
}
