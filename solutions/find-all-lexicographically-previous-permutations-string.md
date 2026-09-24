# Find all lexicographically previous permutations of a string

> Source: https://www.techiedelight.com/find-all-lexicographically-previous-permutations-string/

[String](https://www.techiedelight.com/Category/String/)

Given a string, find all lexicographically previous permutations of it.

The lexicographic or lexicographical order (also known as lexical order, dictionary order, alphabetical order) means that the words are arranged similarly as they are presumed to appear in a dictionary. For example, the lexicographically previous permutation of string `DCBA` is `DCAB`, for string `DCAB` is `DBCA`, and for string `DBCA` is `DBAC`.

A simple solution would be to use [std::prev_permutation](https://techiedelight.com/std_prev_permutation-overview-implementation/) that generates the next smaller lexicographic permutation of a string. If the function can determine the previous permutation, it rearranges the characters as such and returns true. If this is not possible (because it is already at the lowest possible permutation), it rearranges the characters according to the last permutation (sorted in descending order) and returns false.

The implementation can be seen below in C++:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Function to find all lexicographically previous permutations of a
// string using `std::prev_permutation`
void prev_permutation(string str)
{
    while (1)
    {
        // print the current permutation
        cout << str << " ";

        // find the previous lexicographically ordered permutation
        if (!prev_permutation(str.begin(), str.end())) {
            break;
        }
    }
}

int main()
{
    string str = "BADC";

    prev_permutation(str);

    return 0;
}
```

**Output:** BADC BACD ADCB ADBC ACDB ACBD ABDC ABCD

We can also implement our own `prev_permutation` function. The following algorithm generates the previous permutation lexicographically after a given permutation. It changes the permutation [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/).

  * Find the largest index `i` such that `str[i]` is less than `str[i-1]`.
  * Return false if `i` is the first index of the string, meaning that we are already at the lowest possible permutation, i.e., the string is sorted in ascending order. If `i` is not the first index of the string, the substring `str[i…n)` is sorted in ascending order, i.e. `str[i-1] > str[i] <= str[i+1] <= str[i+2] <= … <= str[n-1]`.
  * Find the lowest index `j` to the right of index `i` such that `str[j]` is greater than `str[i-1]` and swap the character at index `i-1` with index `j-1`.
  * Reverse substring `str[i…n)` and return true.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Function to find lexicographically previous permutations of a string.
// It returns true if the string could be rearranged as a lexicographically
// smaller permutation; otherwise, it returns false.
bool prev_permutation(string &str, int n)
{
    // find the largest index `i` such that `str[i]` is less than `str[i-1]`
    int i = n - 1;
    while (str[i - 1] <= str[i])
    {
        // if `i` is the first index of the string, that means we are already at the
        // lowest possible permutation, i.e., the string is sorted in ascending order
        if (--i == 0) {
            return false;
        }
    }

    /* If we reach here, the substring `str[i…n)` is sorted in ascending order
       i.e., `str[i-1] > str[i] <= str[i+1] <= str[i+2] <= … <= str[n-1]` */

    // find an index `j` to the right of index `i` such that `str[j] > str[i-1]`
    int j = i + 1;
    while (j < n && str[j] <= str[i-1]) {
        j++;
    }

    // swap character at index `i-1` with index `j-1`
    swap(str[i-1], str[j-1]);

    // Reverse substring `str[i…n)` and return true
    reverse(str.begin() + i, str.end());

    return true;
}

// Function to find all lexicographically previous permutations of a string
void permutations(string str)
{
    while (1)
    {
        // print the current permutation
        cout << str << " ";

        // find the previous lexicographically ordered permutation
        if (!prev_permutation(str, str.length())) {
            break;
        }
    }
}

int main()
{
    string str = "BADC";

    permutations(str);

    return 0;
}
```

**Output:** BADC BACD ADCB ADBC ACDB ACBD ABDC ABCD

##

```java
class Main
{
    private static void swap(char[] chars, int i, int j)
    {
        char ch = chars[i];
        chars[i] = chars[j];
        chars[j] = ch;
    }

    private static void reverse(char[] chars, int start)
    {
        for (int i = start, j = chars.length - 1; i < j; i++, j--) {
            swap(chars, i, j);
        }
    }

    // Function to find lexicographically previous permutations of a string.
    // It returns true if the string could be rearranged as a lexicographically
    // smaller permutation; otherwise, it returns false.
    public static boolean prev_permutation(char[] chars)
    {
        // find the largest index `i` such that `chars[i]` is less than `chars[i-1]`
        int i = chars.length - 1;
        while (chars[i - 1] <= chars[i])
        {
            // if `i` is the first index of the string, that means we are already
            // at the lowest possible permutation, i.e., the string is sorted in
            // ascending order
            if (--i == 0) {
                return false;
            }
        }

        /*
            If we reach here, the substring `chars[i…n)` is sorted in ascending order,
            i.e. `chars[i-1] > chars[i] <= chars[i+1] <= chars[i+2] <= … <= chars[n-1]`
        */

        // find an index `j` to the right of index `i` s.t. `chars[j] > chars[i-1]`
        int j = i + 1;
        while (j < chars.length && chars[j] <= chars[i-1]) {
            j++;
        }

        // swap character at index `i-1` with index `j-1`
        swap(chars, i - 1, j - 1);

        // reverse substring `chars[i…n)` and return true
        reverse(chars, i);

        return true;
    }

    // Function to find all lexicographically previous permutations of a string
    public static void permutations(String str)
    {
        // convert the string to a char array
        char[] chars = str.toCharArray();

        while (true)
        {
            // print the current permutation
            System.out.println(new String(chars));

            // find the previous lexicographically ordered permutation
            if (!prev_permutation(chars)) {
                break;
            }
        }
    }

    public static void main(String[] args)
    {
        String str = "BADC";
        permutations(str);
    }
}
```

##

```python3
def swap(chars, i, j):
    ch = chars[i]
    chars[i] = chars[j]
    chars[j] = ch

def reverse(chars, start):
    i = start
    j = len(chars) - 1
    while i < j:
        swap(chars, i, j)
        i = i + 1
        j = j - 1

# Function to find lexicographically previous permutations of a string.
# It returns true if the string could be rearranged as a lexicographically
# smaller permutation; otherwise, it returns false.
def prev_permutation(chars):

    # find the largest index `i` such that `chars[i]` is less than `chars[i-1]`
    i = len(chars) - 1
    while chars[i - 1] <= chars[i]:

        # if `i` is the first index of the string, that means we are already at
        # the lowest possible permutation, i.e., the string is sorted in
        # ascending order
        i = i - 1
        if i == 0:
            return False

    ''' if we reach here, the substring `chars[i…n)` is sorted in ascending order, i.e.,
        `chars[i-1] > chars[i] <= chars[i+1] <= chars[i+2] <= … <= chars[n-1]` '''

    # find an index `j` to the right of index `i` such that `chars[j] > chars[i-1]`
    j = i + 1
    while j < len(chars) and chars[j] <= chars[i - 1]:
        j = j + 1

    # swap character at index `i-1` with index `j-1`
    swap(chars, i - 1, j - 1)

    # reverse substring `chars[i…n)` and return true
    reverse(chars, i)

    return True

# Function to find all lexicographically previous permutations of a string
def permutations(s):

    # convert the string to a list
    chars = list(s)

    while True:

        # print the current permutation
        print(''.join(chars))

        # find the previous lexicographically ordered permutation
        if not prev_permutation(chars):
            break

if __name__ == '__main__':

    s = 'BADC'
    permutations(s)
```

The worst-case time complexity of the above solutions is O(n.n!) as there are `n!` permutations for a string of length `n`, and each permutation takes O(n) time. The worst case happens when the string contains all distinct elements.

Note that the above solution handles the strings containing repeated characters and does not print duplicate permutations.

**Related Post:**

> [Find all lexicographically next permutations of a string](https://techiedelight.com/find-lexicographically-next-permutations-string-sorted-ascending-order/)
