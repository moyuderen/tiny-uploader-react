import { useEffect, useRef, type PropsWithChildren } from 'react'
import { useUploader } from '../hooks/uploader-provider'
import { Button } from './Button'

type Props = {}
export const Trigger = ({ children }: PropsWithChildren<Props>) => {
  const { sdk } = useUploader()
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sdk) return
    sdk.assignBrowse(document.querySelector('.tiny-uplpader-trigger')!)
  }, [sdk])

  return (
    <div ref={triggerRef} className="tiny-uplpader-trigger">
      {children || <Button>Click to Upload</Button>}
    </div>
  )
}
