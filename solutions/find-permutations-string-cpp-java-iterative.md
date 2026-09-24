# Iterative approach to finding permutations of a string

> Source: https://www.techiedelight.com/find-permutations-string-cpp-java-iterative/

This post will discuss how to find permutations of a string using iteration.

In the [previous post](https://techiedelight.com/find-permutations-given-string/), we have seen the recursive implementation to find permutations of a string using [backtracking](https://techiedelight.com/backtracking-interview-questions/). This post will cover iterative implementation for the same.

> 

The recursive implementation doesn’t handle strings containing duplicate characters and prints the duplicate permutations. For example, for the string `ABA`, the permutations `BAA`, `ABA`, and `AAB` gets printed twice. The following iterative implementation using `std::next_permutation` can handle strings with duplicate characters and don’t repeat the permutations.

## 1\. Using `std::next_permutation`

The idea is to [sort the string](https://techiedelight.com/sort-array-ascending-order-cpp/) and repeatedly call [std::next_permutation](https://techiedelight.com/std_next_permutation-overview-implementation/) to generate the [next greater lexicographic permutation](https://techiedelight.com/find-lexicographically-next-permutations-string-sorted-ascending-order/) of a string.

The iterative implementation below avoids using `std::next_permutation` and implements the following [in-place algorithm](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) to generate the next permutation lexicographically:

  1. Find the largest index `i` such that `str[i-1]` is less than `str[i]`.
  2. Terminate the algorithm if `i` happens to be the first index of the string, since we are already at the highest possible permutation.
  3. If `i` is not the first index of the string, then the substring `str[i…n-1]` is sorted in reverse order, i.e., `str[i-1] < str[i] >= str[i+1] >= str[i+2] >= … >= str[n-1]`.
  4. Find the highest index `j` to the right of index `i` such that `str[j]` is greater than `str[i-1]` and swap the character at index `i-1` with index `j`.
  5. Reverse substring `str[i…n-1]` and repeat.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Iterative function to find permutations of a string
void permutations(string s)
{
    // get length of the string
    int n = s.length();

    // base case
    if (n == 0) {
        return;
    }

    // base case
    if (n == 1) {
        cout << s;
        return;
    }

    // sort the string in a natural order
    sort(s.begin(), s.end());

    while (1)
    {
        // print the current permutation
        cout << s << " ";

        /* The following code will rearrange the string to the next lexicographically
           ordered permutation (if any) or return if we are already at the
           highest possible permutation */

        // Find the largest index `i` such that `s[i-1]` is less than `s[i]`
        int i = n - 1;
        while (s[i-1] >= s[i])
        {
            // if `i` is the first index of the string, we are already at the last
            // possible permutation (string is sorted in reverse order)
            if (--i == 0) {
                return;
            }
        }

        // find the highest index `j` to the right of index `i` such that
        // `s[j] > s[i-1]` (`s[i…n-1]` is sorted in reverse order)

        int j = n - 1;
        while (j > i && s[j] <= s[i - 1]) {
            j--;
        }

        // swap character at index `i-1` with index `j`
        swap(s[i - 1], s[j]);

        // reverse substring `s[i…n-1]`
        reverse (s.begin() + i, s.end());
    }
}

int main()
{
    string s = "ABC";

    permutations(s);

    return 0;
}
```

**Output:** ABC ACB BAC BCA CAB CBA

##

```java
import java.util.Arrays;

class Main
{
    // Utility function to swap the characters in a character array
    private static void swap(char[] arr, int i, int j)
    {
        char c = arr[i];
        arr[i] = arr[j];
        arr[j] = c;
    }

    // Utility function to reverse a char array between specified indices
    private static void reverse(char[] arr, int i, int j)
    {
        // do till two endpoints intersect
        while (i < j) {
            swap(arr, i++, j--);
        }
    }

    // Iterative function to find permutations of a string in Java
    public static void permutations(String str)
    {
        // base case
        if (str == null || str.length() == 0) {
            return;
        }

        // base case
        if (str.length() == 1) {
            System.out.print(str);
            return;
        }

        // sort the string in a natural order
        char[] chars = str.toCharArray();
        Arrays.sort(chars);

        // get length of the string
        int n = str.length();

        while (true)
        {
            // print the current permutation
            System.out.print(String.valueOf(chars) + " ");

            /* The following code will rearrange the string to the next
               lexicographically ordered permutation (if any) or return if
               we are already at the highest possible permutation */

            // Find the largest index `i` such that `chars[i-1]` is less than `chars[i]`
            int i = n - 1;
            while (chars[i-1] >= chars[i])
            {
                // if `i` is the first index of the string, we are
                // already at the last possible permutation
                // (string is sorted in reverse order)
                if (--i == 0) {
                    return;
                }
            }

            // find the highest index `j` to the right of index `i` such that
            // `chars[j] > chars[i-1]` (`chars[i…n-1]` is sorted in reverse order)

            int j = n - 1;
            while (j > i && chars[j] <= chars[i-1]) {
                j--;
            }

            // swap character at index `i-1` with index `j`
            swap(chars, i - 1, j);

            // reverse substring `chars[i…n-1]`
            reverse (chars, i, n - 1);
        }
    }

    public static void main(String[] args)
    {
        String s = "ABC";
        permutations(s);
    }
}
```

##

```python3
# Utility function to swap the characters in a character list
def swap(A, i, j):
    c = A[i]
    A[i] = A[j]
    A[j] = c

# Utility function to reverse a list between specified indexes
def reverse(A, i, j):
    # do till two endpoints intersect
    while i < j:
        swap(A, i, j)
        i = i + 1
        j = j - 1

# Iterative function to find permutations of a string in Python
def permutations(s):

    # base case
    if not s:
        return []

    # base case
    if len(s) == 1:
        return [s]

    n = len(s)

    # sort the string in a natural order
    chars = sorted(list(s))

    while True:

        # print the current permutation
        print(''.join(chars), end=' ')

        ''' The following code will rearrange the string to the next lexicographically
            ordered permutation (if any) or return if we are already at
            the highest possible permutation '''

        # Find the largest index `i` such that `chars[i-1]` is less than `chars[i]`
        i = n - 1
        while chars[i - 1] >= chars[i]:
            # if `i` is the first index of the string, we are already at the
            # last possible permutation (string is sorted in reverse order)
            i = i - 1
            if i == 0:
                return

        # find the highest index `j` to the right of index `i` such that
        # `chars[j] > chars[i-1]` (`chars[i…n-1]` is sorted in reverse order)

        j = n - 1
        while j > i and chars[j] <= chars[i - 1]:
            j = j - 1

        # swap character at index `i-1` with index `j`
        swap(chars, i - 1, j)

        # reverse substring `chars[i…n-1]`
        reverse(chars, i, n - 1)

if __name__ == '__main__':
    s = 'ABC'
    permutations(s)
```

We can also sort the string in reverse order and repeatedly calls [std::prev_permutation](https://techiedelight.com/std_prev_permutation-overview-implementation/) to generate the previous lexicographic permutation of a string.

## 2\. Using Controller Array

Please refer to this [link](http://www.quickperm.org/quickperm.html) for details on the below algorithm.

```cpp
#include <iostream>
using namespace std;

// Iterative function to find permutations of a string
void permutations(string s)
{
    // get length of the string
    int n = s.length();

    // base case
    if (n == 0) {
        return;
    }

    // Weight index control array initialized by 0
    int p[n];
    for (int i = 0; i < n; i++)
    {
        // `p[i] == i` controls iteration and index boundaries for `i`
        p[i] = 0;
    }

    // `i` and `j` represent the upper and lower bound index, respectively,
    // for swapping
    int i = 1, j = 0;

    // print the given string, as only its permutations will be printed later
    cout << s;

    while (i < n)
    {
        if (p[i] < i)
        {
            // if `i` is odd then `j = p[i]`; otherwise, `j = 0`
            j = (i % 2) * p[i];

            swap(s[j], s[i]);

            // print the current permutation
            cout << " " << s;

            p[i]++;     // increase index "weight" for `i` by one
            i = 1;      // reset index `i` to 1
        }
        // otherwise, `p[i] == i`
        else {
            // reset `p[i]` to 0
            p[i] = 0;

            // set new index value for `i` (increase by one)
            i++;
        }
    }
}

int main()
{
    string str = "ABC";
    permutations(str);

    return 0;
}
```

**Output:** ABC BAC CAB ACB BCA CBA

##

```java
class Main
{
    // Utility function to swap the characters in a character array
    private static void swap(char[] arr, int i, int j)
    {
        char ch = arr[i];
        arr[i] = arr[j];
        arr[j] = ch;
    }

    // Iterative function to find permutations of a string in Java
    public static void permutations(String str)
    {
        // base case
        if (str == null || str.length() == 0) {
            return;
        }

        // convert the string to a character array (Since the string is immutable)
        char[] chars = str.toCharArray();

        // Weight index control array
        int[] p = new int[str.length()];

        // `i` and `j` represent the upper and lower bound index, respectively,
        // for swapping
        int i = 1, j;

        // print the given string, as only its permutations will be printed later
        System.out.print(str);

        while (i < str.length())
        {
            if (p[i] < i)
            {
                // if `i` is odd then `j = p[i]`; otherwise, `j = 0`
                j = (i % 2) * p[i];

                // swap(a[j], a[i])
                swap(chars, i, j);

                // print the current permutation
                System.out.print(" " + String.valueOf(chars));

                p[i]++;     // increase index "weight" for `i` by one
                i = 1;      // reset index `i` to 1
            }
            // otherwise, `p[i] == i`
            else {
                // reset `p[i]` to 0
                p[i] = 0;

                // set new index value for `i` (increase by one)
                i++;
            }
        }
    }

    public static void main(String[] args)
    {
        String str = "ABC";
        permutations(str);
    }
}
```

##

```python3
# Utility function to swap the characters in chars character list
def swap(chars, i, j):
    ch = chars[i]
    chars[i] = chars[j]
    chars[j] = ch

# Iterative function to find permutations of chars string in Python
def permutations(s):

    # base case
    if not s:
        return

    # convert the string to chars character list (Since the string is immutable)
    chars = list(s)

    # Weight index control list
    p = [0] * len(s)

    # `i` and `j` represent the upper and lower bound index, respectively, for swapping
    (i, j) = (1, 0)

    # print the given string, as only its permutations will be printed later
    print(s, end='')

    while i < len(s):

        if p[i] < i:

            # if `i` is odd then `j = p[i]`; otherwise, `j = 0`
            j = (i % 2) * p[i]

            # swap(chars[j], chars[i])
            swap(chars, i, j)

            # print the current permutation
            print("", "".join(chars), end='')

            p[i] = p[i] + 1     # increase index 'weight' for `i` by one
            i = 1               # reset index `i` to 1

        # otherwise, `p[i] == i`
        else:
            # reset `p[i]` to 0
            p[i] = 0

            # set new index value for `i` (increase by one)
            i = i + 1

if __name__ == '__main__':
    s = 'ABC'
    permutations(s)
```

## 3\. Using List

The following implementation uses the list to store the partially constructed permutations and then use those partial permutations to build the final permutations in later iterations:

```cpp
#include <iostream>
#include <list>
using namespace std;

// Iterative function to find permutations of a string in C++ using STL
void permutations(string s)
{
    // get length of the string
    int n = s.length();

    // base case
    if (n == 0) {
        return;
    }

    // create an empty list to store (partial) permutations and
    // initialize it with the first character of the string
    list<string> partial;

    string firstChar(1, s[0]);
    partial.push_back(firstChar);

    // do for every character of the specified string
    for (int i = 1; i < s.length(); i++)
    {
        // consider previously constructed partial permutation one by one
        for (int j = partial.size() - 1; j >= 0; j--)
        {
            // remove current partial permutation from the list
            string str = partial.front();
            partial.pop_front();

            // Insert the next character of the specified string, i.e., s[i],
            // in all possible positions of current partial permutation.
            // Then insert each of these newly constructed strings into the list.

            for (int k = 0; k <= str.length(); k++) {
                partial.push_back(str.substr(0, k) + s[i] + str.substr(k));
            }
        }
    }

    // The list now contains all permutations of the given string
    for (string s: partial) {
        cout << s << ' ';
    }
}

int main()
{
    string str = "ABC";
    permutations(str);

    return 0;
}
```

**Output:** CBA BCA BAC CAB ACB ABC
