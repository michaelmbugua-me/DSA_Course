# Find the smallest window in an array sorting which will make the entire array sorted

> Source: https://www.techiedelight.com/smallest-window-sorting-which-make-array-sorted/

Given an integer array, find the smallest window sorting which will make the entire array sorted in increasing order.

For example,

**Input:** { 1, 2, 3, 7, 5, 6, 4, 8 } **Output:** Sort the array from index 3 to 6 **Input:** { 1, 3, 2, 7, 5, 6, 4, 8 } **Output:** Sort the array from index 1 to 6

> 

We can easily solve this problem in linear time. Following is the complete algorithm:

  1. Traverse array from left to right keeping track of maximum so far and note the last encountered index `j` which is less than the maximum so far.
  2. Traverse array from right to left keeping track of minimum so far and note the last encountered index `i`, which is more than the minimum so far.
  3. Finally, sort the array from index `i` to `j`.

For example, consider array `{ 1, 2, 3, **7** , 5, 6, **4** , 8 }`. If we traverse the array from left to right, the last encountered index, which is less than the maximum so far, is 6. Similarly, if we traverse the array from right to left, the last encountered index, which is more than the minimum so far, is 3. So, we need to sort the array from index 3 to 6.

Following is the C++, Java, and Python implementation based on the above idea:

```cpp
#include <iostream>
#include <climits>
using namespace std;

// Function to find the smallest window in an array, sorting which will
// make the entire array sorted
void findSubarray(int arr[], int n)
{
    int leftIndex = -1, rightIndex = -1;

    // traverse from left to right and keep track of maximum so far
    int max_so_far = INT_MIN;
    for (int i = 0; i < n; i++)
    {
        if (max_so_far < arr[i]) {
            max_so_far = arr[i];
        }

        // find the last position that is less than the maximum so far
        if (arr[i] < max_so_far) {
            rightIndex = i;
        }
    }

    // traverse from right to left and keep track of the minimum so far
    int min_so_far = INT_MAX;
    for (int i = n - 1; i >= 0; i--)
    {
        if (min_so_far > arr[i]) {
            min_so_far = arr[i];
        }

        // find the last position that is more than the minimum so far
        if (arr[i] > min_so_far) {
            leftIndex = i;
        }
    }

    if (leftIndex == -1) {
        cout << "Array is already sorted";
        return;
    }

    cout << "Sort array from index " << leftIndex << " to " << rightIndex;
}

int main()
{
    int arr[] = { 1, 3, 2, 7, 5, 6, 4, 8 };
    int n = sizeof(arr)/sizeof(arr[0]);

    findSubarray(arr, n);

    return 0;
}
```

**Output:** Sort array from index 1 to 6

##

```java
class Main
{
    // Function to find the smallest window in the array, sorting
    // which will make the entire array sorted
    public static void findSubarray(int[] A)
    {
        int leftIndex = -1, rightIndex = -1;

        // traverse from left to right and keep track of maximum so far
        int max_so_far = Integer.MIN_VALUE;
        for (int i = 0; i < A.length; i++)
        {
            if (max_so_far < A[i]) {
                max_so_far = A[i];
            }

            // find the last position that is less than the maximum so far
            if (A[i] < max_so_far) {
                rightIndex = i;
            }
        }

        // traverse from right to left and keep track of the minimum so far
        int min_so_far = Integer.MAX_VALUE;
        for (int i = A.length - 1; i >= 0; i--)
        {
            if (min_so_far > A[i]) {
                min_so_far = A[i];
            }

            // find the last position that is more than the minimum so far
            if (A[i] > min_so_far) {
                leftIndex = i;
            }
        }

        if (leftIndex == -1) {
            System.out.print("Array is already sorted");
            return;
        }

        System.out.print("Sort array from index " + leftIndex + " to " + rightIndex);
    }

    public static void main(String[] args)
    {
        int[] A = { 1, 3, 2, 7, 5, 6, 4, 8 };
        findSubarray(A);
    }
}
```

##

```python3
import sys

# Function to find the smallest window in a list, sorting which will
# make the entire list sorted
def findSublist(A):

    leftIndex = rightIndex = -1

    # traverse from left to right and keep track of maximum so far
    max_so_far = -sys.maxsize
    for i in range(len(A)):
        if max_so_far < A[i]:
            max_so_far = A[i]

        # find the last position that is less than the maximum so far
        if A[i] < max_so_far:
            rightIndex = i

    # traverse from right to left and keep track of the minimum so far
    min_so_far = sys.maxsize
    for i in reversed(range(len(A))):
        if min_so_far > A[i]:
            min_so_far = A[i]

        # find the last position that is more than the minimum so far
        if A[i] > min_so_far:
            leftIndex = i

    if leftIndex == -1:
        print("Array is already sorted")
        return

    print("Sort list from index", leftIndex, "to", rightIndex)

if __name__ == '__main__':

    A = [1, 3, 2, 7, 5, 6, 4, 8]
    findSublist(A)
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 67

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
