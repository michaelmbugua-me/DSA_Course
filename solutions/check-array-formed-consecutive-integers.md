# Check if an array is formed by consecutive integers

> Source: https://www.techiedelight.com/check-array-formed-consecutive-integers/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, check if only consecutive integers form the array.

For example,

**Input:** { -1, 5, 4, 2, 0, 3, 1 } **Output:** The array contains consecutive integers from -1 to 5. **Input:** { 4, 2, 4, 3, 1 } **Output:** The array does not contain consecutive integers as element 4 is repeated.

> 

## Approach 1

For an array to contain consecutive integers,

  1. The difference between the maximum and minimum element in it should be exactly `n-1`.
  2. All elements in the array should be distinct (we can check this by inserting the elements in a set or using a visited array).

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <unordered_set>
using namespace std;

// Function to check if consecutive integers form an array
bool isConsecutive(int arr[], int n)
{
    // base case
    if (n <= 1) {
        return true;
    }

    int min = arr[0], max = arr[0];

    // compute the minimum and maximum element in an array
    for (int i = 1; i < n; i++)
    {
        if (arr[i] < min) {
            min = arr[i];
        }

        if (arr[i] > max) {
            max = arr[i];
        }
    }

    // for an array to contain consecutive integers, the difference between
    // the maximum and minimum element in it should be exactly `n-1`
    if (max - min != n - 1) {
        return false;
    }

    // create an empty set (we can also use a visited array)
    unordered_set<int> visited;

    // traverse the array and checks if each element appears only once
    for (int i = 0; i < n; i++)
    {
        // if an element is seen before, return false
        if (visited.find(arr[i]) != visited.end()) {
            return false;
        }

        // mark element as seen
        visited.insert(arr[i]);
    }

    // we reach here when all elements in the array are distinct
    return true;
}

int main()
{
    int arr[] = { -1, 5, 4, 2, 0, 3, 1 };
    int n = sizeof(arr) / sizeof(arr[0]);

    isConsecutive(arr, n)? cout << "The array contains consecutive integers":
                        cout << "The array does not contain consecutive integers";

    return 0;
}
```

**Output:** The array contains consecutive integers

##

```java
import java.util.HashSet;
import java.util.Set;

class Main
{
    // Function to check if consecutive integers form an array
    public static boolean isConsecutive(int[] A)
    {
        // base case
        if (A.length <= 1) {
            return true;
        }

        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;

        // compute the minimum and maximum element in an array
        for (int i: A)
        {
            if (i < min) { min = i; }
            if (i > max) { max = i; }
        }

        // for an array to contain consecutive integers, the difference between
        // the maximum and minimum element in it should be exactly `n-1`
        if (max - min != A.length - 1) {
            return false;
        }

        // create an empty set (we can also use a visited array)
        Set<Integer> visited = new HashSet<>();

        // traverse the array and checks if each element appears only once
        for (int i: A)
        {
            // if an element is seen before, return false
            if (visited.contains(i)) {
                return false;
            }

            // mark element as seen
            visited.add(i);
        }

        // we reach here when all elements in the array are distinct
        return true;
    }

    public static void main(String[] args)
    {
        int[] A = { -1, 5, 4, 2, 0, 3, 1 };

        if (isConsecutive(A)) {
            System.out.print("The array contains consecutive integers");
        }
        else {
            System.out.print("The array does not contain consecutive integers");
        }
    }
}
```

##

```python3
# Function to check if consecutive integers form a list
def isConsecutive(A):
    # base case
    if len(A) <= 1:
        return True

    # compute the minimum and maximum element in a list
    minimum = min(A)
    maximum = max(A)

    # for a list to contain consecutive integers, the difference between
    # the maximum and minimum element in it should be exactly `n-1`
    if maximum - minimum != len(A) - 1:
        return False

    # create an empty set (we can also use a visited list)
    visited = set()

    # traverse the list and checks if each element appears only once
    for i in A:
        # if an element is seen before, return false
        if i in visited:
            return False

        # mark element as seen
        visited.add(i)

    # we reach here when all elements in the list are distinct
    return True

if __name__ == '__main__':

    A = [-1, 5, 4, 2, 0, 3, 1]

    if isConsecutive(A):
        print("The array contains consecutive integers")
    else:
        print("Array do contain consecutive not integers")
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

## Approach 2

We can check if an array contains consecutive integers by inserting all array elements in a sorted set and

  1. Check if all elements are distinct (we can check this while inserting the elements in the set).
  2. Check if the difference between consecutive elements in the sorted set is 1.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <set>
using namespace std;

// Function to check if consecutive integers form an array
bool isConsecutive(int arr[], int n)
{
    // 1. Check if all elements in the array are distinct.

    // create an empty tree-based set
    set<int> set;

    // traverse the array and checks if each element appears only once
    for (int i = 0; i < n; i++)
    {
        // if an element is seen before, return false
        if (set.find(arr[i]) != set.end()) {
            return false;
        }

        // mark element as seen
        set.insert(arr[i]);
    }

    // 2. Check if all elements present in the set are consecutive
    int prev;

    // iterate through the set and check if the difference between
    // consecutive elements is 1
    // (Note that `std::set` stores the elements in sorted order)
    for (int curr: set)
    {
        if (curr != *set.begin() && (curr != prev + 1)) {
            return false;
        }

        prev = curr;
    }

    return true;
}

int main()
{
    int arr[] = { -1, 5, 4, 2, 0, 3, 1 };
    int n = sizeof(arr) / sizeof(arr[0]);

    isConsecutive(arr, n) ? cout << "The array contains consecutive integers":
                        cout << "The array does not contain consecutive integers";

    return 0;
}
```

**Output:** The array contains consecutive integers

##

```java
import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

class Main
{
    // Function to check if consecutive integers form an array
    public static boolean isConsecutive(int[] A)
    {
        // 1. Check if all elements in the array are distinct.

        Set<Integer> set = Arrays.stream(A).boxed()
                                .collect(Collectors.toCollection(TreeSet::new));
        if (set.size() != A.length) {
            return false;
        }

        // 2. Check if all elements present in the set are consecutive
        int prev = Integer.MAX_VALUE;

        // iterate through `TreeSet` and check if the difference between
        // consecutive elements is 1
        // (Note that `TreeSet` stores the elements in sorted order)

        for (int curr: set)
        {
            if (prev != Integer.MAX_VALUE && (curr != prev + 1)) {
                return false;
            }

            prev = curr;
        }

        return true;
    }

    public static void main(String[] args)
    {
        int[] A = { -1, 5, 4, 2, 0, 3, 1 };

        if (isConsecutive(A)) {
            System.out.print("The array contains consecutive integers");
        }
        else {
            System.out.print("The array does not contain consecutive integers");
        }
    }
}
```

##

```python3
import sys

# Function to check if consecutive integers form a list
def isConsecutive(A):

    # 1. Check if all elements in the list are distinct

    s = set(A)
    if len(A) != len(s):
        return False

    # 2. Check if all elements present in the set are consecutive
    prev = sys.maxsize

    # iterate through the sorted set and check if the difference between
    # consecutive elements is 1
    for curr in sorted(s):
        if prev != sys.maxsize and (curr != prev + 1):
            return False
        prev = curr

    return True

if __name__ == '__main__':

    A = [-1, 5, 4, 2, 0, 3, 1]

    if isConsecutive(A):
        print("The array contains consecutive integers")
    else:
        print("The array does not contain consecutive integers")
```

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the input.
