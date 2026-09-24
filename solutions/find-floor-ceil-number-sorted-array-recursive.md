# Find floor and ceil of a number in a sorted array (Recursive solution)

> Source: https://www.techiedelight.com/find-floor-ceil-number-sorted-array-recursive/

Given a sorted integer array, find the floor and ceiling of a given number in it. The floor and ceiling map the given number to the largest previous or the smallest following integer in the array.

More precisely, for a number `x`, `floor(x)` is the largest integer in the array less than or equal to `x`, and `ceil(x)` is the smallest integer in the array greater than or equal to `x`. If the floor or ceil doesn’t exist, consider it to be -1. For example,

**Input:** nums = [1, 4, 6, 8, 9] Number: 0 to 10 **Output:** Number 0 —> ceiling is 1, floor is -1 Number 1 —> ceiling is 1, floor is 1 Number 2 —> ceiling is 4, floor is 1 Number 3 —> ceiling is 4, floor is 1 Number 4 —> ceiling is 4, floor is 4 Number 5 —> ceiling is 6, floor is 4 Number 6 —> ceiling is 6, floor is 6 Number 7 —> ceiling is 8, floor is 6 Number 8 —> ceiling is 8, floor is 8 Number 9 —> ceiling is 9, floor is 9 Number 10 —> ceiling is -1, floor is 9

> 

A simple solution would be to run a linear search on the array and find the largest integer in the array less than or equal to `x` and the smallest integer in the array greater than or equal to `x`. That would be the floor and ceiling of the number `x`, respectively. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input.

