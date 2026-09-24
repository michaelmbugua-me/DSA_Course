# Partition an array into two subarrays with the same sum

> Source: https://www.techiedelight.com/partition-array-into-two-sub-arrays-with-same-sum/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, partition it into two subarrays having the same sum of elements.

For example,

**Input:** {6, -4, -3, 2, 3} **Output:** The two subarrays are {6, -4} and {-3, 2, 3} having equal sum of 2 **Input:** {6, -5, 2, -4, 1} **Output:** The two subarrays are {} and {6, -5, 2, -4, 1} having equal sum of 0

> 

Please note that the problem specifically targets [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

A simple solution is to iterate the array and calculate the sum of the left and right subarray for each array element. The time complexity of this solution is O(n2), where `n` is the size of the input. Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <numeric>
#include <iterator>
using namespace std;

// Partition the array into two subarrays with the same sum
int partition(int arr[], int n)
{
    // do for each array element
    for (int i = 0; i < n; i++)
    {
        int left_sum = 0;
        for (int j = 0; j < i; j++) {
            left_sum += arr[j];
        }

        int right_sum = 0;
        for (int j = i; j < n; j++) {
            right_sum += arr[j];
        }

        // if the sum of `A[0…i-1]` is equal to `A[i, n-1]`
        if (left_sum == right_sum) {
            return i;
        }
    }

    // invalid input
    return -1;
}

int main()
{
    int arr[] = { 6, -4, -3, 2, 3 };
    int n = sizeof(arr)/sizeof(arr[0]);

    // get index `i` that points to the starting of the second subarray
    int i = partition(arr, n);

    if (i != -1)
    {
        // print the first subarray, `arr[0, i-1]`
        copy(arr, arr + i, ostream_iterator<int>(cout, " "));

        cout << endl;

        // print the second subarray, `arr[i, n-1]`
        copy(arr + i, arr + n, ostream_iterator<int>(cout, " "));
    }
    else {
        cout << "The array can't be partitioned";
    }

    return 0;
}
```

**Output:** 6 -4 -3 2 3

##

```java
import java.util.stream.Collectors;
import java.util.stream.IntStream;

class Main
{
    // Utility function to print the array between specified indices
    public static void printArray(int[] A, int i, int j)
    {
        System.out.println(IntStream.rangeClosed(i, j)
                .mapToObj(k -> A[k])
                .collect(Collectors.toList()));
    }

    // Partition the array into two subarrays with the same sum
    public static int partition(int[] A)
    {
        // do for each array element
        for (int i = 0; i < A.length; i++)
        {
            int left_sum = 0;
            for (int j = 0; j < i; j++) {
                left_sum += A[j];
            }

            int right_sum = 0;
            for (int j = i; j < A.length; j++) {
                right_sum += A[j];
            }

            // if sum of `A[0…i-1]` is equal to `A[i, n-1]`
            if (left_sum == right_sum) {
                return i;
            }
        }

        // invalid input
        return -1;
    }

    public static void main(String[] args)
    {
        int[] A = { 6, -4, -3, 2, 3 };

        // get index `i` that points to the starting of the second subarray
        int i = partition(A);

        if (i != -1)
        {
            // print the first subarray, `A[0, i-1]`
            printArray(A, 0, i - 1);

            // print the second subarray, `A[i, n-1]`
            printArray(A, i, A.length - 1);
        }
        else {
            System.out.print("The array can't be partitioned");
        }
    }
}
```

##

```python3
# Partition the list into two sublists with the same sum
def partition(A):

    # do for each element in the list
    for i in range(len(A)):
        left_sum = 0
        for j in range(i):
            left_sum += A[j]

        right_sum = 0
        for j in range(i, len(A)):
            right_sum += A[j]

        # if the sum of `A[0…i-1]` is equal to `A[i, n-1]`
        if left_sum == right_sum:
            return i

    # invalid input
    return -1

if __name__ == '__main__':

    A = 6, -4, -3, 2, 3

    # get index `i` that points to the starting of the second sublist
    i = partition(A)

    if i != -1:
        print(A[:i])        # print the first sublist, `A[0, i-1]`
        print(A[i:])        # print the second sublist, `A[i, n-1]`
    else:
        print("The list can't be partitioned")
```

We can also solve this problem in O(n) time and O(1) space. The idea is to preprocess the array and calculate the sum of all array elements. Then for each array element, we can calculate its right sum in O(1) time by using the following formula:

sum of right subarray = total sum – sum of elements so far

Following is the implementation of the above approach in C++, Java, and Python:

```cpp
#include <iostream>
#include <numeric>
#include <iterator>
using namespace std;

// Partition the array into two subarrays with the same sum
int partition(int arr[], int n)
{
    // calculate the sum of all array elements
    int total_sum = accumulate(arr, arr + n, 0);

    // variable to maintain the sum of processed elements
    int sum_so_far = 0;

    // do for each array element
    for (int i = 0; i < n; i++)
    {
        // if the sum of `A[0…i-1]` is equal to `A[i, n-1]`
        if (sum_so_far == total_sum - sum_so_far) {
            return i;
        }

        // update `sum_so_far` by including the value of the current element
        sum_so_far += arr[i];
    }

    return -1;
}

int main()
{
    int arr[] = { 6, -4, -3, 2, 3 };
    int n = sizeof(arr)/sizeof(arr[0]);

    // get index `i` that points to the starting of the second subarray
    int i = partition(arr, n);

    if (i != -1)
    {
        // print the first subarray, `arr[0, i-1]`
        copy(arr, arr + i, ostream_iterator<int>(cout, " "));

        cout << endl;

        // print the second subarray, `arr[i, n-1]`
        copy(arr + i, arr + n, ostream_iterator<int>(cout, " "));
    }
    else {
        cout << "The array can't be partitioned";
    }

    return 0;
}
```

**Output:** 6 -4 -3 2 3

##

```java
import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

class Main
{
    // Partition the array into two subarrays with the same sum
    public static int partition(int[] arr)
    {
        // calculate the sum of all array elements
        int total_sum = Arrays.stream(arr).sum();

        // variable to maintain the sum of processed elements
        int sum_so_far = 0;

        // do for each array element
        for (int i = 0; i < arr.length; i++)
        {
            // if sum of `A[0…i-1]` is equal to `A[i, n-1]`
            if (sum_so_far == total_sum - sum_so_far) {
                return i;
            }

            // update `sum_so_far` by including the value of the current element
            sum_so_far += arr[i];
        }

        return -1;
    }

    // Utility function to print subarray `arr[i, j]`
    public static void printSubarray(int[] arr, int i, int j)
    {
        System.out.println(IntStream.range(i, j + 1)
                    .mapToObj(k -> arr[k])
                    .collect(Collectors.toList()));
    }

    public static void main(String[] args)
    {
        int[] arr = { 6, -4, -3, 2, 3 };

        // get index `i` that points to the starting of the second subarray
        int i = partition(arr);

        if (i != -1)
        {
            // print the first subarray, `arr[0, i-1]`
            printSubarray(arr, 0, i - 1);

            // print the second subarray, `arr[i, arr.length)`
            printSubarray(arr, i, arr.length - 1);
        }
        else {
            System.out.print("The array can't be partitioned");
        }
    }
}
```

##

```python3
# Partition the list into two sublists with the same sum
def partition(A):

    # calculate the sum of all list elements
    total_sum = sum(A)

    # variable to maintain the sum of processed elements
    sum_so_far = 0

    # do for each element in the list
    for i in range(len(A)):

        # if the sum of `A[0…i-1]` is equal to `A[i, n-1]`
        if sum_so_far == total_sum - sum_so_far:
            return i

        # update `sum_so_far` by including the value of the current element
        sum_so_far += A[i]

    return -1

if __name__ == '__main__':

    A = [6, -4, -3, 2, 3]

    # get index `i` that points to the starting of the second sublist
    i = partition(A)

    if i != -1:
        print(A[:i])        # print the first sublist, `A[0, i-1]`
        print(A[i:])        # print the second sublist, `A[i, len(A))`
    else:
        print("The list can't be partitioned")
```
