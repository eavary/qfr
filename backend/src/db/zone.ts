import { QueryError, PoolConnection } from "mysql2"

import { connection } from "../config/db"
import { Zone } from "../model/zone"

const deleteZone = (zoneId: string): Promise<{status: boolean}> => {
  return new Promise((resolve, reject) => {
		connection.getConnection((err: QueryError, conn: PoolConnection) => {
			conn.query(
				"DELETE FROM zones WHERE id = ?",
				[zoneId],
				function(err: QueryError, result) {
					conn.release()
					if (err) {
						return reject(err)
					}
					return resolve(result as any)
				}
			)
    })
  })
}

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

export default { 
	deleteZone,
	selectAll
}
