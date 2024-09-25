import { QueryError, PoolConnection, ResultSetHeader } from "mysql2"

import { connection } from "../config/db"
import { Schedule } from "../model/schedule"

const insert = (data: Schedule): Promise<ResultSetHeader> => {
  let statements = [], values = []

  for (let prop in data) {
    statements.push(prop)
    values.push(`"${data[prop]}"`)
  }
	const query = `INSERT INTO schedules (${statements.join(',')}) VALUES (${values.join(',')})`

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
          // emit to mqtt service which will post the mutates schedule
          return resolve(result as ResultSetHeader)
        }
      )
    })
  })
}

const list = (deviceId: string): Promise<Schedule[]> => {
  return new Promise((resolve, reject) => {
		connection.getConnection((err: QueryError, conn: PoolConnection) => {
			conn.query(`select * from schedules where device_id=${deviceId}`, (err, resultSet: Schedule[]) => {
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
	insert,
	list,
}
