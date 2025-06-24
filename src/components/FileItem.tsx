import { useEffect, useState, useContext, type PropsWithChildren } from 'react'
import { clsx } from 'clsx'
import { FileStatus, type FileContext } from '@tinyuploader/sdk'
import { SdkContext } from './Uploader'
import FileIcon from '../icons/FileIcon'
import LoadingIcon from '../icons/LoadingIcon'
import SuccessIcon from '../icons/SuccessIcon'
import PauseIcon from '../icons/PauseIcon'
import PlayIcon from '../icons/PlayIcon'
import RemoveIcon from '../icons/RemoveIcon'
import RetryIcon from '../icons/RetryIcon'

type FileItem = {
  file: FileContext
  onClick: (file: FileContext) => void
}

export const FileItem = (props: PropsWithChildren<FileItem>) => {
  const { file, onClick } = props
  const [progressWidth, setProgressWidth] = useState<string>('0%')
  const sdk = useContext(SdkContext)
  const parseProgress = (progress: number) => {
    return (progress * 100).toFixed(2)
  }

  const pause = (file: FileContext) => sdk?.pause(file)
  const resume = (file: FileContext) => sdk?.resume(file)
  const retry = (file: FileContext) => sdk?.retry(file)
  const remove = (file: FileContext) => sdk?.remove(file)

  useEffect(() => {
    setProgressWidth(`${parseProgress(file.progress)}%`)
  }, [file.progress])

  return (
    <div className="tiny-uploader-file" data-status={file.status} data-id={file.id}>
      <div className="tiny-uploader-info-wrap">
        <FileIcon size={16} />
        <div
          className="tiny-uploader-filename-container"
          title={'file.name'}
          onClick={() => onClick(file)}
        >
          <div
            className={clsx({
              'tiny-uploader-filename': true,
              'tiny-uploader-name-fail':
                file.status === FileStatus.AddFail ||
                file.status === FileStatus.CheckFail ||
                file.status === FileStatus.Fail ||
                file.status === FileStatus.UploadFail
            })}
          >
            {file.name}
            {file.size > 0 && <span className="tiny-uploader-size">{`(${file.renderSize})`}</span>}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="tiny-uploader-status">
            {(file.status === FileStatus.Ready || file.status === FileStatus.Reading) && (
              <LoadingIcon size={16} />
            )}

            {file.errorMessage && (
              <div className="tiny-uploader-error-meessage">{file.errorMessage}</div>
            )}
            {/* <div v-else>{{ statusMap[file.status] }}</div> */}
          </div>
          <div className="tiny-uploader-percent">
            {file.status === FileStatus.Success ? (
              <SuccessIcon size={16} />
            ) : (
              `${parseProgress(file.progress)} %`
            )}
          </div>
          <div className="tiny-uploader-actions">
            {(file.status === FileStatus.Uploading ||
              file.status === FileStatus.Ready ||
              file.status === FileStatus.Reading) && (
              <span className="tiny-uploader-action" onClick={() => pause(file)}>
                <PauseIcon size={16} />
              </span>
            )}

            {file.status === FileStatus.Pause && (
              <span className="tiny-uploader-action" onClick={() => resume(file)}>
                <PlayIcon size={16} />
              </span>
            )}
            {(file.status === FileStatus.CheckFail ||
              file.status === FileStatus.Fail ||
              file.status === FileStatus.UploadFail) && (
              <span className="tiny-uploader-action" onClick={() => retry(file)}>
                <RetryIcon size={16} />
              </span>
            )}

            <span className="tiny-uploader-action" onClick={() => remove(file)}>
              <RemoveIcon size={16} />
            </span>
          </div>
        </div>
        {(file.status === FileStatus.Uploading ||
          file.status === FileStatus.Pause ||
          file.status === FileStatus.Resume ||
          file.status === FileStatus.UploadSuccess ||
          file.status === FileStatus.UploadFail) && (
          <div className="tiny-uploader-progress-wrap">
            <div
              className={clsx({
                'tiny-uploader-progress': true,
                'tiny-uploader--uploading':
                  file.status === FileStatus.Uploading ||
                  file.status === FileStatus.Pause ||
                  file.status === FileStatus.Resume,
                'tiny-uploader--success': file.status === FileStatus.UploadSuccess,
                'tiny-uploader--fail': file.status === FileStatus.UploadFail
              })}
              style={{ width: progressWidth }}
            ></div>
          </div>
        )}
      </div>
    </div>
  )
}
