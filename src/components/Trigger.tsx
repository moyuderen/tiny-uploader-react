import { useEffect, useContext, type PropsWithChildren } from 'react'
import { SdkContext } from './Uploader'
import { Button } from './Button'

type Props = {}
export const Trigger = ({ children }: PropsWithChildren<Props>) => {
  const sdk = useContext(SdkContext)

  useEffect(() => {
    if (!sdk) return
    sdk.assignBrowse(document.querySelector('.tiny-uplpader-trigger')!)
  }, [sdk])

  return <div className="tiny-uplpader-trigger">{children || <Button>Click to Upload</Button>}</div>
}
