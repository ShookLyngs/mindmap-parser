import plugin from 'tailwindcss/plugin';

export function useFixedContainers() {
  return plugin(({ config, addComponents }) => {
    const { theme: { screens } } = config();

    const mobile = Object.keys(screens).reduce(
      (map , key: string) => {
        map[`.fixed-${key}`] = { width: '100%' };
        return map;
      },
      {}
    );

    const fixed = Object.keys(screens).reduce(
      (map , key: string) => {
        map[`.fixed-${key}`] = {
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: `theme(screens.${key})`,
        };
        return map;
      },
      {}
    );

    addComponents([
      mobile,
      {
        '@media (min-width: theme(screens.md))': fixed
      },
    ]);
  });
}