# Recursive solution to sort a stack

> Source: https://www.techiedelight.com/recursive-solution-sort-stack/

[Stack](https://www.techiedelight.com/Category/Stack/)

Given a stack, sort it using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The use of any other data structures (like containers in STL or Collections in Java) is not allowed.

For example,

Stack before sorting : 5 | -2 | 9 | -7 | 3 where 3 is the top element Stack after sorting : -7 | -2 | 3 | 5 | 9 where 9 is the top element

> 

The idea is simple – recursively remove values from the [stack](https://techiedelight.com/stack-implementation/) until the stack becomes empty and then insert those values (from the [call stack](https://en.wikipedia.org/wiki/Call_stack)) back into the stack in a sorted position.

Following is a TypeScript implementation of the idea:

```ts
// Insert the given key into the sorted stack while maintaining its sorted order.
// This is similar to the recursive insertion sort routine
function sortedInsert(stack: number[], key: number): void {
    // base case: if the stack is empty or
    // the key is greater than all elements in the stack
    if (stack.length === 0 || key > stack[stack.length - 1]) {
        stack.push(key);
        return;
    }

    /* We reach here when the key is smaller than the top element */

    // remove the top element
    const top = stack.pop() as number;

    // recur for the remaining elements in the stack
    sortedInsert(stack, key);

    // insert the popped element back into the stack
    stack.push(top);
}

// Recursive method to sort a stack
function sortStack(stack: number[]): void {
    // base case: stack is empty
    if (stack.length === 0) {
        return;
    }

    // remove the top element
    const top = stack.pop() as number;

    // recur for the remaining elements in the stack
    sortStack(stack);

    // insert the popped element back into the sorted stack
    sortedInsert(stack, top);
}

const list = [5, -2, 9, -7, 3];

const stack: number[] = [];
list.forEach(key => stack.push(key));

console.log('Stack before sorting:', stack);
sortStack(stack);
console.log('Stack after sorting:', stack);
```

**Output:** Stack before sorting: 3 -7 9 -2 5 Stack after sorting: 9 5 3 -2 -7

The time complexity of the above solution is O(n2) and requires O(n) implicit space for the call stack, where `n` is the total number of elements in the stack.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.7/5. Vote count: 165

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [LIFO](https://www.techiedelight.com/Tags/LIFO/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
