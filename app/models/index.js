var sql = require("mssql");
var config = {
  options: {
    enableArithAbort: true,
    encrypt: true
  },
  port: 1433,
  user: 'admin',
  password: 'josecheo21',
  server: 'littlelibrary.cbcqtl3ilgod.us-east-1.rds.amazonaws.com',
  database: 'litteLibraryDB'
};

class QuerySql {
  static getAll(parm, result) {
    const Offset = (parm.num_page - 1) * 10
    const title = parm.title
    const publication = parm.publication

    sql.connect(config, function () {
      sql.query(`SELECT * FROM libraryDB where title LIKE '%${title}%' and publication LIKE '%${publication}%' ORDER BY bookId OFFSET ${Offset} ROWS FETCH NEXT 10 ROWS ONLY`, (err, response) => {
        if (err) {
          result(null, response);
          return;
        }
        result(null, response.recordset);
      });
    });
  }

  static create(book, result) {
    sql.connect(config, function (err) {
      var insert = `INSERT into libraryDB (title,author,publication,edition,copies,imagenUrl) VALUES ('${book.title}', '${book.author}', '${book.publication}','${book.edition}','${book.copies}','${book.imagenUrl}')`
      sql.query(insert, function (err, recordset) {
        if (err) {
          result(err, null);
          return;
        }
        result(null, recordset);
      });
    })
  }
  static update(book, result) {
    sql.connect(config, function (err) {
      var upd = `UPDATE libraryDB SET title='${book.title}',author='${book.author}',publication='${book.publication}',edition='${book.edition}', copies='${book.copies}',imagenUrl='${book.imagenUrl}' where bookId='${book.bookId}'`
      sql.query(upd, function (err, recordset) {
        if (err) {
          result(err, null);
          return;
        }
        result(null, recordset);
      });
    })
  }
  static remove(id, result) {
    sql.connect(config, function (err) {
      sql.query(`DELETE FROM libraryDB WHERE bookId = ${id}`, (err, res) => {
        if (err) {
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        result(null, res);
      });
    })
  }

  static login(request, result) {
    sql.connect(config, function (err) {
      var email = request.email;
      var password = request.password;

      if (email && password) {
        sql.query(`SELECT * FROM [litteLibraryDB].[dbo].[user] where email='${email}' and password='${password}'`, (err, res) => {
          if (err) {
            result(null, err);
            return;
          }
          result(null, res);
        });
      }
    })
  }

  static createUser(user, result) {
    sql.connect(config, function (err) {
      var insert = `INSERT into [litteLibraryDB].[dbo].[user] (fullname,email,password) VALUES ('${user.fullname}', '${user.email}', '${user.password}')`
      sql.query(insert, function (err, recordset) {
        if (err) {
          result(err, null);
          return;
        }
        result(null, recordset);
      });
    })
  }
}

module.exports = QuerySql;