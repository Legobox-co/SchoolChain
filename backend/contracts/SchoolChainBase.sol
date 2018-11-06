pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./SchoolChainAccessControl.sol";
/**
Struct for deparment
contains
- students
- lecturers
- currentSession
 */

contract SchoolChainBase is SchoolChainAccessControl {

    using SafeMath for uint256;
    using SafeMath for uint;

    // mapping from studentaddress to a department that owns them.
    mapping(uint => uint) studentsDepartmentIds;
    mapping(uint => uint) studentsLevelIds;
    mapping(uint => uint) lecturersDepartmentIds;

    // events and other things to know about
    event StudentCreated(address _student, uint256 studentID);
    event LecturerCreated(address _lecturer, uint256 lecturerID);
    event DepartmentCreated(uint departmentId, bytes32 name);
    event LevelCreated(uint levelId, uint _name, uint256 generalFees);
    event NewSessionCreated(uint sessionID, bytes32 name, uint256 hostelFee);

    /**
    * Create a Level
    */
    function _createLevel(uint _name, uint256 _generalFee) external onlyVC returns (uint) {
        Level memory newLevel = Level({
          levelID: _name,
          generalFees: _generalFee * (10 ** 18)
        });
        uint id = levels.push(newLevel) - 1;
        emit LevelCreated(id, _name, _generalFee * (10 ** 18));
        return (id);
    }

    /**
    * Create a department
    */
    function _createDepartment(bytes32 _name, uint256 depositsToDepartment) external onlyVC returns (uint){
        Department memory dept = Department({
            name: _name
        });

        uint departmentID = departments.push(dept) -1;
        emit DepartmentCreated(departmentID, dept.name);
        return (departmentID);
    }

    /**
    * Create a session.
    */
    function _createSession(bytes32 _name, uint256 hostelFee) external onlyVC {
      /* _name, 0, 0, 0, hostelFee * (10**18), true */
        Session memory session = Session({
            name: _name,
            sessionID: 0,
            sessionSchoolFeesTotal: 0,
            hostelFee: hostelFee * (10**18),
            hostelFeesTotal: 0,
            exists: true
          });
        // session.name = _name;
        // session.sessionSchoolFeesTotal = 0;
        // session.hostelFee = hostelFee;
        // session.hostelFeesTotal = 0;

        // for loop on students
        for (uint i = 0; i < studentAccounts.length; i++) {
            students[studentAccounts[i]].levelID.add(1);
        }

        // add session to the list of sessions
        uint sessionId = sessions.push(session) - 1;
        sessions[sessionId].sessionID = sessionId;
        emit NewSessionCreated(sessionId, _name, hostelFee * (10**18));
    }

    /**
    * Create a student
    */
    function _createStudent(bytes32 studentName, uint departmentID, address _studentAddress, uint levelID) external onlyVC {
        Student newStudent = students[_studentAddress];
        newStudent.fullname = studentName;
        newStudent.studentAddress = _studentAddress;
        newStudent.departmentID = departmentID;
        newStudent.levelID = levelID;

        uint studentId = studentAccounts.push(_studentAddress) -1;

        // map student to their departments
        studentsDepartmentIds[studentId] = departmentID;
        emit StudentCreated(_studentAddress, studentId);
    }

    /**
    * Create a Lecturer for a department
     */
    function _createLecturer(address _lecturerAddress, bytes32 lecturerName, uint departmentID) external onlyVC {
        Lecturer newLecturer = lecturers[_lecturerAddress];
        newLecturer.fullname = lecturerName;
        newLecturer.lecturerAddress = _lecturerAddress;
        newLecturer.departmentID = departmentID;

        uint lecturerId = lecturerAccounts.push(_lecturerAddress) -1;

        // map student to their departments
        lecturersDepartmentIds[lecturerId] = departmentID;
        emit LecturerCreated(_lecturerAddress,lecturerId);
    }

    /**
    * Getting a department from the contract
    */
    function _getDepartment(uint _department) public returns (bytes32){
        Department dept  = departments[_department];
        return (dept.name);
    }

    function checkLevelFee(uint id) public returns (uint256 fee) {
        Level memory level = levels[id];
        return(level.generalFees);
    }


    /*
    * Getting a session from the contract
    */

}
