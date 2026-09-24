# Find the duplicate element in a limited range array

> Source: https://www.techiedelight.com/find-duplicate-element-limited-range-array/

Given a limited range array of size `n` containing elements between 1 and `n-1` with one element repeating, find the duplicate number in it without using any extra space.

For example,

**Input:** { 1, 2, 3, 4, 4 } **Output:** The duplicate element is 4 **Input:** { 1, 2, 3, 4, 2 } **Output:** The duplicate element is 2

> 

## Approach 1: Using Hashing

The idea is to use [hashing](https://techiedelight.com/hashing-in-data-structure/) to solve this problem. We can use a visited boolean array to mark if an element is seen before or not. If the element is already encountered before, the visited array will return true.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to find a duplicate element in a limited range array
int findDuplicate(vector<int> const &nums)
{
    int n = nums.size();

    // create a visited array of size `n+1`
    // we can also use a map instead of a visited array
    vector<bool> visited(n + 1);

    // mark each array element as visited and
    // return it if seen before
    for (int i: nums)
    {
        // if the element is seen before
        if (visited[i]) {
            return i;
        }

        // mark element as visited
        visited[i] = true;
    }

    // no duplicate found
    return -1;
}

int main()
{
    // input array contains `n` numbers between 1 and `n-1` with one duplicate
    vector<int> nums = { 1, 2, 3, 4, 4 };

    cout << "The duplicate element is " << findDuplicate(nums);

    return 0;
}
```

**Output:** The duplicate element is 4

##

```java
class Main
{
    // Function to find a duplicate element in a limited range array
    public static int findDuplicate(int[] nums)
    {
        // create a visited array of size `n+1`
        // we can also use a map instead of a visited array
        boolean visited[] = new boolean[nums.length + 1];

        // mark each array element as visited and
        // return it if seen before
        for (int value: nums)
        {
            // if the element is seen before
            if (visited[value]) {
                return value;
            }

            // mark element as visited
            visited[value] = true;
        }

        // no duplicate found
        return -1;
    }

    public static void main (String[] args)
    {
        // input array contains `n` numbers between 1 and `n-1`
        // with one duplicate, where `n` is the array's length
        int[] nums = { 1, 2, 3, 4, 4 };

        System.out.println("The duplicate element is " + findDuplicate(nums));
    }
}
```

##

```python3
# Function to find a duplicate element in a limited range list
def findDuplicate(nums):

    # create a visited list of size `n+1`
    # we can also use a dictionary instead of a visited list
    visited = [False] * (len(nums) + 1)

    # for each element in the list, mark it as visited and
    # return it if seen before
    for i in nums:

        # if the element is seen before
        if visited[i]:
            return i

        # mark element as visited
        visited[i] = True

    # no duplicate found
    return -1

if __name__ == '__main__':

    # input list contains `n` numbers between 1 and `n-1`
    # with one duplicate, where `n = len(nums)`
    nums = [1, 2, 3, 4, 4]

    print('The duplicate element is', findDuplicate(nums))
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

## Approach 2: Using Array Indices

We can solve this problem in constant space. Since the array contains all distinct elements except one and all elements lie in range 1 to `n-1`, we can check for a duplicate element by marking array elements as negative using the array index as a key. For each array element `nums[i]`, invert the sign of the element present at index `nums[i]`. Finally, traverse the array once again, and if a positive number is found at index `i`, then the duplicate element is `i`.

The above approach takes two traversals of the array. We can achieve the same in only a single traversal. For each array element `nums[i]`, invert the sign of the element present at index `nums[i]` if it is positive; otherwise, if the element is already negative, then it is a duplicate.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to find a duplicate element in a limited range array
int findDuplicate(vector<int> &nums)
{
    int duplicate = -1;

    // do for each array element
    for (int i = 0; i < nums.size(); i++)
    {
        // get the value of the current element
        int val = abs(nums[i]);

        // make element at index `val` negative if it is positive
        if (nums[val] >= 0) {
            nums[val] = -nums[val];
        }
        else {
            // if the element is already negative, it is repeated
            duplicate = val;
            break;
        }
    }

    // restore the original array before returning
    for (int i = 0; i < nums.size(); i++)
    {
        // make negative elements positive
        if (nums[i] < 0) {
            nums[i] = -nums[i];
        }
    }

    // return duplicate element
    return duplicate;
}

int main()
{
    // input array contains `n` numbers between 1 and `n-1`
    // with one duplicate
    vector<int> nums = { 1, 2, 3, 4, 2 };

    cout << "The duplicate element is " << findDuplicate(nums);

    return 0;
}
```

**Output:** The duplicate element is 2

##

```java
class Main
{
    // Function to find a duplicate element in a limited range array
    public static int findDuplicate(int[] nums)
    {
        int duplicate = -1;

        // do for each array element
        for (int i: nums)
        {
            // get the value of the current element
            int val = (i < 0) ? -i : i;

            // make element at index `val` negative if it is positive
            if (nums[val] >= 0) {
                nums[val] = -nums[val];
            }
            else {
                // if the element is already negative, it is repeated
                duplicate = val;
                break;
            }
        }

        // restore the original array before returning
        for (int i = 0; i < nums.length; i++)
        {
            // make negative elements positive
            if (nums[i] < 0) {
                nums[i] = -nums[i];
            }
        }

        // return duplicate element
        return duplicate;
    }

    public static void main (String[] args)
    {
        // input array contains `n` numbers between 1 and `n-1`
        // with one duplicate, where `n` is the array's length
        int[] nums = { 1, 2, 3, 4, 2 };

        System.out.println("The duplicate element is " + findDuplicate(nums));
    }
}
```

##

```python3
# Function to find a duplicate element in a limited range list
def findDuplicate(nums):

    duplicate = -1

    # do for each element in the list
    for i in range(len(nums)):

        # get the value of the current element
        val = -nums[i] if (nums[i] < 0) else nums[i]

        # make element at index `val` negative if it is positive
        if nums[val] >= 0:
            nums[val] = -nums[val]
        else:
            # if the element is already negative, it is repeated
            duplicate = val
            break

    # restore the original list before returning
    for i in range(len(nums)):
        # make negative elements positive
        if nums[i] < 0:
            nums[i] = -nums[i]

    # return duplicate element
    return duplicate

if __name__ == '__main__':

    # input list contains `n` numbers between 1 and `n-1`
    # with one duplicate, where `n = len(nums)`
    nums = [1, 2, 3, 4, 2]

    print('The duplicate element is', findDuplicate(nums))
```

The time complexity of the above solution is O(n).

## Approach 3: Using XOR

We can also solve this problem by taking xor of all array elements with numbers 1 to `n-1`. Since the same elements will cancel each other as `a^a = 0, 0^0 = 0` and `a^0 = a`, we will be left with the duplicate element. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Function to find a duplicate element in a limited range array
int findDuplicate(int nums[], int n)
{
    int xor = 0;

    // take xor of all array elements
    for (int i = 0; i < n; i++) {
        xor ^= nums[i];
    }

    // take xor of numbers from 1 to `n-1`
    for (int i = 1; i <= n-1; i++) {
        xor ^= i;
    }

    // same elements will cancel each other as a ^ a = 0,
    // 0 ^ 0 = 0 and a ^ 0 = a

    // `xor` will contain the missing number
    return xor;
}

int main()
{
    // input array contains `n` numbers between 1 and `n-1` with one duplicate
    int nums[] = { 1, 2, 3, 4, 2 };
    int n = sizeof(nums) / sizeof(nums[0]);

    printf("The duplicate element is %d", findDuplicate(nums, n));

    return 0;
}
```

**Output:** The duplicate element is 4
