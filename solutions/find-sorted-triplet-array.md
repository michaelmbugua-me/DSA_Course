# Find the sorted triplet in an array

> Source: https://www.techiedelight.com/find-sorted-triplet-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array `A`, efficiently find a sorted triplet such that `A[i] < A[j] < A[k]` and `0 <= i < j < k < n`, where `n` is the array size.

For example,

**Input:** A[] = { 5, 4, 3, 7, 6, 1, 9 } **Output:** Any one of the following triplets: (5, 7, 9) (4, 7, 9) (3, 7, 9) (5, 6, 9) (4, 6, 9) (3, 6, 9)

> 

A simple solution would be to traverse the array and, for each index, check if at least one smaller and one larger element exists on its left and right, respectively. If any such index exists, we have found our triplet. The time complexity of this approach is O(n2) since, for each array element, we might end up traversing the whole array again.

We can easily solve this problem in linear time using some extra space. The idea is to create two auxiliary arrays where each index in the first array stores the smaller element’s index to the left, and each index in the second array stores the larger element’s index to the right. After filling up both arrays, find an index with a smaller value present to its left and a higher value to its right. If any such index exists, the triplet is found.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <tuple>
using namespace std;

// Find a sorted triplet in a given array
bool findTriplet(vector<int> const &arr, auto &tuple)
{
    // size of the input array
    int n = arr.size();

    // a sorted triplet is not possible on input having less than 3 elements
    if (n < 3) {
        return false;
    }

    // `min[i] = j`, when `0 <= j < i` and `arr[j] < arr[i]`
    // `min[i] = -1` when `arr[j] > arr[i]` for every index `j < i`
    vector<int> min(n, -1);

    // keep an index to the minimum element found so far
    // while traversing the array from left to right
    int min_index_so_far = 0;

    // start from the 1st index as `min[0]` would be -1
    for (int i = 1; i < n; i++)
    {
        // update `min_index_so_far` if the current index has less value;
        // otherwise, update `min[i]` with the smallest index to its left
        if (arr[i] < arr[min_index_so_far]) {
            min_index_so_far = i;
        }
        else if (arr[i] > arr[min_index_so_far]) {
            min[i] = min_index_so_far;
        }
    }

    // `max[i] = j`, when `i < j < n` and `arr[i] < arr[j]`
    // `max[i] = -1` when `arr[j] < arr[i]` for every index `j > i`
    vector<int> max(n, -1);

    // keep an index to the maximum element found so far
    // while traversing the array from right to left
    int max_index_so_far = n - 1;

    // start from the second last index as `max[n-1]` would be `-1`
    for (int i = n - 2; i >= 0; i--)
    {
        // update `max_index_so_far` if the current index has more value;
        // otherwise, update `max[i]` with the greatest index to its right
        if (arr[i] > arr[max_index_so_far]) {
            max_index_so_far = i;
        }
        else if (arr[i] < arr[max_index_so_far]) {
            max[i] = max_index_so_far;
        }
    }

    // traverse the array again and find an index with both a min
    // element on its left and a max element on its right
    for (int i = 0; i < n; i++)
    {
        if (min[i] != -1 && max[i] != -1)
        {
            // create a tuple of the found triplet and returns true
            tuple = make_tuple(min[i], i, max[i]);
            return true;
        }
    }

    // no triplet found
    return false;
}

int main()
{
    // input array
    vector<int> input = { 5, 4, 3, 7, 6, 1, 9 };

    // create a tuple to store the triplet
    tuple<int, int, int> triplet;

    // find triplet
    if (findTriplet(input, triplet))
    {
        cout << "Triplet found: ("
             << input[get<0>(triplet)] << ", "
             << input[get<1>(triplet)] << ", "
             << input[get<2>(triplet)] << ")";
    }
    else {
        cout << "Triplet not found";
    }

    return 0;
}
```

**Output:** Triplet found: (3, 7, 9)

##

```java
import java.util.Arrays;

