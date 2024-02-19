const isZero = (point: { x: number; y: number }) => {
  return !point.x && !point.y;
};

export { isZero };
