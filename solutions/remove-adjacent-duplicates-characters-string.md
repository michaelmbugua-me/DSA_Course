# Remove adjacent duplicate characters from a string

> Source: https://www.techiedelight.com/remove-adjacent-duplicates-characters-string/

[String](https://www.techiedelight.com/Category/String/)

Given a string, remove adjacent duplicates characters from it. In other words, remove all consecutive same characters except one.

For example,

**Input:** AABBBCDDD **Output:** ABCD

> 

The idea is to loop through the string, and for each character, compare it with its previous character. If the current character is different from the previous character, make it part of the resultant string; otherwise, ignore it. The time complexity of this approach is O(n), where `n` is the length of the input string and doesn’t require any extra space.

Following is the C, Java, and Python implementation of the idea:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Function to remove adjacent duplicates characters from a string
void removeDuplicates(char s[])
{
    int n = strlen(s);
    char prev = '\0';
    int k = 0;

    // loop through the string
    for (int i = 0; i < n; i++)
    {
        // if the current char is different from the previous char
        if (prev != s[i])
        {
            // set distinct chars at index `k` and increment it
            s[k++] = s[i];
        }

        // update previous char to current char for the next iteration of the loop
        prev = s[i];
    }

    // null terminate the resultant string
    s[k] = '\0';
}

int main(void)
{
    char s[] = "AAABBCDDD";

    removeDuplicates(s);
    printf("%s", s);

    return 0;
}
```

**Output:** ABCD

##

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to remove adjacent duplicates characters from a string
void removeDuplicates(string &s)
{
    char prev;
    for (auto it = s.begin(); it != s.end(); it++)
    {
        if (prev == *it)
        {
            s.erase(it);
            it--;
        }
        else {
            prev = *it;
        }
    }
}

int main()
{
    string s = "AAABBCDDD";

    removeDuplicates(s);
    cout << s << endl;

    return 0;
}
```

##

```java
class Main
{
    // Function to remove adjacent duplicates characters from a string
    public static String removeDuplicates(String s)
    {
        // base case
        if (s == null) {
            return null;
        }

        char[] chars = s.toCharArray();
        char prev = 0;
        int k = 0;

        for (char c: chars)
        {
            if (prev != c)
            {
                chars[k++] = c;
                prev = c;
            }
        }

        return new String(chars).substring(0, k);
    }

    public static void main(String[] args)
    {
        String s = "AAABBCDDD";
        System.out.println(removeDuplicates(s));
    }
}
```

##

```python3
# Function to remove adjacent duplicates characters from a string
def removeDuplicates(s):
    chars = []
    prev = None

    for c in s:
        if prev != c:
            chars.append(c)
            prev = c

    return ''.join(chars)

if __name__ == '__main__':

    s = 'AAABBCDDD'
    print(removeDuplicates(s))
```

Also See:

> [Determine whether characters of a string follow a specific order](https://www.techiedelight.com/determine-string-follows-specified-order/ "Determine whether characters of a string follow a specific order")

> [Remove all adjacent duplicates from a string](https://www.techiedelight.com/in-place-remove-all-adjacent-duplicates-from-string/ "Remove all adjacent duplicates from a string")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.68/5. Vote count: 202

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
