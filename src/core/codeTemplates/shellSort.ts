import { AlgorithmCodeTemplates } from './types';

export const shellSortCode: AlgorithmCodeTemplates = {
  algorithmId: 'shell-sort',
  algorithmName: 'Shell Sort',
  category: 'sorting',
  templates: {
    javascript: `// Shell Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), log(msg)

function shellSort(arr) {
  const n = arr.length;
  log(\`Starting Shell Sort with \${n} elements\`);
  
  // Start with a big gap, then reduce
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    log(\`Gap: \${gap}\`);
    
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      
      while (j >= gap) {
        compare(j - gap, j);
        if (arr[j - gap] > temp) {
          swap(j - gap, j);
          arr[j] = arr[j - gap];
          j -= gap;
        } else {
          break;
        }
      }
      arr[j] = temp;
    }
  }
  
  // Mark all as sorted
  for (let i = 0; i < n; i++) {
    mark(i, 'sorted');
  }
  
  log('Sorting complete!');
  return arr;
}

shellSort(inputArray);
`,

    java: `// Shell Sort - Java
public class ShellSort {
    public static void shellSort(int[] arr) {
        int n = arr.length;
        
        for (int gap = n / 2; gap > 0; gap /= 2) {
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j = i;
                
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
                arr[j] = temp;
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        shellSort(arr);
    }
}
`,

    python: `# Shell Sort - Python

def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    
    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
print(shell_sort(arr))
`,

    cpp: `// Shell Sort - C++
#include <iostream>
#include <vector>
using namespace std;

void shellSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;
            
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    shellSort(arr);
    return 0;
}
`,

    go: `// Shell Sort - Go
package main

import "fmt"

func shellSort(arr []int) {
    n := len(arr)
    
    for gap := n / 2; gap > 0; gap /= 2 {
        for i := gap; i < n; i++ {
            temp := arr[i]
            j := i
            
            for j >= gap && arr[j-gap] > temp {
                arr[j] = arr[j-gap]
                j -= gap
            }
            arr[j] = temp
        }
    }
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    shellSort(arr)
    fmt.Println(arr)
}
`,
  },
};
