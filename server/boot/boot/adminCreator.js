"use strict";

module.exports = function(app, done) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * https://loopback.io/doc/en/lb3/Working-with-LoopBack-objects.html
   * for more info.
   */
  const User = app.models.user;
  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;
  const UsersList = [
    {
      username: "danish",
      email: "idanishraza@gmail.com",
      password: "12345"
    },
    {
      username: "magicerp",
      email: "erp@magicerp.com",
      password: "1q2w3e4r5t#P@$$w0RD"
    }
  ];
  try {
    // lets make sure that this run ONCE only
    Role.find({ name: "admin" }, function(err, results) {
      // console.log(results); // it return [] on first run
      if (err) {
        /* handle this! */
      }

      if (typeof results !== "undefined" && results.length < 1) {
        // now we know the DB doesn't have it already, so do the Role creation...
        // start creating User's in the user model
        User.create(UsersList, function(err, users) {
          // console.log(users);
          // if (err) throw 'Users exsits';

          // console.log('Admin users Created:', users);

          // Create the admin role
          Role.create(
            {
              name: "admin"
            },
            function(err, role) {
              // if (err) throw 'Role exsits';

              // console.log('Admin role Created:', role);

              // add admin roles to the give user array
              UsersList.map((user, index) =>
                role.principals.create(
                  {
                    principalType: RoleMapping.USER,
                    principalId: users[index].id
                  },
                  function(err, principal) {
                    // if (err) throw 'role.principals exsits';
                    // console.log('Admin principal Created:', principal);
                  }
                )
              );
            }
          );
          // end
        });
      }
    });

    done();
  } catch (err) {
    console.log("Admin created Error: ");
    console.log(err);
    console.log(err.stack);
    process.exit();
  }
};
