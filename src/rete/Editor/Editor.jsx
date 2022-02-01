import './Editor.css';
import React from 'react';
import { useRete } from '../EditorCreater/EditorCreator';

const Editor = (props) => {

  const [setContainer] = useRete();

  return (
    <div
      className='editor'
      ref={(ref) => ref && setContainer(ref)}
    />
  );
}

export default Editor;