# Check if a sentence is syntactically correct or not

> Source: https://www.techiedelight.com/check-given-sentence-syntactically-correct-not/

[String](https://www.techiedelight.com/Category/String/)

Given a simple sentence and a set of syntax rules, validate if it is syntactically correct or not.

Assume that a sentence is syntactically correct if it fulfills the following rules:

  * A sentence must start with an uppercase character.
  * There must be spaces between words.
  * Then the sentence must end with a full stop `(.)`.
  * Two continuous spaces are not allowed.
  * Two continuous uppercase characters are not allowed.
  * However, the sentence can end after an uppercase character.

For example,

“This sentence is syntactically correct.” “This sentence is syntactically incorrect as two continuous spaces are not allowed.” “This sentence is syntactically correct Y.” “This sentence is syntactically incorRect as uppercase character is not allowed midway of the string.” “THis sentence is syntactically incorrect as two continuous uppercase characters are not allowed.” “This sentence is syntactically incorrect as it doesn’t end with a full stop”

The idea is to scan the given string and check for the above rules by comparing adjacent characters. Return false if any of the given constraints gets violated. Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <cctype>
#include <vector>
using namespace std;

// Function to check if a given sentence is syntactically
// correct or not
bool validateSentence(string str)
{
    int index = 0;

    // 1st condition
    if (islower(str[index])) {
        return false;
    }

    while (str[index])
    {
        if (isupper(str[index]))
        {
            // 5th condition
            if (isupper(str[index + 1])) {
                return false;
            }

            // 2nd condition
            if (index - 1 >= 0 && str[index - 1] != ' ') {
                return false;
            }
        }

        // 4th condition
        if (str[index] == ' ' && str[index + 1] == ' ') {
            return false;
        }

        index++;
    }

    // 3rd condition
    if (str[index - 2] == ' ' || str[index - 1] != '.') {
        return false;
    }

    return true;
}

int main()
{
    vector<string> sentences =
    {
        "This sentence is syntactically correct.",

        "This sentence is syntactically  incorrect as two "
        "continuous spaces are not allowed.",

        "This sentence is syntactically correct Y.",

        "This sentence is syntactically incorRect as uppercase "
        "character is not allowed midway of the string.",

        "THis sentence is syntactically incorrect as two "
        "continuous uppercase characters are not allowed.",

        "This sentence is syntactically incorrect as it doesn't "
        "end with a full stop"
    };

    cout << "The valid sentences are:\n\n";

    for (string str: sentences)
    {
        if (validateSentence(str)) {
            cout << str << endl;
        }
    }

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.List;

class Main
{
    public static boolean validateSentence(char[] chars)
    {
        int index = 0;
        if (Character.isLowerCase(chars[index])) {                  // 1st condition
            return false;
        }

        while (index < chars.length)
        {
            if (Character.isUpperCase(chars[index]))
            {
                if (Character.isUpperCase(chars[index + 1])) {      // 5th condition
                    return false;
                }

                if (index - 1 >= 0 && chars[index - 1] != ' ') {    // 2nd condition
                    return false;
                }
            }

            if (chars[index] == ' ' && chars[index + 1] == ' ') {   // 4th condition
                return false;
            }

            index++;
        }

        if (chars[index - 2] == ' ' || chars[index - 1] != '.') {   // 3rd condition
            return false;
        }

        return true;
    }

    public static void main(String[] args)
    {
        List<String> sentences = Arrays.asList(
                "This sentence is syntactically correct.",

                "This sentence is syntactically  incorrect as two " +
                    "continuous spaces are not allowed.",

                "This sentence is syntactically correct Y.",

                "This sentence is syntactically incorRect as uppercase " +
                    "character is not allowed midway of the String.",

                "THis sentence is syntactically incorrect as two " +
                    "continuous uppercase characters are not allowed.",

                "This sentence is syntactically incorrect as it doesn't " +
                    "end with a full stop"
        );

        System.out.println("The valid sentences are:");
        for (String sentence: sentences)
        {
            if (validateSentence(sentence.toCharArray())) {
                System.out.println(sentence);
            }
        }
    }
}
```

##

```python3
def validateSentence(s):

    index = 0
    if s[index].islower():                                # 1st condition
        return False

    while index < len(s):
        if s[index].isupper():
            if s[index + 1].isupper():                    # 5th condition
                return False
            if index - 1 >= 0 and s[index - 1] != ' ':    # 2nd condition
                return False
        if s[index] == ' ' and s[index + 1] == ' ':     # 4th condition
            return False
        index = index + 1

    if s[index - 2] == ' ' or s[index - 1] != '.':      # 3rd condition
        return False

    return True

if __name__ == '__main__':

    sentences = [
        'This sentence is syntactically correct.',

        'This sentence is syntactically  incorrect as two ' +
        'continuous spaces are not allowed.',

        'This sentence is syntactically correct Y.',

        'This sentence is syntactically incorRect as uppercase ' +
        'character is not allowed midway of the String.',

        'THis sentence is syntactically incorrect as two ' +
        'continuous uppercase characters are not allowed.',

        'This sentence is syntactically incorrect as it doesn\'t ' +
        'end with a full stop'
    ]

    print('The valid sentences are –')
    for sentence in sentences:
        if validateSentence(sentence):
            print(sentence)
```

**Output:** The valid sentences are: This sentence is syntactically correct. This sentence is syntactically correct Y.

The time complexity of the above solution is O(n), where `n` is the length of the input string and doesn’t require any extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.69/5. Vote count: 149

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
