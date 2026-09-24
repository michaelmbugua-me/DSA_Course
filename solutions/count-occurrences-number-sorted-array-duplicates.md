# Count occurrences of a number in a sorted array with duplicates

> Source: https://www.techiedelight.com/count-occurrences-number-sorted-array-duplicates/

Given a sorted integer array containing duplicates, count occurrences of a given number. If the element is not found in the array, report that as well.

For example,

**Input:** nums[] = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9] target = 5 **Output:** Target 5 occurs 3 times **Input:** nums[] = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9] target = 6 **Output:** Target 6 occurs 2 times

> 

A simple solution would be to run a linear search on the array and count the number of occurrences of the given element. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input. This solution also does not take advantage of the fact that the input is sorted.

Another solution would be to run a [binary search](https://techiedelight.com/binary-search/) on the given sorted array and find the index of any occurrence of the given number `target`. Since the array is sorted, all occurrences of `target` will be adjacent. So, run a linear scan to find all instances of `target` to the left of the found index, and its right. The worst-case time complexity of this solution remains O(n). The worst case happens when all the array elements are the same as the given number.

We can easily solve this problem in O(log(n)) time by **modifying the binary search algorithm**. The idea is to find the index of the first and last occurrence of the given number and return one more than the difference between two indices. We have already discussed how and [find the first and last occurrence of a number](https://techiedelight.com/find-first-or-last-occurrence-of-a-given-number-sorted-array/) in O(log(n)) time in the previous post.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to find the first or last occurrence of a given number in
// a sorted integer array. If `searchFirst` is true, return the
// first occurrence of the number; otherwise, return its last occurrence.
int binarySearch(int nums[], int n, int target, int searchFirst)
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

        // if the target is found, update the result
        if (target == nums[mid])
        {
            result = mid;

            // go on searching towards the left (lower indices)
            if (searchFirst) {
                high = mid - 1;
            }
            // go on searching towards the right (higher indices)
            else {
                low = mid + 1;
            }
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

    // return the found index or -1 if the element is not found
    return result;
}

int main(void)
{
    int nums[] = {2, 5, 5, 5, 6, 6, 8, 9, 9, 9};
    int target = 5;

    int n = sizeof(nums)/sizeof(nums[0]);

    // pass value 1 for the first occurrence
    int first = binarySearch(nums, n, target, 1);

    // pass value 0 for the last occurrence
    int last = binarySearch(nums, n, target, 0);

    int count = last - first + 1;

    if (first != -1) {
        printf("Element %d occurs %d times", target, count);
    }
    else {
        printf("Element not found in the array");
    }

    return 0;
}
```

**Output:** Element 5 occurs 3 times

##

```java
class Main
{
    // Function to find the first or last occurrence of a given number in
    // a sorted integer array. If `searchFirst` is true, return the
    // first occurrence of the number; otherwise, return its last occurrence.
    public static int binarySearch(int[] nums, int target, boolean searchFirst)
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

            // if the target is found, update the result
            if (target == nums[mid])
            {
                result = mid;

                // go on searching towards the left (lower indices)
                if (searchFirst) {
                    right = mid - 1;
                }
                // go on searching towards the right (higher indices)
                else {
                    left = mid + 1;
                }
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

        // return the found index or -1 if the element is not found
        return result;
    }

    public static void main(String[] args)
    {
        int[] nums = {2, 5, 5, 5, 6, 6, 8, 9, 9, 9};
        int target = 5;

        // pass true for the first occurrence
        int first = binarySearch(nums, target, true);

        // pass false for the last occurrence
        int last = binarySearch(nums, target, false);

        int count = last - first + 1;

        if (first != -1) {
            System.out.println("Element " + target + " occurs " + count + " times");
        }
        else {
            System.out.println("Element not found in the array");
        }
    }
}
```

##

```python3
# Function to find the first or last occurrence of a given number in
# a sorted list of integers. If `searchFirst` is true, return the
# first occurrence of the number; otherwise, return its last occurrence.
def binarySearch(nums, target, searchFirst):

    # search space is nums[left…right]
    (left, right) = (0, len(nums) - 1)

    # initialize the result by -1
    result = -1

    # loop till the search space is exhausted
    while left <= right:

        # find the mid-value in the search space and compares it with the target
        mid = (left + right) // 2

        # if the target is found, update the result
        if target == nums[mid]:
            result = mid

            # go on searching towards the left (lower indices)
            if searchFirst:
                right = mid - 1
            # go on searching towards the right (higher indices)
            else:
                left = mid + 1

        # if the target is less than the middle element, discard the right half
        elif target < nums[mid]:
            right = mid - 1
        # if the target is more than the middle element, discard the left half
        else:
            left = mid + 1

    # return the found index or -1 if the element is not found
    return result

if __name__ == '__main__':

    nums = [2, 5, 5, 5, 6, 6, 8, 9, 9, 9]
    target = 5

    first = binarySearch(nums, target, True)        # pass true for the first occurrence
    last = binarySearch(nums, target, False)        # pass false for the last occurrence

    count = last - first + 1

    if first != -1:
        print(f'Element {target} occurs {count} times')
    else:
        print('Element found not in the list')
```

The time complexity of the above solution is O(log(n)) and doesn’t require any extra space, where `n` is the size of the input.

Also See:

> [Find the frequency of each element in a sorted array containing duplicates](https://www.techiedelight.com/find-frequency-element-sorted-array-containing-duplicates/ "Find the frequency of each element in a sorted array containing duplicates")

> [Search an element in a circularly sorted array](https://www.techiedelight.com/search-element-circular-sorted-array/ "Search an element in a circularly sorted array")

> [Find the first or last occurrence of a given number in a sorted array](https://www.techiedelight.com/find-first-or-last-occurrence-of-a-given-number-sorted-array/ "Find the first or last occurrence of a given number in a sorted array")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.9/5. Vote count: 160

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
