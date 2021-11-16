import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import edgeMock from '~/mock/edge.json';
import nodeMock from '~/mock/node.json';
import styles from './index.module.less';

// const onceTicks = (graph: ForceGraphInstance, ticks = 200) => {
//   let tick = 0;
//   return graph
//     .cooldownTicks(100)
//     .onEngineTick(() => (tick < ticks ? ++tick : tick === ticks ? graph.cooldownTicks(0) : undefined));
// };

const nodeElements = nodeMock.map((node) => ({
  group: 'nodes',
  data: node,
}));

const degeElements = edgeMock.map(({ id, from, to }) => ({
  group: 'edges',
  data: { id, source: from, target: to },
}));

export default function CytoscapePage() {
  const grapfDomRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const cy = cytoscape({
      container: grapfDomRef.current,
      style: [
        {
          selector: 'core',
          style: {
            'selection-box-color': '#AAD8FF',
            'selection-box-border-color': '#8BB0D0',
            'selection-box-opacity': '0.5',
          },
        },
        {
          selector: 'node',
          style: {
            width: 'mapData(score, 0, 0.006769776522008331, 20, 60)',
            height: 'mapData(score, 0, 0.006769776522008331, 20, 60)',
            content: 'data(name)',
            'font-size': '12px',
            'text-valign': 'center',
            'text-halign': 'center',
            'background-color': '#555',
            'text-outline-color': '#555',
            'text-outline-width': '2px',
            color: '#fff',
            'overlay-padding': '6px',
            'z-index': '10',
          },
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': '6px',
            'border-color': '#AAD8FF',
            'border-opacity': '0.5',
            'background-color': '#77828C',
            'text-outline-color': '#77828C',
          },
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'haystack',
            'haystack-radius': '0.5',
            opacity: '0.4',
            'line-color': '#bbb',
            width: 3,
            'overlay-padding': '3px',
          },
        },
      ],
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0,
      },
      elements: [...nodeElements, ...degeElements],
    });
  }, []);

  return (
    <div className={styles.graphWrapper}>
      <div className={styles.graph} ref={grapfDomRef} />
    </div>
  );
}
