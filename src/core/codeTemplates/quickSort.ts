import { AlgorithmCodeTemplates } from './types';

export const quickSortCode: AlgorithmCodeTemplates = {
    algorithmId: 'quick-sort',
    algorithmName: 'Quick Sort',
    category: 'sorting',
    templates: {
        javascript: `// Quick Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), visit(i), log(msg)

function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    mark(pivotIdx, 'sorted');
    quickSort(arr, low, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, high);
  } else if (low === high) {
    mark(low, 'sorted');
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  mark(high, 'pivot');
  log(\`Pivot: \${pivot} at index \${high}\`);
  
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    compare(j, high);
    
    if (arr[j] <= pivot) {
      i++;
      if (i !== j) {
        swap(i, j);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  
  i++;
  if (i !== high) {
    swap(i, high);
    [arr[i], arr[high]] = [arr[high], arr[i]];
  }
  
  return i;
}

// Run the algorithm
quickSort(inputArray);
`,

        java: `// Quick Sort - Java
public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIdx = partition(arr, low, high);
            quickSort(arr, low, pivotIdx - 1);
            quickSort(arr, pivotIdx + 1, high);
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
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        quickSort(arr, 0, arr.length - 1);
        
        System.out.print("Sorted: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
`,

        python: `# Quick Sort - Python

def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)
    
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = quick_sort(arr)
print(f"Sorted: {sorted_arr}")
`,

        cpp: `// Quick Sort - C++
#include <iostream>
#include <vector>
using namespace std;

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

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivotIdx = partition(arr, low, high);
        quickSort(arr, low, pivotIdx - 1);
        quickSort(arr, pivotIdx + 1, high);
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    quickSort(arr, 0, arr.size() - 1);
    
    cout << "Sorted: ";
    for (int num : arr) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}
`,

        go: `// Quick Sort - Go
package main

import "fmt"

func partition(arr []int, low, high int) int {
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

func quickSort(arr []int, low, high int) {
    if low < high {
        pivotIdx := partition(arr, low, high)
        quickSort(arr, low, pivotIdx-1)
        quickSort(arr, pivotIdx+1, high)
    }
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    quickSort(arr, 0, len(arr)-1)
    
    fmt.Print("Sorted: ")
    for _, num := range arr {
        fmt.Printf("%d ", num)
    }
    fmt.Println()
}
`,
    },
};
