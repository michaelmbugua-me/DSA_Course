# Count the number of strictly increasing subarrays in an array

> Source: https://www.techiedelight.com/count-strictly-increasing-sub-arrays/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, count the total number of strictly increasing subarrays in it.

For example,

**Input:** A[] = { 1, 2, 4, 4, 5} **Output:** The total number of strictly increasing subarrays is 4 { 1, 2 }, { 1, 2, 4 }, { 2, 4 }, { 4, 5 } **Input:** A[] = { 1, 3, 2 } **Output:** The total number of strictly increasing subarrays is 1 {1, 3} **Input:** A[] = { 5, 4, 3, 2, 1 } **Output:** The total number of strictly increasing subarrays is 0

> 

Please note that the problem specifically targets [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements. A strictly increasing subarray has a size of at least 2.

A naive solution would be to generate all possible subarrays and check if each subarray is strictly increasing or not. The time complexity of this approach is O(n3) since there are `n2` subarrays in an array of size `n`, and time spent on each subarray would be O(n).

We can optimize the time complexity of this approach to O(n2) by using the fact that if subarray `arr[i, j-1]` is strictly increasing, then subarray `arr[i, j]` would be strictly increasing if `arr[j-1]` < `arr[j]`. And if `arr[j-1]` >= `arr[j]`, then subarray `arr[i, j]` would be not strictly increasing and the same can be said for subarrays `arr[i, j+1]`, `arr[i, j+2]`, … , all the way till `arr[i, n-1]`. This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Function to count the total number of strictly increasing subarrays in an array
int getCount(int arr[], int n)
{
    // stores the count of strictly increasing subarrays
    int count = 0;

    // consider all subarrays `arr[i, j]` starting from index `i`
    // and ending at index `j`
    for (int i = 0; i < n; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            // if the previous element is not less than the current element,
            // then subarray `arr[i, j]` is not strictly increasing
            if (arr[j - 1] >= arr[j])
            {
                // don't consider index from `j+1` onwards
                break;
            }

            // if subarray `arr[i, j]` is strictly increasing,
            // increment the total count
            ++count;
        }
    }

    // return the count of strictly increasing subarrays
    return count;
}

int main()
{
    int arr[] = { 1, 2, 4, 4, 5 };
    int n = sizeof(arr) / sizeof(arr[0]);

    cout << "The total number of strictly increasing subarrays is "
         << getCount(arr, n);

    return 0;
}
```

**Output:** The total number of strictly increasing subarrays is 4

##

```java
class Main
{
    // Function to count the total number of strictly increasing subarrays in an array
    public static int getCount(int[] arr)
    {
        // stores the count of strictly increasing subarrays
        int count = 0;

        // consider all subarrays `arr[i, j]` starting from index `i`
        // and ending at index `j`
        for (int i = 0; i < arr.length; i++)
        {
            for (int j = i + 1; j < arr.length; j++)
            {
                // if the previous element is not less than the current element,
                // then subarray `arr[i, j]` is not strictly increasing
                if (arr[j - 1] >= arr[j])
                {
                    // don't consider index from `j+1` onwards
                    break;
                }

                // if subarray `arr[i, j]` is strictly increasing,
                // increment the total count
                ++count;
            }
        }

        // return the count of strictly increasing subarrays
        return count;
    }

    public static void main(String[] args)
    {
        int[] arr = { 1, 2, 4, 4, 5 };

        System.out.print("The total number of strictly increasing subarrays is "
                                + getCount(arr));
    }
}
```

##

```python3
# Function to count the total number of strictly increasing sublists in a list
def getCount(A):

    # stores the count of strictly increasing sublists
    count = 0

    # consider all sublists `A[i, j]` starting from index `i`
    # and ending at index `j`
    for i in range(len(A)):
        for j in range(i + 1, len(A)):
            # if the previous element is not less than the current element,
            # then sublist `A[i, j]` is not strictly increasing
            if A[j - 1] >= A[j]:
                # don't consider index from `j+1` onwards
                break

            # if sublist `A[i, j]` is strictly increasing,
            # increment the total count
            count = count + 1

    # return the count of strictly increasing sublists
    return count

if __name__ == '__main__':

    A = [1, 2, 4, 4, 5]

    print("The total number of strictly increasing sublists are", getCount(A))
```

We can improve the time complexity to O(n) by keeping track of the length of the current strictly increasing subarray and increment the final count by `len–1` whenever the current subarray length `len` is increased by 1. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Function to count the total number of strictly increasing subarrays in an array
int getCount(int arr[], int n)
{
    // stores the count of strictly increasing subarrays
    int count = 0;

    // stores the length of current strictly increasing subarray
    int len = 1;

    // traverse the array from left to right starting from the 1st index
    for (int i = 1; i < n; i++)
    {
        // if the previous element is less than the current element
        if (arr[i - 1] < arr[i])
        {
            // add the length of the current strictly increasing subarray
            // to the answer and increment it
            count += (len++);
        }
        else {
            // reset the length to 1
            len = 1;
        }
    }

    // return the count of strictly increasing subarrays
    return count;
}

int main()
{
    int arr[] = { 1, 2, 3, 2, 4, 5 };
    int n = sizeof(arr)/sizeof(arr[0]);

    cout << "The total number of strictly increasing subarrays is "
         << getCount(arr, n);

    return 0;
}
```

**Output:** The total number of strictly increasing subarrays is 6

##

```java
class Main
{
    // Function to count the total number of strictly increasing subarrays in an array
    public static int getCount(int[] arr)
    {
        // stores the count of strictly increasing subarrays
        int count = 0;

        // stores the length of current strictly increasing subarray
        int len = 1;

        // traverse the array from left to right starting from the 1st index
        for (int i = 1; i < arr.length; i++)
        {
            // if the previous element is less than the current element
            if (arr[i - 1] < arr[i])
            {
                // add the length of the current strictly increasing subarray
                // to the answer and increment it
                count += (len++);
            }
            else {
                // reset the length to 1
                len = 1;
            }
        }

        // return the count of strictly increasing subarrays
        return count;
    }

    public static void main(String[] args)
    {
        int[] arr = { 1, 2, 3, 2, 4, 5 };

        System.out.print("The total number of strictly increasing subarrays is "
                                + getCount(arr));
    }
}
```

##

```python3
# Function to count the total number of strictly increasing sublists in a list
def getCount(A):

    # stores the count of strictly increasing sublists
    count = 0

    # stores the length of the current strictly increasing sublist
    length = 1

    # traverse the list from left to right starting from the 1st index
    for i in range(1, len(A)):

        # if the previous element is less than the current element
        if A[i - 1] < A[i]:
            # add the length of the current strictly increasing sublist
            # to the answer and increment it
            count += length
            length = length + 1
        else:
            # reset the length to 1
            length = 1

    # return the count of strictly increasing sublists
    return count

if __name__ == '__main__':

    A = [1, 2, 3, 2, 4, 5]
    print("The total number of strictly increasing sublists are", getCount(A))
```
