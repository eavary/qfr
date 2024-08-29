import { QueryError, PoolConnection } from "mysql2"

import { connection } from "../config/db"
import { Zone } from "../model/zone"

const selectAll = (): Promise<Zone[]> => {
  return new Promise((resolve, reject) => {
		connection.getConnection((err: QueryError, conn: PoolConnection) => {
			conn.query("select * from zones", (err, resultSet: Zone[]) => {
				conn.release()
				if (err) {
					return reject(err)
				}
				return resolve(resultSet)
			})
		})
  })
}

export default { selectAll }
