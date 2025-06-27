import { useEffect, type PropsWithChildren } from 'react'
import { useUploader } from '../hooks/uploader-provider'
import { Button } from './Button'

type Props = {}
export const Trigger = ({ children }: PropsWithChildren<Props>) => {
  const { sdk } = useUploader()

  useEffect(() => {
    if (!sdk) return
    sdk.assignBrowse(document.querySelector('.tiny-uplpader-trigger')!)
  }, [sdk])

  return <div className="tiny-uplpader-trigger">{children || <Button>Click to Upload</Button>}</div>
}
