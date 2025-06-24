import { useContext, useEffect } from 'react'
import { SdkContext } from './Uploader'
import { Button } from './Button'
import UploadIcon from '../icons/UploadIcon'

export const Drop = () => {
  const sdk = useContext(SdkContext)

  useEffect(() => {
    if (!sdk) return
    sdk.assignDrop(document.querySelector('.tiny-uploader-drop')!)
    sdk.assignBrowse(document.querySelector('.tiny-uploader-drop')!)
  }, [sdk])
  return (
    <div className="tiny-uploader-drop">
      <UploadIcon size={64} style={{ transform: 'scale(0.65)' }} />
      <div>
        <span style={{ marginRight: '6px' }}>Drop file here or</span>
        <Button>click to upload</Button>
      </div>
    </div>
  )
}
