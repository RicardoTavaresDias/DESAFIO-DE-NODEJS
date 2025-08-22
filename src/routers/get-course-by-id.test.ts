import { test, expect } from "vitest"
import request from "supertest"
import { server } from "../app.ts"
import { faker } from "@faker-js/faker"
import { makeCourse } from "../tests/factories/make-course.ts"

test('Get course by id', async () => {
  await server.ready()

  const course = await makeCourse()

  const response = await request(server.server)
    .get(`/courses/${course.id}`)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null
    }
  })
})

test('Return 404 for non existing courses', async () => {
  await server.ready()

  const response = await request(server.server)
    .get(`/courses/b991a848-ea63-42fc-b614-5fd1621fe0c5`)

  expect(response.status).toEqual(404)
})