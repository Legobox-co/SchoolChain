pragma solidity ^0.4.24;


contract SchoolChainStructs {

    struct Student {
        bytes32 fullname;
        address studentAddress;
        uint departmentID;
        uint levelID;
    }

    // lecturers in the school mapping
    struct Lecturer {
        bytes32 fullname;
        address lecturerAddress;
        uint departmentID;
    }

    struct Department {
        bytes32 name;
        // mapping (uint => uint256) levelFee;
        // uint256 depositsToDepartment;
    }

    struct Session {
        bytes32 name;
        uint256 sessionID;
        uint256 sessionSchoolFeesTotal;
        uint256 hostelFee;
        uint256 hostelFeesTotal;
        bool exists;
        mapping (address => bool) student_paid_fees;
        mapping (address => bool) student_paid_hostel_fees;
    }

    struct Level {
      uint levelID;
      uint256 generalFees; // general school fees for the level
    }


    address[] public studentAccounts;
    address[] public lecturerAccounts;

     // school sessions and deoartments
    Session[] public sessions;
    Department[] public departments;
    Level[] public levels;
    
    mapping (address => Student) students;
    mapping (address => Lecturer) lecturers;

    mapping (address => uint) public lecturerIds;
    mapping (address => uint) public studentIds;
    mapping (address => uint) public departmentLeads;

    // Student[] public studentsArray;
    // Level[] public levelsArray;
}
