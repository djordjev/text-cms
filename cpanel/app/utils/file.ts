const isHome = (name: string) => {
  return name.toLowerCase() === 'finder';
};

const isFile = (name: string) => {
  return name.endsWith('.txt');
};

const isFolder = (name: string) => {
  return !isFile(name);
};

const getPathFromSegments = (segments: string[], segment: string) => {
  const index = segments.indexOf(segment);

  if (index < 1) return '/finder';

  const mapped = segments.slice(0, index + 1).map((segment) => {
    if (isHome(segment)) return 'finder';

    return segment;
  });

  const joined = mapped.join('/');

  return `/${joined}`;
};

export { getPathFromSegments, isHome, isFile, isFolder };
