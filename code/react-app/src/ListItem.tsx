import React from "react";
import './App.css';

export interface ListItemProps {
  index: number
}

export const ListItem: React.FC<ListItemProps> = ({index}: ListItemProps) => {
    return (
        <div >
          {index % 2 === 0 ? '偶数' : '奇数'}
          {index}
          <img style={{width:'40px',height:'40px'}} src="https://img0.baidu.com/it/u=2132020499,2953501385&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800" alt="" />
        </div>
    );
}