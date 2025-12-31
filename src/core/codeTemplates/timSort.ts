import { AlgorithmCodeTemplates } from './types';

export const timSortCode: AlgorithmCodeTemplates = {
  algorithmId: 'tim-sort',
  algorithmName: 'Tim Sort',
  category: 'sorting',
  templates: {
    javascript: `// Tim Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), set(i, val), mark(i, type), log(msg)

const MIN_RUN = 4;

function timSort(arr) {
  const n = arr.length;
  log(\`Starting Tim Sort with MIN_RUN=\${MIN_RUN}\`);
  
  // Sort individual runs using insertion sort
  for (let i = 0; i < n; i += MIN_RUN) {
    insertionSort(arr, i, Math.min(i + MIN_RUN - 1, n - 1));
  }
  
  // Merge runs
  for (let size = MIN_RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);
      
      if (mid < right) {
        merge(arr, left, mid, right);
      }
    }
  }
  
  // Mark all sorted
  for (let i = 0; i < n; i++) {
    mark(i, 'sorted');
  }
  
  log('Sorting complete!');
  return arr;
}

function insertionSort(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= left && arr[j] > key) {
      compare(j, j + 1);
      swap(j, j + 1);
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}

function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;
  
  while (i < leftArr.length && j < rightArr.length) {
    compare(left + i, mid + 1 + j);
    if (leftArr[i] <= rightArr[j]) {
      set(k, leftArr[i]);
      arr[k++] = leftArr[i++];
    } else {
      set(k, rightArr[j]);
      arr[k++] = rightArr[j++];
    }
  }
  
  while (i < leftArr.length) {
    set(k, leftArr[i]);
    arr[k++] = leftArr[i++];
  }
  
  while (j < rightArr.length) {
    set(k, rightArr[j]);
    arr[k++] = rightArr[j++];
  }
}

timSort(inputArray);
`,

    java: `// Tim Sort - Java
public class TimSort {
    static final int MIN_RUN = 32;
    
    public static void timSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n; i += MIN_RUN) {
            insertionSort(arr, i, Math.min(i + MIN_RUN - 1, n - 1));
        }
        
        for (int size = MIN_RUN; size < n; size *= 2) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = Math.min(left + size - 1, n - 1);
                int right = Math.min(left + 2 * size - 1, n - 1);
                if (mid < right) merge(arr, left, mid, right);
            }
        }
    }
    
    private static void insertionSort(int[] arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= left && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    
    private static void merge(int[] arr, int l, int m, int r) {
        // Standard merge implementation
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        timSort(arr);
    }
}
`,

    python: `# Tim Sort - Python
# Note: Python's built-in sort uses Tim Sort

MIN_RUN = 32

def tim_sort(arr):
    n = len(arr)
    
    for i in range(0, n, MIN_RUN):
        insertion_sort(arr, i, min(i + MIN_RUN - 1, n - 1))
    
    size = MIN_RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(left + size - 1, n - 1)
            right = min(left + 2 * size - 1, n - 1)
            if mid < right:
                merge(arr, left, mid, right)
        size *= 2
    
    return arr

def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def merge(arr, left, mid, right):
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    
    i = j = 0
    k = left
    
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1

arr = [64, 34, 25, 12, 22, 11, 90]
print(tim_sort(arr))
`,

    cpp: `// Tim Sort - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int MIN_RUN = 32;

void insertionSort(vector<int>& arr, int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size())
        arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void timSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n; i += MIN_RUN)
        insertionSort(arr, i, min(i + MIN_RUN - 1, n - 1));
    
    for (int size = MIN_RUN; size < n; size *= 2) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = min(left + size - 1, n - 1);
            int right = min(left + 2 * size - 1, n - 1);
            if (mid < right) merge(arr, left, mid, right);
        }
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    timSort(arr);
    return 0;
}
`,

    go: `// Tim Sort - Go
package main

import "fmt"

const minRun = 32

func insertionSort(arr []int, left, right int) {
    for i := left + 1; i <= right; i++ {
        key := arr[i]
        j := i - 1
        for j >= left && arr[j] > key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}

func merge(arr []int, l, m, r int) {
    left := make([]int, m-l+1)
    right := make([]int, r-m)
    copy(left, arr[l:m+1])
    copy(right, arr[m+1:r+1])
    
    i, j, k := 0, 0, l
    for i < len(left) && j < len(right) {
        if left[i] <= right[j] {
            arr[k] = left[i]
            i++
        } else {
            arr[k] = right[j]
            j++
        }
        k++
    }
    for i < len(left) { arr[k] = left[i]; i++; k++ }
    for j < len(right) { arr[k] = right[j]; j++; k++ }
}

func timSort(arr []int) {
    n := len(arr)
    
    for i := 0; i < n; i += minRun {
        end := i + minRun - 1
        if end > n-1 { end = n - 1 }
        insertionSort(arr, i, end)
    }
    
    for size := minRun; size < n; size *= 2 {
        for left := 0; left < n; left += 2 * size {
            mid := left + size - 1
            if mid > n-1 { mid = n - 1 }
            right := left + 2*size - 1
            if right > n-1 { right = n - 1 }
            if mid < right { merge(arr, left, mid, right) }
        }
    }
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    timSort(arr)
    fmt.Println(arr)
}
`,
  },
};
