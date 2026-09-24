# Decode a given sequence to construct a minimum number without repeated digits

> Source: https://www.techiedelight.com/decode-the-given-sequence-construct-minimum-number-without-repeated-digits/

Given a sequence of length <= 8 consisting of `I` and `D`, where `I` denotes the increasing sequence and `D` denotes the decreasing sequence, decode the sequence to construct a minimum number without repeated digits.

For example,

**sequence output** IIDDIDID ——> 125437698 IDIDII ——> 1325467 DDDD ——> 54321 IIII ——> 12345

> 

The idea is simple and effective. For each element of the given sequence, insert its position `index+1` into a [stack](https://techiedelight.com/stack-implementation-in-cpp/). If the current character is increasing `'I'` or all characters of the input sequence are processed, pop all numbers from the stack and append them to the output string.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <stack>
using namespace std;

// Function to decode the given sequence to construct a minimum number
// without repeated digits
string decode(string seq)
{
    // `result` store the output string
    string result;

    // create an empty stack of integers
    stack<int> s;

    // run `n+1` times, where `n` is the length of the input sequence
    for (int i = 0; i <= seq.length(); i++)
    {
        // push number `i+1` into the stack
        s.push(i + 1);

        // if all characters of the input sequence are processed, or
        // the current character is 'I' (increasing)
        if (i == seq.length() || seq[i] == 'I')
        {
            // run till stack is empty
            while (!s.empty())
            {
                // remove a top element from the stack and add it to the solution
                result += to_string(s.top());
                s.pop();
            }
        }
    }

    return result;
}

int main()
{
    // input sequence
    string seq = "IDIDII";

    cout << "The minimum number is " << decode(seq);

    return 0;
}
```

**Output:** The minimum number is 1325467

##

```java
import java.util.Stack;

class Main
{
    // Function to decode the given sequence to construct a minimum number
    // without repeated digits
    public static String decode(String seq)
    {
        // base case
        if (seq == null || seq.length() == 0) {
            return seq;
        }

        // `result` store the output string
        StringBuilder result = new StringBuilder();

        // create an empty stack of integers
        Stack<Integer> stack = new Stack<>();

        // run `n+1` times, where `n` is the length of the input sequence
        for (int i = 0; i <= seq.length(); i++)
        {
            // push number `i+1` into the stack
            stack.push(i + 1);

            // if all characters of the input sequence are processed, or
            // the current character is 'I' (increasing)
            if (i == seq.length() || seq.charAt(i) == 'I')
            {
                // run till stack is empty
                while (!stack.empty())
                {
                    // remove a top element from the stack and add it to the solution
                    result.append(stack.pop());
                }
            }
        }

        return result.toString();
    }

    public static void main(String[] args)
    {
        // input sequence
        String seq = "IDIDII";

        System.out.println("The minimum number is " + decode(seq));
    }
}
```

##

```python3
from collections import deque

# Function to decode the given sequence to construct a minimum number
# without repeated digits
def decode(seq):

    # base case
    if not seq or not len(seq):
        return seq

    # `result` store the output string
    result = ''

    # create an empty stack of integers
    stack = deque()

    # run `n+1` times, where `n` is the length of the input sequence
    for i in range(len(seq) + 1):

        # push number `i+1` into the stack
        stack.append(i + 1)

        # if all characters of the input sequence are processed, or
        # the current character is 'I' (increasing)
        if i == len(seq) or seq[i] == 'I':
            # run till stack is empty
            while stack:
                # remove a top element from the stack and add it to the solution
                result += str(stack.pop())

    return result

if __name__ == '__main__':

    seq = 'IDIDII'            # input sequence

    print('The minimum number is', decode(seq))
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the length of the input string.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.77/5. Vote count: 173

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
