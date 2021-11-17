import React, { useCallback, useEffect, useRef } from 'react';
import ForceGraph, { ForceGraphInstance, NodeObject } from 'force-graph';
import { Button } from 'antd';
import { nodes, links } from '~/mock';
import styles from './index.module.less';

// const CurvatureTick = 0.05;

// const edgeCountMap = edgeMock.reduce((ret, edge) => {
//   const id = `${edge.from}-${edge.to}`;
//   ret[id] = (ret[id] | 0) + 1;
//   return ret;
// }, {} as Record<string, number>);

// const linksMock = edgeMock.map((edge) => {
//   const { from, to, ...otherProps } = edge;
//   const id = `${from}-${to}`;
//   const ret = { source: from, target: to, ...otherProps, curvature: undefined };

//   // if (from === to) {
//   //   ret.curvature === 0.05;
//   //   return ret;
//   // }

//   const idCount = edgeCountMap[id];
//   ret.curvature =
//     idCount > 0 ? Math.ceil(0 - idCount / 2) * CurvatureTick : Math.floor(0 - idCount / 2) * CurvatureTick;
//   edgeCountMap[id] = -edgeCountMap[id] - (idCount > 0 ? 0 : 2);

//   return ret;
// });

// const mockData = {
//   nodes: nodeMock,
//   links: linksMock,
// };

// const onceTicks = (graph: ForceGraphInstance, ticks = 200) => {
//   let tick = 0;
//   return graph
//     .cooldownTicks(100)
//     .onEngineTick(() => (tick < ticks ? ++tick : tick === ticks ? graph.cooldownTicks(0) : undefined));
// };

const mockData = { nodes, links };

const nodeSelected = new Set<NodeObject>([]);

export default function ForceGraphPage() {
  const grapfDomRef = useRef<HTMLDivElement>();
  const grapfRef = useRef<ForceGraphInstance>();
  const physicsRef = useRef(true);

  const selectAll = useCallback(() => {
    nodes.forEach((node) => nodeSelected.add(node));

    const Graph = grapfRef.current;
    Graph.nodeColor(Graph.nodeColor());
  }, []);

  const clearAll = useCallback(() => {
    nodeSelected.clear();
    const Graph = grapfRef.current;
    Graph.nodeColor(Graph.nodeColor());
  }, []);

  useEffect(() => {
    const Graph = ForceGraph()(grapfDomRef.current);
    Graph.onZoom(() => Graph.linkVisibility(() => false))
      .onZoomEnd(() => Graph.linkVisibility(() => true))
      .linkDirectionalArrowLength(12)
      .linkDirectionalArrowRelPos(6)
      .linkCurvature('curvature')
      // .backgroundColor('#101020')
      // .linkColor(() => 'rgba(255,255,255,0.2)')
      .nodeRelSize(14)
      .cooldownTicks(30)
      .nodeColor((node) => (nodeSelected.has(node) ? '#d2e5ff' : '#69c0ff'))
      .onEngineStop(() => {
        if (physicsRef.current) {
          Graph.cooldownTicks(0);
          physicsRef.current = false;
        }
      })
      // .dagMode('radialin')
      .onNodeClick((node, event) => {
        if (event.ctrlKey || event.shiftKey || event.altKey) {
          // multi-selection
          nodeSelected.has(node) ? nodeSelected.delete(node) : nodeSelected.add(node);
        } else {
          // single-selection
          const untoggle = nodeSelected.has(node) && nodeSelected.size === 1;
          nodeSelected.clear();
          !untoggle && nodeSelected.add(node);
        }
        Graph.nodeColor(Graph.nodeColor());
      })
      .onBackgroundClick(() => {
        nodeSelected.clear();
        Graph.nodeColor(Graph.nodeColor());
      })
      .onNodeDrag((node, translate) => {
        if (nodeSelected.has(node)) {
          // moving a selected node
          [...nodeSelected]
            .filter((selNode) => selNode !== node) // don't touch node being dragged
            .forEach((node) =>
              ['x', 'y'].forEach((coord) => {
                node[`${coord}`] = node[coord] + translate[coord];
              })
            ); // translate other nodes by same amount
        }
      })
      // .d3Force('center', null)
      .graphData(mockData);
    // .onNodeDragEnd((node) => {
    //   if (nodeSelected.has(node)) {
    //     // finished moving a selected node
    //     [...nodeSelected]
    //       .filter((selNode) => selNode !== node) // don't touch node being dragged
    //       .forEach((node) => ['x', 'y'].forEach((coord) => (node[`${coord}`] = undefined))); // unfix controlled nodes
    //   }
    // });
    grapfRef.current = Graph;
  }, []);

  return (
    <div className={styles.graphWrapper}>
      <div className={styles.graph} ref={grapfDomRef} />
      <div className="">
        <Button onClick={selectAll}>selectAll</Button>
        <Button onClick={clearAll}>clearAll</Button>
      </div>
    </div>
  );
}
