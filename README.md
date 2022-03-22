# MinMap Parser
A simple MindMap parser project that implements the basic functionality.

## Install dependencies
```shell
pnpm install
```
## Start project
```shell
pnpm run dev
```

## Example
After started the project you could enter some inputs like:

```
- Root
  - Child 1
    - Child 1-1
    - Child 1-2
  - Child 2
    - Child 2-1
    - Child 2-2
```

And then you can press the `Parse` button to parse the input to MindMap.
If no errors occurred, you can see the result printed below the input bar.

And if there are errors, like syntax errors from the input string for example, right now you can only review them in the console.

To be noticed, Each layer of the input should use `2 spaces` as indentation.
The parser supports customizing the indentation, but in the demo you won't see it (because I was too lazy to put it in page).