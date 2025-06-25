import type { UploaderOptions as SdkOptions, UserFile, FileContext } from '@tinyuploader/sdk'

export type { SdkOptions, FileContext }

export type UploaderOptions = SdkOptions & {
  drag: boolean
}

export type Options = Partial<UploaderOptions>

export type DefaultFile = Pick<UserFile, 'name' | 'id' | 'url'>

export type UploaderProps = {
  /**
   * Options for the uploader SDK
   */
  options?: Options
  /**
   * Default file list to be displayed
   */
  defaultFileList?: DefaultFile[]
  /**
   * Callback when a file is clicked
   */
  onClick?: (file: FileContext) => void
  /**
   * Callbacks for various uploader events
   * @param file - The file that triggered the event
   * @param fileList - The current list of files
   */
  onChange?: (file: FileContext, fileList: FileContext[]) => void
  /**
   * Callback when the file limit is exceeded
   * @param selectedFiles - The files that were selected
   * @param fileList - The current file list
   */
  onExceed?: (slectedFiles: FileContext[], fileList: FileContext[]) => void
  /**
   * Callback when a file is added
   * @param file - The file that was added
   * @param fileList - The current list of files
   */
  onFileAdded?: (file: FileContext, fileList: FileContext[]) => void
  /**
   * Callback when all files are added
   * @param fileList - The list of files that were added
   */
  onFilesAdded?: (fileList: FileContext[]) => void
  /**
   * Callback when a file is removed
   * @param file - The file that was removed
   * @param fileList - The current list of files after removal
   */
  onRemoved?: (file: FileContext, fileList: FileContext[]) => void
  /**
   * Callbacks for file uploadingd events
   * @param file - The file being uploaded
   * @param fileList - The current list of files being uploaded
   * @param progress - The upload progress percentage (0-1)
   */
  onProgress?: (file: FileContext, fileList: FileContext[]) => void
  /**
   * Callback when a file is successfully uploaded
   * @param file - The file that was successfully uploaded
   * @param fileList - The current list of files after upload
   */
  onUploaded?: (file: FileContext, fileList: FileContext[]) => void
  /**
   * Callback when a file upload succeeds and megered
   */
  onSuccess?: (file: FileContext, fileList: FileContext[]) => void
  /**
   * Callback when a file upload fails
   * @param file - The file that failed to upload
   * @param fileList - The current list of files after failure
   */
  onFail?: (file: FileContext, fileList: FileContext[]) => void
  /**
   * Callback when all files are successfully uploaded
   * @param fileList - The list of all files that were successfully uploaded
   */
  onAllFilesSuccess?: (fileList: FileContext[]) => void
}

export type UploaderHandle = {
  submit: () => void
  clear: () => void
}