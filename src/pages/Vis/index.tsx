import React, { useCallback, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { Network, Options } from 'vis-network/esnext';
import { DataSet } from 'vis-data';
import { nodes, links } from '~/mock';
// import nodesMock from '~/mock/node.json';
// import edgesMock from '~/mock/edge.json';
// import mockData from '~/dataset/nogroup.json';
import styles from './index.module.less';

const edgeSet = new Set([]);
const resetEdgesMock = links.map(({ id, source: from, target: to }, index) => {
  if (edgeSet.has(id)) {
    return { id, from, to, smooth: { enabled: true, type: 'curvedCW', roundness: -0.15 } };
  }
  edgeSet.add(id);
  return { id, from, to };
});

export default function Vis() {
  const domRef = useRef<HTMLDivElement>();
  const graphRef = useRef<Network>();
  const dataRef = useRef({ nodes: new DataSet(nodes), edges: new DataSet(resetEdgesMock) });

  useEffect(() => {
    const option: Options = {
      nodes: {
        shape: 'dot',
        size: 50,
        scaling: {
          min: 30,
          max: 70,
        },
        // fixed: true,
      },
      edges: {
        width: 0.5,
        smooth: {
          enabled: true,
          type: 'continuous',
          roundness: 0.1,
          forceDirection: 'horizontal',
        },
        arrows: 'to',
        font: {
          bold: {
            vadjust: 300,
          },
        },
        // selectionWidth: 50,
        // value: 4,
      },
      interaction: {
        tooltipDelay: 200,
        // hideEdgesOnDrag: true,
        hover: true,
      },
      physics: {
        enabled: false,
        stabilization: false,
        barnesHut: {
          gravitationalConstant: -30000,
          springConstant: 0.002,
          springLength: 150,
          avoidOverlap: 1,
        },
        solver: 'barnesHut',
        // maxVelocity: 100,
        minVelocity: 3,
        // hierarchicalRepulsion: {
        //   // springConstant: 1,
        //   // centralGravity: 100,
        //   // avoidOverlap: 1,
        // },
      },
      layout: {
        // randomSeed: 1,
        hierarchical: {
          enabled: false,
          levelSeparation: 150,
          nodeSpacing: 100,
          treeSpacing: 200,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: 'UD', // UD, DU, LR, RL
          sortMethod: 'hubsize', // hubsize, directed
          shakeTowards: 'leaves', // roots, leaves
        },
      },
    };

    graphRef.current = new Network(domRef.current, dataRef.current, option);

    graphRef.current.once('stabilized', () => {
      graphRef.current.setOptions({ physics: false });
    });
  }, []);

  const selectAll = useCallback(() => {
    const graph = graphRef.current;
    // graph.selectNodes(dataRef.current.nodes.getIds());
    graph.setSelection({
      nodes: dataRef.current.nodes.getIds(),
      // edges: dataRef.current.edges.getIds(),
    });
    // graph.selectEdges(dataRef.current.edges.getIds());
  }, []);

  const clearAll = useCallback(() => {
    graphRef.current.unselectAll();
  }, []);

  return (
    <div>
      <div className={styles.dashboardWrapper} ref={domRef} />
      <div className="">
        <Button onClick={selectAll}>selectAll</Button>
        <Button onClick={clearAll}>clearAll</Button>
      </div>
    </div>
  );
}
