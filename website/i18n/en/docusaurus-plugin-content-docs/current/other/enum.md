---
sidebar_position: 3
---

# Enums

## FileStatus {#file-status}

```typescript
enum FileStatus {
  /** File initialization state */
  Init = 'init',

  /** File addition failed; files that fail in beforeAdd are added to the list but marked as AddFail */
  AddFail = 'addFail',

  /** File being read (calculating hash) */
  Reading = 'reading',

  /** File hash calculation completed; ready to upload */
  Ready = 'ready',

  /** checkRequest exists and checkRequest fails */
  CheckFail = 'checkFail',

  /** File uploading */
  Uploading = 'uploading',

  /** File upload completed; all chunks uploaded, ready to merge file */
  UploadSuccess = 'uploadSuccess',

  /** File upload failed; some chunks failed to upload */
  UploadFail = 'uploadFail',

  /** File uploaded and merged successfully */
  Success = 'success',

  /** File merge failed */
  Fail = 'fail',

  /** File upload paused */
  Pause = 'pause',

  /** File upload resumed */
  Resume = 'resume'
}
```

## ChunkStatus {#chunk-status}

```typescript
enum ChunkStatus {
  /** Chunk initialization state is Ready */
  Ready = 'ready',

  /** Chunk request created successfully, Promise in Pending state */
  Pending = 'pending',

  /** Chunk uploading */
  Uploading = 'uploading',

  /** Chunk uploaded successfully */
  Success = 'success',

  /** Chunk upload failed (all retries exhausted) */
  Fail = 'fail'
}
```

## Callbacks {#callbacks}

```typescript
// Callback function names
enum Callbacks {
  /** File count exceeds limit */
  Exceed = 'exceed',

  /** Single file added successfully */
  FileAdded = 'fileAdded',

  /** File addition failed */
  FileAddFail = 'fileAddFail',

  /** All files added successfully */
  FilesAdded = 'filesAdded',

  /** File status changed */
  FileChange = 'fileChange',

  /** File removed */
  FileRemove = 'fileRemove',

  /** File hash calculation started */
  FileReadStart = 'fileReadStart',

  /** File hash calculation progress */
  FileReadProgress = 'fileReadProgress',

  /** File hash calculation completed */
  FileReadEnd = 'fileReadEnd',

  /** File hash calculation failed */
  FileReadFail = 'fileReadFail',

  /** File upload progress */
  FileProgress = 'fileProgress',

  /** File uploaded successfully */
  FileUploadSuccess = 'fileUploadSuccess',

  /** File upload failed */
  FileUploadFail = 'fileUploadFail',

  /** File merged successfully */
  FileSuccess = 'fileSuccess',

  /** File merge failed */
  FileFail = 'fileFail',

  /** All files uploaded successfully */
  AllFileSuccess = 'allFileSuccess'
}
```

## CheckStatus {#check-status}

```typescript
// Check file upload status
enum CheckStatus {
  /** File not yet uploaded */
  None = 'none',

  /**
   * 1. Partially uploaded successfully
   * 2. Returns indices of uploaded chunks
   */
  Part = 'part',

  /** Ready to merge, can proceed with merge operation */
  WaitMerge = 'waitMerge',

  /** Upload successful, returns file OBS address */
  Success = 'success'
}
```

## ProcessType {#process-type}

```typescript
// File upload process
enum ProcessType {
  /** From check API */
  Check = 'check',

  /** From upload API */
  Upload = 'upload',

  /** From merge API */
  Merge = 'merge'
}
```