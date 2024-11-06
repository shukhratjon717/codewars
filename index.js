/**
Task-1 

After a hard quarter in the office you decide to get some rest on a vacation. 
So you will book a flight for you and your girlfriend and try to leave all the mess behind you.

You will need a rental car in order for you to get around in your vacation. 
The manager of the car rental makes you some good offers.

Every day you rent the car costs $40. If you rent the car for 7 or more days, 
you get $50 off your total. Alternatively, if you rent the car for 3 or more days, you get $20 off your total.

Write a code that gives out the total amount for different days(d).
 */

function rentalCarCost(d) {
  let total = d * 40;

  if (d >= 7) {
    total -= 50;
  } else if (d >= 3) {
    total -= 20;
  }

  return total;
}

console.log(rentalCarCost(7));

// ============================================
/** 
 Complete function saleHotdogs/SaleHotDogs/sale_hotdogs,
  function accepts 1 parameter:n, n is the number of hotdogs a customer will buy, 
  different numbers have different prices (refer to the following table), 
  return how much money will the customer spend to buy that number of hotdogs.

number of hotdogs	price per unit (cents)
n < 5	100
n >= 5 and n < 10	95
n >= 10	90
You can use if..else or ternary operator to complete it.
 */

function saleHotdogs(n) {
  let price = 0;
  if (n < 5) {
    price = 100;
    console.log(`Price is ${n * price}$`);
  } else if (n >= 5 || n <= 9) {
    price = 95;
    console.log(`Price is ${n * price}$`);
  } else if (n >= 10) {
    price = 90;
    console.log(`Price is ${n * price}$`);
  }
}

saleHotdogs(12);