We can easily solve this problem in O(log(n)) time by modifying the [binary search algorithm](https://techiedelight.com/binary-search/). The basic idea remains the same. We find the middle element and recur for the left or right subarray based on comparison result with the given number. Following is the complete algorithm:

findCeil(nums[low, high], x)

  * If `x` is less than equal to `nums[low]`, `nums[low]` is the ceiling.
  * If `x` is more than `nums[high]`, its ceiling doesn’t exist.
  * If `x` is equal to the middle element, it is the ceiling.
  * If `x` is more than the middle element, the ceiling exists in the right subarray `nums[mid+1…high]`.
  * If `x` is less than the middle element, the ceiling exists in the left subarray `nums[low…mid]`. Here, include `mid` as part of the left subarray as the middle element can also be ceiling.

findFloor(nums[low, high], x)

  * If `x` is less than `nums[low]`, its floor doesn’t exist.
  * If `x` is more than equal to the `nums[high]`, it is the floor.
  * If `x` is equal to the middle element, it is the floor.
  * If `x` is more than the middle element, the floor exists in the right subarray `nums[mid…high]`. Here, include `mid` as part of the right subarray as the middle element can also be the floor.
  * If `x` is less than the middle element, the floor exists in the left subarray `nums[low…mid-1]`.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to find the ceiling of `x` in a sorted array nums[low…high].
// i.e., the smallest integer greater than or equal to `x`
int findCeiling(int nums[], int low, int high, int x)
{
    // search space is nums[low…high]

    // base case
    if (high < low) {
        return -1;
    }

    // if `x` is less than equal to the lowest element in search
    // space, the lowest element is the ceiling
    if (x <= nums[low]) {
        return nums[low];
    }

    // if `x` is more than the highest element in the search space,
    // its ceiling doesn't exist
    if (x > nums[high]) {
        return -1;
    }

    // find the middle index
    int mid = (low + high) / 2;

    // if `x` is equal to the middle element, it is the ceiling
    if (nums[mid] == x) {
        return nums[mid];
    }

    // if `x` is more than the middle element, the ceiling exists in the right
    // subarray nums[mid+1…high]
    else if (nums[mid] < x) {
        return findCeiling(nums, mid + 1, high, x);
    }

    // if `x` is less than the middle element, the ceiling exists in the left
    // subarray nums[low…mid] (Note – middle element can also be ceiling)
    else {
        return findCeiling(nums, low, mid, x);
    }
}

// Function to find the floor of `x` in a sorted array nums[low…high].
// i.e., the largest integer less than or equal to `x`
int findFloor(int nums[], int low, int high, int x)
{
    // search space is nums[low…high]

    // base case
    if (high < low) {
        return -1;
    }

    // if `x` is less than the lowest element in search
    // space, its floor doesn't exist
    if (x < nums[low]) {
        return -1;
    }

    // if `x` is more than equal to the highest element in
    // the search space, it is the floor
    if (x >= nums[high]) {
        return nums[high];
    }

    // find the middle index
    int mid = (low + high) / 2;

    // this check is placed to handle infinite loop for
    // a call to `findFloor(nums, mid, right, x)`
    if (mid == low) {
        return nums[low];
    }

    // if `x` is equal to the middle element, it is the floor
    if (nums[mid] == x) {
        return nums[mid];
    }

    // if `x` is more than the middle element, the floor exists in the right
    // subarray nums[mid…high] (Note – middle element can also be the floor)
    else if (nums[mid] < x) {
        return findFloor(nums, mid, high, x);
    }

    // if `x` is less than the middle element, the floor exists in the left
    // subarray nums[low…mid-1]
    else {
        return findFloor(nums, low, mid - 1, x);
    }
}

int main(void)
{
    int nums[] = { 1, 4, 6, 8, 9 };
    int n = sizeof(nums) / sizeof(nums[0]);

    for (int i = 0; i <= 10; i++)
    {
        printf("Number %2d —> ceiling is %2d, floor is %2d\n", i,
                    findCeiling(nums, 0, n - 1, i),
                    findFloor(nums, 0, n - 1, i));
    }

    return 0;
}
```

##

```java
class Main
{
    // Function to find the ceiling of `x` in a sorted array nums[low…high].
    // i.e., the smallest integer greater than or equal to `x`
    public static int findCeiling(int[] nums, int left, int right, int x)
    {
        // search space is nums[left…right]

        // base case
        if (nums.length == 0) {
            return -1;
        }

        // if `x` is less than equal to the lowest element in search
        // space, the lowest element is the ceiling
        if (x <= nums[left]) {
            return nums[left];
        }

        // if `x` is more than the highest element in the search space,
        // its ceiling doesn't exist
        if (x > nums[right]) {
            return -1;
        }

        // find the middle index
        int mid = (left + right) / 2;

        // if `x` is equal to the middle element, it is the ceiling
        if (nums[mid] == x) {
            return nums[mid];
        }

        // if `x` is more than the middle element, the ceiling exists in the right
        // subarray nums[mid+1…right]
        else if (nums[mid] < x) {
            return findCeiling(nums, mid + 1, right, x);
        }

        // if `x` is less than the middle element, the ceiling exists in the left
        // subarray nums[left…mid] (Note – middle element can also be ceiling)
        else {
            return findCeiling(nums, left, mid, x);
        }
    }

    // Function to find the floor of `x` in a sorted array nums[left…right].
    // i.e., the largest integer less than or equal to `x`
    public static int findFloor(int[] nums, int left, int right, int x)
    {
        // search space is nums[left…right]

        // base case
        if (nums.length == 0) {
            return -1;
        }

        // if `x` is less than the lowest element in search
        // space, its floor doesn't exist
        if (x < nums[left]) {
            return -1;
        }

        // if `x` is more than equal to the highest element in
        // the search space, it is the floor
        if (x >= nums[right]) {
            return nums[right];
        }

        // find the middle index
        int mid = (left + right) / 2;

        // this check is placed to handle infinite loop for
        // a call to `findFloor(nums, mid, right, x)`
        if (mid == left) {
            return nums[left];
        }

        // if `x` is equal to the middle element, it is the floor
        if (nums[mid] == x) {
            return nums[mid];
        }

        // if `x` is more than the middle element, the floor exists in the right
        // subarray nums[mid…right] (Note – middle element can also be the floor)
        else if (nums[mid] < x) {
            return findFloor(nums, mid, right, x);
        }

        // if `x` is less than the middle element, the floor exists in the left
        // subarray nums[left…mid-1]
        else {
            return findFloor(nums, left, mid - 1, x);
        }
    }

    public static void main(String[] args)
    {
        int[] nums = { 1, 4, 6, 8, 9 };

        for (int i = 0; i <= 10; i++)
        {
            System.out.printf("Number %2d —> ceiling is %2d, floor is %2d\n", i,
                    findCeiling(nums, 0, nums.length - 1, i),
                    findFloor(nums, 0, nums.length - 1, i));
        }
    }
}
```

##

```python3
# Function to find the ceiling of `x` in a sorted list nums[left…right].
# i.e., the smallest integer greater than or equal to `x`
def findCeiling(nums, left, right, x):

    # search space is nums[left…right]

    # base case
    if not nums:
        return -1

    # if `x` is less than equal to the lowest element in search
    # space, the lowest element is the ceiling
    if x <= nums[left]:
        return nums[left]

    # if `x` is more than the highest element in the search space,
    # its ceiling doesn't exist
    if x > nums[right]:
        return -1

    # find the middle index
    mid = (left + right) // 2

    # if `x` is equal to the middle element, it is the ceiling
    if nums[mid] == x:
        return nums[mid]

    # if `x` is more than the middle element, the ceiling exists in the right
    # sublist nums[mid+1…right]
    elif nums[mid] < x:
        return findCeiling(nums, mid + 1, right, x)

    # if `x` is less than the middle element, the ceiling exists in the left
    # sublist nums[left…mid] (Note – middle element can also be ceiling)
    else:
        return findCeiling(nums, left, mid, x)

# Function to find the floor of `x` in a sorted list nums[left…right]
# i.e., the largest integer less than or equal to `x`
def findFloor(nums, left, right, x):

    # search space is nums[left…right]

    # base case
    if not nums:
        return -1

    # if `x` is less than the lowest element in search
    # space, its floor doesn't exist
    if x < nums[left]:
        return -1

    # if `x` is more than equal to the highest element in
    # the search space, it is the floor
    if x >= nums[right]:
        return nums[right]

    # find the middle index
    mid = (left + right) // 2

    # this check is placed to handle infinite loop for
    # a call to `findFloor(nums, mid, right, x)`
    if mid == left:
        return nums[left]

    # if `x` is equal to the middle element, it is the floor
    if nums[mid] == x:
        return nums[mid]

    # if `x` is more than the middle element, the floor exists in the right
    # sublist nums[mid…right] (Note – middle element can also be the floor)
    elif nums[mid] < x:
        return findFloor(nums, mid, right, x)

    # if `x` is less than the middle element, the floor exists in the left
    # sublist nums[left…mid-1]
    else:
        return findFloor(nums, left, mid - 1, x)

if __name__ == '__main__':

    nums = [1, 4, 6, 8, 9]

    for i in range(10 + 1):
        print(f'Number {i} —> ceiling is {findCeiling(nums, 0, len(nums) - 1, i)}, '
              f'floor is {findFloor(nums, 0, len(nums) - 1, i)}')
```

**Output:** Number 0 —> ceiling is 1, floor is -1 Number 1 —> ceiling is 1, floor is 1 Number 2 —> ceiling is 4, floor is 1 Number 3 —> ceiling is 4, floor is 1 Number 4 —> ceiling is 4, floor is 4 Number 5 —> ceiling is 6, floor is 4 Number 6 —> ceiling is 6, floor is 6 Number 7 —> ceiling is 8, floor is 6 Number 8 —> ceiling is 8, floor is 8 Number 9 —> ceiling is 9, floor is 9 Number 10 —> ceiling is -1, floor is 9

The time complexity of the above solution is O(log(n)) and requires O(log(n)) implicit space for the call stack.

**Exercise:** [Write an iterative function to find the floor and ceil of a number](https://techiedelight.com/find-floor-ceil-number-sorted-array/).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 157

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
