import type { UploaderOptions, UserFile } from '@tinyuploader/sdk'

export type Options = UploaderOptions & {
  drag: boolean
}

export type UserOptions = Partial<Options>

export type DefaultUserFile = Pick<UserFile, 'name' | 'id' | 'url'>
