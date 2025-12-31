import { AlgorithmCodeTemplates } from './types';

export const radixSortCode: AlgorithmCodeTemplates = {
  algorithmId: 'radix-sort',
  algorithmName: 'Radix Sort',
  category: 'sorting',
  templates: {
    javascript: `// Radix Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), set(i, val), mark(i, type), log(msg)

function radixSort(arr) {
  const n = arr.length;
  if (n <= 1) return arr;
  
  const max = Math.max(...arr);
  log(\`Starting Radix Sort, max value: \${max}\`);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    log(\`Processing digit at position \${exp}\`);
    countingSort(arr, exp);
  }
  
  // Mark all as sorted
  for (let i = 0; i < n; i++) {
    mark(i, 'sorted');
  }
  
  log('Sorting complete!');
  return arr;
}

function countingSort(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0);
  
  // Count occurrences
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  
  // Calculate positions
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  // Copy to original array
  for (let i = 0; i < n; i++) {
    set(i, output[i]);
    arr[i] = output[i];
  }
}

radixSort(inputArray);
`,

    java: `// Radix Sort - Java
import java.util.Arrays;

public class RadixSort {
    public static void radixSort(int[] arr) {
        int max = Arrays.stream(arr).max().orElse(0);
        
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countingSort(arr, exp);
        }
    }
    
    private static void countingSort(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10];
        
        for (int i = 0; i < n; i++) {
            count[(arr[i] / exp) % 10]++;
        }
        
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        
        for (int i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }
        
        System.arraycopy(output, 0, arr, 0, n);
    }
    
    public static void main(String[] args) {
        int[] arr = {170, 45, 75, 90, 802, 24, 2, 66};
        radixSort(arr);
    }
}
`,

    python: `# Radix Sort - Python

def radix_sort(arr):
    if not arr:
        return arr
    
    max_val = max(arr)
    exp = 1
    
    while max_val // exp > 0:
        counting_sort(arr, exp)
        exp *= 10
    
    return arr

def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    for i in range(n):
        digit = (arr[i] // exp) % 10
        count[digit] += 1
    
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1
    
    for i in range(n):
        arr[i] = output[i]

arr = [170, 45, 75, 90, 802, 24, 2, 66]
print(radix_sort(arr))
`,

    cpp: `// Radix Sort - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void countingSort(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n);
    vector<int> count(10, 0);
    
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;
    
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];
    
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    
    arr = output;
}

void radixSort(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(), arr.end());
    
    for (int exp = 1; maxVal / exp > 0; exp *= 10)
        countingSort(arr, exp);
}

int main() {
    vector<int> arr = {170, 45, 75, 90, 802, 24, 2, 66};
    radixSort(arr);
    return 0;
}
`,

    go: `// Radix Sort - Go
package main

import "fmt"

func countingSortByDigit(arr []int, exp int) {
    n := len(arr)
    output := make([]int, n)
    count := make([]int, 10)
    
    for i := 0; i < n; i++ {
        digit := (arr[i] / exp) % 10
        count[digit]++
    }
    
    for i := 1; i < 10; i++ {
        count[i] += count[i-1]
    }
    
    for i := n - 1; i >= 0; i-- {
        digit := (arr[i] / exp) % 10
        output[count[digit]-1] = arr[i]
        count[digit]--
    }
    
    copy(arr, output)
}

func radixSort(arr []int) {
    max := arr[0]
    for _, v := range arr {
        if v > max {
            max = v
        }
    }
    
    for exp := 1; max/exp > 0; exp *= 10 {
        countingSortByDigit(arr, exp)
    }
}

func main() {
    arr := []int{170, 45, 75, 90, 802, 24, 2, 66}
    radixSort(arr)
    fmt.Println(arr)
}
`,
  },
};
