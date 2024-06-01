import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // 需要导入样式文件
import './index.css'

const ResizableDiv: React.FC = () => {
  const [width, setWidth] = useState<number>(200); // 初始宽度
  const [height, setHeight] = useState<number>(200); // 初始高度
  const [fontSize, setFontSize] = useState<number>(10)

  const handleResize = (event: React.SyntheticEvent, { size }: { size: { width: number, height: number } }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('执行了几次')
    const divElement = divRef.current;

    if (divElement) {
      const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          setFontSize(entry.contentRect.width / 10);
        }
      });

      observer.observe(divElement);

      return () => {
        observer.unobserve(divElement);
      };
    }
  }, []);

  return (
    <ResizableBox
      width={width}
      height={height}
      minConstraints={[100, 100]} // 设置最小宽度和高度
      // maxConstraints={[500, 500]} // 设置最大宽度和高度
      onResize={handleResize}
    >
      <div className="resizeable" ref={divRef} style={{fontSize: fontSize}}>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda placeat quo iure magni excepturi iusto voluptas temporibus ex. Suscipit repudiandae facere, dolorem sapiente aliquam cumque consectetur omnis blanditiis eos. Vel?
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis adipisci praesentium numquam blanditiis!</span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aliquam esse nostrum quo voluptatem. Modi eum tempore, maiores repudiandae vel reiciendis similique esse minus magnam minima veritatis iste ipsam. Temporibus!
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi at maiores ratione voluptas pariatur voluptate commodi soluta blanditiis porro quod.</p>
      </div>
    </ResizableBox>
  );
};

export default ResizableDiv;
