import { Router } from 'express';

import { getUsers } from '@/controllers/user.controller.js';
import { asyncHandler } from '@/lib/async-handler.js';

export const userRouter = Router();

userRouter.get('/', asyncHandler(getUsers));
