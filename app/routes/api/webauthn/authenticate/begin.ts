import { createRoute } from "honox/factory";
import { generateAuthenticationOptions } from "@simplewebauthn/server";

// In-memory storage for demo (use a real database in production)
const users = new Map();
const challenges = new Map();

export default createRoute(async (c) => {
  if (c.req.method !== "POST") {
    return c.json({ error: "そのメソッドは使えないよ〜💦" }, 405);
  }

  try {
    const { username } = await c.req.json();

    if (!username) {
      return c.json({ error: "ユーザー名が必要だよ〜💦" }, 400);
    }

    // Check if user exists
    const user = users.get(username);
    if (!user) {
      return c.json({ error: "ユーザーが見つからないよ〜💦" }, 404);
    }

    // Generate authentication options
    const options = await generateAuthenticationOptions({
      rpID: "localhost",
      allowCredentials: user.credentials.map((cred: any) => ({
        id: cred.credentialID,
        type: "public-key",
        transports: ["internal", "hybrid"],
      })),
      userVerification: "preferred",
    });

    // Store challenge for verification
    challenges.set(username, options.challenge);

    return c.json(options);
  } catch (error) {
    console.error("Authentication begin error:", error);
    return c.json({ error: "サーバーエラーだよ〜💦" }, 500);
  }
});
