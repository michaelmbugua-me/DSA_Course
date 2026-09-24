# Find the missing term in a sequence in logarithmic time

> Source: https://www.techiedelight.com/find-missing-term-sequence-ologn-time/

Given a sequence of `n` numbers such that the difference between the consecutive terms is constant, find the missing term in logarithmic time. Assume that the first and last elements are always part of the input sequence and the missing number lies between index 1 to n-1.

For example,

**Input:** [5, 7, 9, 11, 15] **Output:** The missing term is 13 **Input:** [1, 4, 7, 13, 16] **Output:** The missing term is 10

> 

A simple solution would be to run a linear search on the array and find the missing element by comparing the difference of adjacent array elements with the sequence’s common difference. We can find the common difference between successive elements of the sequence by using the formula:

> common difference = (last element in sequence – first element in sequence) / n

Here, `n` is the total number of elements in the sequence. The problem with this approach is that its worst-case time complexity is O(n). This solution also does not take advantage of the fact that the input is sorted in ascending or descending order.

Whenever we are asked to perform a search on a sorted array, we should always think of a [binary search algorithm](https://techiedelight.com/binary-search/). We can easily solve this problem in O(log(n)) time by modifying the binary search algorithm. The idea is to check the difference of middle element with its left and right neighbor. If the difference is not equal to the common difference, then we know that the missing number lies between the middle element and its left or right neighbor. If the difference is the same as common difference of the sequence, reduce our search space and the left subarray `nums[low…mid-1]` or right subarray `nums[mid+1…high]` depending upon if the missing element lies on the left subarray or not.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to find a missing term in a sequence
int findMissingTerm(int nums[], int n)
{
    // search space is nums[low…high]
    int low = 0, high = n - 1;

    // calculate the common difference between successive elements
    int d = (nums[n - 1] - nums[0]) / n;

    // loop till the search space is exhausted
    while (low <= high)
    {
        // find the middle index
        int mid = high - (high - low) / 2;

        // check the difference of middle element with its right neighbor
        if (mid + 1 < n && nums[mid + 1] - nums[mid] != d) {
            return nums[mid + 1] - d;
        }

        // check the difference of middle element with its left neighbor
        if (mid - 1 >= 0 && nums[mid] - nums[mid - 1] != d) {
            return nums[mid - 1] + d;
        }

        // if the missing element lies on the left subarray, reduce
        // our search space to the left subarray nums[low…mid-1]
        if (nums[mid] - nums[0] != (mid - 0) * d) {
            high = mid - 1;
        }

        // if the missing element lies on the right subarray, reduce
        // our search space to the right subarray nums[mid+1…high]
        else {
            low = mid + 1;
        }
    }
}

int main(void)
{
    int nums[] = { 5, 7, 9, 11, 15 };
    int n = sizeof(nums) / sizeof(nums[0]);

    printf("The missing term is %d", findMissingTerm(nums, n));

    return 0;
}
```

**Output:** The missing term is 13

##

```java
class Main
{
    // Function to find a missing term in a sequence
    public static int findMissingTerm(int[] nums)
    {
        // search space is nums[left…right]
        int left = 0, right = nums.length - 1;

        // calculate the common difference between successive elements
        int diff = (nums[nums.length - 1] - nums[0]) / nums.length;

        // loop till the search space is exhausted
        while (left <= right)
        {
            // find the middle index
            int mid = right - (right - left) / 2;

            // check the difference of middle element with its right neighbor
            if (mid + 1 < nums.length && nums[mid + 1] - nums[mid] != diff) {
                return nums[mid + 1] - diff;
            }

            // check the difference of middle element with its left neighbor
            if (mid - 1 >= 0 && nums[mid] - nums[mid - 1] != diff) {
                return nums[mid - 1] + diff;
            }

            // if the missing element lies on the left subarray, reduce
            // our search space to the right subarray nums[left…mid-1]
            if (nums[mid] - nums[0] != (mid - 0) * diff) {
                right = mid - 1;
            }

            // if the missing element lies on the right subarray, reduce
            // our search space to the right subarray nums[mid+1…right]
            else {
                left = mid + 1;
            }
        }
        return -1;
    }

    public static void main(String[] args)
    {
        int[] nums = { 5, 7, 9, 11, 15 };

        System.out.println("The missing term is " + findMissingTerm(nums));
    }
}
```

##

```python3
# Function to find a missing term in a sequence
def findMissingTerm(nums):

    # search space is nums[left…right]
    (left, right) = (0, len(nums) - 1)

    # calculate the common difference between successive elements
    diff = (nums[-1] - nums[0]) // len(nums)

    # loop till the search space is exhausted
    while left <= right:

        # find the middle index
        mid = right - (right - left) // 2

        # check the difference of middle element with its right neighbor
        if mid + 1 < len(nums) and nums[mid + 1] - nums[mid] != diff:
            return nums[mid + 1] - diff

        # check the difference of middle element with its left neighbor
        if mid - 1 >= 0 and nums[mid] - nums[mid - 1] != diff:
            return nums[mid - 1] + diff

        # if the missing element lies on the left sublist, reduce
        # our search space to the right sublist nums[left…mid-1]
        if nums[mid] - nums[0] != (mid - 0) * diff:
            right = mid - 1

        # if the missing element lies on the right sublist, reduce
        # our search space to the right sublist nums[mid+1…right]
        else:
            left = mid + 1

    return -1

if __name__ == '__main__':

    nums = [5, 7, 9, 11, 15]
    print('The missing term is', findMissingTerm(nums))
```

Also See:

> [Find the smallest missing element from a sorted array](https://www.techiedelight.com/find-smallest-missing-element-sorted-array/ "Find the smallest missing element from a sorted array")

> [Search in a nearly sorted array in logarithmic time](https://www.techiedelight.com/search-nearly-sorted-array-ologn-time/ "Search in a nearly sorted array in logarithmic time")

> [Find floor and ceil of a number in a sorted integer array](https://www.techiedelight.com/find-floor-ceil-number-sorted-array/ "Find floor and ceil of a number in a sorted integer array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.74/5. Vote count: 159

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
