import React, { useCallback, useEffect, useRef } from 'react';
import { Button } from 'antd';
import G6, { Graph } from '@antv/g6';
import { graphCfg, graphModeCfg } from './config/graphConfig';
// import mockData from './mock/index.json';
import { nodes, links } from '~/mock';
import styles from './index.module.less';

const mockData = { nodes, edges: links };

export default function G6Graph() {
  const domRef = useRef<HTMLDivElement>();
  const graphRef = useRef<Graph>();

  useEffect(() => {
    const container = domRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const graph = new G6.Graph({
      container,
      width,
      height,
      ...graphCfg,
      modes: graphModeCfg,
      layout: {
        type: 'forceAtlas2',
        preventOverlap: true,
        kr: 10,
        center: [250, 250],
        // workerEnabled: true,
        // gpuEnabled: true,
      },
    });

    graphRef.current = graph;

    graph.data(mockData);
    graph.render();
    graph.zoom(0.3, { x: 500, y: 300 });
  }, []);

  const selectAll = useCallback(() => {
    const graph = graphRef.current;
    const nodes = graph.getNodes();
    graph.setAutoPaint(false);
    nodes.forEach((node) => graph.setItemState(node, 'selected', true));
    graph.setAutoPaint(true);
    graph.paint();
  }, []);

  const clearAll = useCallback(() => {
    const graph = graphRef.current;
    const nodes = graph.getNodes();
    nodes.forEach((node) => graph.setItemState(node, 'selected', false));
  }, []);

  return (
    <div>
      <div className={styles.graphWrapper} ref={domRef} />
      <div className="">
        <Button onClick={selectAll}>selectAll</Button>
        <Button onClick={clearAll}>clearAll</Button>
      </div>
    </div>
  );
}
