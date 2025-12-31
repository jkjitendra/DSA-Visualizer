import { AlgorithmCodeTemplates } from './types';

export const cocktailShakerSortCode: AlgorithmCodeTemplates = {
  algorithmId: 'cocktail-shaker-sort',
  algorithmName: 'Cocktail Shaker Sort',
  category: 'sorting',
  templates: {
    javascript: `// Cocktail Shaker Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), log(msg)

function cocktailShakerSort(arr) {
  const n = arr.length;
  let start = 0;
  let end = n - 1;
  let swapped = true;
  
  log('Starting Cocktail Shaker Sort');
  
  while (swapped) {
    swapped = false;
    
    // Forward pass
    for (let i = start; i < end; i++) {
      compare(i, i + 1);
      if (arr[i] > arr[i + 1]) {
        swap(i, i + 1);
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    mark(end, 'sorted');
    end--;
    
    if (!swapped) break;
    swapped = false;
    
    // Backward pass
    for (let i = end; i > start; i--) {
      compare(i - 1, i);
      if (arr[i - 1] > arr[i]) {
        swap(i - 1, i);
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        swapped = true;
      }
    }
    mark(start, 'sorted');
    start++;
  }
  
  // Mark remaining as sorted
  for (let i = start; i <= end; i++) {
    mark(i, 'sorted');
  }
  
  log('Sorting complete!');
  return arr;
}

cocktailShakerSort(inputArray);
`,

    java: `// Cocktail Shaker Sort - Java
public class CocktailShakerSort {
    public static void cocktailShakerSort(int[] arr) {
        int n = arr.length;
        int start = 0, end = n - 1;
        boolean swapped = true;
        
        while (swapped) {
            swapped = false;
            
            for (int i = start; i < end; i++) {
                if (arr[i] > arr[i + 1]) {
                    int temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                }
            }
            end--;
            
            if (!swapped) break;
            swapped = false;
            
            for (int i = end; i > start; i--) {
                if (arr[i - 1] > arr[i]) {
                    int temp = arr[i - 1];
                    arr[i - 1] = arr[i];
                    arr[i] = temp;
                    swapped = true;
                }
            }
            start++;
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        cocktailShakerSort(arr);
    }
}
`,

    python: `# Cocktail Shaker Sort - Python

def cocktail_shaker_sort(arr):
    n = len(arr)
    start, end = 0, n - 1
    swapped = True
    
    while swapped:
        swapped = False
        
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        end -= 1
        
        if not swapped:
            break
        swapped = False
        
        for i in range(end, start, -1):
            if arr[i - 1] > arr[i]:
                arr[i - 1], arr[i] = arr[i], arr[i - 1]
                swapped = True
        start += 1
    
    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
print(cocktail_shaker_sort(arr))
`,

    cpp: `// Cocktail Shaker Sort - C++
#include <iostream>
#include <vector>
using namespace std;

void cocktailShakerSort(vector<int>& arr) {
    int n = arr.size();
    int start = 0, end = n - 1;
    bool swapped = true;
    
    while (swapped) {
        swapped = false;
        
        for (int i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr[i], arr[i + 1]);
                swapped = true;
            }
        }
        end--;
        
        if (!swapped) break;
        swapped = false;
        
        for (int i = end; i > start; i--) {
            if (arr[i - 1] > arr[i]) {
                swap(arr[i - 1], arr[i]);
                swapped = true;
            }
        }
        start++;
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    cocktailShakerSort(arr);
    return 0;
}
`,

    go: `// Cocktail Shaker Sort - Go
package main

import "fmt"

func cocktailShakerSort(arr []int) {
    n := len(arr)
    start, end := 0, n-1
    swapped := true
    
    for swapped {
        swapped = false
        
        for i := start; i < end; i++ {
            if arr[i] > arr[i+1] {
                arr[i], arr[i+1] = arr[i+1], arr[i]
                swapped = true
            }
        }
        end--
        
        if !swapped {
            break
        }
        swapped = false
        
        for i := end; i > start; i-- {
            if arr[i-1] > arr[i] {
                arr[i-1], arr[i] = arr[i], arr[i-1]
                swapped = true
            }
        }
        start++
    }
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    cocktailShakerSort(arr)
    fmt.Println(arr)
}
`,
  },
};
