# Find minimum moves required for converting a given array to an array of zeros

> Source: https://www.techiedelight.com/find-minimum-moves-required-converting-array/

[Array](https://www.techiedelight.com/Category/Array/)

Find the minimum number of moves required for converting an array of zeros to a given array of non-negative integers using only increment and double operations. The increment operation increases the value of an array element by 1 and the double operation doubles the value of each array element.

For example,

The minimum number of moves required to convert an array {0, 0, 0} to array {8, 9, 8} is 7. The optimal sequence is 3 increment operations, followed by 3 double operations, and a single increment operation, as shown below: { 0, 0, 0 } —> { 1, 0, 0 } —> { 1, 1, 0 } —> { 1, 1, 1 } —> { 2, 2, 2 } —> { 4, 4, 4 } —> { 8, 8, 8 } —> { 8, 9, 8 }

> 

The idea is to do the opposite, i.e., the array can be converted to an array of zeros using decrement and reduce operation. The decrement operation lowers the value of an array element by one. And, that reduce operation minimizes the value of each array element by half. This logic works since the minimum number of moves would remain the same for converting either array to another. The algorithm can be implemented as the following:

Traverse the array and convert each odd number to even by reducing its value by 1. For each decrement operation, increment the number of moves required. After traversing the array, the array is left with all even numbers. Now divide each even number by two and increment the number of moves by 1. Note this is done only once for the divide operation performed on the whole array. Repeat this process till each array element becomes 0.

The algorithm can be implemented as follows in TypeScript:

```ts
// Find the minimum number of moves required for converting a given array
// to an array of zeros using only the decrement and reduce operation.
const countMoves = (A: number[]): number => {

    // stores the count of minimum moves required
    let min_moves = 0;

    // loop till all elements in the array become 0
    while (true) {

        // stores count of 0's in the current array
        let no_of_zeros = 0;

        // traverse the array
        for (let i = 0; i < A.length; i++) {
            // convert all odd numbers to even by reducing their value by 1
            // for each odd value, increment the number of moves required
            if (A[i] % 2 === 1) {
                A[i] = A[i] - 1;
                min_moves = min_moves + 1;
            }

            // increment zeros count if the current element becomes 0
            if (A[i] === 0) {
                no_of_zeros = no_of_zeros + 1;
            }
        }

        // break the loop if elements in the array become 0
        if (no_of_zeros === A.length) {
            break;
        }

        // Since each element in the array is even at this point,
        // divide each element by 2
        for (let j = 0; j < A.length; j++) {
            A[j] = A[j] / 2;
        }

        // increment number of moves by 1 for the above divide operation
        min_moves = min_moves + 1;
    }

    // return count of minimum moves required
    return min_moves;
};

const A = [8, 9, 8];

console.log(`The minimum moves required is ${countMoves(A)}`);
```

**Output:** The minimum moves required is 7

The time complexity of the above solution will be O(n.log(m)) and runs in constant space. Here `n` is the size of the input, and `m` is the maximum element in the input.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 151

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
