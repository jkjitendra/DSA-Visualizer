import { AlgorithmCodeTemplates } from './types';

export const heapSortCode: AlgorithmCodeTemplates = {
    algorithmId: 'heap-sort',
    algorithmName: 'Heap Sort',
    category: 'sorting',
    templates: {
        javascript: `// Heap Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), log(msg)

function heapSort(arr) {
  const n = arr.length;
  log(\`Starting Heap Sort with \${n} elements\`);
  
  // Build max heap
  log('Building max heap...');
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap
  log('Extracting elements...');
  for (let i = n - 1; i > 0; i--) {
    swap(0, i);
    [arr[0], arr[i]] = [arr[i], arr[0]];
    mark(i, 'sorted');
    heapify(arr, i, 0);
  }
  
  mark(0, 'sorted');
  log('Sorting complete!');
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n) {
    compare(largest, left);
    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }
  
  if (right < n) {
    compare(largest, right);
    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }
  
  if (largest !== i) {
    swap(i, largest);
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

// Run the algorithm
heapSort(inputArray);
`,

        java: `// Heap Sort - Java
public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        // Extract elements
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }
    
    private static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;
        
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            heapify(arr, n, largest);
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        heapSort(arr);
    }
}
`,

        python: `# Heap Sort - Python

def heap_sort(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

arr = [64, 34, 25, 12, 22, 11, 90]
print(heap_sort(arr))
`,

        cpp: `// Heap Sort - C++
#include <iostream>
#include <vector>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    heapSort(arr);
    return 0;
}
`,

        go: `// Heap Sort - Go
package main

import "fmt"

func heapify(arr []int, n, i int) {
    largest := i
    left := 2*i + 1
    right := 2*i + 2
    
    if left < n && arr[left] > arr[largest] { largest = left }
    if right < n && arr[right] > arr[largest] { largest = right }
    
    if largest != i {
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
    }
}

func heapSort(arr []int) {
    n := len(arr)
    
    for i := n/2 - 1; i >= 0; i-- {
        heapify(arr, n, i)
    }
    
    for i := n - 1; i > 0; i-- {
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    }
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    heapSort(arr)
    fmt.Println(arr)
}
`,
    },
};
