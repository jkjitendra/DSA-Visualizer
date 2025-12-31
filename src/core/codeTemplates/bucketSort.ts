import { AlgorithmCodeTemplates } from './types';

export const bucketSortCode: AlgorithmCodeTemplates = {
  algorithmId: 'bucket-sort',
  algorithmName: 'Bucket Sort',
  category: 'sorting',
  templates: {
    javascript: `// Bucket Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), set(i, val), mark(i, type), log(msg)

function bucketSort(arr) {
  const n = arr.length;
  if (n <= 1) return arr;
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const bucketCount = Math.floor(Math.sqrt(n));
  const bucketSize = Math.ceil((max - min + 1) / bucketCount);
  
  log(\`Creating \${bucketCount} buckets\`);
  
  // Create buckets
  const buckets = Array.from({ length: bucketCount }, () => []);
  
  // Distribute elements into buckets
  for (let i = 0; i < n; i++) {
    const bucketIdx = Math.min(
      Math.floor((arr[i] - min) / bucketSize),
      bucketCount - 1
    );
    buckets[bucketIdx].push(arr[i]);
  }
  
  // Sort individual buckets using insertion sort
  for (let i = 0; i < bucketCount; i++) {
    buckets[i].sort((a, b) => a - b);
  }
  
  // Concatenate buckets
  let idx = 0;
  for (let i = 0; i < bucketCount; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      set(idx, buckets[i][j]);
      arr[idx] = buckets[i][j];
      mark(idx, 'sorted');
      idx++;
    }
  }
  
  log('Sorting complete!');
  return arr;
}

bucketSort(inputArray);
`,

    java: `// Bucket Sort - Java
import java.util.*;

public class BucketSort {
    public static void bucketSort(int[] arr) {
        int n = arr.length;
        if (n <= 1) return;
        
        int max = Arrays.stream(arr).max().orElse(0);
        int min = Arrays.stream(arr).min().orElse(0);
        int bucketCount = (int) Math.sqrt(n);
        int bucketSize = (int) Math.ceil((double)(max - min + 1) / bucketCount);
        
        List<List<Integer>> buckets = new ArrayList<>();
        for (int i = 0; i < bucketCount; i++) {
            buckets.add(new ArrayList<>());
        }
        
        for (int num : arr) {
            int bucketIdx = Math.min((num - min) / bucketSize, bucketCount - 1);
            buckets.get(bucketIdx).add(num);
        }
        
        int idx = 0;
        for (List<Integer> bucket : buckets) {
            Collections.sort(bucket);
            for (int num : bucket) {
                arr[idx++] = num;
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bucketSort(arr);
    }
}
`,

    python: `# Bucket Sort - Python

def bucket_sort(arr):
    if len(arr) <= 1:
        return arr
    
    max_val = max(arr)
    min_val = min(arr)
    bucket_count = int(len(arr) ** 0.5)
    bucket_size = (max_val - min_val + 1) // bucket_count + 1
    
    buckets = [[] for _ in range(bucket_count)]
    
    for num in arr:
        bucket_idx = min((num - min_val) // bucket_size, bucket_count - 1)
        buckets[bucket_idx].append(num)
    
    result = []
    for bucket in buckets:
        result.extend(sorted(bucket))
    
    return result

arr = [64, 34, 25, 12, 22, 11, 90]
print(bucket_sort(arr))
`,

    cpp: `// Bucket Sort - C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

void bucketSort(vector<int>& arr) {
    int n = arr.size();
    if (n <= 1) return;
    
    int maxVal = *max_element(arr.begin(), arr.end());
    int minVal = *min_element(arr.begin(), arr.end());
    int bucketCount = sqrt(n);
    int bucketSize = (maxVal - minVal + 1) / bucketCount + 1;
    
    vector<vector<int>> buckets(bucketCount);
    
    for (int num : arr) {
        int bucketIdx = min((num - minVal) / bucketSize, bucketCount - 1);
        buckets[bucketIdx].push_back(num);
    }
    
    int idx = 0;
    for (auto& bucket : buckets) {
        sort(bucket.begin(), bucket.end());
        for (int num : bucket) {
            arr[idx++] = num;
        }
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    bucketSort(arr);
    return 0;
}
`,

    go: `// Bucket Sort - Go
package main

import (
    "fmt"
    "math"
    "sort"
)

func bucketSort(arr []int) []int {
    n := len(arr)
    if n <= 1 {
        return arr
    }
    
    max, min := arr[0], arr[0]
    for _, v := range arr {
        if v > max { max = v }
        if v < min { min = v }
    }
    
    bucketCount := int(math.Sqrt(float64(n)))
    bucketSize := (max - min + 1) / bucketCount + 1
    
    buckets := make([][]int, bucketCount)
    for i := range buckets {
        buckets[i] = []int{}
    }
    
    for _, num := range arr {
        bucketIdx := (num - min) / bucketSize
        if bucketIdx >= bucketCount {
            bucketIdx = bucketCount - 1
        }
        buckets[bucketIdx] = append(buckets[bucketIdx], num)
    }
    
    result := []int{}
    for _, bucket := range buckets {
        sort.Ints(bucket)
        result = append(result, bucket...)
    }
    
    return result
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    fmt.Println(bucketSort(arr))
}
`,
  },
};
