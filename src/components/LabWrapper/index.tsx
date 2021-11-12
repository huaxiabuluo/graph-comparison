import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

export default function LabWrapper({ children }: { children: JSX.Element }) {
  const [loading, switchLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => switchLoading(false), 2000);
  }, []);
  return <Spin spinning={loading}>{children}</Spin>;
}
