const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'assessments'
});

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/targets', (req, res) => {
  const queryString = 'Select * from targets';
  connection.query(queryString, (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).json('Could not complete request');
    } else {
      res.json(results);
    }
  });
});

app.get('/students', (req, res) => {
  const queryString = 'Select * from students';
  connection.query(queryString, (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).json('Could not complete request');
    } else {
      res.json(results);
    }
  });
});

app.get('/elements', (req, res) => {
  const queryString = 'Select * from elements';
  connection.query(queryString, (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).json('Could not complete request');
    } else {
      res.json(results);
    }
  });
});

app.post('/students', (req, res) => {
  const studentName = req.body.student;
  console.log(studentName);
  const queryString = `INSERT INTO students (student_name) VALUES ('${studentName}')`;
  connection.query(queryString, (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).json('Could not complete request');
    } else {
      res.json({ student: results });
    }
  });
});

app.post('/targets', (req, res) => {
  const elementName = req.body.element;
  connection.query(
    `SELECT (id) FROM elements WHERE element_name='${elementName}'`,
    (error, results) => {
      if (error) console.log(error);
      const elementId = results[0].id;
      const description = req.body.target;
      connection.query(
        `INSERT INTO targets (description, element_id) VALUES ('${description}', ${elementId})`,
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(404).json('Could not complete request');
          } else {
            res.json({ target: results });
          }
        }
      );
    }
  );
});

app.post('/elements', (req, res) => {
  console.log(req.body);
  const elementName = req.body.element;
  const queryString = `INSERT INTO elements (element_name) VALUES ('${elementName}')`;
  connection.query(queryString, (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).json('Could not complete request');
    } else {
      res.json({ element: results });
    }
  });
});

// checks if the number of rows in completed table is the same as the number of targets in state
// if new items are in state, fetch students, and targets.
// for each target => insert target id, student id, and false value into table for every student.
app.post('/completed', (req, res) => {
  connection.query(`SELECT * FROM completed_targets`, (error, results) => {
    if (error) {
      console.log(error);
      res.json(404).json('Could not complete request');
    } else if (results.length < req.body.length) {
      queryString1 = 'SELECT id FROM students';
      queryString2 = 'SELECT id FROM targets';
      connection.query(queryString1, (error, results) => {
        if (error) {
          console.log(error);
          res.status(404).json('Could not complete request');
        } else {
          const studentIds = results.map(item => {
            return item.id;
          });
          connection.query(queryString2, (error, results) => {
            if (error) {
              console.log(error);
              res.status(404).json('Could not complete request');
            } else {
              const targetIds = results.map(item => {
                return item.id;
              });
              targetIds.forEach(targetId => {
                studentIds.forEach(studentId => {
                  connection.query(
                    `INSERT INTO completed_targets (target_id, student_id, completed) VALUES (${targetId}, ${studentId}, false)`,
                    (error, results) => {
                      if (error) {
                        console.log(error);
                        res.status(404).json('Could not complete request');
                      }
                    }
                  );
                });
              });
            }
          });
        }
      });
    } else {
      res.json('success');
    }
  });
});

app.put('/completed', (req, res) => {
  const student = parseInt(req.body.studentId);
  const target = parseInt(req.body.targetId);
  res.json(student);
  connection.query(
    `UPDATE completed_targets SET completed = true WHERE student_id = ${student} AND target_id = ${target}`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).json('Could not complete request');
      } else {
        res.json('success');
      }
    }
  );
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
