import type { PropsWithChildren } from 'react'

type ButtonProps = {}
export const Button = ({ children }: PropsWithChildren<ButtonProps>) => {
  return <span className="tiny-uploader-button">{children}</span>
}
