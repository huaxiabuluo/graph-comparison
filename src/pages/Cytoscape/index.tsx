import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
// import edgeMock from '~/mock/edge.json';
// import nodeMock from '~/mock/node.json';
import { nodes, links } from '~/mock';
import styles from './index.module.less';

// const onceTicks = (graph: ForceGraphInstance, ticks = 200) => {
//   let tick = 0;
//   return graph
//     .cooldownTicks(100)
//     .onEngineTick(() => (tick < ticks ? ++tick : tick === ticks ? graph.cooldownTicks(0) : undefined));
// };

const nodeElements = nodes.map((node) => ({
  group: 'nodes',
  data: node,
}));

const degeElements = links.map(({ source, target }, index) => ({
  group: 'edges',
  data: { id: `${source}_${target}_${index}`, source, target },
}));

export default function CytoscapePage() {
  const grapfDomRef = useRef<HTMLDivElement>();

  useEffect(() => {
    cytoscape({
      container: grapfDomRef.current,
      elements: [...nodeElements, ...degeElements],
    });
  }, []);

  return (
    <div className={styles.graphWrapper}>
      <div className={styles.graph} ref={grapfDomRef} />
    </div>
  );
}
