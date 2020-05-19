const sqlz = require("sequelize");
let User;
let Role;
let SystemAdmin;
let School;
let SchoolAdmin;
let School_Admin;
let School_Subscription;
let Subscription;
let Parent;
let Teacher;
let Student;
let Class;
let Student_Parent;
let Class_Student;
let Message;
let Material;
let Reminder;
let Assignment;
let Student_Assignment;
const getInstance = async (s) => {
  return new Promise((resolve, reject) => {
    if (s != null) {
      let sequelize = s;
      //users
      User = sequelize.define("user", {
        userId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: sqlz.STRING,
        password: sqlz.STRING,
        otp: sqlz.STRING,
        otpexpiry: sqlz.DATE,
        activefrom: sqlz.DATE,
        roleid: {
          type: sqlz.INTEGER,
          references: {
            model: "roles",
            key: "roleId",
          },
        },
      });
      //roles
      Role = sequelize.define("role", {
        roleId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        rolename: sqlz.STRING,
      });
      //systemadmin
      SystemAdmin = sequelize.define("systemadmin", {
        SystemAdminId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: sqlz.STRING,
        lastname: sqlz.STRING,
        datejoined: sqlz.DATE,
        userid: {
          type: sqlz.INTEGER,
          references: {
            model: "users",
            key: "userId",
          },
        },
      });
      //school
      School = sequelize.define("school", {
        schoolId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        schoolname: sqlz.STRING,
        contacts: sqlz.STRING,
        address: sqlz.STRING,
        email: sqlz.STRING,
        datejoined: sqlz.DATE,
        enrolmentkey: sqlz.STRING,
      });
      //subscriptions
      Subscription = sequelize.define("subscription", {
        subscriptionId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        subscriptionname: sqlz.STRING,
        subscriptiondesc: sqlz.TEXT,
        mingrade: sqlz.INTEGER,
        maxgrade: sqlz.INTEGER,
        price: sqlz.INTEGER,
      });
      //parent
      Parent = sequelize.define("parent", {
        parentId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: sqlz.STRING,
        lastname: sqlz.STRING,
        title: sqlz.STRING,
        userid: {
          type: sqlz.INTEGER,
          references: {
            model: "users",
            key: "userId",
          },
        },
      });
      //schooladmin
      SchoolAdmin = sequelize.define("schooladmin", {
        saId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: sqlz.STRING,
        lastname: sqlz.STRING,
        activefrom: sqlz.DATE,
        userid: {
          type: sqlz.INTEGER,
          references: {
            model: "users",
            key: "userId",
          },
        },
      });
      //school_admin
      School_Admin = sequelize.define("school_admin", {
        sId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        schooladminid: {
          type: sqlz.INTEGER,
          references: {
            model: "schooladmins",
            key: "saId",
          },
        },
        schoolid: {
          type: sqlz.INTEGER,
          references: {
            model: "schools",
            key: "schoolId",
          },
        },
      });
      //teacher
      Teacher = sequelize.define("teacher", {
        teacherId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        datejoined: sqlz.DATE,
        firstname: sqlz.STRING,
        lastname: sqlz.STRING,
        userid: {
          type: sqlz.INTEGER,
          references: {
            model: "users",
            key: "userId",
          },
        },
      });
      //school_subscription
      School_Subscription = sequelize.define("school_subscription", {
        ssId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        subscriptiondate: sqlz.DATE,
        schoolid: {
          type: sqlz.INTEGER,
          references: {
            model: "schools",
            key: "schoolId",
          },
        },
        subscriptionid: {
          type: sqlz.INTEGER,
          references: {
            model: "subscriptions",
            key: "subscriptionId",
          },
        },
      });
      //student_parent
      Student_Parent = sequelize.define("student_parent", {
        spId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        parentid: {
          type: sqlz.INTEGER,
          references: {
            model: "parents",
            key: "parentId",
          },
        },
        studentid: {
          type: sqlz.INTEGER,
          references: {
            model: "students",
            key: "studentId",
          },
        },
      });
      //class
      Class = sequelize.define("class", {
        classId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        classname: sqlz.STRING,
        createdby: sqlz.INTEGER,
        createdon: sqlz.DATE,
        status: sqlz.STRING,
        enrolmentkey: sqlz.STRING,
        teacherid: {
          type: sqlz.INTEGER,
          references: {
            model: "teachers",
            key: "teacherId",
          },
        },
      });
      //student
      Student = sequelize.define("student", {
        studentId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: sqlz.STRING,
        lastname: sqlz.STRING,
        datejoined: sqlz.DATE,
        enrolmentkey: sqlz.STRING,
        schoolid: {
          type: sqlz.INTEGER,
          references: {
            model: "schools",
            key: "schoolId",
          },
        },
        userid: {
          type: sqlz.INTEGER,
          references: {
            model: "users",
            key: "userId",
          },
        },
      });
      //reminder
      Reminder = sequelize.define("reminder", {
        reminderId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: sqlz.STRING,
        message: sqlz.TEXT,
        enddate: sqlz.DATE,
        classid: {
          type: sqlz.INTEGER,
          references: {
            model: "classes",
            key: "classId",
          },
        },
        teacherid: {
          type: sqlz.INTEGER,
          references: {
            model: "teachers",
            key: "teacherId",
          },
        },
      });
      //material
      Material = sequelize.define("material", {
        mId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        materialname: sqlz.STRING,
        file: sqlz.STRING,
        dateadded: sqlz.DATE,
        accesslevel: sqlz.INTEGER,
        obj: sqlz.STRING,
        status: sqlz.STRING,
        classid: {
          type: sqlz.INTEGER,
          references: {
            model: "classes",
            key: "classId",
          },
        },
        teacherid: {
          type: sqlz.INTEGER,
          references: {
            model: "teachers",
            key: "teacherId",
          },
        },
      });
      //assignment
      Assignment = sequelize.define("assignment", {
        assignmentId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        assignmentname: sqlz.STRING,
        duedate: sqlz.DATE,
        obj: sqlz.STRING,
        file: sqlz.STRING,
        dateadded: sqlz.DATE,
        latesubmission: sqlz.INTEGER,
        resubmission: sqlz.INTEGER,
        accesslevel: sqlz.INTEGER,
        publish: sqlz.INTEGER,
        classid: {
          type: sqlz.INTEGER,
          references: {
            model: "classes",
            key: "classId",
          },
        },
        teacherid: {
          type: sqlz.INTEGER,
          references: {
            model: "teachers",
            key: "teacherId",
          },
        },
      });
      //message
      Message = sequelize.define("message", {
        messageId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        to: sqlz.STRING,
        from: sqlz.STRING,
        title: sqlz.STRING,
        message: sqlz.TEXT,
        dateadded: sqlz.DATE,
        read: sqlz.INTEGER,
        teacherid: {
          type: sqlz.INTEGER,
          references: {
            model: "teachers",
            key: "teacherId",
          },
        },
        studentid: {
          type: sqlz.INTEGER,
          references: {
            model: "students",
            key: "studentId",
          },
        },
      });
      //class_student
      Class_Student = sequelize.define("class_student", {
        csId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        studentid: {
          type: sqlz.INTEGER,
          references: {
            model: "students",
            key: "studentId",
          },
        },
        classid: {
          type: sqlz.INTEGER,
          references: {
            model: "classes",
            key: "classId",
          },
        },
      });
      //student_assignment
      Student_Assignment = sequelize.define("student_assignment", {
        saId: {
          type: sqlz.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        datesubmitted: sqlz.DATE,
        resubmission: sqlz.INTEGER,
        mark: sqlz.INTEGER,
        comment: sqlz.TEXT,
        file: sqlz.STRING,
        obj: sqlz.STRING,
        studentid: {
          type: sqlz.INTEGER,
          references: {
            model: "students",
            key: "studentId",
          },
        },
        assignmentid: {
          type: sqlz.INTEGER,
          references: {
            model: "assignments",
            key: "assignmentId",
          },
        },
      });
      //Resolve Promise
      resolve();
    } else {
      reject(new Error("Expected instance not passed.."));
    }
    //...
  });
};

module.exports = {
  getInstance,
  User,
  Role,
  SystemAdmin,
  School,
  SchoolAdmin,
  School_Admin,
  School_Subscription,
  Subscription,
  Parent,
  Teacher,
  Student,
  Class,
  Student_Parent,
  Class_Student,
  Message,
  Material,
  Reminder,
  Assignment,
  Student_Assignment,
};
