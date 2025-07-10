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

## FileContext {#file-context}

```ts
type FileContext = {
    /** uploader实例 */
    uploader: Uploader;
    /** uploader配置项 */
    options: UploaderOptions;
    /** 计算hash的方法 */
    hasher: Hashion;
    /** 文件ID */
    id?: string;
    /** 文件唯一ID */
    uid: string;
    /** 文件状态 */
    status: FileStatus | '';
    /** 文件状态变更记录 */
    prevStatusLastRecord: string[];
    /** 文件二进制 */
    rawFile: File;
    /** 文件名称 */
    name: string;
    /** 文件大小 */
    size: number;
    /** 文件类型 */
    type: string;
    /** 文件hash值 */
    hash: string;
    /** 文件http地址 */
    url: string;
    /** 文件上传进度 */
    progress: number;
    /** 分片大小 */
    chunkSize: number;
    /** 分块chunk集合 */
    chunks: Chunk[];
    /** 分片总数 */
    totalChunks: number;
    /** 上传中chunk集合 */
    uploadingChunks: Set<Chunk>;
    /** 文件读取进度（hash计算进度） */
    readProgress: number;
    /** 错误信息 */
    errorMessage: string;
    /** 文件自定义data */
    data: Record<string, any>;
    /** abortRead */
    abortRead: any;
    constructor(file: File, uploader: Uploader, defaults: UserFile | null);
    generateId(): string;
    setErrorMessage(message: string): this;
    setData(data: Record<string, any>): this;
    get renderSize(): string;
    changeStatus(newStatus: FileStatus): void;
    isInit(): boolean;
    isAddFail(): boolean;
    isReading(): boolean;
    isReady(): boolean;
    isCheckFail(): boolean;
    isUploading(): boolean;
    isUploadSuccess(): boolean;
    isUploadFail(): boolean;
    isSuccess(): boolean;
    isFail(): boolean;
    isPause(): boolean;
    isResume(): boolean;
    createChunks(): void;
    read(): Promise<void>;
    _computeHash(): Promise<Required<HashCallbackData>>;
    _processData(processType: ProcessType): {
        [x: string]: any;
    };
    checkRequest(): Promise<void>;
    addUploadingChunk(chunk: Chunk): void;
    removeUploadingChunk(chunk: Chunk): void;
    upload(): Promise<void>;
    setProgress(): void;
    uploadFail(): void;
    uploadSuccess(): void;
    merge(): Promise<void>;
    mergeFail(): void;
    success(): void;
    _continueUpload(): void;
    cancel(): void;
    remove(): Promise<void>;
    pause(): void;
    resume(): void;
    retry(): void;
}
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


## RequestResult

```ts
type RequestResult = {
    abort: () => void;
    canceled?: boolean;
};

```
## RequestData 上传接口默认参数

```ts
type RequestData = {
  [name]: blob // chunk二进制数据， name是配置中的名称，默认是file
  hash: string // 文件hash
  id: string // chunk id
  fileId: string // file id
  index: number // 从0开始
  filename: string
  size: number
  totalSize: number
  totalChunks: number
}
```

## Request {#request}

```ts
function request(options: RequestOptions): RequestResult

type RequestOptions = {
  /** http method类型 */
  method?: 'POST' | 'GET' | 'PUT';
  /** 是否该使用类似 cookie、Authorization 标头 */
  withCredentials?: boolean;
  /** 响应的数据类型 */
  responseType?: 'json' | 'blob' | 'arraybuffer' | 'text' | '';
  /** 上传接口endpoint */
  action: string;
  /** 自定义上传参数 */
  data: Record<string, any>;
  /** 上传接口headers */
  headers: Record<string, string>;
  /** 文后端接收文件name */
  name: string;
  /** 自定义data 包括file上自定义的data */
  query: Record<string, any>;
  /** 响应成功回调 */
  onSuccess?: (e: any, request: any) => void;
  /** 响应失败回调 */
  onFail?: (e: any, request: any) => void;
  /** 上传进度回调 */
  onProgress?: (e: ProgressEvent) => void;
};

type RequestResult = {
    abort: () => void;
    canceled?: boolean;
};

```

## CheckRequest {#check-request}
```ts
type CheckRequestResult = {
  status: CheckStatus
  data?: any
}

/**
 * 校验上传状态请求
 */
type CheckRequest = (
  file: FileContext,
  data: Record<string, any>,
  headers: Record<string, string>
) => Promise<CheckRequestResult> | CheckRequestResult
```
## MergeRequest {#merge-request}

```ts
type MergeRequestResult = boolean | string
/**
 * 文件合并自定义接口
 */
type MergeRequest = (
  file: FileContext,
  data: Record<string, any>,
  headers: Record<string, string>
) => Promise<MergeRequestResult> | MergeRequestResult

```

