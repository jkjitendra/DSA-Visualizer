import { AlgorithmCodeTemplates } from './types';

export const countingSortCode: AlgorithmCodeTemplates = {
  algorithmId: 'counting-sort',
  algorithmName: 'Counting Sort',
  category: 'sorting',
  templates: {
    javascript: `// Counting Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), set(i, val), mark(i, type), log(msg)

function countingSort(arr) {
  const n = arr.length;
  if (n <= 1) return arr;
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  
  log(\`Range: \${min} to \${max}\`);
  
  // Create count array
  const count = new Array(range).fill(0);
  const output = new Array(n).fill(0);
  
  // Count occurrences
  for (let i = 0; i < n; i++) {
    count[arr[i] - min]++;
  }
  
  // Calculate cumulative count
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  
  // Copy to original and visualize
  for (let i = 0; i < n; i++) {
    set(i, output[i]);
    arr[i] = output[i];
    mark(i, 'sorted');
  }
  
  log('Sorting complete!');
  return arr;
}

countingSort(inputArray);
`,

    java: `// Counting Sort - Java
import java.util.Arrays;

public class CountingSort {
    public static void countingSort(int[] arr) {
        int n = arr.length;
        if (n <= 1) return;
        
        int max = Arrays.stream(arr).max().orElse(0);
        int min = Arrays.stream(arr).min().orElse(0);
        int range = max - min + 1;
        
        int[] count = new int[range];
        int[] output = new int[n];
        
        for (int i = 0; i < n; i++) {
            count[arr[i] - min]++;
        }
        
        for (int i = 1; i < range; i++) {
            count[i] += count[i - 1];
        }
        
        for (int i = n - 1; i >= 0; i--) {
            output[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
        }
        
        System.arraycopy(output, 0, arr, 0, n);
    }
    
    public static void main(String[] args) {
        int[] arr = {4, 2, 2, 8, 3, 3, 1};
        countingSort(arr);
    }
}
`,

    python: `# Counting Sort - Python

def counting_sort(arr):
    if not arr:
        return arr
    
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    
    count = [0] * range_val
    output = [0] * len(arr)
    
    for num in arr:
        count[num - min_val] += 1
    
    for i in range(1, range_val):
        count[i] += count[i - 1]
    
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    return output

arr = [4, 2, 2, 8, 3, 3, 1]
print(counting_sort(arr))
`,

    cpp: `// Counting Sort - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countingSort(vector<int>& arr) {
    if (arr.empty()) return;
    
    int maxVal = *max_element(arr.begin(), arr.end());
    int minVal = *min_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;
    
    vector<int> count(range, 0);
    vector<int> output(arr.size());
    
    for (int num : arr)
        count[num - minVal]++;
    
    for (int i = 1; i < range; i++)
        count[i] += count[i - 1];
    
    for (int i = arr.size() - 1; i >= 0; i--) {
        output[count[arr[i] - minVal] - 1] = arr[i];
        count[arr[i] - minVal]--;
    }
    
    arr = output;
}

int main() {
    vector<int> arr = {4, 2, 2, 8, 3, 3, 1};
    countingSort(arr);
    return 0;
}
`,

    go: `// Counting Sort - Go
package main

import "fmt"

func countingSort(arr []int) []int {
    if len(arr) == 0 {
        return arr
    }
    
    max, min := arr[0], arr[0]
    for _, v := range arr {
        if v > max { max = v }
        if v < min { min = v }
    }
    
    rangeVal := max - min + 1
    count := make([]int, rangeVal)
    output := make([]int, len(arr))
    
    for _, num := range arr {
        count[num-min]++
    }
    
    for i := 1; i < rangeVal; i++ {
        count[i] += count[i-1]
    }
    
    for i := len(arr) - 1; i >= 0; i-- {
        output[count[arr[i]-min]-1] = arr[i]
        count[arr[i]-min]--
    }
    
    return output
}

func main() {
    arr := []int{4, 2, 2, 8, 3, 3, 1}
    fmt.Println(countingSort(arr))
}
`,
  },
};
