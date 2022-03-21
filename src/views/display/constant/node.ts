export const testRawNode = {
  content: 'Root',
  children: [
    {
      content: 'Child 1',
      children: [
        {
          content: 'Child 1-1',
          children: [
            {
              content: 'Child 1-1-1',
            },
            {
              content: 'Child 1-1-2',
            },
            {
              content: 'Child 1-1-3',
              children: [
                {
                  content: 'Child 1-1-3-1',
                },
                {
                  content: 'Child 1-1-3-2',
                },
                {
                  content: 'Child 1-1-3-3',
                },
                {
                  content: 'Child 1-1-3-4',
                },
              ],
            },
          ],
        },
        {
          content: 'Child 1-2 Super Long Text to cover up',
        },
        {
          content: 'Child 1-3',
          children: [
            {
              content: 'Child 1-3-1',
            },
            {
              content: 'Child 1-3-2',
            },
            {
              content: 'Child 1-3-3',
            },
          ],
        },
        {
          content: 'Child 1-4',
        },
      ],
    },
    {
      content: 'Child 2',
      children: [
        {
          content: 'Child 2-1',
        },
        {
          content: 'Child 2-2',
        },
      ],
    },
  ],
};

export const testRawNodeAddedChild114 = {
  content: 'Root',
  children: [
    {
      content: 'Child 1',
      children: [
        {
          content: 'Child 1-1',
          children: [
            {
              content: 'Child 1-1-1',
            },
            {
              content: 'Child 1-1-2',
            },
            {
              content: 'Child 1-1-3',
              children: [
                {
                  content: 'Child 1-1-3-1',
                },
                {
                  content: 'Child 1-1-3-2',
                },
                {
                  content: 'Child 1-1-3-3',
                },
                {
                  content: 'Child 1-1-3-4',
                },
              ],
            },
            {
              content: 'Child 1-1-4',
            },
          ],
        },
        {
          content: 'Child 1-2 Super Long Text to cover up',
        },
        {
          content: 'Child 1-3',
          children: [
            {
              content: 'Child 1-3-1',
            },
            {
              content: 'Child 1-3-2',
            },
            {
              content: 'Child 1-3-3',
            },
          ],
        },
        {
          content: 'Child 1-4',
        },
      ],
    },
    {
      content: 'Child 2',
      children: [
        {
          content: 'Child 2-1',
        },
        {
          content: 'Child 2-2',
        },
      ],
    },
  ],
};

export const testRawNodeAddedChild134 = {
  content: 'Root',
  children: [
    {
      content: 'Child 1',
      children: [
        {
          content: 'Child 1-1',
          children: [
            {
              content: 'Child 1-1-1',
            },
            {
              content: 'Child 1-1-2',
            },
            {
              content: 'Child 1-1-3',
              children: [
                {
                  content: 'Child 1-1-3-1',
                },
                {
                  content: 'Child 1-1-3-2',
                },
                {
                  content: 'Child 1-1-3-3',
                },
                {
                  content: 'Child 1-1-3-4',
                },
              ],
            },
          ],
        },
        {
          content: 'Child 1-2 Super Long Text to cover up',
        },
        {
          content: 'Child 1-3',
          children: [
            {
              content: 'Child 1-3-1',
            },
            {
              content: 'Child 1-3-2',
            },
            {
              content: 'Child 1-3-3',
            },
            {
              content: 'Child 1-3-4',
            },
          ],
        },
        {
          content: 'Child 1-4',
        },
      ],
    },
    {
      content: 'Child 2',
      children: [
        {
          content: 'Child 2-1',
        },
        {
          content: 'Child 2-2',
        },
      ],
    },
  ],
};

export const testRawNodeDifferentRoot = {
  content: 'Root 2',
  children: [
    {
      content: 'Child 1',
    },
    {
      content: 'Child 2',
    },
  ],
};

export const testDeepRawNode = {
  content: 'Deep Root',
  children: generateDeepNodes(5),
};
function generateDeepNodes(count: number) {
  if (count <= 0) {
    return [];
  }

  const list = [];
  for (let i = 0; i < count; i++) {
    list.push({
      content: `Deep Node ${count}-${i}`,
      children: generateDeepNodes(count - 1),
    });
  }

  return list;
}