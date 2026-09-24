# Print all combinations of numbers from 1 to `n` having sum `n`

> Source: https://www.techiedelight.com/print-all-combination-numbers-from-1-to-n/

Given a positive integer `n`, print all combinations of numbers between 1 and `n` having sum `n`.

For example,

For **n = 5** , the following combinations are possible: { 5 } { 1, 4 } { 2, 3 } { 1, 1, 3 } { 1, 2, 2 } { 1, 1, 1, 2 } { 1, 1, 1, 1, 1 } For **n = 4** , the following combinations are possible: { 4 } { 1, 3 } { 2, 2 } { 1, 1, 2 } { 1, 1, 1, 1 }

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to consider every integer `i` from 1 to `n` and add it to the output and recur for remaining elements `[i…n]` with reduced sum `n-i`. To avoid printing permutations, each combination will be constructed in non-decreasing order. If a combination with the given sum is reached, print it.

Following is the C, C++, Java, and Python implementation of the idea:

```c
#include <stdio.h>

// Function to print the contents of a given array
void printCombination(int out[], int n)
{
    for (int i = 0; i < n; i++) {
        printf("%d ", out[i]);
    }

    printf("\n");
}

// Recursive function to print all combinations of numbers from `i` to `n`
// having sum `n`. The `index` denotes the next free slot in the output array `out`
void printCombinations(int i, int n, int out[], int index)
{
    // if the sum becomes `n`, print the combination
    if (n == 0) {
        printCombination(out, index);
    }

    // start from the previous element in the combination till `n`
    for (int j = i; j <= n; j++)
    {
        // place current element at the current index
        out[index] = j;

        // recur with a reduced sum
        printCombinations(j, n - j, out, index + 1);
    }
}

int main(void)
{
    int n = 5;
    int out[n];

    // print all combinations of numbers from 1 to `n` having sum `n`
    printCombinations(1, n, out, 0);

    return 0;
}
```

**Output:** 1 1 1 1 1 1 1 1 2 1 1 3 1 2 2 1 4 2 3 5

##

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to print the contents of a given array
void printCombination(vector<int> const &out)
{
    for (int i: out) {
        cout << i << " ";
    }
    cout << endl;
}

// Recursive function to print all combinations of numbers
// from `i` to `n` having sum `n`
void printCombinations(int i, int n, vector<int> &out)
{
    // if the sum becomes `n`, print the combination
    if (n == 0) {
        printCombination(out);
    }

    // start from the previous element in the combination till `n`
    for (int j = i; j <= n; j++)
    {
        // include current element from the combination
        out.push_back(j);

        // recur with a reduced sum
        printCombinations(j, n - j, out);

        // backtrack: remove the current element from the combination
        out.pop_back();
    }
}

int main()
{
    int n = 5;

    vector<int> out;

    // recur all combinations of numbers from 1 to `n` having sum `n`
    printCombinations(1, n, out);

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.stream.Collectors;

class Main
{
    // Recursive function to print all combinations of numbers from `i` to `n`
    // having sum `n`. The `index` denotes the next free slot in the output array `out`
    public static void printCombinations(int i, int n, int[] out, int index)
    {
        // if the sum becomes `n`, print the combination
        if (n == 0)
        {
            System.out.println(Arrays.stream(out).limit(index)
                    .boxed().collect(Collectors.toList()));
        }

        // start from the previous element in the combination till `n`
        for (int j = i; j <= n; j++)
        {
            // place current element at the current index
            out[index] = j;

            // recur with a reduced sum
            printCombinations(j, n - j, out, index + 1);
        }
    }

    public static void main(String[] args)
    {
        int n = 5;
        int[] out = new int[n];

        // print all combinations of numbers from 1 to `n` having sum `n`
        printCombinations(1, n, out, 0);
    }
}
```

##

```python3
# Recursive function to print all combinations of numbers from `i` to `n`
# having sum `n`. The `index` denotes the next free slot in the output list `out`
def printCombinations(i, n, out, index):

    # if the sum becomes `n`, print the combination
    if n == 0:
        print(out[:index])

    # start from the previous element in the combination till `n`
    for j in range(i, n + 1):

        # place current element at the current index
        out[index] = j

        # recur with a reduced sum
        printCombinations(j, n - j, out, index + 1)

if __name__ == '__main__':

    n = 5
    out = [None] * n

    # print all combinations of numbers from 1 to `n` having sum `n`
    printCombinations(1, n, out, 0)
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.47/5. Vote count: 154

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
