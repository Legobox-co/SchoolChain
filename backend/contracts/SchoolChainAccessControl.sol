pragma solidity ^0.4.24;

import "./SchoolChainStructs.sol";

contract SchoolChainAccessControl is SchoolChainStructs {


    // student who already are part of a department
    // mapping (address => uint256) student_with_departments;
   

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

    function setVC(address _newVC, address _formerVC) public onlyVC {
        vc = _newVC;
        emit NewVC(vc);
    }

}
