# Find the first or last occurrence of a given number in a sorted array

> Source: https://www.techiedelight.com/find-first-or-last-occurrence-of-a-given-number-sorted-array/

Given a sorted integer array, find the index of a given number’s first or last occurrence. If the element is not present in the array, report that as well.

For example,

**Input:** nums = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9] target = 5 **Output:** The first occurrence of element 5 is located at index 1 The last occurrence of element 5 is located at index 3 **Input:** nums = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9] target = 4 **Output:** Element not found in the array

> 

A simple solution would be to run a linear search on the array and return the given element’s first or last occurrence. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input. This solution also does not take advantage of the fact that the input is sorted. We can easily solve this problem in O(log(n)) time by modifying the [binary search algorithm](https://techiedelight.com/binary-search/).

## Finding first occurrence of the element

The standard binary search terminates as soon as any occurrence of the given target element is found. To find the given element’s first occurrence, modify the binary search to continue searching even on finding the target element. Instead, update the result to `mid` and search towards the left (towards lower indices), i.e., modify our search space by adjusting high to `mid-1` on finding the target at mid-index.

Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>

// Function to find the first occurrence of a given number in a sorted integer array
int findFirstOccurrence(int nums[], int n, int target)
{
    // search space is nums[low…high]
    int low = 0, high = n - 1;

    // initialize the result by -1
    int result = -1;

    // loop till the search space is exhausted
    while (low <= high)
    {
        // find the mid-value in the search space and compares it with the target
        int mid = (low + high)/2;

        // if the target is located, update the result and
        // search towards the left (lower indices)
        if (target == nums[mid])
        {
            result = mid;
            high = mid - 1;
        }

        // if the target is less than the middle element, discard the right half
        else if (target < nums[mid]) {
            high = mid - 1;
        }

        // if the target is more than the middle element, discard the left half
        else {
            low = mid + 1;
        }
    }

    // return the leftmost index, or -1 if the element is not found
    return result;
}

int main(void)
{
    int nums[] = {2, 5, 5, 5, 6, 6, 8, 9, 9, 9};
    int n = sizeof(nums)/sizeof(nums[0]);

    int target = 5;

    int index = findFirstOccurrence(nums, n, target);

    if (index != -1)
    {
        printf("The first occurrence of element %d is located at index %d",
                target, index);
    }
    else {
        printf("Element not found in the array");
    }

    return 0;
}
```

**Output:** The first occurrence of element 5 is located at index 1

##

```java
class Main
{
    // Function to find the first occurrence of a given number
    // in a sorted integer array
    public static int findFirstOccurrence(int[] nums, int target)
    {
        // search space is nums[left…right]
        int left = 0;
        int right = nums.length - 1;

        // initialize the result by -1
        int result = -1;

        // loop till the search space is exhausted
        while (left <= right)
        {
            // find the mid-value in the search space and compares it with the target
            int mid = (left + right) / 2;

            // if the target is located, update the result and
            // search towards the left (lower indices)
            if (target == nums[mid])
            {
                result = mid;
                right = mid - 1;
            }

            // if the target is less than the middle element, discard the right half
            else if (target < nums[mid]) {
                right = mid - 1;
            }

            // if the target is more than the middle element, discard the left half
            else {
                left = mid + 1;
            }
        }

        // return the leftmost index, or -1 if the element is not found
        return result;
    }

    public static void main(String[] args)
    {
        int[] nums = {2, 5, 5, 5, 6, 6, 8, 9, 9, 9};
        int target = 5;

        int index = findFirstOccurrence(nums, target);

        if (index != -1)
        {
            System.out.println("The first occurrence of element " + target +
                            " is located at index " + index);
        }
        else {
            System.out.println("Element not found in the array");
        }
    }
}
```

##

```python3
# Function to find the first occurrence of a given number
# in a sorted list of integers
def findFirstOccurrence(nums, target):

    # search space is nums[left…right]
    (left, right) = (0, len(nums) - 1)

    # initialize the result by -1
    result = -1

    # loop till the search space is exhausted
    while left <= right:

        # find the mid-value in the search space and compares it with the target
        mid = (left + right) // 2

        # if the target is located, update the result and
        # search towards the left (lower indices)
        if target == nums[mid]:
            result = mid
            right = mid - 1

        # if the target is less than the middle element, discard the right half
        elif target < nums[mid]:
            right = mid - 1

        # if the target is more than the middle element, discard the left half
        else:
            left = mid + 1

    # return the leftmost index, or -1 if the element is not found
    return result

if __name__ == '__main__':

    nums = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9]
    target = 5

    index = findFirstOccurrence(nums, target)

    if index != -1:
        print(f'The first occurrence of element {target} is located at index {index}')
    else:
        print('Element found not in the list')
