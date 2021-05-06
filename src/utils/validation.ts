export const gradesValidationRules = {
  isAllNumbersOrCommas: {
    validator: (text: string) => {
      const re = new RegExp(/^((\s*-?\d+(\.\d+)?)(\s*,\s*-?\d+(\.\d+)?)*)*$/);
      return re.test(text);
    },
    text: "Invalid characters",
  },
  isNotEmpty: {
    validator: (text: string) => {
      return text.length !== 0;
    },
    text: "Please enter at least ont grade",
  },
}