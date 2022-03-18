import plugin from 'tailwindcss/plugin';

export interface BodyUtilitySpace {
  x: string;
  y: string;
}

export interface UseBodyUtilityParams {
  space: BodyUtilitySpace;
}

function createBodyProperties(space: BodyUtilitySpace) {
  return {
    default: {
      padding: `${space.y} ${space.x}`,
    },
    x: {
      paddingLeft: space.x,
      paddingRight: space.x,
    },
    y: {
      paddingTop: space.y,
      paddingBottom: space.y,
    },
    l: {
      paddingLeft: space.x,
    },
    r: {
      paddingRight: space.x,
    },
    t: {
      paddingTop: space.y,
    },
    b: {
      paddingBottom: space.y,
    },
  };
}

export function useBodies({ space }: UseBodyUtilityParams) {
  const properties = createBodyProperties(space);
  const reversedProperties = createBodyProperties({
    x: space.x.startsWith('-') ? space.x.slice(1) : `-${space.x}`,
    y: space.y.startsWith('-') ? space.y.slice(1) : `-${space.y}`,
  });

  const values = Object.keys(properties).reduce(
    (map: Record<string, Record<string, string>>, key) => {
      if (key === 'default') {
        map['.body'] = properties[key];
        map['.-body'] = reversedProperties[key];
      } else {
        map[`.body-${key}`] = properties[key];
        map[`.-body-${key}`] = reversedProperties[key];
      }
      return map;
    },
    {}
  );

  return plugin(({ addUtilities }) => {
    addUtilities({
      ...values,
    });
  });
}