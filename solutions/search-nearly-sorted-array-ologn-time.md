# Search in a nearly sorted array in logarithmic time

> Source: https://www.techiedelight.com/search-nearly-sorted-array-ologn-time/

Given a nearly sorted array such that each of the `n` elements may be misplaced by no more than one position from the correct sorted order, search a given element in it efficiently. Report if the element is not present in the array.

An element at index `i` in a correctly sorted order can be misplaced by the ± 1 position, i.e., it can be present at index `i-1` or `i` or `i+1` in the input array.

For example,

**Input:** nums = [2, 1, 3, 5, 4, 7, 6, 8, 9] target = 5 **Output:** Element 5 found at index 3 **Input:** nums = [2, 1, 3, 5, 4, 7, 6, 8, 9] target = 10 **Output:** Element not found in the array

> 

A simple solution would be to run a linear search on the array and find the given element’s index. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input. This solution also does not take advantage of the fact that the input is circularly sorted.

We can easily solve this problem in O(log(n)) time by modifying the [binary search algorithm](https://techiedelight.com/binary-search/). The idea is to compare the target number with elements at `A[mid-1]`, `A[mid]`, and `A[mid+1]`, where `mid` is the middle index of our search space `A[low…high]`. If the target is found, return the corresponding index; otherwise, reduce our search space to the left subarray `A[low…mid-2]` or right subarray `A[mid+2…high]` depending upon if the middle element is less than the target number or not.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to search an element `target` in a nearly sorted array `nums`
int searchElement(int nums[], int n, int target)
{
    // search space is nums[low…high]
    int low = 0, high = n - 1;

    // loop till the search space is exhausted
    while (low <= high)
    {
        // find middle index `mid` and compare nums[mid-1], nums[mid], and nums[mid+1]
        // with the target number
        int mid = (low + high) / 2;

        // return `mid` if the middle element is equal to the target number
        if (nums[mid] == target) {
            return mid;
        }

        // return `mid-1` if nums[mid-1] is equal to the target number
        else if (mid - 1 >= low && nums[mid - 1] == target) {
            return mid - 1;
        }

        // return `mid+1` if nums[mid+1] is equal to the target number
        else if (mid + 1 <= high && nums[mid + 1] == target) {
            return mid + 1;
        }

        // if the middle element is less than the target number,
        // reduce search space to the right subarray nums[mid+2…high]
        else if (target > nums[mid]) {
            low = mid + 2;
        }

        // if the middle element is greater than the target number,
        // reduce search space to the right subarray nums[low…mid-2]
        else {
            high = mid - 2;
        }
    }

    // invalid input or number is not present in the array
    return -1;
}

int main(void)
{
    int nums[] = { 2, 1, 3, 5, 4, 7, 6, 8, 9 };
    int target = 5;

    int n = sizeof(nums) / sizeof(nums[0]);
    int index = searchElement(nums, n, target);

    if (index != -1) {
        printf("Element %d found at index %d", target, index);
    }
    else {
        printf("Element not found in the array");
    }

    return 0;
}
```

**Output:** Element 5 found at index 3

##

```java
class Main
{
    // Function to search an element `target` in a nearly sorted array `nums`
    public static int searchElement(int[] nums, int target)
    {
        // search space is nums[left…right]
        int left = 0;
        int right = nums.length - 1;

        // loop till the search space is exhausted
        while (left <= right)
        {
            // find middle index `mid` and compare nums[mid-1], nums[mid],
            // and nums[mid+1] with the target number
            int mid = (left + right) / 2;

            // return `mid` if the middle element is equal to the target number
            if (nums[mid] == target) {
                return mid;
            }

            // return `mid-1` if nums[mid-1] is equal to target number
            else if (mid - 1 >= left && nums[mid - 1] == target) {
                return mid - 1;
            }

            // return `mid+1` if nums[mid+1] is equal to target number
            else if (mid + 1 <= right && nums[mid + 1] == target) {
                return mid + 1;
            }

            // if the middle element is less than the target number,
            // reduce search space to the right subarray nums[mid+2…right]
            else if (target > nums[mid]) {
                left = mid + 2;
            }

            // if the middle element is greater than the target number,
            // reduce search space to the right subarray nums[left…mid-2]
            else {
                right = mid - 2;
            }
        }

        // invalid input or number is not present in the array
        return -1;
    }

    public static void main(String[] args)
    {
        int[] nums = { 2, 1, 3, 5, 4, 7, 6, 8, 9 };
        int target = 5;

        int index = searchElement(nums, target);

        if (index != -1) {
            System.out.println("Element " + target + " found at index " + index);
        }
        else {
            System.out.println("Element not found in the array");
        }
    }
}
```

##

```python3
# Function to search an element `target` in a nearly sorted list `nums`
def searchElement(nums, target):

    # search space is nums[left…right]
    (left, right) = (0, len(nums) - 1)

    # loop till the search space is exhausted
    while left <= right:

        # find middle index `mid` and compare nums[mid-1], nums[mid], and
        # nums[mid+1] with the target number
        mid = (left + right) // 2

        # return `mid` if the middle element is equal to the target number
        if nums[mid] == target:
            return mid

        # return `mid-1` if nums[mid-1] is equal to target number
        elif mid - 1 >= left and nums[mid - 1] == target:
            return mid - 1

        # return `mid+1` if nums[mid+1] is equal to target number
        elif mid + 1 <= right and nums[mid + 1] == target:
            return mid + 1

        # if the middle element is less than the target number,
        # reduce search space to the right sublist nums[mid+2…right]
        elif target > nums[mid]:
            left = mid + 2

        # if the middle element is greater than the target number,
        # reduce search space to the right sublist nums[left…mid-2]
        else:
            right = mid - 2

    # invalid input or number present is not on the list
    return -1

if __name__ == '__main__':

    nums = [2, 1, 3, 5, 4, 7, 6, 8, 9]
    target = 5

    index = searchElement(nums, target)

    if index != -1:
        print(f'Element {target} found at index {index}')
    else:
        print('Element found not in the list')
```

The time complexity of the above solution is O(log(n)) and doesn’t require any extra space.

Also See:

> [Search an element in a circularly sorted array](https://www.techiedelight.com/search-element-circular-sorted-array/ "Search an element in a circularly sorted array")

> [Find floor and ceil of a number in a sorted array (Recursive solution)](https://www.techiedelight.com/find-floor-ceil-number-sorted-array-recursive/ "Find floor and ceil of a number in a sorted array \(Recursive solution\)")

> [Find floor and ceil of a number in a sorted integer array](https://www.techiedelight.com/find-floor-ceil-number-sorted-array/ "Find floor and ceil of a number in a sorted integer array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 167

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
