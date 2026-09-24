# Print all combinations of positive integers in increasing order that sums to a given number

> Source: https://www.techiedelight.com/print-combinations-integers-sum-given-number/

[Array](https://www.techiedelight.com/Category/Array/)

Write code to print all combinations of positive integers in increasing order that sum to a given positive number.

For example,

**Input:** N = 3 1 1 1 1 2 3 **Input:** N = 4 1 1 1 1 1 1 2 1 3 2 2 4 **Input:** N = 5 1 1 1 1 1 1 1 1 2 1 1 3 1 2 2 1 4 2 3 5

> 

We can easily solve the problem using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) by taking the help of an auxiliary array to store combinations. This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Utility function to print given array
void printArray(int nums[], int n)
{
    for (int i = 0; i <= n; i++) {
        printf("%d ", nums[i]);
    }

    printf("\n");
}

// Recursive function to print all combinations of positive integers
// in increasing order that sum to a given number
void printCombinations(int nums[], int i, int sum, int sum_left)
{
    // to maintain the increasing order, start the loop from the
    // previous number stored in `nums[]`
    int prev_num = (i > 0) ? nums[i - 1] : 1;
    for (int k = prev_num; k <= sum; k++)
    {
        // set the next array element to `k`
        nums[i] = k;

        // recur with the sum left and the next location in the array
        if (sum_left > k) {
            printCombinations(nums, i + 1, sum, sum_left - k);
        }

        // if the sum is found
        if (sum_left == k) {
            printArray(nums, i);
        }
    }
}

// Wrapper over `printCombinations()` function
void findCombinations(int sum)
{
    // create a temporary array for storing the combinations
    int nums[sum];

    // recur for all combinations
    int starting_index = 0;
    printCombinations(nums, starting_index, sum, sum);
}

int main(void)
{
    int sum = 5;
    findCombinations(sum);

    return 0;
}
```

**Output:** 1 1 1 1 1 1 1 1 2 1 1 3 1 2 2 1 4 2 3 5

##

```java
import java.util.Arrays;
import java.util.stream.Collectors;

class Main
{
    // Recursive function to print all combinations of positive integers
    // in increasing order that sum to a given number
    public static void printCombinations(int[] nums, int i, int sum, int sum_left)
    {
        // to maintain the increasing order, start the loop from the
        // previous number stored in `nums[]`
        int prev_num = (i > 0) ? nums[i - 1] : 1;
        for (int k = prev_num; k <= sum; k++)
        {
            // set the next array element to `k`
            nums[i] = k;

            // recur with the sum left and the next location in the array
            if (sum_left > k) {
                printCombinations(nums, i + 1, sum, sum_left - k);
            }

            // if the sum is found
            if (sum_left == k)
            {
                System.out.println(Arrays.stream(nums).limit(i + 1).boxed()
                                .collect(Collectors.toList()));
            }
        }
    }

    // Wrapper over `printCombinations()` method
    public static void findCombinations(int sum)
    {
        // create a temporary array for storing the combinations
        int[] nums = new int[sum];

        // recur for all combinations
        int starting_index = 0;
        printCombinations(nums, starting_index, sum, sum);
    }

    public static void main(String[] args)
    {
        int sum = 5;
        findCombinations(sum);
    }
}
```

##

```python3
# Recursive function to print all combinations of positive integers
# in increasing order that sum to a given number
def printCombinations(nums, i, total, sum_left):

    # to maintain the increasing order, start the loop from the
    # previous number stored in `nums`
    prev_num = nums[i - 1] if (i > 0) else 1
    for k in range(prev_num, total + 1):

        # set the next element in the list to `k`
        nums[i] = k

        # recur with the sum left and the next location in the list
        if sum_left > k:
            printCombinations(nums, i + 1, total, sum_left - k)

        # if the sum is found
        if sum_left == k:
            print(nums[:i+1])

# Wrapper over `printCombinations()` function
def findCombinations(total):

    # create a temporary list for storing the combinations
    nums = [0] * total

    # recur for all combinations
    starting_index = 0
    printCombinations(nums, starting_index, total, total)

if __name__ == '__main__':

    total = 5
    findCombinations(total)
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

**Author:** Aditya Goel

Also See:

> [Print all combinations of numbers from 1 to `n` having sum `n`](https://www.techiedelight.com/print-all-combination-numbers-from-1-to-n/ "Print all combinations of numbers from 1 to `n` having sum `n`")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.69/5. Vote count: 190

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
