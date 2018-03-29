var events = require("events");


//Class Definition begins
function Account(initBal, goal){
	this.balance = initBal;
	this.goal = goal;
	events.EventEmitter.call(this);  // constructor

	console.log("Your account has initial deposit of " + this.balance + " and your financial goal is " + this.goal);

	this.deposit = function(amount){
		this.balance += amount;
		console.log("Balance increased by " + amount);
		this.emit("balChanged");

	};

	this.withdraw = function(amount){
		this.balance -= amount;
		console.log("Balance decreased by " + amount);
		this.emit("balChanged");
	};

	this.availableBalance = function(){
		console.log("Available balance is " + this.balance);
	};

	this.checkGoal = function(){
		if (this.balance >= this.goal){
			console.log("Congratulations! You have reached your financial goal");
		};
	};
	
}; //Class Definition ends
Account.prototype.__proto__ = events.EventEmitter.prototype; // extends class


var acct = new Account(10, 500);
acct.on("balChanged", acct.availableBalance);
acct.on("balChanged", acct.checkGoal);


acct.deposit(50);

acct.withdraw(10);
acct.deposit(77);
acct.withdraw(46);
acct.deposit(300);
acct.withdraw(100);
acct.deposit(400);


console.log("Program ends");