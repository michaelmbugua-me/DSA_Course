# Find the minimum number of inversions needed to make an expression balanced

> Source: https://www.techiedelight.com/minimum-number-inversions-expression-balanced/

[String](https://www.techiedelight.com/Category/String/)

Given an expression consisting of an opening brace `{` and a closing brace `}`, find the minimum number of inversions needed to balance the expression.

For example,

**Input:** {{}{{}{{ **Output:** Minimum number of inversions needed is 2 {{}{{}{{ ——> {{}{{}}{ ——> {{}{{}}} **Input:** {{{{{{ **Output:** Minimum number of inversions needed is 3 {{{{{{ ——> {{{}{{ ——> {{{}}{ ——> {{{}}}

> 

The idea is to traverse the given expression and maintain a count of open braces in the expression seen.

  1. If the current character is an opening brace `{`, increment the opened braces count by `1`.
  2. If the current character is a closing brace `}`, check if it has an unclosed brace to its left (look for non-zero opened brace count).
     1. If any unclosed brace is found, close it using the current brace and decrement the count of opened braces by `1`.
     2. Otherwise, convert the current closing brace `}` to `{` and increment the total inversions needed and the opening brace count by `1`.
  3. After we are done processing each character in the expression, if there are `n` opened braces, we will need exactly `n/2` inversion to close them.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to find the minimum number of inversions needed
// to make the given expression balanced
int findMinInversions(string exp)
{
    // if the expression has an odd length, it cannot be balanced
    if (exp.length() & 1) {
        return -1;
    }

    int inversions = 0;     // stores total inversions needed
    int open = 0;           // stores the total number of opening braces

    // traverse the expression
    for (int i = 0; i < exp.length(); i++)
    {
        // if the current character is an opening brace
        if (exp[i] == '{') {
            open++;
        }

        // if the current character is a closing brace
        else {
            // if an opening brace is found before, close it
            if (open) {
                open = open - 1;    // decrement opening brace count
            }
            // invert the closing brace, i.e., change '}' to '{'
            else {
                inversions++;       // increment total inversions needed by 1
                open = 1;           // increment opening brace count
            }
        }
    }

    // for `n` opened braces, exactly `n/2` inversions are needed
    return inversions + open/2;
}

int main()
{
    string exp = "{{}{{}{{";

    int inv = findMinInversions(exp);
    if (inv != -1) {
        cout << "The minimum number of inversions needed is " << inv;
    }
    else {
        cout << "Invalid input" << endl;
    }

    return 0;
}
```

**Output:** The minimum number of inversions needed is 2

##

```java
class Main
{
    // Function to find the minimum number of inversions needed
    // to make the given expression balanced
    public static int findMinInversions(String exp)
    {
        // if the expression has an odd length, it cannot be balanced
        if (exp == null || exp.length() % 2 == 1) {
            return -1;
        }

        int inversions = 0;         // stores total inversions needed
        int open = 0;               // stores the total number of opening braces

        // traverse the expression
        for (char c: exp.toCharArray())
        {
            // if the current character is an opening brace
            if (c == '{') {
                open++;
            }

            // if the current character is a closing brace
            else {
                // if an opening brace is found before, close it
                if (open != 0) {
                    open = open - 1;    // decrement opening brace count
                }
                // invert the closing brace, i.e., change '}' to '{'
                else {
                    inversions++;       // increment total inversions needed by 1
                    open = 1;           // increment opening brace count
                }
            }
        }

        // for `n` opened braces, exactly `n/2` inversions are needed
        return inversions + open / 2;
    }

    public static void main(String[] args)
    {
        String exp = "{{}{{}{{";

        int inversions = findMinInversions(exp);

        if (inversions != -1)
        {
            System.out.print("The minimum number of inversions needed is " +
                        inversions);
        }
        else {
            System.out.print("Invalid input");
        }
    }
}
```

##

```python3
# Function to find the minimum number of inversions needed
# to make the given expression balanced
def findMinInversions(exp):

    # if the expression has an odd length, it cannot be balanced
    if len(exp) % 2:
        return -1

    inversions = 0          # stores total inversions needed
    open = 0                # stores the total number of opening braces

    # traverse the expression
    for i in range(len(exp)):

        # if the current character is an opening brace
        if exp[i] == '{':
            open = open + 1

        # if the current character is a closing brace
        else:
            # if an opening brace is found before, close it
            if open:
                open = open - 1                # decrement opening brace count
            else:
                # invert the closing brace, i.e., change '}' to '{'
                inversions = inversions + 1    # increment total inversions needed by 1
                open = 1                       # increment opening brace count

    # for `n` opened braces, exactly `n/2` inversions are needed
    return inversions + open // 2

if __name__ == '__main__':

    exp = '{{}{{}{{'
    inv = findMinInversions(exp)

    if inv != -1:
        print('The minimum number of inversions needed is', inv)
    else:
        print('Invalid input')
```

The time complexity of the above solution is O(n), where `n` is the length of the input expression, and doesn’t require any extra space.

Also See:

> [Check if an expression is balanced or not](https://www.techiedelight.com/check-given-expression-balanced-expression-not/ "Check if an expression is balanced or not")

> [Evaluate a given expression](https://www.techiedelight.com/evaluate-given-expression/ "Evaluate a given expression")

> [Find duplicate parenthesis in an expression](https://www.techiedelight.com/find-duplicate-parenthesis-expression/ "Find duplicate parenthesis in an expression")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 237

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
