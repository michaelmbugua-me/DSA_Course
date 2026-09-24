# Interpolation search

> Source: https://www.techiedelight.com/interpolation-search/

Given a sorted integer array and a target, determine if the target exists in the array or not using an interpolation search algorithm. If the target exists in the array, return the index of it.

For example,

**Input:** arr[] = [2, 3, 5, 7, 9] target = 7 **Output:** Element found at index 3 **Input:** arr[] = [1, 4, 5, 8, 9] target = 2 **Output:** Element not found

> 

Interpolation search is an algorithm similar to [binary search](https://techiedelight.com/binary-search/) for searching for a given target value in a sorted array. _It parallels how humans search through a telephone book for a particular name, the target value by which the book’s entries are ordered_.

We know that binary search always chooses the middle of the remaining search space, discarding one half or the other depending on the comparison result between the mid-value and the target value. The remaining search space is reduced to the part before or after the mid-position.

By comparison, at each search step, Interpolation search calculates wherein the remaining search space the target might be present, based on the low and high values of the search space and the target’s value. The value found at this estimated position is then compared to the target value. If it’s not equal, then the remaining search space is reduced to the part before or after the estimated position depending on the comparison. This method will only work if calculations on the size of differences between target values are sensible.

Interpolation search uses the following formula to calculate the mid-position where A[low…high] is our search space, and `target` is the given target:

mid = low + ((target – A[low]) * (high – low) / (A[high] – A[low]));

Following is the C, Java, and Python implementation of interpolation search. It computes a mid-position at each iteration and then, as with the binary search, moves either the upper or lower bound in to define a smaller interval containing the target value. Unlike the binary search, which guarantees half search space size with each iteration, a poor interpolation may reduce/increase the mid-index by only one, resulting in a worst-case efficiency of O(n) for an input containing `n` items.

```c
#include <stdio.h>

// Function to determine if target exists in a sorted array `A` or not
// using an interpolation search algorithm
int interpolationSearch(int A[], int n, int target)
{
    // base case
    if (n == 0) {
        return -1;
    }

    // search space is A[low…high]
    int low = 0, high = n - 1, mid;

    while (A[high] != A[low] && target >= A[low] && target <= A[high])
    {
        // estimate mid
        mid = low + ((target - A[low]) * (high - low) / (A[high] - A[low]));

        // target value is found
        if (target == A[mid]) {
            return mid;
        }
        // discard all elements in the right search space, including the middle element
        else if (target < A[mid]) {
            high = mid - 1;
        }
        // discard all elements in the left search space, including the middle element
        else {
            low = mid + 1;
        }
    }

    // if a target is found
    if (target == A[low]) {
        return low;
    }

    // target doesn't exist in the array
    else {
        return -1;
    }
}

int main(void)
{
    int A[] = {2, 5, 6, 8, 9, 10};
    int target = 5;

    int n = sizeof(A)/sizeof(A[0]);
    int index = interpolationSearch(A, n, target);

    if (index != -1) {
        printf("Element found at index %d", index);
    }
    else {
        printf("Element not found in the array");
    }

    return 0;
}
```

**Output:** Element found at index 1

##

```java
class Main
{
    // Function to determine if target exists in a sorted array `A` or not
    // using an interpolation search algorithm
    public static int interpolationSearch(int[] A, int target)
    {
        // base case
        if (A == null || A.length == 0) {
            return -1;
        }

        // search space is A[left…right]
        int left = 0;
        int right = A.length - 1;

        while (A[right] != A[left] && target >= A[left] && target <= A[right])
        {
            // estimate mid
            int mid = left + ((target - A[left])*(right - left)/(A[right] - A[left]));

            // key is found
            if (target == A[mid]) {
                return mid;
            }
            // discard all elements in the right search space, including middle element
            else if (target < A[mid]) {
                right = mid - 1;
            }
            // discard all elements in the left search space, including middle element
            else {
                left = mid + 1;
            }
        }

        // if the key is found
        if (target == A[left]) {
            return left;
        }

        // target doesn't exist in the array
        return -1;
    }

    public static void main(String[] args)
    {
        int[] A = {2, 5, 6, 8, 9, 10};
        int key = 5;

        int index = interpolationSearch(A, key);

        if (index != -1) {
            System.out.println("Element found at index " + index);
        }
        else {
            System.out.println("Element not found in the array");
        }
    }
}
```

##

```python3
# Function to determine if target exists in the sorted list `A` or not
# using an interpolation search algorithm
def interpolationSearch(A, target):

    # base case
    if not A:
        return -1

    # search space is A[left…right]
    (left, right) = (0, len(A) - 1)

    while A[right] != A[left] and A[left] <= target <= A[right]:

        # estimate mid
        mid = left + (target - A[left]) * (right - left) // (A[right] - A[left])

        # key is found
        if target == A[mid]:
            return mid
        # discard all elements in the right search space, including the middle element
        elif target < A[mid]:
            right = mid - 1
        # discard all elements in the left search space, including the middle element
        else:
            left = mid + 1

    # if the key is found
    if target == A[left]:
        return left

    # target doesn't exist in the list
    return -1

if __name__ == '__main__':

    A = [2, 5, 6, 8, 9, 10]
    key = 5

    index = interpolationSearch(A, key)

    if index != -1:
        print('Element found at index', index)
    else:
        print('Element found not in the list')
```

## Performance

Each iteration of the above code requires between five and six comparisons. On average, the interpolation search makes about `_log(log(n))_` comparisons if the elements are uniformly distributed, where `n` is the total number of elements to be searched. In the worst case, it can make up to `_O(n)_` comparisons. The worst-case might happen when the numerical values of the targets increase exponentially.

Note: _This article doesn’t provide an in-depth analysis of how interpolation search works but aims to provide just an overview of achieving better performance than a binary search algorithm for a sorted array._

**References:** <https://en.wikipedia.org/wiki/Interpolation_search>

Also See:

> [Search in a nearly sorted array in logarithmic time](https://www.techiedelight.com/search-nearly-sorted-array-ologn-time/ "Search in a nearly sorted array in logarithmic time")

> [Exponential search](https://www.techiedelight.com/exponential-search/ "Exponential search")

> [Search an element in a circularly sorted array](https://www.techiedelight.com/search-element-circular-sorted-array/ "Search an element in a circularly sorted array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 185

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
