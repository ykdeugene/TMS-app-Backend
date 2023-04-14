const connectDatabase = require("../config/database") // Importing Database for connection

// Create a new Application => /tms/create_application
// receives appName/appRNum (& 7 other etc.) => insert into application => returns true/false
exports.createApplication = (req, res, next) => {
  connectDatabase.getConnection(async function (err, connection) {
    if (err) {
      res.status(200).send(false)
      return
    }
    const query = "INSERT INTO `tms_database`.`application` (`App_Acronym`, `App_Description`, `App_Rnumber`, `App_startDate`, `App_endDate`, `App_permit_Open`, `App_permit_toDoList`, `App_permit_Doing`, `App_permit_Done`) VALUES (?,?,?,?,?,?,?,?,?)"

    const data = [req.body.appName, req.body.appDescription, req.body.appRNum, req.body.appStartDate, req.body.appEndDate, req.body.appOpen, req.body.appToDo, req.body.appDoing, req.body.appDone]

    connection.query(query, data, (err, results) => {
      console.log(err)
      if (err) {
        res.status(200).send(false)
        return
      }

      if (results) {
        res.status(200).send(true)
      } else {
        res.status(200).send(false)
      }
    })
    connection.release()
  })
}

// Get all application details => /tms/applications
// returns all application data
exports.getApplication = (req, res, next) => {
  connectDatabase.getConnection(function (err, connection) {
    if (err) {
      res.status(200).send(false)
      return
    }
    const query = "SELECT * FROM application"
    connection.query(query, (err, results) => {
      if (err) {
        res.status(500).send(err)
        return
      }

      // Return the results in json
      res.status(200).send(results)
    })
    connection.release()
  })
}
