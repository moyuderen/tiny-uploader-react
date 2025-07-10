import React from 'react';
import Uploader, { UploadIcon} from '@site/src/components/Uploader';

// Add react-live imports you need here
const ReactLiveScope: unknown = {
  React,
  ...React,
  Uploader,
  UploadIcon
};

export default ReactLiveScope;
