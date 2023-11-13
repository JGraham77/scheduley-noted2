const isDefined = (value: number | boolean) => value !== undefined;
const isString = (value: string) => typeof value === "string" && value;
const isNumber = (value: number) => typeof value === "number";
const isBoolean = (value: boolean) => typeof value === "boolean";

const stringsAreGood = (values: string[]) => {
    const badVals = values.filter((val) => !isString(val));
    return {
        badVals,
        hasBadValues: badVals.length,
    };
};

export default {
    isDefined,
    isString,
    isNumber,
    isBoolean,
    stringsAreGood,
};
