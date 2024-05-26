import React, { useState, useEffect, useRef } from 'react';

export interface ListItem {
  id: number;
  content: string;
}

interface VirtualListProps {
  items: ListItem[];
  itemHeight: number;
}

export const VirtualList: React.FC<VirtualListProps> = ({ items, itemHeight }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const visibleItems = Math.ceil(container.clientHeight / itemHeight);
    const totalItems = Math.min(visibleItems, items.length);
    setEndIndex(totalItems);
  }, [items, itemHeight]);

  const onScrool = (container: HTMLElement) => {
    const visibleItems = Math.ceil(container.clientHeight / itemHeight);
    const scrollTop = container.scrollTop;
    let start = Math.floor(scrollTop / itemHeight);
    let end = Math.min(start + visibleItems, items.length);
    setStartIndex(start);
    setEndIndex(end);

  }

  return (
    <div 
      onScroll={(e) => onScrool(e.target as HTMLElement)}
      style={{ height: '300px', overflow: 'auto' }}
      ref = {containerRef}
    >
      <div style={{ height: `${items.length * itemHeight - startIndex * itemHeight}px`, paddingTop: `${startIndex * itemHeight}px` }}>
        {items.slice(startIndex, endIndex).map((item) => (
          <div key={item.id} style={{ height: `${itemHeight}px` }}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

