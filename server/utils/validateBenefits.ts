const validBenefits = ['vr', 'vt', 'gymPass'];

export default function validateBenefits(arr: string[]): boolean {
  let result = true;
  arr.forEach(benefit => {
    if(!validBenefits.includes(benefit)){
      result = false;
    }
  });

  return result;
}