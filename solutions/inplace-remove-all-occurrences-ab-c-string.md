# Remove all occurrences of `AB` and `C` from a string

> Source: https://www.techiedelight.com/inplace-remove-all-occurrences-ab-c-string/

[String](https://www.techiedelight.com/Category/String/)

Given a string, remove all occurrences of `AB` and `C` in a single traversal of it.

For example,

` The input string is 'CBAABCAB' The string after removal of 'AB' and 'C' is 'BA' 'CBAABCAB' —> '~~C~~ **BA** ~~AB~~ ~~C~~ ~~AB~~ ' —> 'BA' The input string is 'ABACB' The string after removal of 'AB' and 'C' is '' 'ABACB' —> '~~AB~~ **A** ~~C~~ **B** ' —> '~~AB~~ ' —> '' The input string is 'ABCACBCAABB' The string after removal of 'AB' and 'C' is '' 'ABCACBCAABB' —> '~~AB~~ ~~C~~ **A** ~~C~~ **B** ~~C~~ **A** ~~AB~~ **B** ' —> '~~AB~~ ~~AB~~ ' —> '' `

> 

The main challenge lies with doing the conversion in a single traversal of the string. The problem demands the removal of all adjacent, as well as non-adjacent occurrences of string `AB`, i.e., for a given string, say `ADAABCB`, after removing the first adjacent occurrence of `AB` (and `C` of-course), we get string `ADAB` which again needs to be processed for adjacent `AB` (No `C` this time, think!). Therefore, the final output string will be `AD`.

Following is the C, Java, and Python implementation of the idea:

```c
#include <stdio.h>

// Function to remove all occurrences of 'AB' and 'C' from the string
void removeAllOccurrences(char* str)
{
    // `i` maintains the position of the current char in the input string.
    // `k` maintains the next free position in the output string.
    int i = 0, k = 0;

    // do till the end of the string is reached
    while (str[i])
    {
        // if the current is 'B' and previous (need not be adjacent) was 'A',
        // increment `i` and decrement `k`
        if (str[i] == 'B' && (k > 0 && str[k - 1] == 'A')) {
            --k, ++i;
        }

        // if the current char is 'C', increment `i`
        else if (str[i] == 'C') {
            ++i;
        }

        else {
            // for any other character, increment both `i` and `k`
            str[k++] = str[i++];
        }
    }

    // null-terminate the string
    str[k] = '\0';
}

int main(void)
{
    char str[] = "ABCACBCAABB";

    removeAllOccurrences(str);
    printf("The string after removal of 'AB' and 'C' is '%s'", str);

    return 0;
}
```

**Output:** `The string after removal of 'AB' and 'C' is ''`

##

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to remove all occurrences of 'AB' and 'C' from the string
string remove(string str)
{
    // `i` maintains the position of the current char in the input string.
    // `k` maintains the next free position in the output string.
    int i = 0, k = 0;

    // do till the end of the string is reached
    while (i < str.size())
    {
        // if the current is 'B' and previous (need not be adjacent) was 'A',
        // increment `i` and decrement `k`
        if (str[i] == 'B' && (k > 0 && str[k - 1] == 'A')) {
            --k, ++i;
        }

        // if the current char is 'C', increment `i`
        else if (str[i] == 'C') {
            ++i;
        }

        else {
            // for any other character, increment both `i` and `k`
            str[k++] = str[i++];
        }
    }

    return str.substr(0, k);
}

int main()
{
    string str = "ABCACBCAABB";

    str = remove(str);
    cout << "The string after removal of 'AB' and 'C' is '" << str << "'\n";

    return 0;
}
```

##

```java
class Main
{
    // Function to remove all occurrences of 'AB' and 'C' from the string
    public static String remove(String str)
    {
        // base case
        if (str == null) {
            return null;
        }

        char[] chars = str.toCharArray();

        // `i` maintains the position of the current char in the input string.
        // `k` maintains the next free position in the output string.
        int i = 0, k = 0;

        // do till the end of the string is reached
        while (i < str.length())
        {
            // if the current character is 'B' and previous (need not be adjacent)
            // was 'A', increment `i` and decrement `k`
            if (chars[i] == 'B' && (k > 0 && chars[k - 1] == 'A'))
            {
                --k;
                ++i;
            }
            // if the current character is 'C', increment `i`
            else if (chars[i] == 'C') {
                ++i;
            }
            // for any other character, increment both `i` and `k`
            else {
                chars[k++] = chars[i++];
            }
        }

        return new String(chars).substring(0, k);
    }

    public static void main(String[] args)
    {
        String str = "ABCACBCAABB";

        str = remove(str);
        System.out.printf("The string after removal of 'AB' and 'C' is '%s'", str);
    }
}
```

##

```python3
# Function to remove all occurrences of 'AB' and 'C' from the string
def remove(s):

    chars = list(s)

    # `i` maintains the position of the current char in the input string.
    i = 0

    # `k` maintains the next free position in the output string.
    k = 0

    # do till the end of the string is reached
    while i < len(chars):

        # if the current character is 'B' and previous (need not be adjacent) was 'A',
        # increment `i` and decrement `k`
        if chars[i] == 'B' and (k > 0 and chars[k - 1] == 'A'):
            k = k - 1
            i = i + 1

        # if the current character is 'C', increment `i`
        elif chars[i] == 'C':
            i = i + 1

        # for any other character, increment both `i` and `k`
        else:
            chars[k] = chars[i]
            k = k + 1
            i = i + 1

    return ''.join(chars[:k])

if __name__ == '__main__':

    s = 'ABCACBCAABB'

    s = remove(s)
    print(f"The string after removal of 'AB' and 'C' is '{s}'")
```

The time complexity of the above solution is O(n), where `n` is the length of the input string and doesn’t require any extra space.

Also See:

> [Remove all adjacent duplicates from a string](https://www.techiedelight.com/in-place-remove-all-adjacent-duplicates-from-string/ "Remove all adjacent duplicates from a string")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 223

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
