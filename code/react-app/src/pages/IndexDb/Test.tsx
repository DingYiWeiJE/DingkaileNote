import React from "react";

export interface TestProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Test: React.FC<TestProps> = ({
  open,
  onClose,
  children
} : TestProps) => {
    return <div>
      这里是里面的组件
      <span onClick={onClose}>{open ? '这是打开的' : '这是关闭的'}</span>
      {children}
    </div>;
}