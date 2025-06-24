import type { FileContext } from '@tinyuploader/sdk'
import { FileItem } from './FileItem'

type FileListProps = {
  fileList: FileContext[]
}
export const FileList = ({ fileList }: FileListProps) => {
  return (
    <div className="tiny-uploader-file-list">
      {fileList.map((file) => (
        <FileItem file={file} key={file.uid} />
      ))}
    </div>
  )
}