// Tuple class
class Tuple<X, Y, Z>
{
    public final X first;       // first field of a tuple
    public final Y second;      // second field of a tuple
    public final Z third;       // third field of a tuple

    // Constructs a new Tuple with specified values
    private Tuple(X first, Y second, Z third)
    {
        this.first = first;
        this.second = second;
        this.third = third;
    }

    // Factory method for creating a Typed Tuple immutable instance
    public static <X, Y, Z> Tuple <X, Y, Z> of(X a, Y b, Z c)
    {
        // calls private constructor
        return new Tuple<>(a, b, c);
    }
}

class Main
{
    // Find a sorted triplet in a given array
    public static Tuple<Integer, Integer, Integer> findTriplet(int[] arr)
    {
        // size of the input array
        int n = arr.length;

        // a sorted triplet is not possible on input having less than 3 elements
        if (n < 3) {
            return null;
        }

        // `min[i] = j`, when `0 <= j < i` and `arr[j] < arr[i]`
        // `min[i] = -1` when `arr[j] > arr[i]` for every index `j < i`
        int[] min = new int[n];
        Arrays.fill(min, -1);

        // keep an index to the minimum element found so far
        // while traversing the array from left to right
        int min_index_so_far = 0;

        // start from the 1st index as `min[0]` would be -1
        for (int i = 1; i < n; i++)
        {
            // update `min_index_so_far` if the current index has less value;
            // otherwise, update `min[i]` with the smallest index to its left
            if (arr[i] < arr[min_index_so_far]) {
                min_index_so_far = i;
            }
            else if (arr[i] > arr[min_index_so_far]) {
                min[i] = min_index_so_far;
            }
        }

        // `max[i] = j`, when `i < j < n` and `arr[i] < arr[j]`
        // `max[i] = -1` when `arr[j] < arr[i]` for every index `j > i`
        int[] max = new int[n];
        Arrays.fill(max, -1);

        // keep an index to the maximum element found so far
        // while traversing the array from right to left
        int max_index_so_far = n - 1;

        // start from the second last index as `max[n-1]` would be `-1`
        for (int i = n - 2; i >= 0; i--)
        {
            // update `max_index_so_far` if the current index has more value;
            // otherwise, update `max[i]` with the greatest index to its right
            if (arr[i] > arr[max_index_so_far]) {
                max_index_so_far = i;
            }
            else if (arr[i] < arr[max_index_so_far]) {
                max[i] = max_index_so_far;
            }
        }

        // traverse the array again and find an index with both a min
        // element on its left and a max element on its right
        for (int i = 0; i < n; i++)
        {
            if (min[i] != -1 && max[i] != -1)
            {
                // create a tuple of the found triplet and returns true
                return Tuple.of(min[i], i, max[i]);
            }
        }

        // no triplet found
        return null;
    }

