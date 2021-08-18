const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    insecureAuth : true
};

const mysql = require('mysql')

const connection = mysql.createConnection(config)

connection.query('create table if not exists people (id int not null auto_increment, name varchar (255), primary key(id));')

const sql = `INSERT INTO people (name) values ('Rafael')`
connection.query(sql)
connection.end()

app.get('/', (req, res) => {
    let html = '<h1>Full Cycle Rocks!</h1>'
    html += '<br>'

    const connection = mysql.createConnection(config)
    connection.query("SELECT * FROM people", function (err, result, fields) {
        if (err) throw err
        html += '<ul>'
        result.forEach(people => {
            html += '<li>' + people.name + '</li>'
        })
        html +='</ul>'
        res.send(html)
        connection.end()
      })
})

app.listen(port, () => {
    console.log('Express rodando na porta ' + port)
})
