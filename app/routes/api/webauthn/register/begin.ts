import { createRoute } from "honox/factory";
import { generateRegistrationOptions } from "@simplewebauthn/server";

// In-memory storage for demo (use a real database in production)
// Note: グローバル変数を使うことで、全APIエンドポイント間でデータを共有
declare global {
  var webauthnUsers: Map<string, any>;
  var webauthnChallenges: Map<string, string>;
}

globalThis.webauthnUsers = globalThis.webauthnUsers || new Map();
globalThis.webauthnChallenges = globalThis.webauthnChallenges || new Map();

const users = globalThis.webauthnUsers;
const challenges = globalThis.webauthnChallenges;

export const POST = createRoute(async (c) => {
  if (c.req.method !== "POST") {
    return c.json({ error: "そのメソッドは使えないよ〜💦" }, 405);
  }

  try {
    const { username } = await c.req.json();

    if (!username) {
      return c.json({ error: "ユーザー名が必要だよ〜💦" }, 400);
    }

    // Check if user already exists
    if (users.has(username)) {
      return c.json({ error: "そのユーザー名はもう使われてるよ〜💦" }, 400);
    }

    // Generate registration options
    const options = await generateRegistrationOptions({
      rpName: "HonoX WebAuthn App",
      rpID: "localhost",
      userID: username,
      userName: username,
      userDisplayName: username,
      attestationType: "none",
      excludeCredentials: [],
      authenticatorSelection: {
        residentKey: "discouraged",
        userVerification: "preferred",
        authenticatorAttachment: "platform",
      },
    });

    // Store challenge for verification
    challenges.set(username, options.challenge);

    return c.json(options);
  } catch (error) {
    console.error("Registration begin error:", error);
    return c.json({ error: "サーバーエラーだよ〜💦" }, 500);
  }
});
