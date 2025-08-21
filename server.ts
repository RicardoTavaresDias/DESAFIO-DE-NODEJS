import fastify from "fastify"
import crypto from "node:crypto"

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname"
      }
    }
  }
})

const courses = [
  { id: '1', title: 'Curso de Node.js' },
  { id: '2', title: 'Curso de React' },
  { id: '3', title: 'Curso de React Native' }
]

server.get('/courses', (request, replay) => {
  return replay.send({ courses })
})

server.get('/courses/:id', (request, replay) => {
  type Params = {
    id: string
  }

  const params = request.params as Params
  const courseId = params.id

  const course = courses.find(course => course.id === courseId)
  if (course) {
    return { course }
  }

  return replay.status(404).send()
})

server.post('/courses', (request, replay) => {
   type Body = {
    title: string
  }

  const coursesId = crypto.randomUUID()
  const body = request.body as Body
  const courseTitle = body.title


  if (!courseTitle) {
    return replay.status(400).send({ message: 'Título obrigarório.' })
  }
  
  courses.push({ id: coursesId, title: courseTitle }) 

  return replay.status(201).send({ id: coursesId })
})

server.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})