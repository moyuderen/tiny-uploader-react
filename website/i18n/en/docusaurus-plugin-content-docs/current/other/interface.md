---
sidebar_position: 2
---

# Interfaces

## UserFile {#user-file}

```typescript
type UserFile = {
  /** File ID */
  id: string | number;
  /** File name */
  name: string;
  /** File URL */
  url: string;
} & File;
```

## FileContext {#file-context}

```ts
type FileContext = {
    /** Uploader instance */
    uploader: Uploader;
    /** Uploader configuration options */
    options: UploaderOptions;
    /** Hash calculation method */
    hasher: Hashion;
    /** File ID */
    id?: string;
    /** Unique file ID */
    uid: string;
    /** File status */
    status: FileStatus | '';
    /** File status change history */
    prevStatusLastRecord: string[];
    /** File binary data */
    rawFile: File;
    /** File name */
    name: string;
    /** File size */
    size: number;
    /** File type */
    type: string;
    /** File hash value */
    hash: string;
    /** File HTTP URL */
    url: string;
    /** File upload progress */
    progress: number;
    /** Chunk size */
    chunkSize: number;
    /** Collection of chunks */
    chunks: Chunk[];
    /** Total number of chunks */
    totalChunks: number;
    /** Collection of uploading chunks */
    uploadingChunks: Set<Chunk>;
    /** File read progress (hash calculation progress) */
    readProgress: number;
    /** Error message */
    errorMessage: string;
    /** Custom file data */
    data: Record<string, any>;
    /** Abort read operation */
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
   * Input-related properties
   */
  /** Allowed file types for upload https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept */
  accept: string;
  /** Allow multiple file uploads https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple */
  multiple: boolean;
  /**
   * File-related properties
   */
  /** File list */
  fileList: UserFile[];
  /** Maximum upload limit */
  limit: number;
  /** Enable automatic upload */
  autoUpload: boolean;
  /** Custom UID generation method */
  customGenerateUid?: (file: FileContext) => string;
  /** Validation before adding a file */
  beforeAdd: BeforeAdd;
  /** Validation before removing a file */
  beforeRemove: BeforeRemove;
  /** Remove file on add failure */
  addFailToRemove: boolean;
  /** Chunk size */
  chunkSize: number;
  /** Fake progress bar */
  fakeProgress: boolean;
  /** Enable file hash calculation */
  withHash: boolean;
  /** Use Web Worker */
  useWebWoker: boolean;
  /**
   * Upload logic-related properties
   */
  /** Name of the file object received by the backend */
  name: string;
  /** Upload API endpoint */
  action: string;
  /** Custom request */
  customRequest: null;
  /** Include credentials like cookies or Authorization headers */
  withCredentials: boolean;
  /** Custom upload parameters */
  data: Record<string, any> | (() => Record<string, any>);
  /** Upload API headers */
  headers: Record<string, string> | (() => Record<string, string>);
  /** Logic to determine if the request is successful */
  requestSucceed: (xhr: any) => boolean;
  /** Maximum concurrent uploads */
  maxConcurrency: 6;
  /** Maximum retry attempts */
  maxRetries: 3;
  /** Retry interval (in milliseconds) */
  retryInterval: 1000;
  /** Check file upload status */
  checkRequest: CheckRequest;
  /** File merge request */
  mergeRequest: MergeRequest;
  /** Process custom data */
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

## RequestData {#request-data}

Default parameters for the upload API

```ts
type RequestData = {
  [name]: blob // Chunk binary data, name is the configured name, defaults to 'file'
  hash: string // File hash
  id: string // Chunk ID
  fileId: string // File ID
  index: number // Starts from 0
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
  /** HTTP method type */
  method?: 'POST' | 'GET' | 'PUT';
  /** Include credentials like cookies or Authorization headers */
  withCredentials?: boolean;
  /** Response data type */
  responseType?: 'json' | 'blob' | 'arraybuffer' | 'text' | '';
  /** Upload API endpoint */
  action: string;
  /** Custom upload parameters */
  data: Record<string, any>;
  /** Upload API headers */
  headers: Record<string, string>;
  /** Name for the file received by the backend */
  name: string;
  /** Custom data, including file-specific custom data */
  query: Record<string, any>;
  /** Success callback */
  onSuccess?: (e: any, request: any) => void;
  /** Failure callback */
  onFail?: (e: any, request: any) => void;
  /** Upload progress callback */
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
 * Check upload status request
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
 * Custom file merge request
 */
type MergeRequest = (
  file: FileContext,
  data: Record<string, any>,
  headers: Record<string, string>
) => Promise<MergeRequestResult> | MergeRequestResult
```