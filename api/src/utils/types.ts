export enum PostgresErrorCode {
  UniqueViolation = '23505',
}

export type TokenPayload = {
  userId: string;
};
