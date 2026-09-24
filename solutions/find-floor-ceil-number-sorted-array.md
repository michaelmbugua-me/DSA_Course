# Find floor and ceil of a number in a sorted integer array

> Source: https://www.techiedelight.com/find-floor-ceil-number-sorted-array/

Given a sorted integer array, find the floor and ceil of a given number in it. The floor and ceil map the given number to the largest previous or the smallest following integer in the array.

More precisely, for a number `x`, `floor(x)` is the largest integer in the array less than or equal to `x`, and `ceil(x)` is the smallest integer in the array greater than or equal to `x`. If the floor or ceil doesn’t exist, consider it to be -1. For example,

**Input:** nums[] = [1, 4, 6, 8, 9] Number: 0 to 10 **Output:** Number 0 —> ceil is 1, floor is -1 Number 1 —> ceil is 1, floor is 1 Number 2 —> ceil is 4, floor is 1 Number 3 —> ceil is 4, floor is 1 Number 4 —> ceil is 4, floor is 4 Number 5 —> ceil is 6, floor is 4 Number 6 —> ceil is 6, floor is 6 Number 7 —> ceil is 8, floor is 6 Number 8 —> ceil is 8, floor is 8 Number 9 —> ceil is 9, floor is 9 Number 10 —> ceil is -1, floor is 9

> 

A simple solution would be to run a linear search on the array and find the largest integer in the array less than or equal to `x` and the smallest integer in the array greater than or equal to `x`. That would be the floor and ceil of the number `x`, respectively. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input.

