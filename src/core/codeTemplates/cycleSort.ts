import { AlgorithmCodeTemplates } from './types';

export const cycleSortCode: AlgorithmCodeTemplates = {
  algorithmId: 'cycle-sort',
  algorithmName: 'Cycle Sort',
  category: 'sorting',
  templates: {
    javascript: `// Cycle Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), set(i, val), mark(i, type), log(msg)

function cycleSort(arr) {
  const n = arr.length;
  let writes = 0;
  
  log('Starting Cycle Sort');
  
  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = arr[cycleStart];
    let pos = cycleStart;
    
    // Find position for item
    for (let i = cycleStart + 1; i < n; i++) {
      compare(cycleStart, i);
      if (arr[i] < item) {
        pos++;
      }
    }
    
    if (pos === cycleStart) {
      continue;
    }
    
    // Skip duplicates
    while (item === arr[pos]) {
      pos++;
    }
    
    // Put item in correct position
    if (pos !== cycleStart) {
      swap(cycleStart, pos);
      [item, arr[pos]] = [arr[pos], item];
      writes++;
    }
    
    // Rotate rest of cycle
    while (pos !== cycleStart) {
      pos = cycleStart;
      
      for (let i = cycleStart + 1; i < n; i++) {
        compare(cycleStart, i);
        if (arr[i] < item) {
          pos++;
        }
      }
      
      while (item === arr[pos]) {
        pos++;
      }
      
      if (item !== arr[pos]) {
        swap(cycleStart, pos);
        [item, arr[pos]] = [arr[pos], item];
        writes++;
      }
    }
    
    mark(cycleStart, 'sorted');
  }
  
  mark(n - 1, 'sorted');
  log(\`Sorting complete! Writes: \${writes}\`);
  return arr;
}

cycleSort(inputArray);
`,

    java: `// Cycle Sort - Java
public class CycleSort {
    public static int cycleSort(int[] arr) {
        int n = arr.length;
        int writes = 0;
        
        for (int cycleStart = 0; cycleStart < n - 1; cycleStart++) {
            int item = arr[cycleStart];
            int pos = cycleStart;
            
            for (int i = cycleStart + 1; i < n; i++) {
                if (arr[i] < item) pos++;
            }
            
            if (pos == cycleStart) continue;
            
            while (item == arr[pos]) pos++;
            
            if (pos != cycleStart) {
                int temp = item;
                item = arr[pos];
                arr[pos] = temp;
                writes++;
            }
            
            while (pos != cycleStart) {
                pos = cycleStart;
                for (int i = cycleStart + 1; i < n; i++) {
                    if (arr[i] < item) pos++;
                }
                while (item == arr[pos]) pos++;
                if (item != arr[pos]) {
                    int temp = item;
                    item = arr[pos];
                    arr[pos] = temp;
                    writes++;
                }
            }
        }
        return writes;
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        cycleSort(arr);
    }
}
`,

    python: `# Cycle Sort - Python

def cycle_sort(arr):
    n = len(arr)
    writes = 0
    
    for cycle_start in range(n - 1):
        item = arr[cycle_start]
        pos = cycle_start
        
        for i in range(cycle_start + 1, n):
            if arr[i] < item:
                pos += 1
        
        if pos == cycle_start:
            continue
        
        while item == arr[pos]:
            pos += 1
        
        if pos != cycle_start:
            item, arr[pos] = arr[pos], item
            writes += 1
        
        while pos != cycle_start:
            pos = cycle_start
            for i in range(cycle_start + 1, n):
                if arr[i] < item:
                    pos += 1
            while item == arr[pos]:
                pos += 1
            if item != arr[pos]:
                item, arr[pos] = arr[pos], item
                writes += 1
    
    return arr, writes

arr = [64, 34, 25, 12, 22, 11, 90]
print(cycle_sort(arr))
`,

    cpp: `// Cycle Sort - C++
#include <iostream>
#include <vector>
using namespace std;

int cycleSort(vector<int>& arr) {
    int n = arr.size();
    int writes = 0;
    
    for (int cycleStart = 0; cycleStart < n - 1; cycleStart++) {
        int item = arr[cycleStart];
        int pos = cycleStart;
        
        for (int i = cycleStart + 1; i < n; i++)
            if (arr[i] < item) pos++;
        
        if (pos == cycleStart) continue;
        
        while (item == arr[pos]) pos++;
        
        if (pos != cycleStart) {
            swap(item, arr[pos]);
            writes++;
        }
        
        while (pos != cycleStart) {
            pos = cycleStart;
            for (int i = cycleStart + 1; i < n; i++)
                if (arr[i] < item) pos++;
            while (item == arr[pos]) pos++;
            if (item != arr[pos]) {
                swap(item, arr[pos]);
                writes++;
            }
        }
    }
    return writes;
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    cycleSort(arr);
    return 0;
}
`,

    go: `// Cycle Sort - Go
package main

import "fmt"

func cycleSort(arr []int) int {
    n := len(arr)
    writes := 0
    
    for cycleStart := 0; cycleStart < n-1; cycleStart++ {
        item := arr[cycleStart]
        pos := cycleStart
        
        for i := cycleStart + 1; i < n; i++ {
            if arr[i] < item {
                pos++
            }
        }
        
        if pos == cycleStart {
            continue
        }
        
        for item == arr[pos] {
            pos++
        }
        
        if pos != cycleStart {
            item, arr[pos] = arr[pos], item
            writes++
        }
        
        for pos != cycleStart {
            pos = cycleStart
            for i := cycleStart + 1; i < n; i++ {
                if arr[i] < item {
                    pos++
                }
            }
            for item == arr[pos] {
                pos++
            }
            if item != arr[pos] {
                item, arr[pos] = arr[pos], item
                writes++
            }
        }
    }
    return writes
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    cycleSort(arr)
    fmt.Println(arr)
}
`,
  },
};
