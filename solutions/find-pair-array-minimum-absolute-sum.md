# Find a pair with a minimum absolute sum in an array

> Source: https://www.techiedelight.com/find-pair-array-minimum-absolute-sum/

Given a sorted integer array, find a pair in it having an absolute minimum sum.

For example,

**Input:** A = [-6, -5, -3, 0, 2, 4, 9] **Output:** Pair is (-5, 4) (-5, 4) = abs(-5 + 4) = abs(-1) = 1, which is minimum among all pairs.

> 

The idea is to maintain search space by maintaining two indexes (`low` and `high`) that initially points to two endpoints of the array. Then loop if low is less than the `high` index and reduce the search space `arr[low…high]` at each iteration of the loop by comparing the sum of elements present at index `low` and `high` with 0. We increment index `low` if the sum is less than the 0; otherwise, decrement index `high` if the sum is more than the 0. We also maintain the minimum absolute difference among all pairs present at `low` and `high` index.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <cstdlib>
#include <climits>
using namespace std;

// Function to find a pair in an array with an absolute minimum sum
void findPair(int arr[], int n)
{
    if (n < 2) {
        return;
    }

    // sort the array if it is unsorted
    // sort(arr, arr + n);

    // maintain two indexes pointing to endpoints of the array
    int low = 0;
    int high = n - 1;

    // `min` stores the minimum absolute difference
    int min = INT_MAX;
    int i, j;

    // reduce the search space `arr[low…high]` at each iteration of the loop

    // loop if `low` is less than `high`
    while (low < high)
    {
        // update the minimum if the current absolute sum is less
        if (abs(arr[high] + arr[low]) < min)
        {
            min = abs(arr[high] + arr[low]);
            i = low;
            j = high;
        }

        // optimization: pair with zero-sum is found
        if (min == 0) {
            break;
        }

        // increment `low` index if the total is less than 0;
        // decrement `high` index if the total is more than 0
        (arr[high] + arr[low] < 0)? low++: high--;
    }

    // print the pair
    cout << "Pair found (" << arr[i] << ", " << arr[j] << ")";
}

int main()
{
    int arr[] = { -6, -5, -3, 0, 2, 4, 9 };
    int n = sizeof(arr)/sizeof(arr[0]);

    findPair(arr, n);

    return 0;
}
```

**Output:** Pair found (-5, 4)

##

```java
class Main
{
    // Function to find a pair in an array with an absolute minimum sum
    public static void findPair(int[] A)
    {
        if (A.length < 2) {
            return;
        }

        // sort the array if it is unsorted
        // Arrays.sort(A);

        // maintain two indexes pointing to endpoints of the array
        int low = 0;
        int high = A.length - 1;

        // `min` stores the minimum absolute difference
        int min = Integer.MAX_VALUE;
        int i = 0, j = 0;

        // reduce the search space `A[low…high]` at each iteration of the loop

        // loop if `low` is less than `high`
        while (low < high)
        {
            // update the minimum if the current absolute sum is less
            if (Math.abs(A[high] + A[low]) < min)
            {
                min = Math.abs(A[high] + A[low]);
                i = low;
                j = high;
            }

            // optimization: pair with zero-sum is found
            if (min == 0) {
                break;
            }

            // increment `low` index if the total is less than 0;
            // decrement `high` index if the total is more than 0
            if (A[high] + A[low] < 0) {
                low++;
            }
            else {
                high--;
            }
        }

        // print the pair
        System.out.print("Pair found (" + A[i] + ", " + A[j] + ")");
    }

    public static void main(String[] args)
    {
        int[] A = { -6, -5, -3, 0, 2, 4, 9 };

        findPair(A);
    }
}
```

##

```python3
import sys

# Function to find a pair in a list with an absolute minimum sum
def findPair(A):

    if len(A) < 2:
        return

    # sort the list if it is unsorted

    # maintain two indexes pointing to endpoints of the list
    (low, high) = (0, len(A) - 1)

    # `min` stores the minimum absolute difference
    min = sys.maxsize
    i = j = 0

    # reduce the search space `A[low…high]` at each iteration of the loop

    # loop if `low` is less than `high`
    while low < high:
        # update the minimum if the current absolute sum is less
        if abs(A[high] + A[low]) < min:
            min = abs(A[high] + A[low])
            (i, j) = (low, high)

        # optimization: pair with zero-sum is found
        if min == 0:
            break

        # increment `low` index if the total is less than 0;
        # decrement `high` index if the total is more than 0
        if A[high] + A[low] < 0:
            low = low + 1
        else:
            high = high - 1

    # print the pair
    print("Pair found", (A[i], A[j]))

if __name__ == '__main__':

    A = [-6, -5, -3, 0, 2, 4, 9]

    findPair(A)
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

Also See:

> [Find a pair with the given sum in a circularly sorted array](https://www.techiedelight.com/find-pair-with-given-sum-circularly-sorted-array/ "Find a pair with the given sum in a circularly sorted array")

> [Find a pair with the given sum in an array](https://www.techiedelight.com/find-pair-with-given-sum-array/ "Find a pair with the given sum in an array")

> [Find the closest pair to a given sum in two sorted arrays](https://www.techiedelight.com/find-closest-pair-two-sorted-arrays/ "Find the closest pair to a given sum in two sorted arrays")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.53/5. Vote count: 131

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
