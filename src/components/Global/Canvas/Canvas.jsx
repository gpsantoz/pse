import React from 'react';

export const Canvas = (props) =>{
    const { textId } = props
  return (
    <div>
        <canvas id={textId}/>
    </div>
  )
}