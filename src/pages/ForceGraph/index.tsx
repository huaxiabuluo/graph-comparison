import React, { useEffect, useRef } from 'react';
import ForceGraph from 'force-graph';
import edgeMock from '~/mock/edge.json';
import nodeMock from '~/mock/node.json';

const mockData = {
  nodes: nodeMock,
  links: edgeMock.map(({ from, to, ...others }) => ({ source: from, target: to, ...others })),
};

import styles from './index.module.less';

export default function ForceGraphPage() {
  const grapfDomRef = useRef<HTMLDivElement>();

  useEffect(() => {
    ForceGraph()(grapfDomRef.current)
      .graphData(mockData)
      .onEngineStop(() => {
        console.log(123456)
      })
      // .d3Force('charge', null)
  }, []);

  return (
    <div className={styles.graphWrapper}>
      <div className={styles.graph} ref={grapfDomRef} />
    </div>
  );
}
