type SupabaseLikeError = {
  code?: string | null;
  message?: string | null;
};

type UpsertResult = {
  error: SupabaseLikeError | null;
};

type UpsertWithOptionalColumnParams<T extends Record<string, unknown>> = {
  payload: T;
  optionalColumn: keyof T & string;
  execute: (payload: T | Omit<T, keyof T & string>) => PromiseLike<UpsertResult>;
};

function isMissingColumnError(error: SupabaseLikeError | null, column: string) {
  if (!error) {
    return false;
  }

  const message = String(error.message ?? "").toLowerCase();
  const code = String(error.code ?? "").toUpperCase();

  return (
    (code === "PGRST204" || message.includes("schema cache")) &&
    message.includes(column.toLowerCase())
  );
}

export async function upsertWithOptionalColumn<T extends Record<string, unknown>>({
  payload,
  optionalColumn,
  execute,
}: UpsertWithOptionalColumnParams<T>) {
  const initialResult = await execute(payload);

  if (!initialResult.error) {
    return {
      fallbackUsed: false,
    };
  }

  if (!isMissingColumnError(initialResult.error, optionalColumn)) {
    throw initialResult.error;
  }

  const fallbackPayload = { ...payload };
  delete fallbackPayload[optionalColumn];

  const fallbackResult = await execute(fallbackPayload);

  if (fallbackResult.error) {
    throw fallbackResult.error;
  }

  return {
    fallbackUsed: true,
  };
}
