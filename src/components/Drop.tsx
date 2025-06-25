import { useContext, useEffect, type PropsWithChildren } from 'react'
import { SdkContext } from './Uploader'
import UploadIcon from '../icons/UploadIcon'

export const Drop = ({ children }: PropsWithChildren) => {
  const sdk = useContext(SdkContext)

  useEffect(() => {
    if (!sdk) return
    sdk.assignDrop(document.querySelector('.tiny-uploader-drop')!)
    sdk.assignBrowse(document.querySelector('.tiny-uploader-drop')!)
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
  return <div className="tiny-uploader-drop">{children || defaultChildren()}</div>
}
