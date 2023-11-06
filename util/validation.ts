import { FieldValidationError, ValidationError } from "express-validator";

export const isFieldValidationError = (
  error: FieldValidationError | any
): error is FieldValidationError => {
  return error && error.path && typeof error.path === "string";
};

type GetErrorValidationDataResult = { field?: string; message?: string };
export const getErrorValidationFieldMsg = (
  validationError: ValidationError[]
): GetErrorValidationDataResult[] => {
  return validationError.map((error: unknown) => {
    if (isFieldValidationError(error))
      return { field: error.path, message: error.msg };
    return {};
  });
};

export const getErrorValidationFields = (
  validationError: ValidationError[]
): string[] => {
  const result: string[] = [];
  validationError.forEach((error) => {
    if (isFieldValidationError(error)) {
      result.push(error.path);
    }
  });
  return result;
};
