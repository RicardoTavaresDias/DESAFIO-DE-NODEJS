import type { FastifyRequest, FastifyReply } from "fastify"
import { getAuthenticatedUserFromRequest } from "../../utils/get-authenticated-user-from-request.ts"

export function checkUserRole (role: 'student' | 'manager') {
  return async (request: FastifyRequest, replay: FastifyReply) => {
    const user = getAuthenticatedUserFromRequest(request)

    if (user.role !== 'manager') {
      return replay.status(401).send()
    } 
  }
}