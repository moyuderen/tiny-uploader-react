import './index.scss'

export type UploaderProps = {
  action?: string
}

export const Uploader = (props: UploaderProps) => {
  return (
    <>
      <div className="text-red-950">Uploader{props.action}</div>
    </>
  )
}
