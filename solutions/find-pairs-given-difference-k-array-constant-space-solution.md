# Find pairs with difference `k` in an array | Constant Space Solution

> Source: https://www.techiedelight.com/find-pairs-given-difference-k-array-constant-space-solution/

Given an unsorted integer array, find all pairs with a given difference `k` in it without using any extra space.

For example,

**Input:** arr = [1, 5, 2, 2, 2, 5, 5, 4] k = 3 **Output:** (2, 5) and (1, 4)

> 

We have discussed a linear time solution in the [previous post](https://techiedelight.com/find-pairs-with-given-difference-array/) that takes O(n) extra space for an input containing `n` items. The solution inserts each array element `arr[i]` in a set and check if element `(arr[i] - diff)` or `(arr[i] + diff)` already exists in the set or not. If the element is seen before, it prints the pair `(arr[i], arr[i] - diff)` or `(arr[i] + diff, arr[i])`.

We can avoid using extra space by performing [binary search](https://techiedelight.com/binary-search/) for element `(arr[i] - diff) or (arr[i] + diff)` instead of using [hashing](https://techiedelight.com/hashing-in-data-structure/). This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Function to find a pair with the given difference in an array.
// This method handles duplicates in the array
void findPair(int arr[], int n, int diff)
{
    // sort array in ascending order
    sort(arr, arr + n);

    // do for each array element
    for (int i = 0; i < n; i++)
    {
        // to avoid printing duplicates (skip adjacent duplicates)
        while (i < n - 1 && arr[i] == arr[i+1]) {
            i++;
        }

        // perform a binary search on element `arr[i]-diff`
        if (binary_search(arr, arr + n, arr[i] - diff)) {
            cout << "(" << arr[i] << ", " << arr[i] - diff << ")\n";
        }
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

**Output:** (4, 1) (5, 2)

##

```java
import java.util.Arrays;

class Main
{
    // Function to find a pair with the given difference in the array.
    // This method handles duplicates in the array
    public static void findPair(int[] A, int diff)
    {
        // sort array in ascending order
        Arrays.sort(A);

        // do for each array element
        for (int i = 0; i < A.length; i++)
        {
            // to avoid printing duplicates (skip adjacent duplicates)
            while (i < A.length - 1 && A[i] == A[i+1]) {
                i++;
            }

            // perform a binary search on element `A[i]-diff`
            if (Arrays.binarySearch(A, A[i] - diff) >= 0) {
                System.out.println("(" + A[i] + ", " + (A[i] - diff) + ")");
            }
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
def binarySearch(sequence, value):

    (low, high) = 0, len(sequence) - 1
    while low <= high:
        mid = (low + high) // 2
        if sequence[mid] < value:
            low = mid + 1
        elif value < sequence[mid]:
            high = mid - 1
        else:
            return mid
    return -1

# Function to find a pair with the given difference in a list.
# This method handles duplicates in the list
def findPair(A, diff):

    # sort list in ascending order
    A.sort()

    # do for each element in the list
    i = 0
    while i < len(A):

        # to avoid printing duplicates (skip adjacent duplicates)
        while i < len(A) - 1 and A[i] == A[i + 1]:
            i = i + 1

        # perform a binary search on element `A[i]-diff`
        if binarySearch(A, A[i] - diff) >= 0:
            print((A[i], A[i] - diff))

        i = i + 1

if __name__ == '__main__':

    A = [1, 5, 2, 2, 2, 5, 5, 4]
    diff = 3

    findPair(A, diff)
```

The time complexity of the above solution is O(n.log(n)).

## Alternate Approach

The idea is somewhat similar to [finding a pair with the given sum](https://techiedelight.com/find-pair-with-given-sum-array/) in the array. But instead of starting from two endpoints of the array, we start from the beginning of the sorted array.

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Function to find a pair with the given difference in an array.
// This method handles duplicates in the array
void findPair(int arr[], int n, int diff)
{
    // sort array in ascending order
    sort(arr, arr + n);

    // maintain two indices in the array
    int i = 0, j = 0;

    // run till the end of the array is reached
    while (i < n && j < n)
    {
        // to avoid printing duplicates
        while (i < n - 1 && arr[i] == arr[i+1]) {
            i++;
        }

        while (j < n - 1 && arr[j] == arr[j+1]) {
            j++;
        }

        // increment `i` if the current difference is more than the
        // desired difference
        if (arr[j] - arr[i] > diff) {
            i++;
        }

        // increment `j` if the current difference is less than the
        // desired difference
        else if (arr[j] - arr[i] < diff) {
            j++;
        }

        // print the pair and increment both `i` & `j` if the current
        // difference is the same as the desired difference
        else {
            cout << "(" << arr[j] << ", " << arr[i] << ")\n";
            i++, j++;
        }
    }
}

int main()
{
    int arr[] = { 1, 5, 2, 2, 2, 5, 5, 4 };
    int diff = 3;

    int n = sizeof(arr) / sizeof(arr[0]);

    findPair(arr, n, diff);

    return 0;
}
```

**Output:** (4, 1) (5, 2)

##

```java
import java.util.Arrays;

class Main
{
    // Function to find a pair with the given difference in the array.
    // This method handles duplicates in the array
    public static void findPair(int[] A, int diff)
    {
        // sort array in ascending order
        Arrays.sort(A);

        // maintain two indices in the array
        int i = 0, j = 0;
        int n = A.length;

        // run till the end of the array is reached
        while (i < n && j < n)
        {
            // to avoid printing duplicates
            while (i < n - 1 && A[i] == A[i+1]) {
                i++;
            }

            while (j < n - 1 && A[j] == A[j+1]) {
                j++;
            }

            // increment `i` if the current difference is more than
            // the desired difference
            if (A[j] - A[i] > diff) {
                i++;
            }

            // increment `j` if the current difference is less than
            // the desired difference
            else if (A[j] - A[i] < diff) {
                j++;
            }

            // print the pair and increment both `i` & `j` if the current
            // difference is the same as the desired difference
            else {
                System.out.println("(" + A[j] + ", " + A[i] + ")");
                i++;
                j++;
            }
        }
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 5, 2, 2, 2, 5, 5, 4 };
        int diff = 3;

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

    # maintain two indices in the list
    i = j = 0
    n = len(A)

    # run till the end of the list is reached
    while i < n and j < n:

        # to avoid printing duplicates
        while i < n - 1 and A[i] == A[i + 1]:
            i = i + 1

        while j < n - 1 and A[j] == A[j + 1]:
            j = j + 1

        # increment `i` if the current difference is more than the desired difference
        if A[j] - A[i] > diff:
            i = i + 1

        # increment `j` if the current difference is less than the desired difference
        elif A[j] - A[i] < diff:
            j = j + 1

        # print the pair and increment both `i` & `j` if the current difference is
        # the same as the desired difference
        else:
            print((A[j], A[i]))
            i = i + 1
            j = j + 1

if __name__ == '__main__':

    A = [1, 5, 2, 2, 2, 5, 5, 4]
    diff = 3

    findPair(A, diff)
```

The time complexity of the above solution is O(n.log(n)).
