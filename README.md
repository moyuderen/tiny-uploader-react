# Quick Start

## Install

```bash
npm i @tinyuploader/react
```

## Usage

Use class to create instance

```tsx
import { useEffect, useRef, useState } from 'react';
import { Uploader, type DefaultFile, type UploaderHandle } from '@tinyuploader/react'
import '@tinyuploader/react/style.css'

const BASE_URL = 'https://tiny-uploader-server.vercel.app/file';

function App() {
  const uploader = useRef<UploaderHandle>(null);
  const [defaultFileList, setDefaultFileList] = useState<DefaultFile[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setDefaultFileList([
        {
          id: 1,
          name: 'default.png',
          url: 'https://baidu.com',
        },
      ]);
    }, 500);
  }, []);
  return (
    <div className="uploader">
      <Uploader
        ref={uploader}
        defaultFileList={defaultFileList}
        options={{
          drag: true,
          action: `${BASE_URL}/upload`,
        }}
      ></Uploader>
    </div>
  );
}

export default App;
```

## [Documentation](https://moyuderen.github.io/tiny-uploader-react/en/)

## Example

- [Online Demo](https://stackblitz.com/edit/vitejs-vite-mwsxbxzg?file=src%2FApp.tsx)
