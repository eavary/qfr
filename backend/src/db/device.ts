import { QueryError, PoolConnection } from "mysql2"

import { connection } from "../config/db"
import { Device } from "../model/device"
import { Zone } from "../model/zone"

const selectAll = (): Promise<Device[]> => {
  return new Promise((resolve, reject) => {
      connection.getConnection((err: QueryError, conn: PoolConnection) => {
          conn.query("select * from devices", (err, resultSet: Device[]) => {
              conn.release()
              if (err) {
                  return reject(err)
              }
              return resolve(resultSet)
          })
      })
  })
}

const selectDevice = (deviceId: string): Promise<Device> => {
  return new Promise((resolve, reject) => {
    connection.getConnection((err: QueryError, conn: PoolConnection) => {
      conn.query(
        "select * from devices where id = ?",
        [deviceId],
        function(err: QueryError, resultSet) {
          conn.release()
          if (err) {
            return reject(err)
          }
          return resolve(resultSet as unknown as Device)
        }
      )
    })
  })
}

const selectZones = (deviceId: string): Promise<Zone[]> => {
	return new Promise((resolve, reject) => {
		connection.getConnection((err: QueryError, conn: PoolConnection) => {
			conn.query(
				"select * from zones where device_id = ?",
				[deviceId],
				function(err: QueryError, resultSet) {
					conn.release()
					if (err) {
						return reject(err)
					}
					return resolve(resultSet as Zone[])
				}
			)
		})
	})
}

export default {
  selectAll,
  selectDevice,
  selectZones
}
