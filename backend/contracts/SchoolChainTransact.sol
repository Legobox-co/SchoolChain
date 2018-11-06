pragma solidity ^0.4.24;

import "./SchoolChainBase.sol";

contract SchoolChainTransact is SchoolChainBase {
    // everynode is supposed to make the payment, but in this case students would have to

    event SchoolFeesPaid(bytes32 name, uint department, uint SessionID, address studentAddress);
    event SchoolHostelFeesPaid(bytes32 name, uint SessionID, address studentAddress);


    // paying tuition.
    function payTuitionCurrentSession(uint department, uint sessionID) public onlyStudents payable returns (bool val) {
        // make sure the school fee value talley's with that of the level of the student

        // get the student struct
        Student studentPaying = students[msg.sender];

        // make sure the student address is the sender address
        require(studentPaying.studentAddress == msg.sender);

        // get the session
        Session session = sessions[sessionID];

        // make sure the sesson is valid
        if(session.exists) {

            // make sure the student has not already paid
            require(!(session.student_paid_fees[msg.sender]));
            // make sure the fee value is equal to the students level's value
            Level level = levels[studentPaying.levelID];
            require(level.generalFees == msg.value);

            //record the fees payment under the session.
            session.sessionSchoolFeesTotal += msg.value;
            session.student_paid_fees[msg.sender] = true;

            emit SchoolFeesPaid(studentPaying.fullname, department, sessionID, studentPaying.studentAddress);
            return (true);
        }else{
            return (false);
        }
    }

    function checkSchoolFees (address studentAddress) public returns (bool val){
      /* check if the address has paid fees for the current session. */
    }

    /**
    PAYING THE HOSTEL ACCOMODATION FOR THE SESSIOJN
     */
    function payHostelAccomodations (uint _sessionID) public onlyStudents payable returns (bool val){
        // student is recoded as paying for accomodation during that session.
        // get the student and the session structs
        Student studentPaying = students[msg.sender];
        require(studentPaying.studentAddress == msg.sender);
        Session session = sessions[_sessionID];
        if(session.exists) {
            require(msg.value == session.hostelFee);
            require(!(session.student_paid_hostel_fees[msg.sender]));

            session.hostelFeesTotal += msg.value;
            session.student_paid_hostel_fees[msg.sender] = true;
            emit SchoolHostelFeesPaid(studentPaying.fullname, _sessionID, studentPaying.studentAddress);
            return (true);
        }else{
            return (false);
        }
    }

    // function payable () public { }
}