    public static void main(String[] args)
    {
        // input array
        int[] input = { 5, 4, 3, 7, 6, 1, 9 };

        // create a tuple to store the triplet
        Tuple<Integer, Integer, Integer> triplet = findTriplet(input);

        // find triplet
        if (triplet != null)
        {
            System.out.print("Triplet found: ("
                                    + input[triplet.first] + ", "
                                    + input[triplet.second] + ", "
                                    + input[triplet.third] + ")");
        }
        else {
            System.out.print("Triplet not found");
        }
    }
}
```

##

```python3
# Find a sorted triplet in a given list
def findTriplet(A):

    # size of the input list
    n = len(A)

    # a sorted triplet is not possible on input having less than 3 elements
    if n < 3:
        return ()

    # `min[i] = j`, when `0 <= j < i` and `A[j] < A[i]`
    # `min[i] = -1` when `A[j] > A[i]` for every index `j < i`
    min = [-1] * n

    # keep an index to the minimum element found so far
    # while traversing the list from left to right
    min_index_so_far = 0

    # start from the 1st index as `min[0]` would be -1
    for i in range(1, n):
        # update `min_index_so_far` if the current index has less value;
        # otherwise, update `min[i]` with the smallest index to its left
        if A[i] < A[min_index_so_far]:
            min_index_so_far = i
        elif A[i] > A[min_index_so_far]:
            min[i] = min_index_so_far

    # `max[i] = j`, when `i < j < n` and `A[i] < A[j]`
    # `max[i] = -1` when `A[j] < A[i]` for every index `j > i`
    max = [-1] * n

    # keep an index to the maximum element found so far
    # while traversing the list from right to left
    max_index_so_far = n - 1

    # start from the second last index as `max[n-1]` would be `-1`
    for i in reversed(range(n - 1)):

        # update `max_index_so_far` if the current index has more value;
        # otherwise, update `max[i]` with the greatest index to its right
        if A[i] > A[max_index_so_far]:
            max_index_so_far = i
        elif A[i] < A[max_index_so_far]:
            max[i] = max_index_so_far

    # traverse the list again and find an index with both a min
    # element on its left and a max element on its right
    for i in range(n):
        if min[i] != -1 and max[i] != -1:
            # create a tuple of the found triplet and returns true
            return min[i], i, max[i]

    # no triplet found
    return ()

if __name__ == '__main__':

    # input list
    input = [5, 4, 3, 7, 6, 1, 9]

    # create a tuple to store the triplet
    first, second, third = findTriplet(input)

    # find triplet
    if first:
        print("Triplet found:", (input[first], input[second], input[third]))
    else:
        print("Triplet not found")
```

The time complexity of the above solution is O(n) since the solution iterates over the whole array of size `n` thrice. The extra space required by the solution is O(n) for storing the auxiliary arrays.

We can even solve this problem in linear time and constant extra space. The idea is to traverse the array from left to right and keep track of the minimum element found so far. Maintain two variables, `low` and `mid`, for storing the indices of the first two elements of the triplet. For the first element, which is more than the current minimum, initialize the `low` and `mid` index with the current minimum and current element indices. If we see a better candidate for the middle element, update the `mid` and `low` index. If at any point a value is encountered that is more than the `mid` value, the triplet is located, and we are done.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <vector>
#include <tuple>
using namespace std;

// Find a sorted triplet in a given array
bool findTriplet(vector<int> const &arr, auto &tuple)
{
    // size of the input array
    int n = arr.size();

    // a sorted triplet is not possible on input having less than 3 elements
    if (n < 3)
        return false;

    // keep an index to the minimum element found so far
    // while traversing the array from left to right
    int min_index = 0;

    // stores the index of the first two items in the sorted subsequence
    int low, mid = -1;

    // traverse the array from left to right starting from the 1st index
    for (int i = 1; i < n; i++)
    {
        // if the current element is less than the minimum element found so far
        if (arr[i] <= arr[min_index]) {
            min_index = i;
        }

        // initialize `low` and `mid` index since `arr[i] > arr[min_index]`
        else if (mid == -1) {
            low = min_index;
            mid = i;
        }

        // a smaller candidate is found for the middle element
        else if (arr[i] <= arr[mid]) {
            low = min_index;
            mid = i;
        }

        // triplet is found since `arr[low] < arr[mid] < arr[i]`
        else {
            // create a tuple of the found triplet and returns true
            tuple = make_tuple(low, mid, i);
            return true;
        }
    }

    // no triplet found
    return false;
}

int main()
{
    // input array
    vector<int> input = { 5, 4, 3, 7, 6, 1, 9 };

    // create a tuple to store the triplet
    tuple<int, int, int> triplet;

    // find triplet
    if (findTriplet(input, triplet)) {
        cout << "Triplet found: ("
            << input[get<0>(triplet)] << ", "
            << input[get<1>(triplet)] << ", "
            << input[get<2>(triplet)] << ")";
    }
    else {
        cout << "Triplet not found";
    }

    return 0;
}
```

