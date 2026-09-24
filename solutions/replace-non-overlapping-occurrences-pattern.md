# Replace all non-overlapping occurrences of a pattern

> Source: https://www.techiedelight.com/replace-non-overlapping-occurrences-pattern/

[String](https://www.techiedelight.com/Category/String/)

Given a string and a pattern, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) replace all non-overlapping occurrences of the pattern in the string by a specified character.

## 1st Variant: Replace each occurrence of the pattern

**Input:** String = “ABCABCXABC”; Pattern = “ABC”; Character = ‘@’; **Output:** @@X@

The idea is to compare the substring formed by `S[i,i+n]` with the given pattern `P` for each position `i` in string `S`. If `P` matches with the substring S[i,i+n], replace the substring with the specified character; otherwise, copy the current character to the next free position from the beginning of the array.

Following is the implementation in C, Java, and Python based on the above idea:

```c
#include <stdio.h>
#include <string.h>

// Function to compare two strings `S` and `P` and returns true
// if `P` is a prefix of `S`
int compare(char const *S, char const *P)
{
    int i = 0;
    while (P[i])
    {
        if (S[i] != P[i]) {
            break;
        }
        i++;
    }

    return P[i] == '\0';
}

// In-place replace occurrences of a pattern with a specified character
void convert(char *S, char const *P, char ch)
{
    int k = 0;

    // do for each character of the string
    for (int i = 0; S[i]; i++)
    {
        // compare substring S[i,i+n] with pattern `P`
        if (compare(S + i, P))
        {
            // move ahead by the length of the pattern
            i += strlen(P) - 1;

            // replace the substring with the specified character
            S[k++] = ch;
        }
        else {
            // copy the current character to the next available position, `k`
            S[k++] = S[i];
        }
    }

    // null terminate the resultant string
    S[k] = '\0';
}

int main(void)
{
    // input string, pattern, and character
    char word[] = "ABCABCXABC";
    char pattern[] = "ABC";
    char ch = '@';

    convert(word, pattern, ch);
    printf("%s", word);

    return 0;
}
```

**Output:** @@X@

##

```java
class Main
{
    // Function to compare two strings `S` and `P` and returns true if
    // `P` is a prefix of `S`
    public static boolean compare(char[] S, int k, char[] P)
    {
        int i = 0;
        while (i + k < S.length && i < P.length)
        {
            if (S[i + k] != P[i]) {
                break;
            }
            i++;
        }

        return i == P.length;
    }

    // In-place replace occurrences of a pattern with a specified character
    public static String convert(String word, String pattern, char ch)
    {
        // base case
        if (word == null || pattern == null) {
            return "";
        }

        char[] S = word.toCharArray();
        char[] P = pattern.toCharArray();

        int k = 0;

        // do for each character of the string
        for (int i = 0; i < S.length; i++)
        {
            // compare substring S[i,i+n] with pattern `P`
            if (compare(S, i, P))
            {
                // move ahead by the length of the pattern
                i += P.length - 1;

                // replace the substring with the specified character
                S[k++] = ch;
            }
            else {
                // copy the current character to the next available position, `k`
                S[k++] = S[i];
            }
        }

        // terminate the resultant string
        return new String(S).substring(0, k);
    }

    public static void main(String[] args)
    {
        // input string, pattern, and character
        String word = "ABCABCXABC";
        String pattern = "ABC";
        char ch = '@';

        String s = convert(word, pattern, ch);
        System.out.println(s);
    }
}
```

##

```python3
# Function to compare two strings `S` and `P` and returns true if `P` is a
# prefix of `S`
def compare(S, k, P):
    i = 0
    while i + k < len(S) and i < len(P):
        if S[i + k] != P[i]:
            break
        i = i + 1
    return i == len(P)

# In-place replace single or multiple occurrences of a pattern with a
# specified character
def convert(word, pattern, ch):
    S = list(word)
    P = list(pattern)

    k = 0

    # do for each character of the string
    i = 0
    while i < len(S):
        # compare substring S[i,i+n] with pattern `P`
        if compare(S, i, P):
            # move ahead by the length of the pattern
            i = i + len(P) - 1
            # replace the substring with the specified character
            S[k] = ch
        else:
            # copy the current character to the next available position, `k`
            S[k] = S[i]
        k = k + 1
        i = i + 1

    # terminate the resultant string
    return ''.join(S[:k])

if __name__ == '__main__':
    # input string, pattern, and character
    word = 'ABCABCXABC'
    pattern = 'ABC'
    ch = '@'

    s = convert(word, pattern, ch)
    print(s)
```

## 2nd Variant: Replace single or multiple occurrences of the pattern

