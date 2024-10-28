// src/server/api/routers/auth.ts

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../../db";
import bcrypt from "bcryptjs";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password, name } = input;

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error("Este email já está em uso.");

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      return { user };
    }),
});
