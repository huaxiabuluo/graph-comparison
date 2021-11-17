import G6, { GraphOptions } from '@antv/g6';

export const graphCfg: Omit<GraphOptions, 'container'> = {
  linkCenter: true,
  enabledStack: true,
  defaultNode: {
    size: 47,
    style: {
      cursor: 'pointer',
    },
    labelCfg: {
      position: 'bottom',
    },
  },
  defaultEdge: {
    style: {
      stroke: 'rgba(89,89,89,1)',
      lineWidth: 1,
      endArrow: {
        path: G6.Arrow.triangle(8, 12, 24),
        d: 24,
        fill: 'rgba(89,89,89,1)',
      },
      cursor: 'pointer',
    },
    labelCfg: {
      autoRotate: true,
      style: {
        stroke: 'white',
        lineWidth: 5,
      },
    },
  },
  edgeStateStyles: {
    hovered: {
      stroke: '#fbe969',
      lineWidth: 3,
      endArrow: {
        fill: '#fbe969',
        path: G6.Arrow.triangle(8, 12, 24),
        d: 24,
      },
    },
    selected: {
      stroke: 'rgba(0,145,405,1)',
      lineWidth: 3,
      endArrow: {
        fill: 'rgba(0,145,405,1)',
        path: G6.Arrow.triangle(8, 12, 24),
        d: 24,
      },
    },
    beFilteredExcluded: {
      stroke: '#F1F1F1',
      lineWidth: 1,
      endArrow: {
        fill: '#F1F1F1',
        path: G6.Arrow.triangle(8, 12, 24),
        d: 24,
      },
    },
  },
};

export const graphModeCfg = {
  default: [
    {
      type: 'drag-node',
    },
    {
      type: 'drag-canvas',
    },
    {
      type: 'brush-select',
      trigger: 'drag',
    },
    {
      type: 'zoom-canvas',
      sensitivity: 1,
      enableOptimize: true,
      minZoom: 0.2,
      maxZoom: 2.5,
    },
  ],
  mode_multi_select: [
    {
      type: 'drag-node',
    },
    {
      type: 'brush-select',
      trigger: 'drag',
    },
    {
      type: 'zoom-canvas',
      sensitivity: 1,
      enableOptimize: true,
      minZoom: 0.2,
      maxZoom: 2.5,
    },
  ],
  mode_move: [
    {
      type: 'drag-canvas',
      enableOptimize: true,
    },
    {
      type: 'zoom-canvas',
      sensitivity: 1,
      enableOptimize: true,
      minZoom: 0.2,
      maxZoom: 2.5,
    },
  ],
};
