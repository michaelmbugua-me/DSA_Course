# Sort an array based on order defined by another array

> Source: https://www.techiedelight.com/custom-sort-sort-elements-array-order-elements-defined-second-array/

Given two integer arrays, reorder elements of the first array by the order of elements defined by the second array.

The elements that are not present in the second array but present in the first array should be appended at the end sorted. The second array can contain some extra elements which are not part of the first array.

For example,

**Input:** first = [5, 8, 9, 3, 5, 7, 1, 3, 4, 9, 3, 5, 1, 8, 4] second = [3, 5, 7, 2] **Output:** [3, 3, 3, 5, 5, 5, 7, 1, 1, 4, 4, 8, 8, 9, 9]

> 

## 1\. Using Hashing

The idea is to count the frequency of each element of the first array and store it in a [hash table](https://techiedelight.com/hashing-in-data-structure/). Now for each element of the second array, check if the element is present on the map or not. If it is present on the map, print the element `n` number of times, where `n` is the frequency of that element in the first array. We also remove that element from the map so that we are only left with only present elements in the first array (but not present in the second array). To append them at the end, they need to be sorted.

Note that keys are already ordered in `std::map` or `TreeMap`, but we get O(log(n)) insertion and retrieval time. If we use `std::unordered_map` or `HashMap`, we get O(1) insertion and retrieval time, but will require sorting since its keys are unordered.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <unordered_map>
#include <algorithm>
using namespace std;

void customSort(int first[], int second[], int m, int n)
{
    // map to store the frequency of each element of the first array
    unordered_map<int, int> freq;

    // find the frequency of each element of the first array and
    // store it in a map
    for (int i = 0; i < m; i++) {
        freq[first[i]]++;
    }

    // Note that once we have the frequencies of all elements of
    // the first array, we can overwrite elements of the first array

    int index = 0;

    // do for every element of the second array
    for (int i = 0; i < n; i++)
    {
        // If the current element is present on the map, print it `n` times
        // where `n` is the frequency of that element in the first array
        while (freq[second[i]])
        {
            first[index++] = second[i];
            freq[second[i]]--;
        }

        // erase the element from the map
        freq.erase(second[i]);
    }

    // Now we are left with elements only present in the first array,
    // but not in the second array.

    // Sort the remaining elements present on the map (Note that the keys are
    // already sorted if we use `std::map`)

    int i = index;
    for (auto it = freq.begin(); it != freq.end(); it++)
    {
        while (it->second--) {
            first[index++] = (it->first);
        }
    }

    // sort the remaining elements
    sort(first + i, first + index);
}

// Utility function to print the first `n` elements of an array `arr`
void printArray(int arr[], int n)
{
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main()
{
    int first[] = { 5, 8, 9, 3, 5, 7, 1, 3, 4, 9, 3, 5, 1, 8, 4 };
    int second[] = { 3, 5, 7, 2 };

    int m = sizeof(first) / sizeof(first[0]);
    int n = sizeof(second) / sizeof(second[0]);

    customSort(first, second, m, n);

    cout << "The array after sorting is ";
    printArray(first, m);

    return 0;
}
```

**Output:** The array after sorting is 3 3 3 5 5 5 7 1 1 4 4 8 8 9 9

##

```java
import java.util.Arrays;
import java.util.Map;
import java.util.TreeMap;

class Main
{
    public static void customSort(int[] first, int[] second)
    {
        // map to store the frequency of each element of the first array
        Map<Integer, Integer> freq = new TreeMap<>();

        // find the frequency of each element of the first array and
        // store it in a map
        for (int i: first) {
            freq.put(i, freq.getOrDefault(i, 0) + 1);
        }

        // Note that once we have the frequencies of all elements of
        // the first array, we can overwrite elements of the first array

        int index = 0;

        // do for every element of the second array
        for (int i: second)
        {
            // If the current element is present on the map, print it `n` times
            // where `n` is the frequency of that element in the first array
            int n = freq.getOrDefault(i, 0);
            while (n-- > 0) {
                first[index++] = i;
            }

            // erase the element from the map
            freq.remove(i);
        }

        // Now we are left with elements only present in the first array,
        // but not in the second array.

        // Sort the remaining elements present on the map (Note that the keys are
        // already sorted since we are using `TreeMap`)

        for (var entry: freq.entrySet())
        {
            int count = entry.getValue();
            while (count-- > 0) {
                first[index++] = entry.getKey();
            }
        }
    }

    public static void main(String[] args)
    {
        int[] first = { 5, 8, 9, 3, 5, 7, 1, 3, 4, 9, 3, 5, 1, 8, 4 };
        int[] second = { 3, 5, 7, 2 };

        customSort(first, second);
        System.out.println("The array after sorting is " + Arrays.toString(first));
    }
}
```

##

```python3
def customSort(first, second):

    # dictionary to store the frequency of each element of the first list
    freq = {}

    # find the frequency of each element of the first list and
    # store it in a dictionary.
    for i in first:
        freq[i] = freq.get(i, 0) + 1

    # Note that once we have the frequencies of all elements of
    # the first list, we can overwrite elements of the first list

    index = 0

    # do for every element of the second list
    for i in second:

        # If the current element is present in the dictionary, print it `n` times
        # where `n` is the frequency of that element in the first list
        n = freq.setdefault(i, 0)
        for _ in range(n):
            first[index] = i
            index = index + 1

        # erase the element from the dictionary
        freq.pop(i)

    # Now we are left with elements only present in the first list
    # but not in the second list.

    # sort the remaining elements present on the dictionary
    for key in sorted(freq.keys()):
        count = freq.get(key)
        while count:
            first[index] = key
            count = count - 1
            index = index + 1

if __name__ == '__main__':

    first = [5, 8, 9, 3, 5, 7, 1, 3, 4, 9, 3, 5, 1, 8, 4]
    second = [3, 5, 7, 2]

    customSort(first, second)
    print("After sorting the list is:", first)
```

The time complexity of the above solution is O(m.log(m) + n), where `m` and `n` are the total number of elements in the first and second array, respectively.

## 2\. Using Comparator

We can also write a custom comparison method to solve this problem. Let the two elements to be compared are `x` and `y`. Then

  1. If both `x` and `y` are present in the second array, then the lower index element in the second array should come first.
  2. If only one of `x` or `y` is present in the second array, then the second array element should come first.
  3. If both elements are not present in the second array, then the default ordering will be considered.

The algorithm can be implemented as follows in Java:

```java
import java.util.*;

class CustomComparator implements Comparator<Integer>
{
    private Map<Integer, Integer> map;
    public CustomComparator(Map<Integer, Integer> map) {
        this.map = map;
    }

    public int compare(Integer x, Integer y)
    {
        if (map.containsKey(x) && map.containsKey(y)) {
            return map.get(x) - map.get(y);
        }
        else if (map.containsKey(y)) {
            return 1;
        }
        else if (map.containsKey(x)) {
            return -1;
        }
        else {
            return x - y;
        }
    }
}

class Main
{
    public static void main(String[] args)
    {
        // Use Wrapper class
        List<Integer> first = Arrays.asList(5, 8, 9, 3, 5, 7, 1, 3, 4, 9, 3, 5, 1, 8, 4);
        List<Integer> second = Arrays.asList(3, 5, 7, 2);

        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < second.size(); i++) {
            map.put(second.get(i), i);
        }

        first.sort(new CustomComparator(map));
        System.out.println(first);
    }
}
```

**Output:** [3, 3, 3, 5, 5, 5, 7, 1, 1, 4, 4, 8, 8, 9, 9]
