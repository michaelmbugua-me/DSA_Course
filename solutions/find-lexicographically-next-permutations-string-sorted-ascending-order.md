# Find all lexicographically next permutations of a string

> Source: https://www.techiedelight.com/find-lexicographically-next-permutations-string-sorted-ascending-order/

Given a string, find all lexicographically next permutations of it.

The words are arranged in the same order in the lexicographic order as they are presumed to appear in a dictionary. For example, the lexicographically next permutation of string `ABCD` is `ABDC`, for string `ABDC` is `ACBD`, and for string `ACBD` is `ACDB`.

> 

A simple solution would be to use [std::next_permutation](https://techiedelight.com/std_next_permutation-overview-implementation/) that generates the next greater lexicographic permutation of a string. If the function can determine the next higher permutation, it rearranges the elements and returns true. If that was not possible (because it is already at the largest possible permutation), it rearranges the elements according to the first permutation and returns false.

The implementation can be seen below in C++:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Function to find all lexicographically next permutations of a
// string using `std::next_permutation`
void permutations(string str)
{
    // base case
    if (str.length() == 0) {
        return;
    }

    while (1)
    {
        // print the current permutation
        cout << str << " ";

        // find the next lexicographically ordered permutation
        if (!next_permutation(str.begin(), str.end())) {
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

**Output:** BADC BCAD BCDA BDAC BDCA CABD CADB CBAD CBDA CDAB CDBA DABC DACB DBAC DBCA DCAB DCBA

We can also implement our own `next_permutation()` function. The following algorithm generates the next permutation lexicographically after a given permutation. It changes the permutation [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/).

  * Find the largest index `i` such that `str[i-1]` is less than `str[i]`.
  * Return false if `i` is the first index of the string, meaning that we are already at the highest possible permutation, i.e., the string is sorted in descending order. If `i` is not the first index of the string, then substring `str[i…n)` is sorted in descending order, i.e. `str[i-1] < str[i] >= str[i+1] >= str[i+2] >= … >= str[n-1]`.
  * Find the highest index `j` to the right of index `i` such that `str[j]` is greater than `str[i-1]` and swap the character at index `i-1` with index `j`.
  * Reverse substring `str[i…n)` and return true.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Function to find lexicographically next permutations of a string.
// It returns true if the string could be rearranged as a lexicographically
// greater permutation; otherwise, it returns false.
bool next_permutation(string &str, int n)
{
    // find the largest index `i` such that `str[i-1]` is less than `str[i]`
    int i = n - 1;
    while (str[i - 1] >= str[i])
    {
        // if `i` is the first index of the string, that means we are already
        // at the highest possible permutation, i.e., the string is sorted in
        // descending order
        if (--i == 0) {
            return false;
        }
    }

    /* If we reach here, the substring `str[i…n)` is sorted in descending order
       i.e., str[i-1] < str[i] >= str[i+1] >= str[i+2] >= … >= str[n-1] */

    // find the highest index `j` to the right of index `i` such that
    // str[j] > str[i-1]
    int j = n - 1;
    while (j > i && str[j] <= str[i - 1]) {
        j--;
    }

    // swap character at index `i-1` with index `j`
    swap(str[i - 1], str[j]);

    // reverse substring `str[i…n)` and return true
    reverse (str.begin() + i, str.end());

    return true;
}

// Function to find all lexicographically next permutations of a string
void permutations(string str)
{
    int n = str.length();

    // base case
    if (n == 0) {
        return;
    }

    // base case
    if (n == 1) {
        cout << str;
        return;
    }

    while (1)
    {
        // print the current permutation
        cout << str << " ";

        // find the next lexicographically ordered permutation
        if (!next_permutation(str, str.length())) {
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

##

```java
import java.util.Arrays;

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

    // Function to find lexicographically next permutations of a string.
    // It returns true if the string could be rearranged as a lexicographically
    // greater permutation; otherwise, it returns false.
    public static boolean next_permutation(char[] chars)
    {
        // find the largest index `i` such that `chars[i-1]` is less than `chars[i]`
        int i = chars.length - 1;
        while (chars[i - 1] >= chars[i])
        {
            // if `i` is the first index of the string, that means we are already
            // at the highest possible permutation, i.e., the string is sorted in
            // descending order
            if (--i == 0) {
                return false;
            }
        }

        /*
            if we reach here, the substring `chars[i…n)` is sorted in descending order
            i.e., chars[i-1] < chars[i] >= chars[i+1] >= chars[i+2] >= … >= chars[n-1]
        */

        // find the highest index `j` to the right of index `i` such that
        // chars[j] > chars[i-1]
        int j = chars.length - 1;
        while (j > i && chars[j] <= chars[i - 1]) {
            j--;
        }

        // swap character at index `i-1` with index `j`
        swap(chars, i - 1, j);

        // reverse substring `chars[i…n)` and return true
        reverse(chars, i);

        return true;
    }

    // Function to find all lexicographically next permutations of a string
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

        // convert the string to a char array
        char[] chars = str.toCharArray();

        while (true)
        {
            // print the current permutation
            System.out.print(new String(chars) + " ");

            // find the next lexicographically ordered permutation
            if (!next_permutation(chars)) {
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

    (i, j) = (start, len(chars) - 1)
    while i < j:
        swap(chars, i, j)
        i = i + 1
        j = j - 1

# Function to find lexicographically next permutations of a string.
# It returns true if the string could be rearranged as a lexicographically
# greater permutation; otherwise, it returns false.
def next_permutation(chars):

    # find the largest index `i` such that `chars[i-1]` is less than `chars[i]`
    i = len(chars) - 1

    while chars[i - 1] >= chars[i]:

        # if `i` is the first index of the string, that means we are already
        # at the highest possible permutation, i.e., the string is sorted in
        # descending order

        i = i - 1
        if i == 0:
            return False

    ''' if we reach here, the substring `chars[i…n)` is sorted in descending order;
        i.e., chars[i-1] < chars[i] >= chars[i+1] >= chars[i+2] >= … >= chars[n-1] '''

    # find the highest index `j` to the right of index `i` such that
    # `chars[j] > chars[i-1]`
    j = len(chars) - 1
    while j > i and chars[j] <= chars[i - 1]:
        j = j - 1

    # swap character at index `i-1` with index `j`
    swap(chars, i - 1, j)

    # reverse substring `chars[i…n)` and return true
    reverse(chars, i)

    return True

# Function to find all lexicographically next permutations of a string
def permutations(s):

    # base case
    if not s:
        return

    # base case
    if len(s) == 1:
        print(s)
        return

    # convert the string to a list
    chars = list(s)

    while True:

        # print the current permutation
        print(''.join(chars), end=' ')

        # find the next lexicographically ordered permutation
        if not next_permutation(chars):
            break

if __name__ == '__main__':

    s = 'BADC'
    permutations(s)
```

**Output:** BADC BCAD BCDA BDAC BDCA CABD CADB CBAD CBDA CDAB CDBA DABC DACB DBAC DBCA DCAB DCBA

The worst-case time complexity of the above solutions is O(n.n!) as there are `n!` permutations for a string of length `n`, and each permutation takes O(n) time. The worst case happens when the string contains all distinct elements.

Note that the above solution can handle strings containing repeated characters and will not print duplicate permutations.

**Also See:**

> [Find all lexicographically previous permutations of a string](https://techiedelight.com/find-all-lexicographically-previous-permutations-string/)
