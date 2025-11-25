import { Router } from 'express';
import packageJson from '../package.json' with { type: 'json' };

export const router = Router();

const habits = [];

router.get('/', (_req, res) => {
  const { name, version, description } = packageJson;

  res.status(200).json({
    name,
    version,
    description,
  });
});

router.post('/habits', (req, res) => {
  const { name } = req.body;

  const newHabit = { name };

  habits.push(newHabit);

  res.status(201).json(newHabit);
});
