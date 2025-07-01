import { useEffect, useRef, useState } from 'react'
import {
  Uploader,
  UploadIcon,
  CheckStatus,
  type DefaultFile,
  type FileContext,
  type UploaderHandle
} from '../src'

function App() {
  const uploader = useRef<UploaderHandle>(null)
  const [defaultFileList, setDefaultFileList] = useState<DefaultFile[]>([])
  const onPreview = (file: FileContext) => {
    console.log('onPreview', file.name, file.url)
  }

  const onChange = (file: FileContext) => console.log('onChange', file.status)

  useEffect(() => {
    setTimeout(() => {
      setDefaultFileList([
        {
          id: 1,
          name: 'default.png',
          url: 'https://baidu.com'
        }
      ])
    }, 500)
  }, [])
  return (
    <>
      <Uploader
        ref={uploader}
        defaultFileList={defaultFileList}
        options={{
          drag: true,
          action: 'http://localhost:3000/file/upload',
          autoUpload: true,
          data: () => ({ name: 'tinyuploader' }),
          headers: {
            'XXX-X-Requested-With': 'XXX-XXXX-XXX'
          },
          async checkRequest(file: FileContext) {
            const params = new URLSearchParams({
              filename: file.name,
              hash: file.hash,
              status: CheckStatus.Part
            }).toString()
            const response = await fetch(`http://localhost:3000/file/check?${params}`)
            const { data } = await response.json()
            return data
          },
          async mergeRequest(file: FileContext) {
            const params = new URLSearchParams({
              filename: file.name,
              hash: file.hash
            }).toString()
            const response = await fetch(`http://localhost:3000/file/merge?${params}`)
            const { data } = await response.json()
            return data
          }
        }}
        onClick={onPreview}
        onChange={onChange}
        tipRender={() => (
          <div className="tiny-uploader-tip">Click or drag files to this area to upload.</div>
        )}
      >
        <UploadIcon size={64} style={{ transform: 'scale(0.65)' }} />
        <div className="tiny-uploader-drop_text">
          Drop file here or <em>click to upload</em>
        </div>
        <div className="tiny-uploader-drop_hint">Support for a single or bulk upload.</div>
      </Uploader>

      <br />

      <button
        onClick={() => {
          uploader.current?.submit()
        }}
      >
        Submit
      </button>

      <button
        onClick={() => {
          uploader.current?.clear()
        }}
      >
        Clear
      </button>
    </>
  )
}

export default App
