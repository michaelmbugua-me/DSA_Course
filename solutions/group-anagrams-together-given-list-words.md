# Group anagrams together from a list of words

> Source: https://www.techiedelight.com/group-anagrams-together-given-list-words/

Given a list of words, efficiently group all anagrams.

The two strings, `X` and `Y`, are anagrams if by rearranging `X's` letters, we can get `Y` using all the original letters of `X` exactly once. For example, all these pairs are anagrams as lhs can be rearranged to rhs and vice-versa.

actors = costar altered = related auctioned = education aspired = despair mastering = streaming recurd = secured

The problem requires the anagrams to be grouped together. For example,

**Input:** [CARS, REPAID, DUES, NOSE, SIGNED, LANE, PAIRED, ARCS, GRAB, USED, ONES, BRAG, SUED, LEAN, SCAR, DESIGN] **Output:** GRAB BRAG CARS ARCS SCAR REPAID PAIRED LANE LEAN SIGNED DESIGN DUES USED SUED NOSE ONES

> 

The idea is to sort each word on the list and construct a map where the map’s key is each sorted word, and the map’s value is a list of indices in the array where it is present. After creating the map, traverse the map and get indices for each sorted key. The anagrams are present in the actual list at those indices.

Following is the TypeScript implementation of the idea:

```ts
// Function to group anagrams from a given list of words
function groupAnagrams(words: string[]): string[][] {
    // a list to store anagrams
    const anagrams: string[][] = [];

    // base case
    if (!words || words.length === 0) {
        return anagrams;
    }

    // sort each word on the list
    const nums = words.map(word => word.split('').sort().join(''));

    // construct a map where the key is each sorted word,
    // and value is a list of indices where it is present
    const d = new Map<string, number[]>();
    for (let i = 0; i < nums.length; i++) {
        if (!d.has(nums[i])) {
            d.set(nums[i], []);
        }
        d.get(nums[i])!.push(i);
    }

    // traverse the map and read indices for each sorted key.
    // The anagrams are present in the actual list at those indices
    for (const index of d.values()) {
        const collection = index.map(i => words[i]);
        if (collection.length > 1) {
            anagrams.push(collection);
        }
    }

    return anagrams;
}

// a list of words
const words = ['CARS', 'REPAID', 'DUES', 'NOSE', 'SIGNED', 'LANE', 'PAIRED', 'ARCS',
    'GRAB', 'USED', 'ONES', 'BRAG', 'SUED', 'LEAN', 'SCAR', 'DESIGN'];

const anagrams = groupAnagrams(words);
for (const anagram of anagrams) {
    console.log(anagram);
}
```

**Output:** ARCS CARS SCAR BRAG GRAB DESIGN SIGNED DUES SUED USED LANE LEAN NOSE ONES PAIRED REPAID

We can also use a [multimap](https://techiedelight.com/google-guava-multimap-class-java/)-like `Map` from each sorted word to the list of indices where it is present to solve this problem, as demonstrated below in TypeScript:

```ts
// Function to group anagrams from a given list of words
function groupAnagrams(words: string[]): string[][] {
    // a set to store anagrams
    const anagrams: string[][] = [];

    // construct a list from the given words with each word sorted
    const list = words.map(s => s.split('').sort().join(''));

    // construct a map (multimap-like) where the key is each sorted word,
    // and value is a list of indices where it is present
    const map = new Map<string, number[]>();
    for (let i = 0; i < words.length; i++) {
        if (!map.has(list[i])) {
            map.set(list[i], []);
        }
        map.get(list[i])!.push(i);
    }

    // iterate through the map and read indices for each sorted key.
    // The anagrams are present in the actual list at those indices
    for (const indices of map.values()) {
        const anagram = [...new Set(indices.map(i => words[i]))];
        if (anagram.length > 1) {
            anagrams.push(anagram);
        }
    }

    return anagrams;
}

// list of words
const words = ['CARS', 'REPAID', 'DUES', 'NOSE', 'SIGNED', 'LANE', 'PAIRED', 'ARCS',
    'GRAB', 'USED', 'ONES', 'BRAG', 'SUED', 'LEAN', 'SCAR', 'DESIGN'];

// get set containing all the anagrams grouped together
const anagrams = groupAnagrams(words);

// print the result
for (const anagram of anagrams) {
    console.log(anagram.join(' '));
}
```

**Output:** ARCS CARS SCAR BRAG GRAB DESIGN SIGNED DUES SUED USED LANE LEAN NOSE ONES PAIRED REPAID

The time complexity of the above solutions is O(N × M × log(M)), where `N` is the total number of words and `M` is the size of the longest word in the list.
