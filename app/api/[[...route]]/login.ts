import { Hono } from "hono";

const login = new Hono()

.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.text(`hello ${id}`);
});

export default login;
