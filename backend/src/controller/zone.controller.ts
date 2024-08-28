import { Router, Request, Response } from "express"
import { Zone } from "../model/zone"
  
const zoneList: Zone[] = [
    {
        id: 1,
        device_id: 1,
        name: 'Zone One',
        description: 'Zone One Description'
    },
    {
        id: 2,
        device_id: 1,
        name: 'Zone Two',
        description: 'Zone Two Description'
    },
    {
        id: 3,
        device_id: 2,
        name: 'Zone One',
        description: 'Zone One Description'
    },
    {
        id: 4,
        device_id: 2,
        name: 'Zone Two',
        description: 'Zone Two Description'
    },
]

const getAll = (req: Request, res: Response) => {
    res.status(200).send(zoneList);
}

export default { getAll }
