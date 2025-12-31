"use client";

import { HeapNode } from "@/core/events/events";

interface HeapTreeViewProps {
  nodes: HeapNode[];
  heapSize: number;
  phase?: string;
}

export function HeapTreeView({ nodes, heapSize, phase }: HeapTreeViewProps) {
  if (!nodes || nodes.length === 0 || heapSize === 0) return null;

  // Calculate tree levels
  const levels: HeapNode[][] = [];
  let levelStart = 0;
  let levelSize = 1;

  while (levelStart < heapSize) {
    const level = nodes.slice(levelStart, Math.min(levelStart + levelSize, heapSize));
    if (level.length > 0) levels.push(level);
    levelStart += levelSize;
    levelSize *= 2;
  }

  const nodeSize = 36;
  const verticalGap = 50;
  const maxWidth = Math.pow(2, levels.length - 1) * (nodeSize + 8);
  const totalHeight = levels.length * verticalGap + nodeSize;

  // Calculate node positions
  const getNodePosition = (levelIdx: number, nodeIdxInLevel: number, levelLength: number) => {
    const levelWidth = maxWidth;
    const spacing = levelWidth / (levelLength + 1);
    const x = spacing * (nodeIdxInLevel + 1);
    const y = levelIdx * verticalGap + nodeSize / 2 + 10;
    return { x, y };
  };

  // Build position map
  const positions: Map<number, { x: number; y: number }> = new Map();
  levels.forEach((level, levelIdx) => {
    level.forEach((node, nodeIdxInLevel) => {
      positions.set(node.index, getNodePosition(levelIdx, nodeIdxInLevel, level.length));
    });
  });

  // Generate edges
  const edges: { from: { x: number; y: number }; to: { x: number; y: number } }[] = [];
  nodes.slice(0, heapSize).forEach((node) => {
    const parentPos = positions.get(node.index);
    if (!parentPos) return;

    const leftIdx = 2 * node.index + 1;
    const rightIdx = 2 * node.index + 2;

    if (leftIdx < heapSize) {
      const leftPos = positions.get(leftIdx);
      if (leftPos) edges.push({ from: parentPos, to: leftPos });
    }
    if (rightIdx < heapSize) {
      const rightPos = positions.get(rightIdx);
      if (rightPos) edges.push({ from: parentPos, to: rightPos });
    }
  });

  return (
    <div className="bg-[var(--bg-tertiary)] rounded-xl p-4 border border-[var(--border-primary)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Heap Structure (Binary Tree)
        </h3>
        <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
          <span>
            Heap Size: <span className="text-[var(--color-primary-500)] font-medium">{heapSize}</span>
          </span>
          {phase && (
            <span>
              Phase: <span className="text-cyan-400 font-medium">{phase}</span>
            </span>
          )}
        </div>
      </div>

      {/* Tree visualization with SVG edges */}
      <div className="relative" style={{ height: totalHeight, minWidth: maxWidth }}>
        {/* SVG for edges */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ width: maxWidth, height: totalHeight }}
        >
          {edges.map((edge, idx) => (
            <line
              key={idx}
              x1={edge.from.x}
              y1={edge.from.y}
              x2={edge.to.x}
              y2={edge.to.y}
              stroke="var(--border-secondary)"
              strokeWidth="2"
            />
          ))}
        </svg>

        {/* Nodes */}
        {nodes.slice(0, heapSize).map((node) => {
          const pos = positions.get(node.index);
          if (!pos) return null;

          return (
            <div
              key={node.index}
              className="absolute flex items-center transition-all duration-300"
              style={{
                left: pos.x - nodeSize / 2,
                top: pos.y - nodeSize / 2,
              }}
            >
              {/* Node circle with index below */}
              <div className="flex flex-col items-center">
                <div
                  className={`rounded-full flex items-center justify-center text-sm font-bold shadow-md transition-all duration-300 ${node.isRemoving
                    ? "bg-red-500 text-white ring-4 ring-red-300 scale-125 animate-pulse"
                    : node.highlight
                      ? "bg-[var(--color-primary-500)] text-white ring-2 ring-[var(--color-primary-300)] scale-110"
                      : "bg-[var(--color-accent-current)] text-white"
                    }`}
                  style={{ width: nodeSize, height: nodeSize }}
                >
                  {node.value}
                </div>
                <span className="text-[10px] text-[var(--text-tertiary)] mt-0.5">{node.index}</span>
              </div>
              {/* OUT label on right side when removing - with swap context */}
              {node.isRemoving && (
                <div className="ml-8 flex flex-col items-start z-10 bg-[var(--bg-tertiary)] rounded-lg px-2 py-1 shadow-lg border border-red-300">
                  <span className="text-[11px] text-red-500 font-bold whitespace-nowrap">← Removing Max</span>
                  {node.swapWith !== undefined && (
                    <span className="text-[10px] text-orange-500 whitespace-nowrap font-medium">↔ Swap with {node.swapWith}</span>
                  )}
                  {node.reason && (
                    <span className="text-[9px] text-[var(--text-secondary)] max-w-[160px] leading-tight">{node.reason}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[var(--color-accent-current)]" />
          <span className="text-[var(--text-secondary)]">In Heap</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[var(--color-primary-500)]" />
          <span className="text-[var(--text-secondary)]">Current Node</span>
        </div>
      </div>
    </div>
  );
}
