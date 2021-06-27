export default function checkDuplicate(arr: string[]): boolean {
  return arr.some(
    (element, index) => {
      return arr.indexOf(element) !== index
    }
  );
}