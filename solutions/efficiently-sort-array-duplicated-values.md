# Efficiently sort an array with many duplicated values

> Source: https://www.techiedelight.com/efficiently-sort-array-duplicated-values/

Given an integer array with many duplicated elements, write an algorithm to efficiently sort it in linear time, where the order of equal elements doesn’t matter.

For example,

**Input:** { 4, 2, 40, 10, 10, 1, 4, 2, 1, 10, 40 } **Output:** { 1, 1, 2, 2, 4, 4, 10, 10, 10, 40, 40 }

> 

A simple solution would be to use efficient sorting algorithms like [Merge Sort](https://techiedelight.com/merge-sort/), [Quicksort](https://techiedelight.com/quicksort/), [Heapsort](https://techiedelight.com/heap-sort-place-place-implementation-c-c/), etc., that can solve this problem in O(n.log(n)) time, but those will not take advantage of the fact that there are many duplicated values in the array.

A better approach is to use a [counting sort](https://techiedelight.com/counting-sort-algorithm-implementation/). This will bring down the time complexity to O(n + k), where `n` is the size of the input and `k` is the input range. Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>
#include <string.h>

#define RANGE 100

// Function to efficiently sort an array with many duplicated values
// using the counting sort algorithm
void customSort(int arr[], int n)
{
    // create a new array to store counts of elements in the input array
    // `freq[i]` stores the total number of items with key equal to `i`
    int freq[RANGE];

    // initialize array by 0
    memset(freq, 0, sizeof(freq));

    // using the value of elements in the input array as an index,
    // update their frequencies in the new array
    for (int i = 0; i < n; i++) {
        freq[arr[i]]++;
    }

    // overwrite the input array with sorted order
    int k = 0;
    for (int i = 0; i < RANGE; i++)
    {
        while (freq[i]--) {
            arr[k++] = i;
        }
    }
}

int main()
{
    int arr[] = { 4, 2, 40, 10, 10, 1, 4, 2, 1, 10, 40 };
    int n = sizeof(arr) / sizeof(arr[0]);

    customSort(arr, n);

    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}
```

**Output:** 1 1 2 2 4 4 10 10 10 40 40

##

```java
import java.util.Arrays;

class Main
{
    public static final int RANGE = 100;

    // Function to efficiently sort an array with many duplicated values
    // using the counting sort algorithm
    public static void customSort(int[] arr)
    {
        // create a new array to store counts of elements in the input array
        int[] freq = new int[RANGE];

        // using the value of elements in the input array as an index,
        // update their frequencies in the new array
        for (int i: arr) {
            freq[i]++;
        }

        // overwrite the input array with sorted order
        int k = 0;
        for (int i = 0; i < RANGE; i++)
        {
            while (freq[i]-- > 0) {
                arr[k++] = i;
            }
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 4, 2, 40, 10, 10, 1, 4, 2, 1, 10, 40 };

        customSort(arr);

        System.out.println(Arrays.toString(arr));
    }
}
```

##

```python3
RANGE = 100

# Function to efficiently sort a list with many duplicated values
# using the counting sort algorithm
def customSort(A):

    # create a new list to store counts of elements in the input list
    freq = [0] * RANGE

    # using the value of elements in the input list as an index,
    # update their frequencies in the new list
    for i in A:
        freq[i] = freq[i] + 1

    # overwrite the input list with sorted order
    k = 0
    for i in range(RANGE):
        while freq[i] > 0:
            A[k] = i
            freq[i] = freq[i] - 1
            k = k + 1

if __name__ == '__main__':

    A = [4, 2, 40, 10, 10, 1, 4, 2, 1, 10, 40]

    customSort(A)
    print(A)
```

The problem with the counting sort is its high space complexity O(k) when `k >> n`, i.e., variation in keys is significantly greater than the total number of items. Also, the program will only work for **positive integers**. [Here](https://techiedelight.com/compiler/?run=sWen5P) is another implementation that calculates the exact range of array elements instead of making any assumption by calculating the difference between the maximum and minimum key values.

We can also use a [hash table](https://techiedelight.com/hashing-in-data-structure/) to solve this problem effectively. The idea is to:

  1. Iterate through the array once and store the number of occurrences of individual elements in a hash table.
  2. [Sort the unique elements](https://techiedelight.com/sort-array-ascending-order-cpp/) present in the hash table according to the natural ordering.
  3. Overwrite the input array with sorted elements depending on frequencies stored in the hash table.

The time complexity of this solution would be O(n.log(k)), where `k` is the total number of unique elements present in the input of size `n`, which can be much less than O(n.log(n)) if the range of input elements is small. The additional space used by the program is O(k). Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <map>
using namespace std;

// Function to efficiently sort an array with many duplicated values
void customSort(int arr[], int n)
{
    // create an empty map to store the frequency of array elements
    map<int, int> freq;

    // store distinct values in the input array as keys and
    // their respective counts as values
    for (int i = 0; i < n; i++) {
        freq[arr[i]]++;
    }

    // sort the map according to its keys' natural ordering

    // since we have used `std::map` instead of `std::unordered_map`,
    // keys are already sorted by default

    // traverse the sorted map and overwrite the input array with sorted elements
    int i = 0;
    for (auto it: freq)
    {
        while (it.second--) {
            arr[i++] = it.first;
        }
    }
}

int main()
{
    int arr[] = { 4, 2, 40, 10, 10, 1, 4, 2, 1, 10, 40 };
    int n = sizeof(arr) / sizeof(arr[0]);

    customSort(arr, n);

    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }

    return 0;
}
```

**Output:** 1 1 2 2 4 4 10 10 10 40 40

##

```java
import java.util.Arrays;
import java.util.Map;
import java.util.TreeMap;

class Main
{
    // Function to efficiently sort an array with many duplicated values
    public static void customSort(int[] arr)
    {
        // create an empty `TreeMap` to store the frequency of array elements
        Map<Integer, Integer> freq = new TreeMap<>();

        // store distinct values in the input array as keys and
        // their respective counts as values
        for (int i: arr) {
            freq.put(i, freq.getOrDefault(i, 0) + 1);
        }

        // sort the map according to its keys' natural ordering

        // since we have used `TreeMap` instead of `HashMap`,
        // keys are already sorted by default

        // traverse the sorted map and overwrite the input array with sorted elements
        int i = 0;
        for (var entry: freq.entrySet())
        {
            int value = entry.getValue();
            while (value-- > 0) {
                arr[i++] = entry.getKey();
            }
        }
    }

    public static void main(String[] args)
    {
        int[] arr = { 4, 2, 40, 10, 10, 1, 4, 2, 1, 10, 40 };

        customSort(arr);
        System.out.println(Arrays.toString(arr));
    }
}
```

##

```python3
# Function to efficiently sort a list with many duplicated values
def customSort(A):

    # create an empty dictionary to store the frequency of list elements
    freq = {}

    # store distinct values in the input list as keys and
    # their respective counts as values
    for i in A:
        freq[i] = freq.get(i, 0) + 1

    # sort the dictionary according to its keys' natural ordering and
    # traverse the sorted dictionary and overwrite the input list with
    # sorted elements
    i = 0
    for key in sorted(freq.keys()):
        val = freq.get(key)
        while val > 0:
            A[i] = key
            i = i + 1
            val = val - 1

if __name__ == '__main__':

    A = [4, 2, 40, 10, 10, 1, 4, 2, 1, 10, 40]

    customSort(A)
    print(A)
```
