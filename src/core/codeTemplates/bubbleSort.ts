import { AlgorithmCodeTemplates } from './types';

export const bubbleSortCode: AlgorithmCodeTemplates = {
    algorithmId: 'bubble-sort',
    algorithmName: 'Bubble Sort',
    category: 'sorting',
    templates: {
        javascript: `// Bubble Sort - JavaScript
// Visualization hooks: compare(i, j), swap(i, j), mark(i, type), visit(i), log(msg)

function bubbleSort(arr) {
    const n = arr.length;
    log(\`Starting Bubble Sort with \${n} elements\`);
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Visualize comparison
      compare(j, j + 1);
      
      if (arr[j] > arr[j + 1]) {
        // Visualize and perform swap
        swap(j, j + 1);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    // Mark position as sorted
    mark(n - i - 1, 'sorted');
  }
  
  // Mark first element as sorted
  mark(0, 'sorted');
  log('Sorting complete!');
  return arr;
}

// Run the algorithm
bubbleSort(inputArray);
`,

        java: `// Bubble Sort - Java
public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                // Compare adjacent elements
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        
        System.out.print("Sorted: ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}
`,

        python: `# Bubble Sort - Python

def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n - 1):
        for j in range(n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    
    return arr


# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = bubble_sort(arr)
print(f"Sorted: {sorted_arr}")
`,

        cpp: `// Bubble Sort - C++
#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    bubbleSort(arr);
    
    cout << "Sorted: ";
    for (int num : arr) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}
`,

        go: `// Bubble Sort - Go
package main

import "fmt"

func bubbleSort(arr []int) {
    n := len(arr)
    
    for i := 0; i < n-1; i++ {
        for j := 0; j < n-i-1; j++ {
            // Compare adjacent elements
            if arr[j] > arr[j+1] {
                // Swap elements
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    bubbleSort(arr)
    
    fmt.Print("Sorted: ")
    for _, num := range arr {
        fmt.Printf("%d ", num)
    }
    fmt.Println()
}
`,
    },
};
