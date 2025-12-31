import { AlgorithmCodeTemplates } from './types';

export const mergeSortCode: AlgorithmCodeTemplates = {
    algorithmId: 'merge-sort',
    algorithmName: 'Merge Sort',
    category: 'sorting',
    templates: {
        javascript: `// Merge Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), set(i, val), mark(i, type), log(msg)

function mergeSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
  return arr;
}

function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;
  
  while (i < leftArr.length && j < rightArr.length) {
    compare(left + i, mid + 1 + j);
    
    if (leftArr[i] <= rightArr[j]) {
      set(k, leftArr[i]);
      arr[k] = leftArr[i];
      i++;
    } else {
      set(k, rightArr[j]);
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }
  
  while (i < leftArr.length) {
    set(k, leftArr[i]);
    arr[k] = leftArr[i];
    i++;
    k++;
  }
  
  while (j < rightArr.length) {
    set(k, rightArr[j]);
    arr[k] = rightArr[j];
    j++;
    k++;
  }
  
  // Mark merged section
  for (let x = left; x <= right; x++) {
    if (left === 0 && right === arr.length - 1) {
      mark(x, 'sorted');
    }
  }
}

log(\`Starting Merge Sort with \${inputArray.length} elements\`);
mergeSort(inputArray);
log('Sorting complete!');
`,

        java: `// Merge Sort - Java
public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    private static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        int[] L = new int[n1];
        int[] R = new int[n2];
        
        for (int i = 0; i < n1; i++) L[i] = arr[left + i];
        for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
        
        int i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k++] = L[i++];
            } else {
                arr[k++] = R[j++];
            }
        }
        
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        mergeSort(arr, 0, arr.length - 1);
    }
}
`,

        python: `# Merge Sort - Python

def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

arr = [64, 34, 25, 12, 22, 11, 90]
print(merge_sort(arr))
`,

        cpp: `// Merge Sort - C++
#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> L(arr.begin() + left, arr.begin() + mid + 1);
    vector<int> R(arr.begin() + mid + 1, arr.begin() + right + 1);
    
    int i = 0, j = 0, k = left;
    
    while (i < L.size() && j < R.size()) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    
    while (i < L.size()) arr[k++] = L[i++];
    while (j < R.size()) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    mergeSort(arr, 0, arr.size() - 1);
    return 0;
}
`,

        go: `// Merge Sort - Go
package main

import "fmt"

func merge(arr []int, left, mid, right int) {
    L := make([]int, mid-left+1)
    R := make([]int, right-mid)
    
    copy(L, arr[left:mid+1])
    copy(R, arr[mid+1:right+1])
    
    i, j, k := 0, 0, left
    
    for i < len(L) && j < len(R) {
        if L[i] <= R[j] {
            arr[k] = L[i]
            i++
        } else {
            arr[k] = R[j]
            j++
        }
        k++
    }
    
    for i < len(L) { arr[k] = L[i]; i++; k++ }
    for j < len(R) { arr[k] = R[j]; j++; k++ }
}

func mergeSort(arr []int, left, right int) {
    if left < right {
        mid := left + (right-left)/2
        mergeSort(arr, left, mid)
        mergeSort(arr, mid+1, right)
        merge(arr, left, mid, right)
    }
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    mergeSort(arr, 0, len(arr)-1)
    fmt.Println(arr)
}
`,
    },
};
