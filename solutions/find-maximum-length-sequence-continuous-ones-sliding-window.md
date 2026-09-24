# Find maximum length sequence of continuous ones (Using Sliding Window)

> Source: https://www.techiedelight.com/find-maximum-length-sequence-continuous-ones-sliding-window/

[Array](https://www.techiedelight.com/Category/Array/)

Given a binary array, find the index of 0 to be replaced with 1 to get a maximum length sequence of continuous ones.

For example, consider array `{ 0, 0, 1, 0, 1, 1, 1, 0, 1, 1 }`. The index to be replaced is 7 to get a continuous sequence of length 6 containing all 1’s.

> 

We have already discussed two approaches to solve this problem ([here](https://techiedelight.com/find-index-0-replaced-get-maximum-length-sequence-of-continuous-ones/) and [here](https://techiedelight.com/find-maximum-length-sequence-continuous-ones/)). In this post, another approach is discussed, which uses a [sliding window technique](https://techiedelight.com/sliding-window-problems/).

The idea is to maintain a window containing at most one zero at any point and add elements to the window from the right until it becomes unstable. The window becomes unstable if the total number of zeros in it becomes 2. If the window becomes unstable, remove elements from its left till it becomes stable again (by removing the leftmost zero). If the window is stable and the current window length is more than the maximum window found so far, update the index of 0 to be replaced.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Find the index of 0 to replace with 1 to get the maximum sequence
// of continuous 1's using the sliding window technique
int findIndexofZero(int arr[], int n)
{
    int left = 0;           // represents the window's starting index
    int count = 0;          // stores the total number of zeros in the current window

    int max_count = 0;          // stores the maximum number of 1's (including 0)
    int max_index = -1;         // stores the index of 0 to be replaced
    int prev_zero_index = -1;   // stores the index of previous zero

    // maintain a window `[left…i]` containing at most one zero
    for (int i = 0; i < n; i++)
    {
        // if the current element is 0, update `prev_zero_index` and
        // increase zeros count in the current window by 1
        if (arr[i] == 0)
        {
            prev_zero_index = i;
            count++;
        }

        // the window becomes unstable if the total number of zeros in it becomes 2
        if (count == 2)
        {
            // remove elements from the window's left side till
            // we found a zero
            while (arr[left]) {
                left++;
            }

            // remove the leftmost 0 so that window becomes stable again
            left++;

            // decrement count as 0 is removed
            count = 1;
        }

        // when we reach here, window `[left…i]` contains only at most
        // one zero; update the maximum count and index of 0 to be replaced
        // if required
        if (i - left + 1 > max_count)
        {
            max_count = i - left + 1;
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
    // of continuous 1's using the sliding window technique
    public static int findIndexofZero(int[] A)
    {
        int left = 0;       // represents the window's starting index
        int count = 0;      // stores the total number of zeros in the current window
        int max_count = 0;  // stores the maximum number of 1's (including 0)

        int max_index = -1;         // stores the index of 0 to be replaced
        int prev_zero_index = -1;   // stores the index of previous zero

        // maintain a window `[left…i]` containing at most one zero
        for (int i = 0; i < A.length; i++)
        {
            // if the current element is 0, update `prev_zero_index` and
            // increase zeros count in the current window by 1
            if (A[i] == 0)
            {
                prev_zero_index = i;
                count++;
            }

            // the window becomes unstable if the total number of zeros in it becomes 2
            if (count == 2)
            {
                // remove elements from the window's left side till
                // we found a zero
                while (A[left] != 0) {
                    left++;
                }

                // remove the leftmost 0 so that window becomes stable again
                left++;

                // decrement count as 0 is removed
                count = 1;
            }

            // when we reach here, window `[left…i]` contains only
            // at most one zero; update the maximum count and index of 0
            // to be replaced if required

            if (i - left + 1 > max_count)
            {
                max_count = i - left + 1;
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
# of continuous 1's using the sliding window technique
def findIndexofZero(A):

    left = 0                # represents the window's starting index
    count = 0               # stores the total number of zeros in the current window
    max_count = 0           # stores the maximum number of 1's (including 0)

    max_index = -1          # stores the index of 0 to be replaced
    prev_zero_index = -1    # stores the index of previous zero

    # maintain a window `[left…i]` containing at most one zero
    for i in range(len(A)):

        # if the current element is 0, update prev_zero_index and
        # increase zeros count in the current window by 1
        if A[i] == 0:
            prev_zero_index = i
            count = count + 1

        # the window becomes unstable if the total number of zeros in it becomes 2
        if count == 2:
            # remove elements from the window's left side till
            # we found a zero
            while A[left]:
                left = left + 1

            # remove the leftmost 0 so that window becomes stable again
            left = left + 1

            # decrement count as 0 is removed
            count = 1

        # when we reach here, window `[left…i]` contains only
        # at most one zero; update the maximum count and index of 0
        # to be replaced if required

        if i - left + 1 > max_count:
            max_count = i - left + 1
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

Also See:

> [Find the index of 0 to be replaced to get the maximum length sequence of continuous ones](https://www.techiedelight.com/find-index-0-replaced-get-maximum-length-sequence-of-continuous-ones/ "Find the index of 0 to be replaced to get the maximum length sequence of continuous ones")

> [Find maximum length sequence of continuous ones](https://www.techiedelight.com/find-maximum-length-sequence-continuous-ones/ "Find maximum length sequence of continuous ones")

> [Find the maximum sequence of continuous 1’s formed by replacing at-most `k` zeros by ones](https://www.techiedelight.com/find-maximum-sequence-of-continuous-1s-can-formed-replacing-k-zeroes-ones/ "Find the maximum sequence of continuous 1’s formed by replacing at-most `k` zeros by ones")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 110

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Sliding Window](https://www.techiedelight.com/Tags/Sliding-Window/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
