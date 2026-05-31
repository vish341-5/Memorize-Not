type ClerkErrorItem = {
  code?: string;
  longMessage?: string;
  message?: string;
};

type ClerkErrorResponse = {
  errors?: ClerkErrorItem[];
};

type ErrorResult = {
  error?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getClerkErrors(error: unknown): ClerkErrorItem[] | undefined {
  if (!isRecord(error)) {
    return undefined;
  }

  const maybeErrors = (error as ClerkErrorResponse).errors;

  if (Array.isArray(maybeErrors)) {
    return maybeErrors;
  }

  return undefined;
}

export function getClerkErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) {
  const firstError = getClerkErrors(error)?.[0];

  if (firstError?.code === "form_password_pwned") {
    return "Choose a stronger password.";
  }

  return firstError?.longMessage ?? firstError?.message ?? fallback;
}

export function getResultError(result: unknown) {
  if (!isRecord(result)) {
    return undefined;
  }

  return (result as ErrorResult).error;
}
