pragma solidity ^0.4.24;


contract SchoolChainAccessControl {

    struct Student {
        bytes32 fullname;
        address studentAddress;
        uint departmentID;
    }

    // lecturers in the school mapping
    struct Lecturer {
        bytes32 fullname;
        address lecturerAddress;
        uint departmentID;
    }

    address[] public studentAccounts;
    address[] public lecturerAccounts;

    // student who already are part of a department
    // mapping (address => uint256) student_with_departments;
    mapping (address => Student) students;
    mapping (address => Lecturer) lecturers;

    mapping (address => uint) public lecturerIds;
    mapping (address => uint) public studentIds;
    mapping (address => uint) public departmentLeads;

    address public vc;
    address public dean;

    event NewVC(address _vc);

    modifier onlyVC () {
        require(msg.sender == vc);
        _;
    }

    modifier onlyDean() {
        require(msg.sender == dean);
        _;
    }

    modifier onlyLecturers() {
        require(lecturers[msg.sender].lecturerAddress == msg.sender);
        _;
    }

    modifier onlyStudents() {
        require(students[msg.sender].studentAddress == msg.sender);
        _;
    }

    function setVC(address _newVC, address _formerVC) onlyVC{
        vc = _newVC;
        emit NewVC(vc);
    }

}
