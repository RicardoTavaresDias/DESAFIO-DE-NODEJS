import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courses } from "../database/schema.ts";
import { eq } from "drizzle-orm";
import { db } from "../database/client.ts";
import { z } from "zod"

export const getCourseByIdRouter: FastifyPluginAsyncZod = async (server) => {
  server.get('/courses/:id', {
  schema: {
    tags: ['courses'],
    summary: 'Get course by ID',
    params: z.object({
      id: z.uuid()
    }),
    response: {
      200: z.object({
        course: z.object({
          id: z.uuid(),
          title: z.string(),
          description: z.string().nullable()
        })
      }),
      404: z.null().describe("Course not found")
    }
  }
}, async (request, replay) => {
  const courseId = request.params.id

  const result = await db.select().from(courses).where(eq(courses.id, courseId))

  if (result.length > 0) {
    return { course: result[0] }
  }

  return replay.status(404).send()
})
}