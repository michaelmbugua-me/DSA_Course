# Find duplicate parenthesis in an expression

> Source: https://www.techiedelight.com/find-duplicate-parenthesis-expression/

Given a balanced expression that can contain opening and closing parenthesis, check if it contains any duplicate parenthesis or not.

For example,

**Input:** ((x+y))+z **Output:** true **Explanation:** Duplicate () found in subexpression ((x+y)) **Input:** (x+y) **Output:** false **Explanation:** No duplicate () is found **Input:** ((x+y)+((z))) **Output:** true **Explanation:** Duplicate () found in subexpression ((z))

> 

We can use a [stack](https://techiedelight.com/stack-implementation-in-cpp/) to solve this problem. The idea is to traverse the given expression and

  * If the current character in the expression is not a closing parenthesis `')'`, push the character into the stack.
  * If the current character in the expression is a closing parenthesis `')'`, check if the topmost element in the stack is an opening parenthesis or not. If it is an opening parenthesis, then the subexpression ending at the current character is of the form `((exp))`; otherwise, continue popping characters from the stack till matching `'('` is found for current `')'`.

Following is a TypeScript implementation of the idea:

```ts
// Function to find duplicate parenthesis in an expression
function hasDuplicateParenthesis(exp: string): boolean {

    if (!exp || exp.length <= 3) {
        return false;
    }

    // take an empty stack of characters
    const stack: string[] = [];

    // traverse the input expression
    for (const c of exp) {
        // if the current char in the expression is not a closing parenthesis
        if (c !== ')') {
            stack.push(c);
        }
        // if the current char in the expression is a closing parenthesis
        else {
            // if the stack's top element is an opening parenthesis,
            // the subexpression of the form ((exp)) is found
            if (stack[stack.length - 1] === '(') {
                return true;
            }

            // pop till '(' is found for current ')'
            while (stack[stack.length - 1] !== '(') {
                stack.pop();
            }

            // pop '('
            stack.pop();
        }
    }

    // if we reach here, then the expression does not have any
    // duplicate parenthesis
    return false;
}

const exp = '((x+y))'; // assumes valid expression

if (hasDuplicateParenthesis(exp)) {
    console.log('The expression has duplicate parenthesis.');
}
else {
    console.log('The expression does not have duplicate parenthesis');
}
```

**Output:** The expression has duplicate parenthesis

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the length of the input expression.

**Suggested Read:**

> [Find all strings of a given length containing balanced parentheses](https://techiedelight.com/find-strings-given-length-containing-balanced-parentheses/)

> [Find all combinations of non-overlapping substrings of a string](https://techiedelight.com/find-combinations-non-overlapping-substrings-string/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 216

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [LIFO](https://www.techiedelight.com/Tags/LIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
