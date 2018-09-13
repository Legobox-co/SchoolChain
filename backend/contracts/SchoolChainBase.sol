pragma solidity ^0.4.24;

// import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./SchoolChainAccessControl.sol";
/**
Struct for deparment
contains
- students
- lecturers
- currentSession
 */

contract SchoolChainBase is SchoolChainAccessControl {

    struct Department {
        bytes32 name;
        // mapping (uint => uint256) levelFee;
        // uint256 depositsToDepartment;
    }

    struct Session {
        bytes32 name;
        uint256 sessionID;
        // mapping (uint256 => bool) student_paid_fees;
    }

    struct Level {
      bytes32 name;
      uint256 generalFees;
    }


     // school sessions and deoartments
    Session[] public sessions;
    Department[] public departments;
    // Student [] students;
    Level[] public levels;



    // mapping from studentaddress to a department that owns them.
    mapping(uint => uint) studentsDepartmentIds;
    // mapping of student to their current level.
    mapping(uint => uint) studentsLevelIds;
    // maping of lecturers to their departments
    mapping(uint => uint) lecturersDepartmentIds;
    // mapping of departments to their 


    // events and other things to know about
    event StudentCreated(address _student, uint256 studentID);
    event LecturerCreated(address _lecturer, uint256 lecturerID);
    event DepartmentCreated(uint departmentId, bytes32 name);
    event LevelCreated(uint levelId);



    /**
    * Create a Level
    */
    function _createLevel(bytes32 _name, uint _generalFee) private onlyVC returns (uint) {
        Level memory newLevel = Level({
          name: _name,
          generalFees: _generalFee
        });
        uint id = levels.push(newLevel) - 1;
        emit LevelCreated(id);
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
    * Create a student
    */
    function _createStudent(address _studentAddress, bytes32 studentName, uint departmentID) external onlyVC{
        Student newStudent = students[_studentAddress];
        newStudent.fullname = studentName;
        newStudent.studentAddress = _studentAddress;
        newStudent.departmentID = departmentID;

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

    function _getDepartment(uint _department) public returns (bytes32){
        Department department  = departments[_department];
        return (department.name);
    }

    // function _getLevels() public returns (Level[]){
    //     return (levels);
    // }

    // function _getStudentsInLevel() public {
    //     // return departments;
    // }

    // function getStudentWhoPaidCurrentSession() public{
        
    // }
}
