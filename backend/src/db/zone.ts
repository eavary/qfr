import { QueryError, PoolConnection, ResultSetHeader } from "mysql2"

import { connection } from "../config/db"
import { Zone } from "../model/zone"

const insert = (data: Zone): Promise<ResultSetHeader> => {
  let statements = [], values = []

  for (let prop in data) {
    statements.push(prop)
    values.push(`"${data[prop]}"`)
  }
	const query = `INSERT INTO zones (${statements.join(',')}) VALUES (${values.join(',')})`

  return new Promise((resolve, reject) => {
    connection.getConnection((err: QueryError, conn: PoolConnection) => {
      conn.query(
        query,
        values,
        function (err: QueryError, result) {
          conn.release()
          if (err) {
            return reject(err)
          }
          return resolve(result as ResultSetHeader)
        }
      )
    })
  })
}

const list = (): Promise<Zone[]> => {
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

const remove = (zoneId: string): Promise<{status: boolean}> => {
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

const update = (zoneId: string, data: any): Promise<Zone> => {
  let statements = [], values = []

  for (let prop in data) {
    statements.push(`${prop} = ?`)
    values.push(data[prop])
  }
  values.push(zoneId)

  return new Promise((resolve, reject) => {
    connection.getConnection((err: QueryError, conn: PoolConnection) => {
      conn.query(
        `UPDATE zones SET ${statements.join(", ")} WHERE id = ?`,
        values,
        function (err: QueryError, result) {
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

export default { 
	insert,
	list,
	remove,
	update,
}
