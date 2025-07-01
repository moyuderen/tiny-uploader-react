import type { FileContext } from '@tinyuploader/sdk'
import { FileItem } from './FileItem'

type FileListProps = {
  fileList: FileContext[]
  onClick: (file: FileContext) => void
}
export const FileList = ({ fileList, onClick }: FileListProps) => {
  return (
    <div className="tiny-uploader-file-list">
      {fileList.map((file) => (
        <FileItem file={file} key={file.uid} onClick={() => onClick(file)} />
      ))}
    </div>
  )
}
