pragma solidity ^0.4.24;

/**

This is the contract for the schoolchain dapp application,
this contract aims to provide the following functionality
according to simulation based on actual educational
infrastructure.

These infrastructural entities include the following
- Departments
- Levels
- Schools
- Proposals
- Votes
- School Organizations
- Session Periods
- Fees and Payments

some off these entites which would be found re-occuring again
and again would be represented as structs. This aims to make
sure they are widely reusable


Functions that we would come arrow all through the dapp
includes the followings.
- Admission of students
- Payment of school fees (this is based on session periods)
- Elect Department Lead (proposal)
- Addition / Removal of student address to Department list (restricted)


*/

// import from open zeppline
// import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./SchoolChainTransact.sol";
/* import "./SchoolChainDemocracy.sol"; */

contract SchoolChainCore is SchoolChainTransact {

    constructor (
      /* uint minimumQuorumForProposals,
      uint minutesForDebate,
      int marginOfVotesForMajority, */
      address _proposedVCAddress
    ) public {
        // Assigning the vc of the school
        vc = msg.sender;

        /* changeVotingRules(minimumQuorumForProposals, minutesForDebate, marginOfVotesForMajority); */
        // creating the levels of the school
        // for (uint i=0; i < 5 ; i++) {
        // // do something
        //     _createLevel(SchoolChainCore.add(i));
        // }

    }
}
