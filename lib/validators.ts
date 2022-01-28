import { NextApiRequest } from "next";
export enum ValidatorType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Array = "array",
}
interface PropertyValidatorOptions {
  type: ValidatorType;
  key: string;
  regex?: RegExp;
}
type PropertyValidatorError = {
  error: string;
};
export function propertyValidator(opts: PropertyValidatorOptions): (req: NextApiRequest) => PropertyValidatorError | false {
  return (req: NextApiRequest) => {
    const { key, type } = opts;
    if(!req || !req.body) {
      return {
        error: "no data"
      }
    }
    if(typeof req.body[key] != type) {
      return {
        error: `property ${key} is not of type ${type}`
      }
    }
    if(opts.regex) {
      if(!req.body[key].toString().match(opts.regex)) {
        return {
          error: `property ${key} does not conform to ${opts.regex}`
        }
      }
    }
    return false;
  }
}
const validUsername = propertyValidator({
  type: ValidatorType.String,
  key: "username",
  regex: /^[a-zA-Z0-9_]{3,20}$/,
});
const validPassword = propertyValidator({
  type: ValidatorType.String,
  key: "password",
  regex: /^[a-zA-Z0-9_]{3,20}$/,
});
const validEmail = propertyValidator({
  type: ValidatorType.String,
  key: "email",
  // eslint-disable-next-line no-useless-escape
  regex: /^[a-zA-Z0-9_\-.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z0-9_\-\.]+$/,
});
export { validUsername, validPassword, validEmail };
