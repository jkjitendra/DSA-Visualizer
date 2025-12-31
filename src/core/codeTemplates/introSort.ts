import { AlgorithmCodeTemplates } from './types';

export const introSortCode: AlgorithmCodeTemplates = {
  algorithmId: 'intro-sort',
  algorithmName: 'Intro Sort',
  category: 'sorting',
  templates: {
    javascript: `// Intro Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), log(msg)

function introSort(arr) {
  const n = arr.length;
  const maxDepth = Math.floor(2 * Math.log2(n));
  
  log(\`Starting Intro Sort, max depth: \${maxDepth}\`);
  
  introSortHelper(arr, 0, n - 1, maxDepth);
  
  // Mark all sorted
  for (let i = 0; i < n; i++) {
    mark(i, 'sorted');
  }
  
  log('Sorting complete!');
  return arr;
}

function introSortHelper(arr, low, high, depthLimit) {
  const size = high - low + 1;
  
  if (size <= 16) {
    // Use insertion sort for small arrays
    insertionSort(arr, low, high);
    return;
  }
  
  if (depthLimit === 0) {
    // Switch to heap sort
    log('Switching to Heap Sort');
    heapSort(arr, low, high);
    return;
  }
  
  // Use quick sort
  const pivot = partition(arr, low, high);
  introSortHelper(arr, low, pivot - 1, depthLimit - 1);
  introSortHelper(arr, pivot + 1, high, depthLimit - 1);
}

function insertionSort(arr, low, high) {
  for (let i = low + 1; i <= high; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= low && arr[j] > key) {
      compare(j, j + 1);
      swap(j, j + 1);
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    compare(j, high);
    if (arr[j] <= pivot) {
      i++;
      swap(i, j);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  swap(i + 1, high);
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function heapSort(arr, low, high) {
  const n = high - low + 1;
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, low);
  }
  
  for (let i = n - 1; i > 0; i--) {
    swap(low, low + i);
    [arr[low], arr[low + i]] = [arr[low + i], arr[low]];
    heapify(arr, i, 0, low);
  }
}

function heapify(arr, n, i, offset) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[offset + left] > arr[offset + largest]) {
    largest = left;
  }
  if (right < n && arr[offset + right] > arr[offset + largest]) {
    largest = right;
  }
  
  if (largest !== i) {
    compare(offset + i, offset + largest);
    swap(offset + i, offset + largest);
    [arr[offset + i], arr[offset + largest]] = [arr[offset + largest], arr[offset + i]];
    heapify(arr, n, largest, offset);
  }
}

introSort(inputArray);
`,

    java: `// Intro Sort - Java
public class IntroSort {
    private static final int INSERTION_THRESHOLD = 16;
    
    public static void introSort(int[] arr) {
        int n = arr.length;
        int maxDepth = (int)(2 * Math.log(n) / Math.log(2));
        introSortHelper(arr, 0, n - 1, maxDepth);
    }
    
    private static void introSortHelper(int[] arr, int low, int high, int depthLimit) {
        int size = high - low + 1;
        
        if (size <= INSERTION_THRESHOLD) {
            insertionSort(arr, low, high);
            return;
        }
        
        if (depthLimit == 0) {
            heapSort(arr, low, high);
            return;
        }
        
        int pivot = partition(arr, low, high);
        introSortHelper(arr, low, pivot - 1, depthLimit - 1);
        introSortHelper(arr, pivot + 1, high, depthLimit - 1);
    }
    
    private static void insertionSort(int[] arr, int low, int high) {
        for (int i = low + 1; i <= high; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= low && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
    
    private static void heapSort(int[] arr, int low, int high) {
        // Heap sort implementation for subarray
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        introSort(arr);
    }
}
`,

    python: `# Intro Sort - Python
import math

def intro_sort(arr):
    max_depth = 2 * int(math.log2(len(arr))) if arr else 0
    intro_sort_helper(arr, 0, len(arr) - 1, max_depth)
    return arr

def intro_sort_helper(arr, low, high, depth_limit):
    size = high - low + 1
    
    if size <= 16:
        insertion_sort(arr, low, high)
        return
    
    if depth_limit == 0:
        heap_sort(arr, low, high)
        return
    
    pivot = partition(arr, low, high)
    intro_sort_helper(arr, low, pivot - 1, depth_limit - 1)
    intro_sort_helper(arr, pivot + 1, high, depth_limit - 1)

def insertion_sort(arr, low, high):
    for i in range(low + 1, high + 1):
        key = arr[i]
        j = i - 1
        while j >= low and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def heap_sort(arr, low, high):
    # Heap sort for subarray
    pass

arr = [64, 34, 25, 12, 22, 11, 90]
print(intro_sort(arr))
`,

    cpp: `// Intro Sort - C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

void insertionSort(vector<int>& arr, int low, int high) {
    for (int i = low + 1; i <= high; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= low && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void heapSort(vector<int>& arr, int low, int high);

void introSortHelper(vector<int>& arr, int low, int high, int depthLimit) {
    int size = high - low + 1;
    
    if (size <= 16) {
        insertionSort(arr, low, high);
        return;
    }
    
    if (depthLimit == 0) {
        make_heap(arr.begin() + low, arr.begin() + high + 1);
        sort_heap(arr.begin() + low, arr.begin() + high + 1);
        return;
    }
    
    int pivot = partition(arr, low, high);
    introSortHelper(arr, low, pivot - 1, depthLimit - 1);
    introSortHelper(arr, pivot + 1, high, depthLimit - 1);
}

void introSort(vector<int>& arr) {
    int n = arr.size();
    int maxDepth = 2 * log2(n);
    introSortHelper(arr, 0, n - 1, maxDepth);
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    introSort(arr);
    return 0;
}
`,

    go: `// Intro Sort - Go
package main

import (
    "fmt"
    "math"
)

func introSort(arr []int) {
    n := len(arr)
    if n <= 1 {
        return
    }
    maxDepth := int(2 * math.Log2(float64(n)))
    introSortHelper(arr, 0, n-1, maxDepth)
}

func introSortHelper(arr []int, low, high, depthLimit int) {
    size := high - low + 1
    
    if size <= 16 {
        insertionSortRange(arr, low, high)
        return
    }
    
    if depthLimit == 0 {
        heapSortRange(arr, low, high)
        return
    }
    
    pivot := partitionArr(arr, low, high)
    introSortHelper(arr, low, pivot-1, depthLimit-1)
    introSortHelper(arr, pivot+1, high, depthLimit-1)
}

func insertionSortRange(arr []int, low, high int) {
    for i := low + 1; i <= high; i++ {
        key := arr[i]
        j := i - 1
        for j >= low && arr[j] > key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}

func partitionArr(arr []int, low, high int) int {
    pivot := arr[high]
    i := low - 1
    for j := low; j < high; j++ {
        if arr[j] <= pivot {
            i++
            arr[i], arr[j] = arr[j], arr[i]
        }
    }
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1
}

func heapSortRange(arr []int, low, high int) {
    // Heap sort for range
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    introSort(arr)
    fmt.Println(arr)
}
`,
  },
};