We can easily solve this problem in O(log(n)) time by modifying the [binary search algorithm](https://techiedelight.com/binary-search/). The basic idea remains the same. We find the middle element and move to the left or right subarray based on comparison result with the given number. Following is the complete algorithm:

findCeil(nums[low, high], x)

Initialize ceil to -1 and iterate till our search space is exhausted.

  * If `x` is equal to the middle element, it is the ceil.
  * If `x` is less than the middle element, the ceil exists in subarray `nums[low…mid]`; update ceil to the middle value and reduce our search space to the left subarray `nums[low…mid-1]`.
  * If `x` is more than the middle element, the ceil exists in the right subarray `nums[mid+1…high]`.

findFloor(nums[low, high], x)

Initialize floor to -1 and iterate till our search space is exhausted.

  * If `x` is equal to the middle element, it is the floor.
  * If `x` is less than the middle element, the floor exists in the left subarray `nums[low…mid-1]`.
  * If `x` is more than the middle element, the floor exists in subarray `nums[mid…high]`; update floor to the middle element and reduce our search space to the right subarray `nums[mid+1…high]`.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Function to find the ceil of `x` in a sorted array nums[0…n-1]
// i.e., the smallest integer greater than or equal to `x`
int getCeil(int nums[], int n, int x)
{
    // search space is nums[low…high]
    int low = 0, high = n - 1, mid;

    // initialize ceil to -1
    int ceil = -1;

    // loop till the search space is exhausted
    while (low <= high)
    {
        // find the mid-value in the search space
        mid = (low + high) / 2;

        // if `x` is equal to the middle element, it is the ceil
        if (nums[mid] == x) {
            return nums[mid];
        }

        // if `x` is less than the middle element, the ceil exists in the
        // subarray nums[low…mid]; update ceil to the middle element
        // and reduce our search space to the left subarray nums[low…mid-1]
        else if (x < nums[mid])
        {
            ceil = nums[mid];
            high = mid - 1;
        }

        // if `x` is more than the middle element, the ceil exists in the
        // right subarray nums[mid+1…high]
        else {
            low = mid + 1;
        }
    }

    return ceil;
}

// Function to find the floor of `x` in a sorted array nums[0…n-1],
// i.e., the largest integer less than or equal to `x`
int getFloor(int nums[], int n, int x)
{
    int low = 0, high = n - 1, mid;

    // initialize floor to -1
    int floor = -1;

    // loop till the search space is exhausted
    while (low <= high)
    {
        // find the mid-value in the search space
        mid = (low + high) / 2;

        // if `x` is equal to the middle element, it is the floor
        if (nums[mid] == x) {
            return nums[mid];
        }

        // if `x` is less than the middle element, the floor exists in the left
        // subarray nums[low…mid-1]
        else if (x < nums[mid]) {
            high = mid - 1;
        }

        // if `x` is more than the middle element, the floor exists in the
        // subarray nums[mid…high]; update floor to the middle element
        // and reduce our search space to the right subarray nums[mid+1…high]
        else {
            floor = nums[mid];
            low = mid + 1;
        }
    }

    return floor;
}

int main(void)
{
    int nums[] = { 1, 4, 6, 8, 9 };
    int n = sizeof(nums) / sizeof(nums[0]);

    for (int i = 0; i <= 10; i++)
    {
        printf("Number %d —> ", i);
        printf("ceil is %d, ", getCeil(nums, n, i));
        printf("floor is %d\n", getFloor(nums, n, i));
    }

    return 0;
}
```

##

```java
class Main
{
    // Function to find the ceil of `x` in a sorted array nums[],
    // i.e., the smallest integer greater than or equal to `x`
    public static int getCeil(int[] nums, int x)
    {
        // search space is nums[left…right]
        int left = 0, right = nums.length - 1;

        // initialize ceil to -1
        int ceil = -1;

        // loop till the search space is exhausted
        while (left <= right)
        {
            // find the mid-value in the search space
            int mid = (left + right) / 2;

            // if `x` is equal to the middle element, it is the ceil
            if (nums[mid] == x) {
                return nums[mid];
            }

            // if `x` is less than the middle element, the ceil exists in the
            // subarray nums[left…mid]; update ceil to the middle element
            // and reduce our search space to the left subarray nums[left…mid-1]
            else if (x < nums[mid])
            {
                ceil = nums[mid];
                right = mid - 1;
            }

            // if `x` is more than the middle element, the ceil exists in the
            // right subarray nums[mid+1…right]
            else {
                left = mid + 1;
            }
        }

        return ceil;
    }

    // Function to find the floor of `x` in a sorted array nums[],
    // i.e., the largest integer less than or equal to `x`
    public static int getFloor(int[] nums, int x)
    {
        int left = 0, right = nums.length - 1;

        // initialize floor to -1
        int floor = -1;

        // loop till the search space is exhausted
        while (left <= right)
        {
            // find the mid-value in the search space
            int mid = (left + right) / 2;

            // if `x` is equal to the middle element, it is the floor
            if (nums[mid] == x) {
                return nums[mid];
            }

            // if `x` is less than the middle element, the floor exists in the left
            // subarray nums[left…mid-1]
            else if (x < nums[mid]) {
                right = mid - 1;
            }

            // if `x` is more than the middle element, the floor exists in the
            // subarray nums[mid…right]; update floor to the middle element
            // and reduce our search space to the right subarray nums[mid+1…right]
            else {
                floor = nums[mid];
                left = mid + 1;
            }
        }

        return floor;
    }

    public static void main(String[] args)
    {
        int[] nums = { 1, 4, 6, 8, 9 };

        for (int i = 0; i <= 10; i++) {
            System.out.println("Number " + i + " —> ceil is " + getCeil(nums, i)
                    + ", floor is " + getFloor(nums, i));
        }
    }
}
```

##

```python3
# Function to find the ceil of `x` in a sorted list `nums`,
# i.e., the smallest integer greater than or equal to `x`
def getCeil(nums, x):

    # search space is nums[left…right]
    (left, right) = (0, len(nums) - 1)

    # initialize ceil to -1
    ceil = -1

    # loop till the search space is exhausted
    while left <= right:

        # find the mid-value in the search space
        mid = (left + right) // 2

        # if `x` is equal to the middle element, it is the ceil
        if nums[mid] == x:
            return nums[mid]

        # if `x` is less than the middle element, the ceil exists in the
        # sublist nums[left…mid]; update ceil to the middle element
        # and reduce our search space to the left sublist nums[left…mid-1]
        elif x < nums[mid]:
            ceil = nums[mid]
            right = mid - 1

        # if `x` is more than the middle element, the ceil exists in the
        # right sublist nums[mid+1…right]
        else:
            left = mid + 1

    return ceil

# Function to find the floor of `x` in a sorted list `nums`,
# i.e., the largest integer less than or equal to `x`
def getFloor(nums, x):

    (left, right) = (0, len(nums) - 1)

    # initialize floor to -1
    floor = -1

    # loop till the search space is exhausted
    while left <= right:

        # find the mid-value in the search space
        mid = (left + right) // 2

        # if `x` is equal to the middle element, it is the floor
        if nums[mid] == x:
            return nums[mid]

        # if `x` is less than the middle element, the floor exists in the left
        # sublist nums[left…mid-1]
        elif x < nums[mid]:
            right = mid - 1

        # if `x` is more than the middle element, the floor exists in the
        # sublist nums[mid…right]; update floor to the middle element
        # and reduce our search space to the right sublist nums[mid+1…right]
        else:
            floor = nums[mid]
            left = mid + 1

    return floor

if __name__ == '__main__':

    nums = [1, 4, 6, 8, 9]

    for i in range(max(nums) + 2):
        print(f'Number {i} —> ceil is {getCeil(nums, i)},floor is {getFloor(nums, i)}')
```

**Output:** Number 0 —> ceil is 1, floor is -1 Number 1 —> ceil is 1, floor is 1 Number 2 —> ceil is 4, floor is 1 Number 3 —> ceil is 4, floor is 1 Number 4 —> ceil is 4, floor is 4 Number 5 —> ceil is 6, floor is 4 Number 6 —> ceil is 6, floor is 6 Number 7 —> ceil is 8, floor is 6 Number 8 —> ceil is 8, floor is 8 Number 9 —> ceil is 9, floor is 9 Number 10 —> ceil is -1, floor is 9

The time complexity of the above solution is O(log(n)) and doesn’t require any extra space.

**Exercise:** [Write a recursive solution to find the floor and ceil of a number](https://techiedelight.com/find-floor-ceil-number-sorted-array-recursive/).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 202

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
