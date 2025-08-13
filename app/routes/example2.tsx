import { Context } from "hono";

export default function Example(c: Context) {
  const { name } = c.req.query();

  return <p>{name ? `Name Query Parameter is: ${name}` : "No name query parameter"}</p>;
}