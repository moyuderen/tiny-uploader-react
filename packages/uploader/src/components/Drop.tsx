import { useEffect, useRef, type PropsWithChildren } from 'react'
import { useUploader } from '../hooks/uploader-provider'
import UploadIcon from '../icons/UploadIcon'

export const Drop = ({ children }: PropsWithChildren) => {
  const { sdk } = useUploader()
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sdk) return
    sdk.assignDrop(dropRef.current!)
    sdk.assignBrowse(dropRef.current!)
  }, [sdk])

  const defaultChildren = () => (
    <>
      <UploadIcon size={64} style={{ transform: 'scale(0.65)' }} />
      <div className="tiny-uploader-drop_text">
        Drop file here or <em>click to upload</em>
      </div>
      <div className="tiny-uploader-drop_hint">{/* some hint */}</div>
    </>
  )
  return (
    <div ref={dropRef} className="tiny-uploader-drop">
      {children || defaultChildren()}
    </div>
  )
}
