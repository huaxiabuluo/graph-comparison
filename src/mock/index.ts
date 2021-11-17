const N = 2000;

export const nodes = [...Array(N).keys()].map((i) => ({ id: `${i}` }));

export const links = [...Array(N).keys()]
  .filter((id) => id)
  .map((id, index) => {
    const source = `${id}`;
    const target = `${Math.round(Math.random() * (id - 1))}`;
    return {
      id: `${source}_${target}_${index}`,
      source,
      target,
    };
  });
