---
sidebar_position: 2
---

# 类型接口

## UserFile {#user-file}

```typescript
type UserFile = {
  /** 文件id */
  id: string | number;
  /** 文件名 */
  name: string;
  /** 文件url */
  url: string;
} & File;
```

## UploaderOptions {#uploader-options}

```typescript
type UploaderOptions = {
  drag: boolean,
  /**
   * input 属性相关
   */
  /** 允许文件上传类型 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/accept*/
  accept: string;
  /** 是否允许上传多个文件 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/multiple */
  multiple: boolean;
  /**
   * 文件相关
   */
  /** 文件列表 */
  fileList: UserFile[];
  /** 最大上传数 */
  limit: number;
  /** 是否自动上传 */
  autoUpload: boolean;
  /** 自定义uid计算方法 */
  customGenerateUid?: (file: FileContext) => string;
  /** 添加文件之前校验 */
  beforeAdd: BeforeAdd;
  /** 删除文件之前校验 */
  beforeRemove: BeforeRemove;
  /** 添加失败时是否删除文件 */
  addFailToRemove: boolean;
  /** 分片大小 */
  chunkSize: number;
  /** fake进度条 */
  fakeProgress: boolean;
  /** 是都计算文件hash */
  withHash: boolean;
  /** 是否使用 Web Worker */
  useWebWoker: boolean;
  /**
   * 上传逻辑相关
   */
  /** 后端接收文件对象名称 */
  name: string;
  /** 上传接口 endPoint */
  action: string;
  /** */
  customRequest: null;
  /** 是否该使用类似 cookie、Authorization 标头 */
  withCredentials: boolean;
  /** 自定义上传参数 */
  data: Record<string, any> | (() => Record<string, any>);
  /** 上传接口headers */
  headers: Record<string, string> | (() => Record<string, string>);
  /** 接口是否成功逻辑 */
  requestSucceed: (xhr: any) => boolean;
  /** 最大并发数量 */
  maxConcurrency: 6;
  /** 最大重试次数 */
  maxRetries: 3;
  /** 重试间隔（单位ms）*/
  retryInterval: 1000;
  /** 校验文件上传状态 */
  checkRequest: CheckRequest;
  /** 文件merge请求 */
  mergeRequest: MergeRequest;
  /** 用户设置自定义data */
  processData: <T>(data: T, processType: ProcessType) => T;
}
```