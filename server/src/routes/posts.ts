import { Router } from "express";

const router = Router();

const MOCK_POSTS = [
  { id: "1", title: "Welcome to HireX", body: "Your job hunting platform." },
  { id: "2", title: "Get Started", body: "Create an account and browse jobs." },
];

router.get("/posts", (_req, res) => {
  res.json(MOCK_POSTS);
});

export default router;
