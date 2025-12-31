import { AlgorithmCodeTemplates } from './types';

export const pigeonholeSortCode: AlgorithmCodeTemplates = {
  algorithmId: 'pigeonhole-sort',
  algorithmName: 'Pigeonhole Sort',
  category: 'sorting',
  templates: {
    javascript: `// Pigeonhole Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), set(i, val), mark(i, type), log(msg)

function pigeonholeSort(arr) {
  const n = arr.length;
  if (n <= 1) return arr;
  
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;
  
  log(\`Range: \${min} to \${max} (\${range} holes)\`);
  
  // Create pigeonholes
  const holes = new Array(range).fill(0);
  
  // Populate pigeonholes
  for (let i = 0; i < n; i++) {
    holes[arr[i] - min]++;
  }
  
  // Put elements back in sorted order
  let idx = 0;
  for (let i = 0; i < range; i++) {
    while (holes[i] > 0) {
      set(idx, i + min);
      arr[idx] = i + min;
      mark(idx, 'sorted');
      holes[i]--;
      idx++;
    }
  }
  
  log('Sorting complete!');
  return arr;
}

pigeonholeSort(inputArray);
`,

    java: `// Pigeonhole Sort - Java
import java.util.Arrays;

public class PigeonholeSort {
    public static void pigeonholeSort(int[] arr) {
        int n = arr.length;
        if (n <= 1) return;
        
        int min = Arrays.stream(arr).min().orElse(0);
        int max = Arrays.stream(arr).max().orElse(0);
        int range = max - min + 1;
        
        int[] holes = new int[range];
        
        for (int num : arr) {
            holes[num - min]++;
        }
        
        int idx = 0;
        for (int i = 0; i < range; i++) {
            while (holes[i] > 0) {
                arr[idx++] = i + min;
                holes[i]--;
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {8, 3, 2, 7, 4, 6, 8};
        pigeonholeSort(arr);
    }
}
`,

    python: `# Pigeonhole Sort - Python

def pigeonhole_sort(arr):
    if len(arr) <= 1:
        return arr
    
    min_val = min(arr)
    max_val = max(arr)
    range_val = max_val - min_val + 1
    
    holes = [0] * range_val
    
    for num in arr:
        holes[num - min_val] += 1
    
    result = []
    for i in range(range_val):
        while holes[i] > 0:
            result.append(i + min_val)
            holes[i] -= 1
    
    return result

arr = [8, 3, 2, 7, 4, 6, 8]
print(pigeonhole_sort(arr))
`,

    cpp: `// Pigeonhole Sort - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void pigeonholeSort(vector<int>& arr) {
    if (arr.size() <= 1) return;
    
    int minVal = *min_element(arr.begin(), arr.end());
    int maxVal = *max_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;
    
    vector<int> holes(range, 0);
    
    for (int num : arr) {
        holes[num - minVal]++;
    }
    
    int idx = 0;
    for (int i = 0; i < range; i++) {
        while (holes[i] > 0) {
            arr[idx++] = i + minVal;
            holes[i]--;
        }
    }
}

int main() {
    vector<int> arr = {8, 3, 2, 7, 4, 6, 8};
    pigeonholeSort(arr);
    return 0;
}
`,

    go: `// Pigeonhole Sort - Go
package main

import "fmt"

func pigeonholeSort(arr []int) {
    n := len(arr)
    if n <= 1 {
        return
    }
    
    min, max := arr[0], arr[0]
    for _, v := range arr {
        if v < min { min = v }
        if v > max { max = v }
    }
    
    rangeVal := max - min + 1
    holes := make([]int, rangeVal)
    
    for _, num := range arr {
        holes[num-min]++
    }
    
    idx := 0
    for i := 0; i < rangeVal; i++ {
        for holes[i] > 0 {
            arr[idx] = i + min
            idx++
            holes[i]--
        }
    }
}

func main() {
    arr := []int{8, 3, 2, 7, 4, 6, 8}
    pigeonholeSort(arr)
    fmt.Println(arr)
}
`,
  },
};
