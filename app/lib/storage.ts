// WebAuthn用の共有データストレージ
// 本番環境では適切なデータベースを使用してください

export interface UserCredential {
  credentialID: Uint8Array;
  credentialPublicKey: Uint8Array;
  counter: number;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
}

export interface User {
  id: string;
  credentials: UserCredential[];
}

// 全APIエンドポイントで共有するストレージ
export const users = new Map<string, User>();
export const challenges = new Map<string, string>();
