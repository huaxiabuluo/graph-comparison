import React, { useEffect, useRef } from 'react';
import ForceGraph from 'force-graph';
import edgeMock from '~/mock/edge.json';
import nodeMock from '~/mock/node.json';

const CurvatureTick = 0.05;

const edgeCountMap = edgeMock.reduce((ret, edge) => {
  const id = `${edge.from}-${edge.to}`;
  ret[id] = (ret[id] | 0) + 1;
  return ret;
}, {} as Record<string, number>);

const linksMock = edgeMock.map((edge) => {
  const { from, to, ...otherProps } = edge;
  const id = `${from}-${to}`;
  const ret = { source: from, target: to, ...otherProps, curvature: undefined };

  // if (from === to) {
  //   ret.curvature === 0.05;
  //   return ret;
  // }

  const idCount = edgeCountMap[id];
  ret.curvature =
    idCount > 0 ? Math.ceil(0 - idCount / 2) * CurvatureTick : Math.floor(0 - idCount / 2) * CurvatureTick;
  edgeCountMap[id] = -edgeCountMap[id] - (idCount > 0 ? 0 : 2);

  return ret;
});

const mockData = {
  nodes: nodeMock,
  links: linksMock,
};

import styles from './index.module.less';

// const onceTicks = (graph: ForceGraphInstance, ticks = 200) => {
//   let tick = 0;
//   return graph
//     .cooldownTicks(100)
//     .onEngineTick(() => (tick < ticks ? ++tick : tick === ticks ? graph.cooldownTicks(0) : undefined));
// };

export default function ForceGraphPage() {
  const grapfDomRef = useRef<HTMLDivElement>();
  const physicsRef = useRef(true);

  useEffect(() => {
    const Graph = ForceGraph()(grapfDomRef.current);

    Graph.graphData(mockData)
      .onZoom(() => Graph.linkVisibility(() => false))
      .onZoomEnd(() => Graph.linkVisibility(() => true))
      .linkDirectionalArrowLength(3)
      .linkDirectionalArrowRelPos(1)
      .linkCurvature('curvature')
      .zoom(2)
      .cooldownTicks(100)
      .onEngineStop(() => {
        if (physicsRef.current) {
          Graph.cooldownTicks(0);
          physicsRef.current = false;
        }
      });
  }, []);

  return (
    <div className={styles.graphWrapper}>
      <div className={styles.graph} ref={grapfDomRef} />
    </div>
  );
}
