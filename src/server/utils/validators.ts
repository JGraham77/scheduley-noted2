const isDefined = (value: string | number | boolean) => value !== undefined;
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

const hasUndefinedValues = (obj: { [key: string]: unknown }) => {
    return Object.values(obj).some((val) => val === undefined);
};

export default {
    isDefined,
    isString,
    isNumber,
    isBoolean,
    stringsAreGood,
    hasUndefinedValues,
};
