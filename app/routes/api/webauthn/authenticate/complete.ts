import { createRoute } from "honox/factory";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";

// In-memory storage for demo (use a real database in production)
const users = new Map();
const challenges = new Map();

export default createRoute(async (c) => {
  if (c.req.method !== "POST") {
    return c.json({ error: "そのメソッドは使えないよ〜💦" }, 405);
  }

  try {
    const { username, credential } = await c.req.json();

    if (!username || !credential) {
      return c.json({ error: "ユーザー名と認証情報が必要だよ〜💦" }, 400);
    }

    // Get user and challenge
    const user = users.get(username);
    const expectedChallenge = challenges.get(username);

    if (!user) {
      return c.json({ error: "ユーザーが見つからないよ〜💦" }, 404);
    }

    if (!expectedChallenge) {
      return c.json({ error: "チャレンジが見つからないよ〜💦" }, 400);
    }

    // Find the credential used for this authentication
    const credentialID = credential.id;
    const userCredential = user.credentials.find(
      (cred: any) =>
        Buffer.from(cred.credentialID).toString("base64url") === credentialID
    );

    if (!userCredential) {
      return c.json({ error: "ユーザーの認証情報が見つからないよ〜💦" }, 400);
    }

    // Verify the authentication response
    const verification = await verifyAuthenticationResponse({
      response: credential,
      expectedChallenge,
      expectedOrigin: "http://localhost:5173",
      expectedRPID: "localhost",
      authenticator: {
        credentialID: userCredential.credentialID,
        credentialPublicKey: userCredential.credentialPublicKey,
        counter: userCredential.counter,
      },
    });

    if (verification.verified) {
      // Update the counter
      userCredential.counter = verification.authenticationInfo.newCounter;

      // Clean up challenge
      challenges.delete(username);

      return c.json({
        verified: true,
        message: "認証成功だよ〜✨",
      });
    } else {
      return c.json({
        verified: false,
        message: "認証の確認に失敗しちゃった💦",
      });
    }
  } catch (error) {
    console.error("Authentication complete error:", error);
    return c.json({ error: "サーバーエラーだよ〜💦" }, 500);
  }
});
