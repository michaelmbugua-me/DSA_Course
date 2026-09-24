# Search an element in a circularly sorted array

> Source: https://www.techiedelight.com/search-element-circular-sorted-array/

Given a circularly sorted integer array, search an element in it. Assume there are no duplicates in the array, and the rotation is in the anti-clockwise direction.

For example,

**Input:** nums = [8, 9, 10, 2, 5, 6] target = 10 **Output:** Element found at index 2 **Input:** nums = [9, 10, 2, 5, 6, 8] target = 5 **Output:** Element found at index 3

> 

**Related Posts:**

> [Find the number of rotations in a circularly sorted array](https://techiedelight.com/find-number-rotations-circularly-sorted-array/)

A simple solution would be to run a linear search on the array and find the given element’s index. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input. This solution also does not take advantage of the fact that the input is circularly sorted.

We can easily solve this problem in O(log(n)) time by modifying the [binary search algorithm](https://techiedelight.com/binary-search/). We know that the middle element always divides the array into two subarrays, and the target element can lie only in one of these subarrays. It is worth noticing that at least one of these subarrays will always be sorted. If the middle element happens to be the point of rotation (minimum element), then both left and right subarrays will be sorted, but in any case, one half (subarray) must be sorted. The idea is to use this property to discard the left half or the right half at each iteration of the binary search.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to find an element `target` in a circularly sorted array
int searchCircularArray(int nums[], int n, int target)
{
    // search space is nums[low…high]
    int low = 0, high = n - 1;

    // loop till the search space is exhausted
    while (low <= high)
    {
        // find the mid-value in the search space and
        // compares it with the target
        int mid = (low + high)/2;

        // if the target is found, return its index
        if (target == nums[mid]) {
            return mid;
        }

        // if right half nums[mid…high] is sorted and `mid` is not
        // the target element
        if (nums[mid] <= nums[high])
        {
            // compare target with nums[mid] and nums[high]to know
            // if it lies in nums[mid…high] or not
            if (target > nums[mid] && target <= nums[high]) {
                low = mid + 1;      // go searching in the right sorted half
            }
            else {
                high = mid - 1;     // go searching left
            }
        }

        // if left half nums[low…mid] is sorted, and `mid` is not
        // the target element
        else {
            // compare target with nums[low] and nums[mid] to know
            // if it lies in nums[low…mid] or not
            if (target >= nums[low] && target < nums[mid]) {
                high = mid - 1;     // go searching in the left sorted half
            }
            else {
                low = mid + 1;      // go searching right
            }
        }
    }

    // target not found or invalid input
    return -1;
}

int main(void)
{
    int nums[] = {9, 10, 2, 5, 6, 8};
    int target = 5;

    int n = sizeof(nums)/sizeof(nums[0]);
    int index = searchCircularArray(nums, n, target);

    if (index != -1) {
        printf("Element found at index %d", index);
    }
    else {
        printf("Element not found in the array");
    }

    return 0;
}
```

##

```java
class Main
{
    // Function to find an element in a circularly sorted array
    public static int searchCircularArray(int[] nums, int target)
    {
        // search space is nums[left…right]
        int left = 0;
        int right = nums.length - 1;

        // loop till the search space is exhausted
        while (left <= right)
        {
            // find the mid-value in the search space and
            // compares it with the target
            int mid = (left + right) / 2;

            // if the key is found, return its index
            if (target == nums[mid]) {
                return mid;
            }

            // if right half nums[mid…right] is sorted and `mid` is not
            // the key element
            if (nums[mid] <= nums[right])
            {
                // compare key with nums[mid] and nums[right] to know
                // if it lies in nums[mid…right] or not
                if (target > nums[mid] && target <= nums[right])
                {
                    // go searching in the right sorted half
                    left = mid + 1;
                }
                else {
                    right = mid - 1;        // go searching left
                }
            }

            // if left half nums[left…mid] is sorted, and `mid` is not
            // the key element
            else {
                // compare key with nums[left] and nums[mid] to know
                // if it lies in nums[left…mid] or not
                if (target >= nums[left] && target < nums[mid])
                {
                    // go searching in the left sorted half
                    right = mid - 1;
                }
                else {
                    left = mid + 1;         // go searching right
                }
            }
        }

        // key not found or invalid input
        return -1;
    }

    public static void main(String[] args)
    {
        int[] nums = {9, 10, 2, 5, 6, 8};
        int key = 5;

        int index = searchCircularArray(nums, key);

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
# Function to find an element in a circularly sorted list
def searchCircularList(nums, target):

    # search space is nums[left…right]
    (left, right) = (0, len(nums) - 1)

    # loop till the search space is exhausted
    while left <= right:

        # find the mid-value in the search space and
        # compares it with the target
        mid = (left + right) // 2

        # if the key is found, return its index
        if target == nums[mid]:
            return mid

        # if right half nums[mid…right] is sorted and `mid` is not
        # the key element
        if nums[mid] <= nums[right]:
            # compare key with nums[mid] and nums[right] to know
            # if it lies in nums[mid…right] or not
            if nums[mid] < target <= nums[right]:
                left = mid + 1      # go searching in the right sorted half
            else:
                right = mid - 1     # go searching left

        # if left half nums[left…mid] is sorted, and `mid` is not
        # the key element
        else:
            # compare key with nums[left] and nums[mid] to know
            # if it lies in nums[left…mid] or not
            if nums[left] <= target < nums[mid]:
                right = mid - 1     # go searching in the left sorted half
            else:
                left = mid + 1      # go searching right

    # key not found or invalid input
    return -1

if __name__ == '__main__':

    nums = [9, 10, 2, 5, 6, 8]
    key = 5

    index = searchCircularList(nums, key)

    if index != -1:
        print('Element found at index', index)
    else:
        print('Element found not in the list')
```

The time complexity of the above solution is O(log(n)) and doesn’t require any extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 196

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
