---
sidebar_position: 1
---

# 快速上手


## 安装

```bash
npm install @tinyuploader/react
```

## 使用

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

## 示例

- [Stackblitz示例](https://stackblitz.com/edit/vitejs-vite-mwsxbxzg?file=src%2FApp.tsx)

## [接口文档](https://moyuderen.github.io/tiny-uploader-server/en/)


