# Find the index of 0 to be replaced to get the maximum length sequence of continuous ones

> Source: https://www.techiedelight.com/find-index-0-replaced-get-maximum-length-sequence-of-continuous-ones/

[Array](https://www.techiedelight.com/Category/Array/)

Given a binary array, find the index of 0 to be replaced with 1 to get the maximum length sequence of continuous ones.

For example, consider the array `{ 0, 0, 1, 0, 1, 1, 1, 0, 1, 1 }`. We need to replace index 7 to get the continuous sequence of length 6 containing all 1’s.

> 

We can efficiently solve this problem in linear time and constant space. The idea is to traverse the given array and maintain an index of the previous zero encountered. We can then easily find out the total number of 1’s between the current zero and the last zero for each subsequent zeros. For each element, check if the maximum sequence of continuous 1’s ending at that element (including the last zero, which is now replaced by 1) exceeds the maximum sequence found so far. If yes, update the maximum sequence to the current sequence length and index of optimal zero and index the last zero encountered.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Find the index of 0 to replace with 1 to get the maximum sequence
// of continuous 1's
int findIndexofZero(int arr[], int n)
{
    int max_count = 0;          // stores maximum number of 1's (including zero)
    int max_index = -1;         // stores index of 0 to be replaced

    int prev_zero_index = -1;   // stores index of previous zero
    int count = 0;              // stores current count of zeros

    // consider each index `i` in the array
    for (int i = 0; i < n; i++)
    {
        // if the current element is 1
        if (arr[i] == 1) {
            count++;
        }
        // if the current element is 0
        else {
            // reset count to 1 + number of ones to the left of current 0
            count = i - prev_zero_index;

            // update `prev_zero_index` to the current index
            prev_zero_index = i;
        }

        // update maximum count and index of 0 to be replaced if required
        if (count > max_count)
        {
            max_count = count;
            max_index = prev_zero_index;
        }
    }

    // return index of 0 to be replaced or -1 if the array contains all 1's
    return max_index;
}

int main(void)
{
    int arr[] = { 0, 0, 1, 0, 1, 1, 1, 0, 1, 1 };
    int n = sizeof(arr) / sizeof(arr[0]);

    int index = findIndexofZero(arr, n);

    if (index != -1) {
        printf("Index to be replaced is %d", index);
    }
    else {
        printf("Invalid input");
    }

    return 0;
}
```

**Output:** Index to be replaced is 7

##

```java
class Main
{
    // Find the index of 0 to replace with 1 to get the maximum sequence
    // of continuous 1's
    public static int findIndexofZero(int[] A)
    {
        int max_count = 0;          // stores maximum number of 1's (including 0)
        int max_index = -1;         // stores index of 0 to be replaced

        int prev_zero_index = -1;   // stores index of previous zero
        int count = 0;              // stores current count of zeros

        // consider each index `i` in the array
        for (int i = 0; i < A.length; i++)
        {
            // if the current element is 1
            if (A[i] == 1) {
                count++;
            }
            // if the current element is 0
            else {
                // reset count to 1 + number of ones to the left of current 0
                count = i - prev_zero_index;

                // update `prev_zero_index` to the current index
                prev_zero_index = i;
            }

            // update maximum count and index of 0 to be replaced if required
            if (count > max_count)
            {
                max_count = count;
                max_index = prev_zero_index;
            }
        }

        // return index of 0 to be replaced or -1 if the array contains all 1's
        return max_index;
    }

    public static void main (String[] args)
    {
        int[] A = { 0, 0, 1, 0, 1, 1, 1, 0, 1, 1 };

        int index = findIndexofZero(A);

        if (index != -1) {
            System.out.print("Index to be replaced is " + index);
        }
        else {
            System.out.print("Invalid input");
        }
    }
}
```

##

```python3
# Find the index of 0 to replace with 1 to get the maximum sequence
# of continuous 1's
def findIndexofZero(A):

    max_count = 0           # stores maximum number of 1's (including 0)
    max_index = -1          # stores index of 0 to be replaced

    prev_zero_index = -1    # stores index of previous zero
    count = 0               # stores current count of zeros

    # consider each index `i` in the list
    for i in range(len(A)):

        # if the current element is 1
        if A[i] == 1:
            count = count + 1

        else:
            # if the current element is 0
            # reset count to 1 + number of ones to the left of current 0
            count = i - prev_zero_index

            # update `prev_zero_index` to the current index
            prev_zero_index = i

        # update maximum count and index of 0 to be replaced if required
        if count > max_count:
            max_count = count
            max_index = prev_zero_index

    # return index of 0 to be replaced or -1 if the list contains all 1's
    return max_index

if __name__ == '__main__':

    A = [0, 0, 1, 0, 1, 1, 1, 0, 1, 1]

    index = findIndexofZero(A)
    if index != -1:
        print("Index to be replaced is", index)
    else:
        print("Invalid input")
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the given sequence.

We have discussed two more approaches to solve this problem:

> [Find maximum length sequence of continuous ones](https://techiedelight.com/find-maximum-length-sequence-continuous-ones/)

> [Find maximum length sequence of continuous ones (Using Sliding Window)](https://techiedelight.com/find-maximum-length-sequence-continuous-ones-sliding-window/)

Also See:

> [Find maximum length sequence of continuous ones (Using Sliding Window)](https://www.techiedelight.com/find-maximum-length-sequence-continuous-ones-sliding-window/ "Find maximum length sequence of continuous ones \(Using Sliding Window\)")

> [Find maximum length sequence of continuous ones](https://www.techiedelight.com/find-maximum-length-sequence-continuous-ones/ "Find maximum length sequence of continuous ones")

> [Find the maximum sequence of continuous 1’s formed by replacing at-most `k` zeros by ones](https://www.techiedelight.com/find-maximum-sequence-of-continuous-1s-can-formed-replacing-k-zeroes-ones/ "Find the maximum sequence of continuous 1’s formed by replacing at-most `k` zeros by ones")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.85/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
