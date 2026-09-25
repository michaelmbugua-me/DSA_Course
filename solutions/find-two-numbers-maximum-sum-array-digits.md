# Find two numbers with maximum sum formed by array digits

> Source: https://www.techiedelight.com/find-two-numbers-maximum-sum-array-digits/

Given an integer array between 0 and 9, find two numbers with maximum sum formed using all the array digits. The difference in the number of digits of the two numbers should be ± 1.

For example,

**Input:** { 4, 6, 2, 7, 9, 8 } **Output:** The two numbers with maximum sum are 974 and 862 **Input:** { 9, 2, 5, 6, 0, 4 } **Output:** The two numbers with maximum sum are 952 and 640

> 

We know that a maximum number can be formed from the given digits `0–9` when the largest digit appears first, the second-largest digit appears second, and so on… finally, the smallest digit appears at the end. We can easily extend this logic to solve this problem.

The idea is to [sort the given array in descending order](https://techiedelight.com/sort-array-descending-order-cpp/) and construct two numbers `x` and `y` by picking alternate digits from the array, where `x` is filled with digits at the odd indices, `y` is filled with digits at the even index of the sorted array.

Following is the TypeScript implementation of the idea:

```ts
// Find two numbers with a maximum sum formed by digits of a list
const findMaximum = (input: number[]): void => {
    // base case
    if (input.length <= 1) {
        return;
    }

    // sort the list in descending order
    input.sort((a, b) => b - a);

    // fill `x` with digits at the odd indices of the sorted list
    let x = 0;
    for (let i = 0; i < input.length; i = i + 2) {
        x = x * 10 + input[i];
    }

    // fill `y` with digits at the even indices of the sorted list
    let y = 0;
    for (let i = 1; i < input.length; i = i + 2) {
        y = y * 10 + input[i];
    }

    // print `x` and `y`
    console.log(`The two numbers with maximum sum are ${x} and ${y}`);
};

const input = [4, 6, 2, 7, 9, 8];
findMaximum(input);
```

**Output:** The two numbers with maximum sum are 974 and 862

The time complexity of the above solution is O(n.log(n)) and doesn’t require any extra space, where `n` is the size of the input.

**Exercise:** Modify the solution to find two numbers with minimum sum.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.43/5. Vote count: 144

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
