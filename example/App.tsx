import { useEffect, useState } from 'react'
import { Uploader, type DefaultFile } from '../src'

function App() {
  const [defaultFileList, setDefaultFileList] = useState<DefaultFile[]>([])

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
          action: 'http://localhost:3000/file/upload'
        }}
      />
    </>
  )
}

export default App
