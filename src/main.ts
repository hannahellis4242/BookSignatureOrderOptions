type OptionCount = Map<number, number>;

interface Vertex {
  value: number[];
  options: OptionCount;
  children: Vertex[];
}

const cloneMap = <A, B>(map: Map<A, B>): Map<A, B> =>
  Array.from(map.entries()).reduce((acc, [key, value]) => {
    acc.set(key, value);
    return acc;
  }, new Map<A, B>());

const generateTree = (options: OptionCount, value: number[]): Vertex[] => {
  if (options.size === 0) {
    return [];
  }
  return Array.from(options.keys()).map((key) => {
    const newValue = value.concat([key]);
    let newOptions = cloneMap(options);
    const optionCount = options.get(key);
    if (!optionCount) {
      console.error('How did we get here?');
      return { value: [], options: new Map<number, number>(), children: [] };
    }
    if (optionCount === 1) {
      newOptions.delete(key);
    } else {
      newOptions.set(key, optionCount - 1);
    }
    return {
      value: newValue,
      options: newOptions,
      children: generateTree(newOptions, newValue),
    };
  });
};

const options = new Map<number,number>();
options.set(4,2);
const tree = generateTree(options,[]);
console.log(JSON.stringify(tree,null,2));