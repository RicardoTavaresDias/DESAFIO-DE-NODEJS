import fastify from "fastify"
import { fastifySwagger } from "@fastify/swagger"
//import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod"
import { createCourseRouter } from "./routers/create-course.ts"
import { getCourseByIdRouter } from "./routers/get-course-by-id.ts"
import { getCoursesRouter } from "./routers/get-courses.ts"
import scalarAPIReference from "@scalar/fastify-api-reference"
import { loginRouter } from "./routers/login.ts"

// Config fastify
const server = fastify({
  // logger: {
  //   transport: {
  //     target: 'pino-pretty',
  //     options: {
  //       translateTime: "HH:MM:ss Z",
  //       ignore: "pid,hostname"
  //     }
  //   }
  // }
}).withTypeProvider<ZodTypeProvider>()

// Config Swagger
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Desafio Node.js',
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
})

server.register(scalarAPIReference, {
  routePrefix: '/docs'
})

/*
  // Caminho da documentação http://localhost:3333/docs
  server.register(fastifySwaggerUi, {
    routePrefix: '/docs'
  })
*/

// Lib validação do Fastify
server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

// Routers
server.register(createCourseRouter)
server.register(getCourseByIdRouter)
server.register(getCoursesRouter)
server.register(loginRouter)

export { server }
