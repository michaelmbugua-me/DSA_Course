# Run Length Encoding (RLE) Data Compression Algorithm

> Source: https://www.techiedelight.com/run-length-encoding-rle-data-compression-algorithm/

[String](https://www.techiedelight.com/Category/String/)

Run–length encoding (RLE) is a simple form of lossless data compression that runs on sequences with the same value occurring many consecutive times. It encodes the sequence to store only a single value and its count.

For example, consider a screen containing plain black text on a solid white background. There will be many long runs of white pixels in the blank space and many short runs of black pixels within the text.

`WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWWWW`

With a run–length encoding (RLE) data compression algorithm applied to the above hypothetical scan line, it can be rendered as `12W1B12W3B24W1B14W`. This can be interpreted as a sequence of twelve `W’s`, one `B`, twelve `W’s`, three `B’s`, etc.

> 

The idea is to run a linear scan on the string, and for each distinct character, append the character and its consecutive occurrence in the output string.

The algorithm can be implemented as follows in C++, Java, and Python. Note that the output size will double the input size in the worst case, so the algorithm can’t run [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/). e.g. `ABCD —> A1B1C1D1`.

```cpp
#include <iostream>
#include <string>
using namespace std;

// Perform Run–length encoding (RLE) data compression algorithm
// on string `str`
string encode(string str)
{
    // stores output string
    string encoding = "";
    int count;

    for (int i = 0; str[i]; i++)
    {
        // count occurrences of character at index `i`
        count = 1;
        while (str[i] == str[i + 1]) {
            count++, i++;
        }

        // append current character and its count to the result
        encoding += to_string(count) + str[i];
    }

    return encoding;
}

int main()
{
    string str = "ABBCCCD";

    cout << encode(str);

    return 0;
}
```

**Output:** 1A2B3C1D

##

```java
class Main
{
    // Perform Run–length encoding (RLE) data compression algorithm
    // on string `str`
    public static String encode(String str)
    {
        // stores output string
        String encoding = "";

        // base case
        if (str == null) {
            return encoding;
        }

        int count;

        for (int i = 0; i < str.length(); i++)
        {
            // count occurrences of character at index `i`
            count = 1;
            while (i + 1 < str.length() && str.charAt(i) == str.charAt(i + 1))
            {
                count++;
                i++;
            }

            // append current character and its count to the result
            encoding += String.valueOf(count) + str.charAt(i);
        }

        return encoding;
    }

    public static void main(String[] args)
    {
        String str = "ABBCCCD";

        System.out.print(encode(str));
    }
}
```

##

```python3
# Perform Run–length encoding (RLE) data compression algorithm on string `str`
def encode(s):

    encoding = "" # stores output string

    i = 0
    while i < len(s):
        # count occurrences of character at index `i`
        count = 1

        while i + 1 < len(s) and s[i] == s[i + 1]:
            count = count + 1
            i = i + 1

        # append current character and its count to the result
        encoding += str(count) + s[i]
        i = i + 1

    return encoding

if __name__ == '__main__':

    s = 'ABBCCCD'
    print(encode(s))
```

The time complexity of the above solution is O(n), where `n` is the length of the input string and doesn’t require any extra space.

**References:** [Run–length encoding – Wikipedia](https://en.wikipedia.org/wiki/Run-length_encoding)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.7/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Easy](https://www.techiedelight.com/Tags/easy/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
