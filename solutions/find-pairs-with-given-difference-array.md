# Find pairs with difference `k` in an array

> Source: https://www.techiedelight.com/find-pairs-with-given-difference-array/

Given an unsorted integer array, print all pairs with a given difference `k` in it.

For example,

**Input:** arr = [1, 5, 2, 2, 2, 5, 5, 4] k = 3 **Output:** (2, 5) and (1, 4)

> 

A naive solution would be to consider every pair in a given array and return if the desired difference is found. The time complexity of this solution would be O(n2), where `n` is the size of the input.

We can use a set to solve this problem in linear time. The idea is to insert each array element `arr[i]` into a set. We also check if element `(arr[i] - diff)` or `(arr[i] + diff)` already exists in the set or not. If the element is seen before, print the pair `(arr[i], arr[i] - diff)` or `(arr[i] + diff, arr[i])`.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_set>
#include <algorithm>
using namespace std;

// Function to find a pair with the given difference in an array.
// This method does not handle duplicates in the array
void findPair(int arr[], int n, int diff)
{
    // array is unsorted

    // take an empty set
    unordered_set<int> set;

    // do for every array element
    for (int i = 0; i < n; i++)
    {
        // check if pair with the given difference `(arr[i], arr[i]-diff)` exists
        if (set.find(arr[i] - diff) != set.end()) {
            cout << "(" << arr[i] << ", " << arr[i] - diff<< ")\n";
        }

        // check if pair with the given difference `(arr[i]+diff, arr[i])` exists
        if (set.find(arr[i] + diff) != set.end()) {
            cout << "(" << arr[i] + diff << ", " << arr[i] << ")\n";
        }

        // insert the current element into the set
        set.insert(arr[i]);
    }
}

int main()
{
    int arr[] = { 1, 5, 2, 2, 2, 5, 5, 4};
    int diff = 3;

    int n = sizeof(arr) / sizeof(arr[0]);

    findPair(arr, n, diff);

    return 0;
}
```

**Output:** (5, 2) (5, 2) (5, 2) (5, 2) (5, 2) (4, 1)

##

```java
import java.util.HashSet;
import java.util.Set;

class Main
{
    // Function to find a pair with the given difference in the array.
    // This method does not handle duplicates in the array
    public static void findPair(int[] A, int diff)
    {
        // array is unsorted

        // take an empty set
        Set<Integer> set = new HashSet<>();

        // do for every array element
        for (int i: A)
        {
            // check if pair with the given difference `(i, i-diff)` exists
            if (set.contains(i - diff)) {
                System.out.println("(" + i + ", " + (i - diff) + ")");
            }

            // check if pair with the given difference `(i + diff, i)` exists
            if (set.contains(i + diff)) {
                System.out.println("(" + (i + diff) + ", " + i + ")");
            }

            // insert the current element into the set
            set.add(i);
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 5, 2, 2, 2, 5, 5, 4};
        int diff = 3;

        findPair(A, diff);
    }
}
```

##

```python3
# Function to find a pair with the given difference in the list.
# This method does not handle duplicates in the list
def findPair(A, diff):

    # list is unsorted

    # take an empty set
    s = set()

    # do for every element in the list
    for i in A:

        # check if pair with the given difference `(i, i-diff)` exists
        if i - diff in s:
            print((i, i - diff))

        # check if pair with the given difference `(i + diff, i)` exists
        if i + diff in s:
            print((i + diff, i))

        # insert the current element into the set
        s.add(i)

if __name__ == '__main__':

    A = [1, 5, 2, 2, 2, 5, 5, 4]
    diff = 3

    findPair(A, diff)
```

The time complexity of the above solution is O(n) and requires O(n) extra space. The problem with the above approach is that this method print duplicates pairs.

How to handle duplicates?

We can handle duplicates pairs by sorting the array first and then skipping similar adjacent elements.

```cpp
#include <iostream>
#include <unordered_set>
#include <algorithm>
using namespace std;

// Function to find a pair with the given difference in an array.
// This method handles duplicates in the array
void findPair(int arr[], int n, int diff)
{
    // sort array in ascending order
    sort(arr, arr + n);

    // take an empty set
    unordered_set<int> set;

    // do for every array element
    for (int i = 0; i < n; i++)
    {
        // to avoid printing duplicates (skip adjacent duplicates)
        while (i+1 < n && arr[i] == arr[i+1]) {
            i++;
        }

        // check if pair with the given difference `(arr[i], arr[i]-diff)` exists
        if (set.find(arr[i] - diff) != set.end()) {
            cout << "(" << arr[i] << ", " << arr[i] - diff << ")\n";
        }

        // check if pair with the given difference `(arr[i]+diff, arr[i])` exists
        if (set.find(arr[i] + diff) != set.end()) {
            cout << "(" << arr[i] + diff << ", " << arr[i] << ")\n";
        }

        // insert the current element into the set
        set.insert(arr[i]);
    }
}

int main()
{
    int arr[] = { 1, 5, 2, 2, 2, 5, 5, 4};
    int diff = -3;

    int n = sizeof(arr) / sizeof(arr[0]);

    findPair(arr, n, diff);

    return 0;
}
```

**Output:** (1, 4) (2, 5)

##

```java
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class Main
{
    // Function to find a pair with the given difference in the array.
    // This method handles duplicates in the array
    public static void findPair(int[] A, int diff)
    {
        // sort array in ascending order
        Arrays.sort(A);

        // take an empty set
        Set<Integer> set = new HashSet<>();

        // do for every array element
        for (int i = 0; i < A.length; i++)
        {
            // to avoid printing duplicates (skip adjacent duplicates)
            while (i + 1 < A.length && A[i] == A[i+1]) {
                i++;
            }

            // check if pair with the given difference `(A[i], A[i]-diff)` exists
            if (set.contains(A[i] - diff)) {
                System.out.println("(" + A[i] + ", " + (A[i] - diff) + ")");
            }

            // check if pair with the given difference `(A[i]+diff, A[i])` exists
            if (set.contains(A[i] + diff)) {
                System.out.println("(" + (A[i] + diff) + ", " + A[i] + ")");
            }

            // insert the current element into the set
            set.add(A[i]);
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 5, 2, 2, 2, 5, 5, 4};
        int diff = -3;

        findPair(A, diff);
    }
}
```

##

```python3
# Function to find a pair with the given difference in the list.
# This method handles duplicates in the list
def findPair(A, diff):

    # sort list in ascending order
    A.sort()

    # take an empty set
    s = set()

    # do for every element in the list
    i = 0
    while i < len(A):

        # to avoid printing duplicates (skip adjacent duplicates)
        while i + 1 < len(A) and A[i] == A[i + 1]:
            i = i + 1

        # check if pair with the given difference `(A[i], A[i]-diff)` exists
        if A[i] - diff in s:
            print((A[i], A[i] - diff))

        # check if pair with the given difference `(A[i]+diff, A[i])` exists
        if A[i] + diff in s:
            print((A[i] + diff, A[i]))

        # insert the current element into the set
        s.add(A[i])

        i = i + 1

if __name__ == '__main__':

    A = [1, 5, 2, 2, 2, 5, 5, 4]
    diff = -3

    findPair(A, diff)
```

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the input.

**Also See:**

> [Find pairs with difference `k` in an array ( Constant Space Solution)](https://techiedelight.com/find-pairs-given-difference-k-array-constant-space-solution/)
