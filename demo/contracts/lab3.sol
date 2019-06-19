pragma solidity ^0.5.4;
contract lab3{
    address owner;
    mapping(address=> uint ) bet; 
    enum State { OPEN, CLOSED }
    State public currentstate;
    constructor() public{
        owner = msg.sender;
    }
    modifier onlyowner()
    {
        require(msg.sender==owner,"only the owner can call it");
        _;
    }   
    modifier stateisopen()
    {
        require(currentstate==State.OPEN);
        _;
    }
    function setstateopen() public onlyowner{
        currentstate = State.OPEN;
    }
    function setstateclosed() public onlyowner {
        currentstate = State.CLOSED;
    }
    function playlottery(uint betvalue) public  stateisopen{
       bet[msg.sender] = betvalue;
    }
    function players() public view returns(uint) {
        return bet[msg.sender];
    }
}