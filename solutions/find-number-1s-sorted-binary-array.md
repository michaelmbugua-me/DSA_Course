# Find the number of 1’s in a sorted binary array

> Source: https://www.techiedelight.com/find-number-1s-sorted-binary-array/

Given a sorted binary array, efficiently count the total number of 1’s in it.

For example,

**Input:** nums[] = [0, 0, 0, 0, 1, 1, 1] **Output:** The total number of 1’s present is 3 **Input:** nums[] = [0, 0, 1, 1, 1, 1, 1] **Output:** The total number of 1’s present is 5

> 

A simple solution would be to run a linear search on the array and find the first occurrence of 1. The output will then be the array’s length minus the index of the first occurrence of 1. The problem with this approach is that its worst-case time complexity is O(n), where `n` is the size of the input.

We can easily solve this problem in O(log(n)) time using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) by taking advantage of the fact that the input is sorted (i.e., all 0’s, followed by all 1’s). The idea is to split the array into two halves and recur for both halves. If the last element of the subarray is 0, then all 0’s are present in it since it is sorted, and we return 0 from the function. If the first array element is 1, then all its elements are 1’s only since the array is sorted, and we return the total number of elements in that partition.

The algorithm can be implemented as follows in C, C++, Java, and Python:

```c
#include <stdio.h>

// Function to find the total number of 1's in a sorted binary array
int count(int nums[], int n)
{
    // if the last array element is 0, no 1's can
    // be present since it is sorted
    if (nums[n - 1] == 0) {
        return 0;
    }

    // if the first array element is 1, all its elements
    // are ones only since it is sorted
    if (nums[0]) {
        return n;
    }

    // divide the array into left and right subarray and recur
    return count(nums, n/2) + count(nums + n/2, n - n/2);
}

int main(void)
{
    int nums[] = { 0, 0, 0, 0, 1, 1, 1 };
    int n = sizeof(nums) / sizeof(nums[0]);

    printf("The total number of 1's present is %d", count(nums, n));

    return 0;
}
```

**Output:** The total number of 1’s present is 3

##

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to find the total number of 1's in a sorted binary array
int count(vector<int> const &nums)
{
    return upper_bound(nums.begin(), nums.end(), 1)
            - lower_bound(nums.begin(), nums.end(), 1);
}

int main()
{
    vector<int> nums = { 0, 0, 0, 0, 1, 1, 1 };

    cout << "The total number of 1's present is " << count(nums);

    return 0;
}
```

##

```java
class Main
{
    // Function to find the total number of 1's in a sorted binary array
    public static int count(int[] nums, int left, int right)
    {
        // base case
        if (nums == null || nums.length == 0) {
            return 0;
        }

        // if the last array element is 0, no 1's can
        // be present since it is sorted
        if (nums[right] == 0) {
            return 0;
        }

        // if the first array element is 1, all its elements
        // are ones only since it is sorted
        if (nums[left] == 1) {
            return (right - left + 1);
        }

        // divide the array into left and right subarray and recur
        int mid = (left + right) / 2;
        return count(nums, left, mid) + count(nums, mid + 1, right);
    }

    public static void main(String[] args)
    {
        int[] nums = { 0, 0, 0, 0, 1, 1, 1 };

        System.out.println("The total number of 1's present is "
                                    + count(nums, 0, nums.length - 1));
    }
}
```

##

```python3
# Function to find the total number of 1's in a sorted binary list
def count(nums, left=None, right=None):

    # base case
    if not nums:
        return 0

    # Initialize left and right
    if left is None and right is None:
        left, right = 0, len(nums) - 1

    # if the last element in the list is 0, no 1's can
    # be present since it is sorted
    if nums[right] == 0:
        return 0

    # if the first element in the list is 1, all its elements
    # are ones only since it is sorted
    if nums[left] == 1:
        return right - left + 1

    # divide the list into left and right sublist and recur
    mid = (left + right) // 2
    return count(nums, left, mid) + count(nums, mid + 1, right)

if __name__ == '__main__':

    nums = [0, 0, 0, 0, 1, 1, 1]
    print('The total number of 1\'s present is', count(nums))
```

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 176

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
