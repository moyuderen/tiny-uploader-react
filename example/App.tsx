import { useEffect, useState } from 'react'
import { Uploader, type DefaultFile, type FileContext } from '../src'

function App() {
  const [defaultFileList, setDefaultFileList] = useState<DefaultFile[]>([])
  const onPreview = (file: FileContext) => {
    console.log('onPreview', file.name, file.url)
  }

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
        defaultFileList={defaultFileList}
        options={{
          action: 'http://localhost:3000/file/upload',
          async mergeRequest(file) {
            const params = new URLSearchParams({
              filename: file.name,
              hash: file.hash
            }).toString()
            const response = await fetch(`http://localhost:3000/file/merge?${params}`)
            return response.json()
          }
        }}
        onClick={onPreview}
      />
    </>
  )
}

export default App
