// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
contract Todo  {
    
    uint public taskCount=0;
    address public owner;
    constructor(address _owner){
    owner=_owner;}
    modifier onlyOwner(){
        require(msg.sender == owner,"you are not the owner");
        _;
    }
    struct Task{
        uint index;
        string content;
        bool status;
    }

    mapping(uint => Task) public tasks;
    function addtask(string memory _content) public  onlyOwner {
        taskCount++;
        tasks[taskCount] = Task(taskCount,_content,false);

    }
    function updatetask(uint _index,string memory _content) public onlyOwner{
        tasks[_index] = Task(_index,_content,false);
    }
    function completed(uint _index) public onlyOwner returns(bool){
        // initialize the empty struct
        Task storage task = tasks[_index];
        if(task.status == true){
            return task.status = false;
        }
        
        return (task.status = true);
    }
    function deletetask(uint _index) public onlyOwner{
        delete tasks[_index];
    }

    function getowner() public view returns(address){
        return owner;
    }

}
