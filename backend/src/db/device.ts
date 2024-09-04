import { QueryError, PoolConnection, ResultSetHeader } from "mysql2"

import { connection } from "../config/db"
import { Device } from "../model/device"
import { Zone } from "../model/zone"

const selectAll = (): Promise<Device[]> => {
  return new Promise((resolve, reject) => {
      connection.getConnection((err: QueryError, conn: PoolConnection) => {
          conn.query("SELECT *, (SELECT COUNT(*) FROM zones AS z WHERE d.id = z.device_id ) AS num_zones FROM devices AS d", (err, results: Device[]) => {
              conn.release()
              if (err) {
                  return reject(err)
              }
              return resolve(results)
          })
      })
  })
}

const selectDevice = (deviceId: string): Promise<Device> => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err: QueryError, conn: PoolConnection) => {
      conn.query(
        "SELECT * FROM devices WHERE id = ?",
        [deviceId],
        function(err: QueryError, results) {
          conn.release()
          if (err) {
            return reject(err)
          }
          return resolve(results as unknown as Device)
        }
      )
    })
  })
}

const selectZones = (deviceId: string): Promise<Zone[]> => {
	return new Promise((resolve, reject) => {
		connection.getConnection((err: QueryError, conn: PoolConnection) => {
			conn.query(
				"SELECT * FROM zones WHERE device_id = ?",
				[deviceId],
				function(err: QueryError, results) {
					conn.release()
					if (err) {
						return reject(err)
					}
					return resolve(results as Zone[])
				}
			)
		})
	})
}

const deleteDevice = (deviceId: string): Promise<{status: boolean}> => {
  return new Promise((resolve, reject) => {
		connection.getConnection((err: QueryError, conn: PoolConnection) => {
			conn.query(
				"DELETE FROM devices WHERE id = ?",
				[deviceId],
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

const insertDevice = (data: Device): Promise<ResultSetHeader> => {
  let statements = [], values = []

  for (let prop in data) {
    statements.push(prop)
    values.push(data[prop])
  }

  return new Promise((resolve, reject) => {
    connection.getConnection((err: QueryError, conn: PoolConnection) => {
      conn.query(
        `INSERT INTO devices (${statements.join(',')}) VALUES (${values.join(',')})`,
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

const updateDevice = (deviceId: string, data: any): Promise<Device> => {
  let statements = [], values = []

  for (let prop in data) {
    statements.push(`${prop} = ?`)
    values.push(data[prop])
  }
  values.push(deviceId)

  return new Promise((resolve, reject) => {
    connection.getConnection((err: QueryError, conn: PoolConnection) => {
      conn.query(
        `UPDATE devices SET ${statements.join(", ")} WHERE id = ?`,
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
  deleteDevice,
  insertDevice,
  selectAll,
  selectDevice,
  selectZones,
  updateDevice
}
