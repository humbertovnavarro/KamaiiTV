import { NextApiRequest } from "next";
export enum ValidatorType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Array = "array",
  PositiveInteger = "positiveInteger",
}
interface PropertyValidatorOptions {
  type: ValidatorType;
  key: string;
  regex?: RegExp;
}
type PropertyValidatorError = {
  error: string;
};
export function propertyValidator(
  options: PropertyValidatorOptions
): (req: NextApiRequest) => PropertyValidatorError | void {
  const { type, key, regex } = options;
  if (regex && typeof type !== "string") {
    console.error(
      `fatal error: propertyValidator: type must be a string when regex matcher is provided`
    );
    process.exit(1);
  }
  if (regex && typeof type === "string") {
    return (req: NextApiRequest) => {
      if (
        req.body[key] &&
        typeof req.body[key] === type &&
        regex.test(req.body[key])
      ) {
        return;
      } else {
        return {
          error: `${key} must be a ${type} and match ${regex}`,
        };
      }
    };
  }
  const baseCase = (req: NextApiRequest) => {
    return req.body[key] && typeof req.body[key] === type;
  };
  switch (type) {
    case ValidatorType.Number:
      return (req: NextApiRequest) => {
        if (baseCase(req) && !isNaN(req.body[key] as number)) {
          return;
        }
        return {
          error: `Invalid ${key}`,
        };
      };
    case ValidatorType.PositiveInteger:
      return (req: NextApiRequest) => {
        const valid =
          baseCase(req) &&
          !isNaN(req.body[key] as number) &&
          (req.body[key] as number) >= 0 &&
          (req.body[key] as number) === Math.floor(req.body[key] as number);
        if (valid) {
          return;
        }
      };
    default:
      return (req: NextApiRequest) => {
        if (req.body[key] && typeof req.body[key] === type) {
          return;
        } else {
          return {
            error: `Invalid ${key}`,
          };
        }
      };
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
