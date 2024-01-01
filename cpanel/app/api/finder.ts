const hardcodedData: any = {
  folder1: {
    inner1: {},
    inner2: {},
    inner3: {
      "otherfile.txt": {},
    },
  },
  folder2: {},
  folder3: {
    fld1: {
      "djordjesfile.txt": {},
    },
  },
  "somefile.txt": [],
};

const getContentForPath = (path: string) => {
  const segments = path.split("/").filter((s) => s);

  let currentObject = hardcodedData;

  for (let i = 0; i < segments.length; i++) {
    const current = segments[i];

    currentObject = currentObject[current];
  }

  return Object.keys(currentObject);
};

export { getContentForPath };
