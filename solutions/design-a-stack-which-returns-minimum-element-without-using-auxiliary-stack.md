# Design a stack that returns a minimum element without using an auxiliary stack

> Source: https://www.techiedelight.com/design-a-stack-which-returns-minimum-element-without-using-auxiliary-stack/

[Stack](https://www.techiedelight.com/Category/Stack/)

Design a [stack](https://techiedelight.com/stack-implementation/) to support an additional operation that returns the minimum element from the stack in constant time. The stack should continue supporting all other operations like push, pop, top, size, empty, etc., without degradation in these operations’ performance.

We have used two stacks in the [previous approach](https://techiedelight.com/design-stack-which-returns-minimum-element-constant-time/) – the main stack to store the actual stack elements and an auxiliary stack to determine the minimum number in constant time. This implementation requires extra space for the auxiliary stack, but we can do this without an auxiliary stack. The idea is to do some tricky calculations before pushing numbers into the stack.

Suppose we will push a number value into a stack with a minimum number, `min`. If the value is greater than or equal to the `min`, it is pushed directly into the stack. If it is less than `min`, push `2×value-min`, and update `min` as a value since a new minimum number is pushed. How about to pop? We pop it directly if the top of the stack (it is denoted as top) is greater than or equal to `min`. Otherwise, the number top is not the real pushed number. The real pushed number is stored as `min`. After the current minimum number is popped, we need to restore the previous minimum number, `2×min-top`.

Now let’s demonstrate its correctness of this solution. Since the value is greater than or equal to `min`, it is pushed into stack direct without updating `min`. Therefore, when we find that the top of the stack is greater than or equal to `min`, we can pop directly without updating `min`. However, if we find the value is less than `min`, push `2×value-min`. We should notice that `2×value-min` should be less than the value. Then we update the current `min` as value. Therefore, the new top of the stack is less than the current `min`. Therefore, when we find that the top of the stack is less than `min`, the real top (real pushed number value) is stored in `min`. After we pop the top of the stack, we have to restore the previous minimum number. Since `top=2×value-previous-min` and value is current `min`, previous `min` is `2×current-min-top`.

This is demonstrated below in TypeScript:

```ts
class MinStack {
  // main stack to store elements
  private s: number[] = [];

  // variable to store the minimum element
  private min: number | null = null;

  // Inserts a given element on top of the stack
  push(val: number): void {
    if (this.s.length === 0) {
      this.s.push(val);
      this.min = val;
    } else if (val > this.min!) {
      this.s.push(val);
    } else {
      this.s.push(2 * val - this.min!);
      this.min = val;
    }
  }

  // Removes the top element from the stack
  pop(): void {
    if (this.s.length === 0) {
      console.log("Stack underflow!!");
      process.exit(-1);
    }

    const top = this.s[this.s.length - 1];
    if (top < this.min!) {
      this.min = 2 * this.min! - top;
    }
    this.s.pop();
  }

  // Returns the minimum element from the stack in constant time
  getMin(): number | null {
    return this.min;
  }
}

const s = new MinStack();

s.push(6);
console.log(s.getMin());

s.push(7);
console.log(s.getMin());

s.push(5);
console.log(s.getMin());

s.push(3);
console.log(s.getMin());

s.pop();
console.log(s.getMin());

s.pop();
console.log(s.getMin());
```

**Reference:** [Coding Interview Questions: No. 02 – Stack with Function min()](https://codercareer.blogspot.com/2011/09/no-02-stack-with-function-min.html)

Also See:

> [Design a stack that returns the minimum element in constant time](https://www.techiedelight.com/design-stack-which-returns-minimum-element-constant-time/ "Design a stack that returns the minimum element in constant time")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.56/5. Vote count: 169

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
