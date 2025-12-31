/**
 * JavaScript Code Execution Engine
 * Runs user code in a sandboxed environment with visualization hooks
 */

import { ExecutionResult, VisEvent } from '../codeTemplates/types';

// Maximum execution time in milliseconds
const MAX_EXECUTION_TIME = 5000;

// Maximum number of events to capture
const MAX_EVENTS = 10000;

/**
 * Execute JavaScript code with visualization hooks
 */
export async function executeJavaScript(
  code: string,
  inputArray: number[]
): Promise<ExecutionResult> {
  const startTime = performance.now();
  const events: VisEvent[] = [];
  const logs: string[] = [];
  let finalArray = [...inputArray];
  let eventCount = 0;

  // Create timestamp getter
  const getTimestamp = () => performance.now() - startTime;

  // Visualization hook functions
  const createHooks = (arr: number[]) => ({
    compare: (i: number, j: number) => {
      if (eventCount++ < MAX_EVENTS) {
        events.push({
          type: 'compare',
          indices: [i, j],
          timestamp: getTimestamp(),
        });
      }
    },

    swap: (i: number, j: number) => {
      if (eventCount++ < MAX_EVENTS) {
        events.push({
          type: 'swap',
          indices: [i, j],
          timestamp: getTimestamp(),
        });
      }
    },

    set: (i: number, value: number) => {
      if (eventCount++ < MAX_EVENTS) {
        events.push({
          type: 'set',
          indices: [i],
          value,
          timestamp: getTimestamp(),
        });
      }
    },

    mark: (i: number, markType: string = 'sorted') => {
      if (eventCount++ < MAX_EVENTS) {
        events.push({
          type: 'mark',
          indices: [i],
          markType,
          timestamp: getTimestamp(),
        });
      }
    },

    visit: (i: number) => {
      if (eventCount++ < MAX_EVENTS) {
        events.push({
          type: 'visit',
          indices: [i],
          timestamp: getTimestamp(),
        });
      }
    },

    highlight: (...indices: number[]) => {
      if (eventCount++ < MAX_EVENTS) {
        events.push({
          type: 'highlight',
          indices,
          timestamp: getTimestamp(),
        });
      }
    },

    message: (msg: string) => {
      if (eventCount++ < MAX_EVENTS) {
        events.push({
          type: 'message',
          message: msg,
          timestamp: getTimestamp(),
        });
      }
    },

    log: (msg: string) => {
      logs.push(String(msg));
      if (eventCount++ < MAX_EVENTS) {
        events.push({
          type: 'log',
          message: String(msg),
          timestamp: getTimestamp(),
        });
      }
    },
  });

  try {
    // Create a sandboxed execution function
    const executionFunction = new Function(
      'inputArray',
      'compare',
      'swap',
      'set',
      'mark',
      'visit',
      'highlight',
      'message',
      'log',
      `
      "use strict";
      const arr = [...inputArray];
      ${code}
      return arr;
      `
    );

    // Create hooks with the array reference
    const hooks = createHooks(finalArray);

    // Execute with timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Execution timeout exceeded')), MAX_EXECUTION_TIME);
    });

    const executionPromise = new Promise<number[]>((resolve, reject) => {
      try {
        const result = executionFunction(
          [...inputArray],
          hooks.compare,
          hooks.swap,
          hooks.set,
          hooks.mark,
          hooks.visit,
          hooks.highlight,
          hooks.message,
          hooks.log
        );
        resolve(result || [...inputArray]);
      } catch (error) {
        reject(error);
      }
    });

    finalArray = await Promise.race([executionPromise, timeoutPromise]);

    return {
      success: true,
      events,
      logs,
      executionTime: performance.now() - startTime,
      finalArray,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Try to extract line number from error
    let lineNumber: number | undefined;
    if (error instanceof Error && error.stack) {
      const match = error.stack.match(/<anonymous>:(\d+):(\d+)/);
      if (match) {
        // Subtract 3 to account for wrapper code
        lineNumber = parseInt(match[1]) - 3;
      }
    }

    return {
      success: false,
      events,
      logs,
      error: {
        message: errorMessage,
        line: lineNumber,
      },
      executionTime: performance.now() - startTime,
      finalArray: [...inputArray],
    };
  }
}

/**
 * Convert execution events to algorithm events for visualization
 */
export function convertToAlgoEvents(visEvents: VisEvent[]) {
  // This will be used to integrate with the existing player system
  return visEvents;
}
