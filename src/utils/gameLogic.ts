export const move = (
  towers: number[][],
  fromTower: number,
  toTower: number
): number[][] | null => {
  if (towers[fromTower].length === 0) return null;
  if (
    towers[toTower].length > 0 &&
    towers[fromTower][towers[fromTower].length - 1] > towers[toTower][towers[toTower].length - 1]
  ) {
    return null;
  }

  const newTowers = towers.map((tower) => [...tower]);
  const disk = newTowers[fromTower].pop()!;
  newTowers[toTower].push(disk);
  return newTowers;
};

export const isGameWon = (towers: number[][], totalDisks: number): boolean => {
  return towers[2].length === totalDisks;
};