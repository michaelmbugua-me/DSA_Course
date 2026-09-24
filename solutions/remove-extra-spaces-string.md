# Remove all extra spaces from a string

> Source: https://www.techiedelight.com/remove-extra-spaces-string/

[String](https://www.techiedelight.com/Category/String/)

Write a program to [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) remove all extra spaces from a string. There maybe leading spaces, trailing spaces, or consecutive spaces between words of the string. The solution should remove them and also handle punctuation marks.

The idea is to iterate through the string’s characters and check if the current character is a space, non-space character, or a punctuation mark. If it is a punctuation mark, any preceding space, if present, is removed. If it is a space, remove it unless it just after a word or a punctuation mark.

Following is the C and C++ implementation of it. The solution keeps track of the next empty position in the output string to facilitate the algorithm and handles the leading and trailing spaces separately.

```c
#include <stdio.h>
#include <ctype.h>
#include <string.h>

// Function to remove all extra whitespace from a string
// (note that the string is passed by reference)
void removeSpace(char *arr, int n)
{
    // space is 1 when a space character is found and
    // 0 when any non-space character is found
    int space = 0;

    // `k` points to the next free position
    int k = 0;

    // iterate through the characters of the string
    for (int i = 0; i < n; i++)
    {
        // handle leading spaces in the string
        while (k == 0 && i < n && arr[i] == ' ') {
            i++;
        }

        // if the current character is a space
        if (arr[i] == ' ')
        {
            // if the flag was 0 earlier, i.e., the first occurrence of a
            // space after a word
            if (!space)
            {
                // copy current char (whitespace) at the next free index
                // and set the flag
                arr[k++] = arr[i];
                space = 1;
            }
        }
        // if the current character is a punctuation mark
        else if (ispunct(arr[i]))
        {
            // if the last assigned character was a space, overwrite it
            // with the current character
            if (k > 0 && arr[k-1] == ' ') {
                arr[k-1] = arr[i];
            }
            else {
                // copy the current character at the next free index
                arr[k++] = arr[i];
            }
            space = 0;
        }
        else {
            // copy the current character at the next free index
            arr[k++] = arr[i];
            space = 0;
        }
    }

    // handle trailing spaces in the string
    arr[k] = '\0';
}

int main(void)
{
    char arr[] = " Hello .   This is   a C   program !! ";

    removeSpace(arr, strlen(arr));
    printf("%s", arr);

    return 0;
}
```

**Output:** Hello. This is a C program!!

##

```cpp
#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool isSpace(char c) {
    return c == ' ';
}

// Function to remove all extra whitespace from a string
// (note that the string is passed by reference)
void removeSpace(string &s)
{
    // true when a whitespace character is found and false when
    // any non-space character is found
    bool space = false;

    // `k` points to the next free position
    int k = 0;

    // iterate through the characters of the string
    for (int i = 0; i < s.length(); i++)
    {
        // handle leading spaces in the string
        while (k == 0 && i < s.length() && isSpace(s[i])) {
            i++;
        }

        // if the current character is a space
        if (isSpace(s[i]))
        {
            // if the flag was false earlier, i.e., the first occurrence of a
            // space after a word
            if (!space)
            {
                // copy current char (whitespace) at the next free index
                // and set the flag
                s[k++] = s[i];
                space = true;
            }
        }
        // if the current character is a punctuation mark
        else if (ispunct(s[i]))
        {
            // if the last assigned character was a space, overwrite it
            // with the current character
            if (k > 0 && isSpace(s[k-1])) {
                s[k-1] = s[i];
            }
            else {
                // copy the current character at the next free index
                s[k++] = s[i];
            }
            space = false;
        }
        else {
            // copy the current character at the next free index
            s[k++] = s[i];
            space = false;
        }
    }

    // handle trailing spaces in the string
    s.erase(s.begin() + k - 1, s.end());
}

int main()
{
    string s = " Hello .   This is  a C++   program   !! ";

    removeSpace(s);
    cout << s << endl;

    return 0;
}
```

The time complexity of the above solution is O(n), where `n` is the length of the input string and doesn’t require any extra space for the conversion.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
