import { AlgorithmCodeTemplates } from './types';

export const selectionSortCode: AlgorithmCodeTemplates = {
    algorithmId: 'selection-sort',
    algorithmName: 'Selection Sort',
    category: 'sorting',
    templates: {
        javascript: `// Selection Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), log(msg)

function selectionSort(arr) {
  const n = arr.length;
  log(\`Starting Selection Sort with \${n} elements\`);
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    // Find minimum element in unsorted portion
    for (let j = i + 1; j < n; j++) {
      compare(minIdx, j);
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap if minimum is not at current position
    if (minIdx !== i) {
      swap(i, minIdx);
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    
    mark(i, 'sorted');
  }
  
  mark(n - 1, 'sorted');
  log('Sorting complete!');
  return arr;
}

// Run the algorithm
selectionSort(inputArray);
`,

        java: `// Selection Sort - Java
public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        selectionSort(arr);
        System.out.println("Sorted array");
    }
}
`,

        python: `# Selection Sort - Python

def selection_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        min_idx = i
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
print(selection_sort(arr))
`,

        cpp: `// Selection Sort - C++
#include <iostream>
#include <vector>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        swap(arr[i], arr[minIdx]);
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    selectionSort(arr);
    return 0;
}
`,

        go: `// Selection Sort - Go
package main

import "fmt"

func selectionSort(arr []int) {
    n := len(arr)
    
    for i := 0; i < n-1; i++ {
        minIdx := i
        
        for j := i + 1; j < n; j++ {
            if arr[j] < arr[minIdx] {
                minIdx = j
            }
        }
        
        arr[i], arr[minIdx] = arr[minIdx], arr[i]
    }
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    selectionSort(arr)
    fmt.Println(arr)
}
`,
    },
};
