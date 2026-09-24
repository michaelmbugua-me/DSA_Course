# Find all strings of a given length containing balanced parentheses

> Source: https://www.techiedelight.com/find-strings-given-length-containing-balanced-parentheses/

[String](https://www.techiedelight.com/Category/String/)

Given a positive number `n`, find all strings of length `n` containing balanced parentheses.

For example,

**Input:** n = 4 **Output:** (()) ()() **Input:** n = 6 **Output:** ((())) (()()) (())() ()(()) ()()() **Input:** n = 5 **Output:** Invalid input

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to maintain a count of the open parenthesis in the output string. Then

  * Recur with open parentheses with one less character and an increased count of open parentheses.
  * Recur with closed parentheses only if the output string has at least one open parenthesis. And recur with one less character and a decreased count of open parentheses.

If the desired length `n` is reached and the output string contains all balanced parenthesis, print it. Return if we cannot close all open parentheses with left characters. Also, if the total number of characters is odd and there are no open parentheses, we cannot form the balanced parentheses.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to find all strings of length `n` containing balanced parentheses
void balParenthesis(int n, string str, int open)
{
    // if `n` is odd with no open parentheses, balanced parentheses
    // cannot be formed
    if ((n & 1) && !open) {
        return;
    }

    // base case: length `n` is reached
    if (n == 0)
    {
        // if the output string contains all balanced parenthesis, print it
        if (open == 0) {
            cout << str << endl;
        }
        return;
    }

    // Optimization: return if we cannot close all open parentheses with
    // left characters
    if (open > n) {
        return;
    }

    // recur with open parentheses
    balParenthesis(n - 1, str + "(", open + 1);

    // recur with closed parentheses only if the output string has at least
    // one unclosed parentheses
    if (open > 0) {
        balParenthesis(n - 1, str + ")", open - 1);
    }
}

int main()
{
    int n = 6;

    balParenthesis(n, "", 0);

    return 0;
}
```

**Output:** ((())) (()()) (())() ()(()) ()()()

##

```java
class Main
{
    // Function to find all strings of length `n` containing balanced parentheses
    public static void balParenthesis(int n, String str, int open)
    {
        // if `n` is odd with no open parentheses, balanced parentheses
        // cannot be formed
        if ((n & 1) == 1 && open == 0) {
            return;
        }

        // base case: length `n` is reached
        if (n == 0)
        {
            // if the output string contains all balanced parenthesis, print it
            if (open == 0) {
                System.out.println(str);
            }
            return;
        }

        // Optimization: return if we cannot close all open parentheses
        // with left characters
        if (open > n) {
            return;
        }

        // recur with open parentheses
        balParenthesis(n - 1, str + "(", open + 1);

        // recur with closed parentheses only if the output string has
        // at least one unclosed parentheses
        if (open > 0) {
            balParenthesis(n - 1, str + ")", open - 1);
        }
    }

    public static void main(String[] args)
    {
        int n = 6;
        balParenthesis(n, "", 0);
    }
}
```

##

```python3
# Function to find all strings of length `n` containing balanced parentheses
def balParenthesis(n, result=set(), open=0, s=''):
    # if `n` is odd with no open parentheses, balanced parentheses
    # cannot be formed
    if n & 1 and not open:
        return result

    # base case: length `n` is reached
    if n == 0:
        # if the output string contains all balanced parenthesis, print it
        if not open:
            result.add(s)
        return result

    # Optimization: return if we cannot close all open parentheses with
    # left characters
    if open > n:
        return result

    # recur with open parentheses
    result = balParenthesis(n - 1, result, open + 1, s + '(')

    # recur with closed parentheses only if the output string has at least
    # one unclosed parentheses
    if open > 0:
        result = balParenthesis(n - 1, result, open - 1, s + ')')

    return result

if __name__ == '__main__':

    n = 6

    result = balParenthesis(n)
    print(result)
```

The time complexity of the above solution is exponential as there are exactly `2n-1` combinations, where `n` is the length of the input string. It also requires additional space for the recursion (call stack).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.66/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
