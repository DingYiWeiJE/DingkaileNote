import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable, ResizeCallbackData } from 'react-resizable';

const DraggableResizableWindow = () => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onResize = (event: React.SyntheticEvent, { size }: ResizeCallbackData) => {
    const { width, height } = size;
    setWidth(width);
    setHeight(height);
  };

  const onDrag = (event: any, { deltaX, deltaY }: any) => {
    setPosition({ x: position.x + deltaX, y: position.y + deltaY });
  };

  return (
    <Draggable onDrag={onDrag} position={position}>
      <Resizable
        width={width}
        height={height}
        onResize={onResize}
        draggableOpts={{ grid: [25, 25] }}
      >
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            border: '1px solid #000',
            backgroundColor: '#fff',
            position: 'relative',
          }}
        >
          <div style={{ padding: '10px' }}>可拖动且可调整大小的窗口</div>
          <div
            style={{
              position: 'absolute',
              bottom: '5px',
              right: '5px',
              cursor: 'nwse-resize',
              width: '10px',
              height: '10px',
              backgroundColor: '#000',
            }}
          />
        </div>
      </Resizable>
    </Draggable>
  );
};

export default DraggableResizableWindow;
