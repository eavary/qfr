const express = require('express')
const router = express.Router()
// const db = require('../db')
const mysql = require("mysql2");

// Get all zones for a device
router.get('/devices/:deviceId/zones', async (req, res) => {
  try {
    const { deviceId } = req.params
    const result = await mysql.query('SELECT * FROM zones WHERE device_id = $1', [deviceId])
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Create a new zone
router.post('/devices/:deviceId/zones', async (req, res) => {
  try {
    const { deviceId } = req.params
    const { name, description } = req.body
    const result = await mysql.query(
      'INSERT INTO zones (device_id, name, description) VALUES ($1, $2, $3) RETURNING *',
      [deviceId, name, description]
    ) 
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Update a zone
router.put('/zones/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, description } = req.body
    const result = await mysql.query(
      'UPDATE zones SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [name, description, id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Zone not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Delete a zone
router.delete('/zones/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await mysql.query('DELETE FROM zones WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Zone not found' })
    }
    res.json({ message: 'Zone deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
