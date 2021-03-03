export function findOutlier(integers: number[]): number {
  return (integers.slice(0, 3).filter(x => x % 2 == 0).length >= 2)  ?  integers.find(element => element % 2 !== 0)  :   integers.find(element => element % 2 === 0)
}