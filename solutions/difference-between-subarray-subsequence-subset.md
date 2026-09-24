# Difference between Subarray, Subsequence, and Subset

> Source: https://www.techiedelight.com/difference-between-subarray-subsequence-subset/

This post will discuss the difference between a subarray, a substring, a subsequence, and a subset.

## 1\. Subarray

A subarray is a slice from a contiguous array (i.e., occupy consecutive positions) and inherently maintains the order of elements. For example, the subarrays of array `{1, 2, 3}` are `{1}`, `{1, 2}`, `{1, 2, 3}`, `{2}`, `{2, 3}`, and `{3}`.

Following is the C, Java, and Python program to generate all subarrays of the specified array:

```c
#include <stdio.h>

// Function to print a subarray formed by nums[start, end]
void printSubarray(int nums[], int start, int end)
{
    printf("[");

    for (int i = start; i < end; i++) {
        printf("%d, ", nums[i]);
    }

    printf("%d]\n", nums[end]);
}

// Function to print all subarrays of the specified array
void printAllSubarrays(int nums[], int n)
{
    // consider all subarrays starting from `i`
    for (int i = 0; i < n; i++)
    {
        // consider all subarrays ending at `j`
        for (int j = i; j < n; j++) {
            printSubarray(nums, i, j);
        }
    }
}

int main()
{
    int nums[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(nums)/sizeof(nums[0]);

    printAllSubarrays(nums, n);

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.List;

class Main
{
    // Function to print all subarrays of the specified array
    public static void printAllSubarrays(List<Integer> input)
    {
        // consider all subarrays starting from `i`
        for (int i = 0; i < input.size(); i++)
        {
            // consider all subarrays ending at `j`
            for (int j = i; j < input.size(); j++)
            {
                // Function to print a subarray formed by [i, j]
                System.out.println(input.subList(i, j + 1));
            }
        }
    }

    public static void main(String[] args)
    {
        List<Integer> input = Arrays.asList(1, 2, 3, 4, 5);
        printAllSubarrays(input);
    }
}
```

##

```python3
# Function to print all sublists of the specified list
def printallSublists(nums):
    # consider all sublists starting from i
    for i in range(len(nums)):
        # consider all sublists ending at `j`
        for j in range(i, len(nums)):
            # Function to print a sublist formed by [i, j]
            print(nums[i: j + 1])

if __name__ == '__main__':
    nums = [1, 2, 3, 4, 5]
    printallSublists(nums)
```

**Output:** [1] [1, 2] [1, 2, 3] [1, 2, 3, 4] [1, 2, 3, 4, 5] [2] [2, 3] [2, 3, 4] [2, 3, 4, 5] [3] [3, 4] [3, 4, 5] [4] [4, 5] [5]

Please note that there are precisely `n×(n+1)/2` subarrays in an array of size `n`. Also, there is no such thing as a contiguous subarray. The prefix contiguous is sometimes applied to make the context more clear. So, a contiguous subarray is just another name for a subarray.

## 2\. Substring

A [substring](https://en.wikipedia.org/wiki/Substring) of a string `s` is a string `s'` that occurs in `s`. A substring is almost similar to a subarray, but it is in the context of strings.

For example, the substrings of string `'apple'` are `'apple', 'appl', 'pple', 'app', 'ppl', 'ple', 'ap', 'pp', 'pl', 'le', 'a', 'p', 'l', 'e', ''`. Following is the C++, Java, and Python program that generates all non-empty substrings of the specified string:

```cpp
#include <iostream>
using namespace std;

// Function to print all non-empty substrings of the specified string
void printAllSubstrings(string str)
{
    int n = str.length();

    // consider all substrings starting from `i`
    for (int i = 0; i < n; i++)
    {
        // consider all substrings ending at j
        for (int j = i; j < n; j++) {
            cout << "'" << str.substr(i, j - i + 1) << "', ";
        }
    }
}

int main()
{
    string str = "techie";
    printAllSubstrings(str);

    return 0;
}
```

**Output:** ` 't', 'te', 'tec', 'tech', 'techi', 'techie', 'e', 'ec', 'ech', 'echi', 'echie', 'c', 'ch', 'chi', 'chie', 'h', 'hi', 'hie', 'i', 'ie', 'e' `

##

```java
class Main
{
    // Function to print all non-empty substrings of the specified string
    public static void printAllSubstrings(String str)
    {
        int n = str.length();

        // consider all substrings starting from `i`
        for (int i = 0; i < n; i++)
        {
            // consider all substrings ending at j
            for (int j = i; j < n; j++) {
                System.out.print("'" + str.substring(i, j + 1) + "', ");
            }
        }
    }

    public static void main(String[] args)
    {
        String str = "techie";
        printAllSubstrings(str);
    }
}
```

##

```python3
# Function to print all non-empty substrings of the specified string
def printAllSubstrings(s):
    # consider all substrings starting from i
    for i in range(len(s)):
        # consider all substrings ending at j
        for j in range(i, len(s)):
            print(s[i: j + 1], end=' ')

if __name__ == '__main__':
    s = 'techie'
    printAllSubstrings(s)
```

## 3\. Subsequence

A [subsequence](https://en.wikipedia.org/wiki/subsequence) is a sequence that can be derived from another sequence by deleting some elements without changing the order of the remaining elements. For example, `{A, B, D}` is a subsequence of sequence `{A, B, C, D, E}` obtained after removing `{C}` and `{E}`.

People are often confused between a subarray/substring and a subsequence. A subarray or substring will always be contiguous, but a subsequence need not be contiguous. That is, [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) are not required to occupy consecutive positions within the original sequences. But we can say that both contiguous subsequence and subarray are the same.

In other words, the subsequence is a generalization of a substring, or substring is a refinement of the subsequence. For example, `{A, C, E}` is a subsequence of `{A, B, C, D, E}`, but not a substring, and `{A, B, C}` is both a subarray and a subsequence.

Please note that a subsequence can be in the context of both arrays and strings. Generating all subsequences of an array/string is equivalent to [generating a power set](https://techiedelight.com/generate-power-set-given-set/) of an array/string. For a given set, `S`, we can find the power set by generating all binary numbers between `0` and `2n-1`, where `n` is the size of the given set. This approach is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <cmath>
using namespace std;

// Function to print all subsequences of the specified string
void findPowerSet(string str)
{
    int n = str.length();

    // N stores the total number of subsets
    int N = pow(2, n);

    // generate each subset one by one
    for (int i = 0; i < N; i++)
    {
        cout << "'";

        // check every bit of `i`
        for (int j = 0; j < n; j++)
        {
            // if j'th bit of `i` is set, print S[j]
            if (i & (1 << j)) {
                cout << str[j];
            }
        }
        cout << "', ";
    }
}

int main()
{
    string str = "apple";
    findPowerSet(str);

    return 0;
}
```

**Output:** ` '', 'a', 'p', 'ap', 'p', 'ap', 'pp', 'app', 'l', 'al', 'pl', 'apl', 'pl', 'apl', 'ppl', 'appl', 'e', 'ae', 'pe', 'ape', 'pe', 'ape', 'ppe', 'appe', 'le', 'ale', 'ple', 'aple', 'ple', 'aple', 'pple', 'apple' `