```

## Finding last occurrence of the element

To find the element’s last occurrence, modify the standard binary search to continue searching even on finding the target. Instead, update the result to `mid` and go on searching towards the right (towards higher indices), i.e., modify our search space by adjusting low to `mid+1` on finding the target at mid-index.

Following is the C, Java, and Python implementation based on the above idea:

```c
#include <stdio.h>

// Function to find the last occurrence of a given number in a sorted integer array
int findLastOccurrence(int nums[], int n, int target)
{
    // search space is nums[low…high]
    int low = 0, high = n - 1;

    // initialize the result by -1
    int result = -1;

    // loop till the search space is exhausted
    while (low <= high)
    {
        // find the mid-value in the search space and compares it with the target
        int mid = (low + high)/2;

        // if the target is located, update the result and
        // search towards the right (higher indices)
        if (target == nums[mid])
        {
            result = mid;
            low = mid + 1;
        }

        // if the target is less than the middle element, discard the right half
        else if (target < nums[mid]) {
            high = mid - 1;
        }
        // if the target is more than the middle element, discard the left half
        else {
            low = mid + 1;
        }
    }

    // return the leftmost index, or -1 if the element is not found
    return result;
}

int main(void)
{
    int nums[] = {2, 5, 5, 5, 6, 6, 8, 9, 9, 9};
    int n = sizeof(nums)/sizeof(nums[0]);

    int target = 5;

    int index = findLastOccurrence(nums, n, target);

    if (index != -1)
    {
        printf("The last occurrence of element %d is located at index %d",
                target, index);
    }
    else {
        printf("Element not found in the array");
    }

    return 0;
}
```

**Output:** The last occurrence of element 5 is located at index 3

##

```java
class Main
{
    // Function to find the last occurrence of a given number
    // in a sorted integer array
    public static int findLastOccurrence(int[] nums, int target)
    {
        // search space is nums[left…right]
        int left = 0;
        int right = nums.length - 1;

        // initialize the result by -1
        int result = -1;

        // loop till the search space is exhausted
        while (left <= right)
        {
            // find the mid-value in the search space and compares it with the target
            int mid = (left + right) / 2;

            // if the target is located, update the result and
            // search towards the right (higher indices)
            if (target == nums[mid])
            {
                result = mid;
                left = mid + 1;
            }

            // if the target is less than the middle element, discard the right half
            else if (target < nums[mid]) {
                right = mid - 1;
            }

            // if the target is more than the middle element, discard the left half
            else {
                left = mid + 1;
            }
        }

        // return the leftmost index, or -1 if the element is not found
        return result;
    }

    public static void main(String[] args)
    {
        int[] nums = {2, 5, 5, 5, 6, 6, 8, 9, 9, 9};
        int target = 5;

        int index = findLastOccurrence(nums, target);

        if (index != -1)
        {
            System.out.println("The last occurrence of element " + target +
                    " is located at index " + index);
        }
        else {
            System.out.println("Element not found in the array");
        }
    }
}
```

##

```python3
# Function to find the last occurrence of a given number in a sorted list of integers
def findLastOccurrence(nums, target):

    # search space is nums[left…right]
    (left, right) = (0, len(nums) - 1)

    # initialize the result by -1
    result = -1

    # loop till the search space is exhausted
    while left <= right:

        # find the mid-value in the search space and compares it with the target
        mid = (left + right) // 2

        # if the target is located, update the result and
        # search towards the right (higher indices)
        if target == nums[mid]:
            result = mid
            left = mid + 1

        # if the target is less than the middle element, discard the right half
        elif target < nums[mid]:
            right = mid - 1

        # if the target is more than the middle element, discard the left half
        else:
            left = mid + 1

    # return the leftmost index, or -1 if the element is not found
    return result

if __name__ == '__main__':

    nums = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9]
    target = 5

    index = findLastOccurrence(nums, target)

    if index != -1:
        print(f'The last occurrence of element {target} is located at index {index}')
    else:
        print('Element found not in the list')
```

The time complexity of the above solutions is O(log(n)) and doesn’t require any extra space.

**Exercise:**

1\. Write a recursive version of the above solutions.

2\. Check if the given integer appears more than `n/2` times in a sorted array.
