const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')

const app = express()
app.use(cors())
app.use(express.json())

const url = 'https://9cf03dba-c894-4928-bed1-50d0a6afc645-eu-west-1.apps.astra.datastax.com/api/rest/v2/namespaces/tickets/collections/users'
const token = 'AstraCS:QKjvoUwiWkWBsCPJEgCJwaDd:ada2f5224c5b69df1c50807581161aae6289fd7f40a57510f4a8e22ecbc614ea'

app.get('/tickets', async (req, res) => {
    const options = {
        method: 'GET',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': token,
        },
    }
    try {
        const response = await axios(`${url}?page-size=20`, options)
        res.status(200).json(response.data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})

app.post('/tickets', async (req, res) => {
    const formData = req.body.formData

    const options = {
        method: 'POST',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': token,
            'Content-Type': 'application/json'
        },
        data: formData
    }

    try {
        const response = await axios(url, options)
        res.status(200).json(response.data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})

app.get('tickets/:documentId', async (req,res) => {
    const id = req.params.documentId

    const options = {
        method: 'GET',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': token,
        }
        
    }

    try {
        const response = await axios(`${url}/${id}`, options)
        res.status(200).json(response.data)
        console.log('updated')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})

app.put('tickets/:documentId', async (req,res) => {
    const id = req.params.documentId
    const data = req.body.data

    const options = {
        method: 'PUT',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': token,
        },
        data
    }

    try {
        const response = await axios(`${url}/${id}`, options)
        res.status(200).json(response.data)
        console.log('updated')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})

app.delete('/tickets/:documentId', async (req, res) => {
    const id = req.params.documentId

    const options = {
        method: 'DELETE',
        headers: {
            Accepts: 'application/json',
            'X-Cassandra-Token': token,
        },
    }

    try {
        const response = await axios(`${url}/${id}`, options)
        res.status(200).json(response.data)
        console.log('deleted')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})



app.listen(PORT, () => console.log('server running on PORT ' + PORT))