import { createRoute } from "honox/factory";
import { verifyRegistrationResponse } from "@simplewebauthn/server";

// グローバル変数でデータを共有
declare global {
  var webauthnUsers: Map<string, any>;
  var webauthnChallenges: Map<string, string>;
}

const users = globalThis.webauthnUsers || new Map();
const challenges = globalThis.webauthnChallenges || new Map();

export const POST = createRoute(async (c) => {
  if (c.req.method !== "POST") {
    return c.json({ error: "そのメソッドは使えないよ〜💦" }, 405);
  }

  try {
    const { username, credential } = await c.req.json();

    if (!username || !credential) {
      return c.json({ error: "ユーザー名と認証情報が必要だよ〜💦" }, 400);
    }

    // Get stored challenge
    const expectedChallenge = challenges.get(username);
    if (!expectedChallenge) {
      return c.json({ error: "チャレンジが見つからないよ〜💦" }, 400);
    }

    // Verify the registration response
    const verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge,
      expectedOrigin: "http://localhost:5173",
      expectedRPID: "localhost",
    });

    if (verification.verified && verification.registrationInfo) {
      // Store user and their credential
      users.set(username, {
        id: username,
        credentials: [
          {
            credentialID: verification.registrationInfo.credentialID,
            credentialPublicKey:
              verification.registrationInfo.credentialPublicKey,
            counter: verification.registrationInfo.counter,
            credentialDeviceType:
              verification.registrationInfo.credentialDeviceType,
            credentialBackedUp:
              verification.registrationInfo.credentialBackedUp,
          },
        ],
      });

      // Clean up challenge
      challenges.delete(username);

      return c.json({
        verified: true,
        message: "登録成功だよ〜✨",
      });
    } else {
      return c.json({
        verified: false,
        message: "登録の確認に失敗しちゃった💦",
      });
    }
  } catch (error) {
    console.error("Registration complete error:", error);
    return c.json({ error: "サーバーエラーだよ〜💦" }, 500);
  }
});
