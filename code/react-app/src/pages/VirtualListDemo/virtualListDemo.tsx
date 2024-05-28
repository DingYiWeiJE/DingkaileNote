import React from 'react';
import {ListItem, VirtualList} from './VirtualList';

const items: ListItem[] = new Array(1555).fill(0).map((_, index) => ({
  id: index,
  content: `Item ${index}`,
}));

const YourComponent: React.FC = () => {
  return (
    <div>
      <h1>Virtual List Example</h1>
      <VirtualList items={items} itemHeight={30} />
    </div>
  );
};

export default YourComponent;