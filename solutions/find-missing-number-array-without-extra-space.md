# Find the missing number in an array without using any extra space

> Source: https://www.techiedelight.com/find-missing-number-array-without-extra-space/

Given a limited range array of size `n` and containing elements between 1 and `n+1` with one element missing, find the missing number without using any extra space.

For example,

**Input:** { 3, 2, 4, 6, 1 } **Output:** The missing element is 5 **Input:** { 3, 2, 4, 5, 6 } **Output:** The missing element is 1 **Input:** { 3, 2, 4, 5, 1 } **Output:** The missing element is 6

> 

The idea is to calculate the sum of all array elements. Then the missing number is the sum of elements between 1 and `n+1` minus the actual sum, i.e., the missing number is:

`(1 + 2 … + n + (n+1)) - (arr[0] + arr[1] + … + arr[n-1])`

We can find the sum of elements between 1 and `n` using the following formula:

`1 + 2 + … + n = n×(n+1)/2`

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

// Find the missing number in a limited range array `arr[1…n+1]`
int findMissingElement(vector<int> const &arr)
{
    int n = arr.size();

    // calculate the sum of all the array elements `arr`
    int sum = accumulate(arr.begin(), arr.end(), 0);

    // expected sum - actual sum
    return (n + 1) + n * (n + 1)/2 - sum;
}

int main()
{
    // input array contains `n` numbers between 1 and `n+1`
    // with one number missing and no duplicates
    vector<int> arr = { 3, 2, 4, 6, 1 };

    cout << "The missing element is " << findMissingElement(arr);

    return 0;
}
```

**Output:** The missing element is 5

##

```java
import java.util.Arrays;

class Main
{
    // Find the missing number in a limited range array `arr[1…n+1]`
    public static int findMissingElement(int[] arr)
    {
        int n = arr.length;

        // calculate the sum of all the array elements `arr`
        int sum = Arrays.stream(arr).sum();

        // expected sum - actual sum
        return (n + 1) + n * (n + 1)/2 - sum;
    }

    public static void main(String[] args)
    {
        // input array contains `n` numbers between 1 and `n+1`
        // with one number missing and no duplicates
        int[] arr = { 3, 2, 4, 6, 1 };

        System.out.println("The missing element is " + findMissingElement(arr));
    }
}
```

##

```python3
# Find the missing number in a limited range list `arr[1…n+1]`
def findMissingElement(arr):

    n = len(arr)

    # calculate the sum of all elements of input list
    total = sum(arr)

    # expected sum - actual sum
    return (n + 1) + n * (n + 1) // 2 - total

if __name__ == '__main__':

    # input list contains `n` numbers between 1 and `n+1`
    # with one number missing and no duplicates
    arr = [3, 2, 4, 6, 1]

    print('The missing element is', findMissingElement(arr))
```

We can also solve this problem by taking XOR of all array elements with numbers 1 to `n+1`. Since the same elements will cancel each other as `a^a = 0`, `0^0 = 0` and `a^0 = a`, we will be left with the missing number. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Find the missing number in a limited range array `arr[1…n+1]`
int findMissingElement(int arr[], int n)
{
    int XOR = 0;

    // take xor of all array elements
    for (int i = 0; i < n; i++) {
        XOR ^= arr[i];
    }

    // take xor of numbers from 1 to `n+1`
    for (int i = 1; i <= n + 1; i++) {
        XOR ^= i;
    }

    // same elements will cancel each other as a ^ a = 0
    // also, 0 ^ 0 = 0 and a ^ 0 = a

    // `xor` will contain the missing number
    return XOR;
}

int main(void)
{
    // input array contains `n` numbers between 1 and `n+1`
    // with one number missing and no duplicates
    int arr[] = { 1, 2, 3, 4, 6 };
    int n = sizeof(arr)/sizeof(arr[0]);

    printf("The missing element is %d", findMissingElement(arr, n));

    return 0;
}
```

**Output:** The missing element is 5

##

```java
class Main
{
    // Find the missing number in a limited range array `arr[1…n+1]`
    public static int findMissingElement(int[] arr, int n)
    {
        int xor = 0;

        // take xor of all array elements
        for (int i: arr) {
            xor ^= i;
        }

        // take xor of numbers from 1 to `n+1`
        for (int i = 1; i <= n + 1; i++) {
            xor ^= i;
        }

        // same elements will cancel each other as a ^ a = 0
        // also, 0 ^ 0 = 0 and a ^ 0 = a

        // `xor` will contain the missing number
        return xor;
    }

    public static void main(String[] args)
    {
        // input array contains `n` numbers between 1 and `n+1`
        // with one number missing and no duplicates
        int[] arr = { 1, 2, 3, 4, 6 };
        int n = arr.length;

        System.out.println("The missing element is " + findMissingElement(arr, n));
    }
}
```

##

```python3
# Find the missing number in a limited range list `arr[1…n+1]`
def findMissingElement(arr, n):

    xor = 0

    # take xor of all list elements
    for i in arr:
        xor ^= i

    # take xor of numbers from 1 to `n+1`
    for i in range(1, n + 2):
        xor ^= i

    # same elements will cancel each other as a ^ a = 0
    # also, 0 ^ 0 = 0 and a ^ 0 = a

    # `xor` will contain the missing number
    return xor

if __name__ == '__main__':

    # input list contains `n` numbers between 1 and `n+1`
    # with one number missing and no duplicates
    arr = [1, 2, 3, 4, 6]
    n = len(arr)

    print('The missing element is', findMissingElement(arr, n))
```

Since the array contains all distinct elements and all elements lie in range 1 to `n+1`, use this property to solve this problem. Initially check if the missing number lies in range 1 to `n`. If a missing number is not found in range 1 to `n`, then the missing number is `n+1`.

To check if a missing number lies in range 1 to `n` or not, mark array elements as negative by using array elements as indexes. For each array element `arr[i]`, get the absolute value of element `abs(arr[i])` and make the element at index `abs(arr[i])-1` negative. Finally, traverse the array again to find the first index, which has a positive value. If a positive number is found at index `i`, then the missing number is `i+1`. If no positive element is found, then the missing number is `n+1`.

The algorithm can be implemented as follows in C, Java, and Python. This solution modifies the original array. We can restore the original array before returning by making negative elements positive.

```c
#include <stdio.h>
#include <stdlib.h>

// Find the missing number in a limited range array `arr[1…n+1]`
// This method won't work for negative numbers
int findMissingElement(int arr[], int n)
{
    // Case 1. The missing number is in range 1 to `n`

    // do for each array element
    for (int i = 0; i < n; i++)
    {
        // get absolute value of the current element
        int absVal = abs(arr[i]);

        // make element at index `abs(arr[i])-1` negative
        if (absVal - 1 < n) {
            arr[absVal - 1] = -arr[absVal - 1];
        }
    }

    // check for missing numbers from 1 to `n`
    for (int i = 0; i < n; i++)
    {
        if (arr[i] > 0) {
            return i + 1;
        }
    }

    // Case 2. If numbers from 1 to `n` are present in the array,
    // then the missing number is `n+1`
    return n + 1;
}

int main(void)
{
    // input array contains `n` numbers between 1 and `n+1`
    // with one number missing and no duplicates
    int arr[] = { 3, 2, 4, 5, 6 };
    int n = sizeof(arr)/sizeof(arr[0]);

    printf("The missing element is %d", findMissingElement(arr, n));

    return 0;
}
```

**Output:** The missing element is 1
