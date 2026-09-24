# Find minimum moves required for converting a given array to an array of zeros

> Source: https://www.techiedelight.com/find-minimum-moves-required-converting-array/

[Array](https://www.techiedelight.com/Category/Array/)

Find the minimum number of moves required for converting an array of zeros to a given array of non-negative integers using only increment and double operations. The increment operation increases the value of an array element by 1 and the double operation doubles the value of each array element.

For example,

The minimum number of moves required to convert an array {0, 0, 0} to array {8, 9, 8} is 7. The optimal sequence is 3 increment operations, followed by 3 double operations, and a single increment operation, as shown below: { 0, 0, 0 } —> { 1, 0, 0 } —> { 1, 1, 0 } —> { 1, 1, 1 } —> { 2, 2, 2 } —> { 4, 4, 4 } —> { 8, 8, 8 } —> { 8, 9, 8 }

> 

The idea is to do the opposite, i.e., the array can be converted to an array of zeros using decrement and reduce operation. The decrement operation lowers the value of an array element by one. And, that reduce operation minimizes the value of each array element by half. This logic works since the minimum number of moves would remain the same for converting either array to another. The algorithm can be implemented as the following:

Traverse the array and convert each odd number to even by reducing its value by 1. For each decrement operation, increment the number of moves required. After traversing the array, the array is left with all even numbers. Now divide each even number by two and increment the number of moves by 1. Note this is done only once for the divide operation performed on the whole array. Repeat this process till each array element becomes 0.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>

// Find the minimum number of moves required for converting a given array
// to an array of zeros using only the decrement and reduce operation.
int countMoves(int arr[], int n)
{
    // stores the count of minimum moves required
    int min_moves = 0;

    // loop till all the array elements become 0
    while (1)
    {
        // stores count of 0's in the current array
        int no_of_zeros = 0;

        // traverse the array
        for (int i = 0; i < n; i++)
        {
            // convert all odd numbers to even by reducing their value by 1
            // for each odd value, increment the number of moves required
            if (arr[i] % 2 == 1)
            {
                --arr[i];
                ++min_moves;
            }

            // increment zeros count if the current element becomes 0
            if (arr[i] == 0) {
                no_of_zeros++;
            }
        }

        // break the loop if elements in the array become 0
        if (no_of_zeros == n) {
            break;
        }

        // Since each array element is even at this point,
        // divide each element by 2
        for (int j = 0; j < n; j++) {
            arr[j] = arr[j] / 2;
        }

        // increment number of moves by 1 for the above divide operation
        min_moves++;
    }

    // return count of minimum moves required
    return min_moves;
}

int main(void)
{
    int arr[] = { 8, 9, 8 };
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("The minimum moves required is %d", countMoves(arr, n));

    return 0;
}
```

**Output:** The minimum moves required is 7

##

```java
class Main
{
    // Find the minimum number of moves required for converting a given array
    // to an array of zeros using only the decrement and reduce operation.
    public static int countMoves(int[] arr)
    {
        // stores the count of minimum moves required
        int min_moves = 0;

        // loop till all the array elements become 0
        while (true)
        {
            // stores count of 0's in the current array
            int no_of_zeros = 0;

            // traverse the array
            for (int i = 0; i < arr.length; i++)
            {
                // convert all odd numbers to even by reducing their value by 1
                // for each odd value, increment the number of moves required
                if (arr[i] % 2 == 1)
                {
                    --arr[i];
                    ++min_moves;
                }

                // increment zeros count if the current element becomes 0
                if (arr[i] == 0) {
                    no_of_zeros++;
                }
            }

            // break the loop if elements in the array become 0
            if (no_of_zeros == arr.length) {
                break;
            }

            // Since each array element is even at this point,
            // divide each element by 2
            for (int j = 0; j < arr.length; j++) {
                arr[j] = arr[j] / 2;
            }

            // increment number of moves by 1 for the above divide operation
            min_moves++;
        }

        // return count of minimum moves required
        return min_moves;
    }

    public static void main(String[] args)
    {
        int[] arr = { 8, 9, 8 };

        System.out.print("The minimum moves required is " + countMoves(arr));
    }
}
```

##

```python3
# Find the minimum number of moves required for converting a given list
# to a list of zeros using only the decrement and reduce operation.
def countMoves(A):

    # stores the count of minimum moves required
    min_moves = 0

    # loop till all elements in the list become 0
    while True:

        # stores count of 0's in the current list
        no_of_zeros = 0

        # traverse the list
        for i in range(len(A)):
            # convert all odd numbers to even by reducing their value by 1
            # for each odd value, increment the number of moves required
            if A[i] % 2 == 1:
                A[i] = A[i] - 1
                min_moves = min_moves + 1

            # increment zeros count if the current element becomes 0
            if A[i] == 0:
                no_of_zeros = no_of_zeros + 1

        # break the loop if elements in the list become 0
        if no_of_zeros == len(A):
            break

        # Since each element in the list is even at this point,
        # divide each element by 2
        for j in range(len(A)):
            A[j] = A[j] // 2

        # increment number of moves by 1 for the above divide operation
        min_moves = min_moves + 1

    # return count of minimum moves required
    return min_moves

if __name__ == '__main__':

    A = [8, 9, 8]

    print("The minimum moves required is", countMoves(A))
```

The time complexity of the above solution will be O(n.log(m)) and runs in constant space. Here `n` is the size of the input, and `m` is the maximum element in the input.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 151

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
