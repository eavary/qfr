import { QueryError, PoolConnection } from "mysql2"

import { connection } from "../config/db"
import { Device } from "../model/device"

const selectAll = (): Promise<Device[]> => {
  console.log('selectAll called')
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
export default { selectAll }
