// /*global contract, config, it, assert*/

const lab3 = require("Embark/contracts/lab3");

let accounts;

// For documentation please see https://embark.status.im/docs/contracts_testing.html
config(
  {
    //deployment: {
    //  accounts: [
    //    // you can configure custom accounts with a custom balance
    //    // see https://embark.status.im/docs/contracts_testing.html#Configuring-accounts
    //  ]
    //},
    contracts: {
      lab3: {
        //args: []
      }
    }
  },
  (_err, web3_accounts) => {
    accounts = web3_accounts;
  }
);

contract("lab3", function () {
  this.timeout(0);

  it("Contract was deployed", async function () {
    let address1 = lab3.options.address;

    assert.ok(address1);
  });
  it("Try to bet when Open", async function () {
    await lab3.methods.setstateopen().send({ from: accounts[0] });
    await lab3.methods.playlottery("10").send({ from: accounts[1] });
    let result = await lab3.methods.players().call({ from: accounts[1] });
    assert.equal(result, "10");
  });
  it("Try to bet when Closed", async function () {
    await lab3.methods.setstateclosed().send({ from: accounts[0] });
    try {
      await lab3.methods.playlottery("10").send({ from: accounts[1] });
      assert.ok(false);
    } catch {
      assert.ok(true);
    }
  });
  it("Try to change state from another address", async function () {
    try {
      await lab3.methods.setstateopen().send({ from: accounts[1] });

    } catch (error) {
      console.log('failure 1')
      let a = error.message
      assert.ok(a.includes("only the owner can call it"))
    }
    try {
      await lab3.methods.setstateclosed().send({ from: accounts[1] });

    } catch (error) {
      console.log('failure 2')
      let actuallerror = error.message;
      assert.ok(actuallerror.includes("only the owner can call it"))
    }
  });

});
