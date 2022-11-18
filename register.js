function checkCashRegister(price, cash, cid) {
    const denomination = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1,];
  
    function transaction(price, cash, cid) {
      let changeNeeded = (cash - price) * 100;
      let moneyProvided = [
      ["ONE HUNDRED", 0], 
      ["TWENTY", 0], 
      ["TEN", 0], 
      ["FIVE", 0], 
      ["ONE", 0], 
      ["QUARTER", 0], 
      ["DIME", 0], 
      ["NICKEL", 0], 
      ["PENNY", 0],
    ];
    let availCash = [...cid].reverse().map(el => [el[0], el[1] * 100]);
    let sumOfCash = availCash.reduce((a, b) => (a + b[1]),0) / 100;
    if (sumOfCash === changeNeeded / 100) {
      return {status: "CLOSED", change: [...cid]};
    }
    else for (let i = 0; i < availCash.length; i++) {
        while (denomination[i] <= changeNeeded && availCash[i][1] > 0) {
          moneyProvided[i][1] += denomination[i];
          changeNeeded -= denomination[i];
          availCash[i][1] -= denomination[i];
        }
      };
      
  
      let change = moneyProvided
      .map(el => [el[0], el[1] / 100])
      .filter(el => el[1] !== 0);
      let changeTotal = change.reduce((a, b) => (a + b[1]),0);
      if (changeTotal < changeNeeded) {
          return {status: "INSUFFICIENT_FUNDS", change: []};
      }
      return {status: "OPEN", change};
    }
  
    let answer = transaction(price, cash, cid);
    return answer;
  };
  
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);