**Output:** Triplet found: (3, 6, 9)

##

```java
// Tuple class
class Tuple<X,Y,Z>
{
    public final X first;       // first field of a tuple
    public final Y second;      // second field of a tuple
    public final Z third;       // third field of a tuple

    // Constructs a new Tuple with specified values
    private Tuple(X first, Y second, Z third)
    {
        this.first = first;
        this.second = second;
        this.third = third;
    }

    // Factory method for creating a Typed Tuple immutable instance
    public static <X, Y, Z> Tuple <X, Y, Z> of(X a, Y b, Z c)
    {
        // calls private constructor
        return new Tuple<>(a, b, c);
    }
}

class Main
{
    // Find a sorted triplet in a given array
    public static Tuple<Integer, Integer, Integer> findTriplet(int[] arr)
    {
        // size of the input array
        int n = arr.length;

        // a sorted triplet is not possible on input having less than 3 elements
        if (n < 3) {
            return null;
        }

        // keep an index to the minimum element found so far
        // while traversing the array from left to right
        int min_index = 0;

        // stores the index of the first two items in the sorted subsequence
        int low = 0, mid = -1;

        // traverse the array from left to right starting from the 1st index
        for (int i = 1; i < n; i++)
        {
            // if the current element is less than the minimum element found so far
            if (arr[i] <= arr[min_index]) {
                min_index = i;
            }

            // initialize `low` and `mid` index since `arr[i] > arr[min_index]`
            else if (mid == -1)
            {
                low = min_index;
                mid = i;
            }

            // a smaller candidate is found for the middle element
            else if (arr[i] <= arr[mid])
            {
                low = min_index;
                mid = i;
            }

            // triplet is found since `arr[low] < arr[mid] < arr[i]`
            else {
                // create a tuple of the found triplet and returns true
                return Tuple.of(arr[low], arr[mid], arr[i]);
            }
        }

        // no triplet found
        return null;
    }

    public static void main(String[] args)
    {
        // input array
        int[] input = { 5, 4, 3, 7, 6, 1, 9 };

        // create a tuple to store the triplet
        Tuple<Integer, Integer, Integer> triplet = findTriplet(input);

        // find triplet
        if (triplet != null)
        {
            System.out.print("Triplet found: ("
                                    + triplet.first + ", "
                                    + triplet.second + ", "
                                    + triplet.third + ")");
        }
        else {
            System.out.print("Triplet not found");
        }
    }
}
```

##

```python3
# Find a sorted triplet in a given list
def findTriplet(A):

    # size of the input list
    n = len(A)

    # a sorted triplet is not possible on input having less than 3 elements
    if n < 3:
        return ()

    # keep an index to the minimum element found so far
    # while traversing the list from left to right
    min_index = 0

    # stores the index of the first two items in the sorted subsequence
    low = 0
    mid = -1

    # traverse the list from left to right starting from the 1st index
    for i in range(1, n):

        # if the current element is less than the minimum element found so far
        if A[i] <= A[min_index]:
            min_index = i

        # initialize `low` and `mid` index since `A[i] > A[min_index]`
        elif mid == -1:
            low = min_index
            mid = i

        # a smaller candidate is found for the middle element
        elif A[i] <= A[mid]:
            low = min_index
            mid = i

        # triplet is found since `A[low] < A[mid] < A[i]`
        else:
            # create a tuple of the found triplet and returns true
            return A[low], A[mid], A[i]

    # no triplet found
    return ()

if __name__ == '__main__':

    # input list
    input = [5, 4, 3, 7, 6, 1, 9]

    # store the triplet
    first, second, third = findTriplet(input)

    # find triplet
    if first:
        print("Triplet found:", (first, second, third))
    else:
        print("Triplet not found")
```
