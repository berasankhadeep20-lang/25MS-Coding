const CHALLENGES = [
  { title: 'Two Sum', difficulty: 'Easy', desc: 'Given an array of integers and a target, return indices of two numbers that add up to the target.', example: 'Input: [2,7,11,15], target=9 → Output: [0,1]', hint: 'Use a hash map for O(n) solution.' },
  { title: 'Valid Parentheses', difficulty: 'Easy', desc: 'Given a string of brackets, determine if it is valid. Every opening bracket must have a matching closing bracket in correct order.', example: 'Input: "()[]{}" → true | Input: "([)]" → false', hint: 'Use a stack.' },
  { title: 'Reverse Linked List', difficulty: 'Easy', desc: 'Reverse a singly linked list in-place.', example: 'Input: 1→2→3→4→5 → Output: 5→4→3→2→1', hint: 'Use three pointers: prev, curr, next.' },
  { title: 'Longest Common Prefix', difficulty: 'Easy', desc: 'Write a function to find the longest common prefix string amongst an array of strings.', example: 'Input: ["flower","flow","flight"] → "fl"', hint: 'Sort the array and compare first and last elements.' },
  { title: 'Binary Search', difficulty: 'Easy', desc: 'Given a sorted array and target, return the index if found, else -1. Must be O(log n).', example: 'Input: [-1,0,3,5,9,12], target=9 → 4', hint: 'Classic divide and conquer.' },
  { title: 'Maximum Subarray', difficulty: 'Medium', desc: 'Find the contiguous subarray with the largest sum.', example: 'Input: [-2,1,-3,4,-1,2,1,-5,4] → 6 (subarray [4,-1,2,1])', hint: 'Kadane\'s algorithm. O(n) solution exists.' },
  { title: 'Number of Islands', difficulty: 'Medium', desc: 'Given a 2D grid of 1s (land) and 0s (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent land cells.', example: 'Grid with 3 separate groups of 1s → 3', hint: 'BFS or DFS from each unvisited land cell.' },
  { title: 'Coin Change', difficulty: 'Medium', desc: 'Given coin denominations and a target amount, find the minimum number of coins needed. Return -1 if impossible.', example: 'coins=[1,5,11], amount=15 → 3 (5+5+5)', hint: 'Dynamic programming. Bottom-up approach.' },
  { title: 'LRU Cache', difficulty: 'Medium', desc: 'Design a data structure that follows LRU (Least Recently Used) cache eviction policy with O(1) get and put operations.', example: 'LRUCache(2): put(1,1), put(2,2), get(1)=1, put(3,3) evicts key 2', hint: 'Combine a hash map with a doubly linked list.' },
  { title: 'Word Search', difficulty: 'Medium', desc: 'Given an m×n board of characters and a word, return true if the word exists in the grid. The word can be constructed from adjacent cells (horizontally/vertically).', example: 'Board with ABCCED → can find "ABCCED"', hint: 'DFS with backtracking. Mark cells as visited.' },
  { title: 'Merge K Sorted Lists', difficulty: 'Hard', desc: 'Merge k sorted linked lists and return it as one sorted list.', example: 'Input: [[1,4,5],[1,3,4],[2,6]] → [1,1,2,3,4,4,5,6]', hint: 'Use a min-heap. O(n log k) solution.' },
  { title: 'Trapping Rain Water', difficulty: 'Hard', desc: 'Given an elevation map, compute how much water it can trap after raining.', example: 'Input: [0,1,0,2,1,0,1,3,2,1,2,1] → 6', hint: 'Two-pointer approach. O(n) time, O(1) space.' },
  { title: 'Regular Expression Matching', difficulty: 'Hard', desc: 'Implement regular expression matching with . (any char) and * (zero or more of preceding).', example: 's="aa", p="a*" → true | s="ab", p=".*" → true', hint: 'Dynamic programming on (i,j) subproblems.' },
  { title: 'Median of Two Sorted Arrays', difficulty: 'Hard', desc: 'Find the median of two sorted arrays. Overall run time complexity must be O(log(m+n)).', example: 'nums1=[1,3], nums2=[2] → 2.0', hint: 'Binary search on the smaller array.' },
  { title: 'Palindrome Linked List', difficulty: 'Easy', desc: 'Given a singly linked list, return true if it is a palindrome.', example: 'Input: 1→2→2→1 → true | 1→2 → false', hint: 'Find middle, reverse second half, compare.' },
  { title: 'Climbing Stairs', difficulty: 'Easy', desc: 'You can climb 1 or 2 steps. How many distinct ways can you climb to the top of n stairs?', example: 'n=4 → 5 ways', hint: 'This is Fibonacci in disguise.' },
  { title: 'Group Anagrams', difficulty: 'Medium', desc: 'Given an array of strings, group the anagrams together.', example: 'Input: ["eat","tea","tan","ate","nat","bat"] → [["bat"],["nat","tan"],["ate","eat","tea"]]', hint: 'Sort each string as the key in a hash map.' },
  { title: 'Decode Ways', difficulty: 'Medium', desc: 'A message is encoded as digits. 1→A, 2→B,...,26→Z. Count the number of ways to decode a string of digits.', example: 'Input: "226" → 3 ways (BZ, VF, BBF)', hint: 'Dynamic programming. Watch out for leading zeros.' },
  { title: 'Jump Game', difficulty: 'Medium', desc: 'Given an array where each element is your max jump length at that position, determine if you can reach the last index.', example: 'Input: [2,3,1,1,4] → true | [3,2,1,0,4] → false', hint: 'Greedy. Track the maximum reachable index.' },
  { title: 'Unique Paths', difficulty: 'Medium', desc: 'A robot is in a m×n grid. It can only move right or down. How many unique paths from top-left to bottom-right?', example: 'm=3, n=7 → 28', hint: 'DP or combinatorics C(m+n-2, m-1).' },
  { title: 'IISER Bonus: WiFi Problem', difficulty: 'IISER', desc: 'The IISER WiFi has N access points. Each has a range r[i] and you are at position x. Write a function that returns the number of access points you can connect to. Expected output: 0. Always 0.', example: 'ranges=[100,200,150], x=50 → 0 (it\'s IISER WiFi)', hint: 'The answer is always 0. O(1) solution.' },
  { title: 'IISER Bonus: CGPA Optimisation', difficulty: 'IISER', desc: 'Given n courses with credit hours c[i] and grades g[i], find the minimum number of courses you need to retake to bring your CGPA above threshold t. Note: retaking is not actually possible. This is a theoretical problem.', example: 'Just graduate. That\'s the algorithm.', hint: 'Greedy approach: attend class.' },
]

export function getDailyChallenge() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  return CHALLENGES[dayOfYear % CHALLENGES.length]
}

export function getDailyChallengeText(): string {
  const ch = getDailyChallenge()
  const colors: Record<string, string> = { Easy: '\x1b[32m', Medium: '\x1b[33m', Hard: '\x1b[31m', IISER: '\x1b[35m' }
  const reset = '\x1b[0m'
  const color = colors[ch.difficulty] ?? '\x1b[0m'
  return [
    '',
    `\x1b[36m╔══════════════════════════════════════════════════════╗${reset}`,
    `\x1b[36m║  📅 Daily Challenge — ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}${' '.repeat(Math.max(0, 31 - new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }).length))}║${reset}`,
    `\x1b[36m╚══════════════════════════════════════════════════════╝${reset}`,
    '',
    `  \x1b[1m${ch.title}${reset}  ${color}[${ch.difficulty}]${reset}`,
    '',
    `  ${ch.desc}`,
    '',
    `  \x1b[33mExample:${reset} ${ch.example}`,
    `  \x1b[35mHint:${reset} ${ch.hint}`,
    '',
    `  \x1b[90mType 'challenge' to see today's challenge again${reset}`,
    '',
  ].join('\r\n')
}