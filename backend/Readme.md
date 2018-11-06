# SchoolChain
> Abstracting educational infrastructure into the blockchain.

The entire contract is divided into subcontracts controlling many different parts of the idea as a whole. These components include the following.

- Permissions - **SchoolChainAccessControl** all modifiers with relation to students, lecturers, vc and deans

- Base Functionalites and Structures - **SchoolChainBase** all structs and structures with relation to the Infrastructures and data types and how they are managed and controlled, e.g adding new infrastructure or new data links (mappings).

- Token functionalities and External Contract integrations. **SchoolBaseTokenBase** all functionalities with respect to token management on the platform

- Payments and Transactions - **SchoolChainTransact** all transaction functionalities between entities and bodies (school-fees payments, department dues payments)

- Proposals and Voting - **SchoolChainDemocracy** all functionalities with respect to creation of votes and voting on matter on the school system.

- SchoolChainCore - Bringing all the demons together. and deploy on the blockchain

## Mappings how they are done
In order to correctly map two entities one, a, being a part of the other, b.

e.g Students to his department.

we have to make the school keep the student Struct and the student's ID be stored in his department's struct, therefore it would be a map of the student ID to his department Struct. Stored on the SchoolChain base contract.


## Pre-based Conditions
The following are a set of conditions which can be agreed upon with respect to how the school contract would function.

- Every department has 5 levels, each level has a school fees payment attached to it, this can be changed by placing the index of the level in a function to change the school fees value.
