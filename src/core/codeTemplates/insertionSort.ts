import { AlgorithmCodeTemplates } from './types';

export const insertionSortCode: AlgorithmCodeTemplates = {
    algorithmId: 'insertion-sort',
    algorithmName: 'Insertion Sort',
    category: 'sorting',
    templates: {
        javascript: `// Insertion Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), log(msg)

function insertionSort(arr) {
  const n = arr.length;
  log(\`Starting Insertion Sort with \${n} elements\`);
  
  mark(0, 'sorted');
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      compare(j, j + 1);
      swap(j, j + 1);
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
    mark(i, 'sorted');
  }
  
  log('Sorting complete!');
  return arr;
}

// Run the algorithm
insertionSort(inputArray);
`,

        java: `// Insertion Sort - Java
public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        insertionSort(arr);
    }
}
`,

        python: `# Insertion Sort - Python

def insertion_sort(arr):
    n = len(arr)
    
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    
    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
print(insertion_sort(arr))
`,

        cpp: `// Insertion Sort - C++
#include <iostream>
#include <vector>
using namespace std;

void insertionSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    insertionSort(arr);
    return 0;
}
`,

        go: `// Insertion Sort - Go
package main

import "fmt"

func insertionSort(arr []int) {
    n := len(arr)
    
    for i := 1; i < n; i++ {
        key := arr[i]
        j := i - 1
        
        for j >= 0 && arr[j] > key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    insertionSort(arr)
    fmt.Println(arr)
}
`,
    },
};
