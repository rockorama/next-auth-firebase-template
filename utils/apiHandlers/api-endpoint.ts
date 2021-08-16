import type { NextApiRequest, NextApiResponse } from 'next'
import { getUserInfo, UserRecord } from '../../firebase-admin'

export type MethodFunction = (
  payload: Record<string, any>,
  user: UserRecord
) => Promise<any>

type Method = {
  func: MethodFunction
  schema?: Record<string, any>
  noAuth?: boolean
}

type Methods = {
  POST?: Method
  GET?: Method
  PUT?: Method
  DELETE?: Method
}

export default (methods: Methods) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = methods[req.method]

    if (method) {
      const { func, schema } = method
      try {
        const user = await getUserInfo(req)

        if (!method.noAuth && !user) {
          throw new Error('Not authenticated')
        }
        if (schema) await schema.validateAsync(req.body)
        const data = await func(
          {
            ...(req.query || {}),
            ...(req.body || {}),
          },
          user
        )
        res.status(200).json({
          ok: true,
          data,
        })
      } catch (e) {
        res.status(500).json({
          ok: false,
          error: e.message,
        })
      }
    } else {
      res.status(403).json({
        ok: false,
        error: `Cannot ${req.method} to this endpoint.`,
      })
    }
  }
}