String = “ABCABCXABC”; Pattern = “ABC”; Character = ‘@’; **Output:** @X@

Here, if substring `S[i,i+n]` matches the given pattern `P`, immediately check for the substring formed by the next set of `n` characters. The idea is to replace all such multiple consecutive occurrences of the pattern with the specified character.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <string.h>

// Function to compare two strings `S` and `P` and returns true if
// `P` is a prefix of `S`
int compare(char const *S, char const *P)
{
    int i = 0;
    while (P[i])
    {
        if (S[i] != P[i]) {
            break;
        }
        i++;
    }

    return P[i] == '\0';
}

// In-place replace single or multiple occurrences of a pattern with a
// specified character
void convert(char *S, char const *P, char ch)
{
    int k = 0;

    // do for each character of the string
    for (int i = 0; S[i]; i++)
    {
        int found = 0;

        // compare substring S[i,i+n] with pattern `P`
        while (compare(S + i, P))
        {
            // move ahead by the length of the pattern
            i += strlen(P);
            found = 1;
        }

        // if the pattern is found at least once
        if (found)
        {
            // replace all consecutive occurrences of the pattern
            // with the specified character
            S[k++] = ch;
        }

        // copy the current character to the next available position, `k`
        S[k++] = S[i];
    }

    // null terminate the resultant string
    S[k] = '\0';
}

int main(void)
{
    // input string, pattern, and character
    char word[] = "ABCABCXABC";
    char pattern[] = "ABC";
    char ch = '@';

    convert(word, pattern, ch);
    printf("%s", word);

    return 0;
}
```

**Output:** @X@

##

```java
class Main
{
    // Function to compare two strings `S` and `P` and returns true if
    // `P` is a prefix of `S`
    public static boolean compare(char[] S, int k, char[] P)
    {
        int i = 0;
        while (i + k < S.length && i < P.length)
        {
            if (S[i + k] != P[i]) {
                break;
            }
            i++;
        }

        return i == P.length;
    }

    // In-place replace single or multiple occurrences of a pattern with a
    // specified character
    public static String convert(String word, String pattern, char ch)
    {
        // base case
        if (word == null || pattern == null) {
            return "";
        }

        char[] S = word.toCharArray();
        char[] P = pattern.toCharArray();

        int k = 0;

        // do for each character of the string
        for (int i = 0; i < S.length; i++)
        {
            boolean found = false;

            // compare substring S[i,i+n] with pattern `P`
            while (compare(S, i, P))
            {
                // move ahead by the length of the pattern
                i += P.length;
                found = true;
            }

            // if the pattern is found at least once
            if (found)
            {
                // replace all consecutive occurrences of the pattern
                // with the specified character
                S[k++] = ch;
            }

            // copy the current character to the next available position, `k`
            if (i < S.length) {
                S[k++] = S[i];
            }
        }

        // terminate the resultant string
        return new String(S).substring(0, k);
    }

    public static void main(String[] args)
    {
        // input string, pattern, and character
        String word = "ABCABCXABC";
        String pattern = "ABC";
        char ch = '@';

        String s = convert(word, pattern, ch);
        System.out.println(s);
    }
}
```

##

```python3
# Function to compare two strings `S` and `P` and returns true if `P` is a
# prefix of `S`
def compare(S, k, P):
    i = 0
    while i + k < len(S) and i < len(P):
        if S[i + k] != P[i]:
            break
        i = i + 1
    return i == len(P)

# In-place replace single or multiple occurrences of a pattern with a
# specified character
def convert(word, pattern, ch):
    S = list(word)
    P = list(pattern)

    k = 0

    # do for each character of the string
    i = 0
    while i < len(S):
        found = False
        # compare substring S[i,i+n] with pattern `P`
        while compare(S, i, P):
            # move ahead by the length of the pattern
            i = i + len(P)
            found = True
        # if the pattern is found at least once
        if found:
            # replace all consecutive occurrences of the pattern
            # with the specified character
            S[k] = ch
            k = k + 1
        # copy the current character to the next available position, `k`
        if i < len(S):
            S[k] = S[i]
            k = k + 1
        i = i + 1

    # Terminate the resultant string
    return ''.join(S[:k])

if __name__ == '__main__':
    # input string, pattern, and character
    word = 'ABCABCXABC'
    pattern = 'ABC'
    ch = '@'

    s = convert(word, pattern, ch)
    print(s)
```

The best-case time complexity of the above solution is O(n + m), and the worst-case time complexity of the above solution is O(n.m), where `n` is the length of the text and `m` is the length of the pattern. The best case happens when the string is entirely made up of consecutive occurrences of the pattern.
