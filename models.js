const transactions = require('coffee.json')
// / - shows the total number of orders and the total amount spent 
// /orders - lists the kinds of coffee orders and the totals for each /orders/:kind 
//- shows all the coffee orders matching that kind (e.g., "espresso")

const totalNumberOfOrders = () => {
    return transactions.length;
};

const totalAmountSpent = () => {
  let total = 0;
  for(let item of transactions){
      total += item.cost;
  }
  return parseFloat(total.toFixed(2));
}

const orderTypes = () => {
    const arrayOfTypes = transactions.map((coffee)=> coffee.order);
    const uniqueTypes = [];
    for (let t of arrayOfTypes){
        // if it is in uniqueTypes, skip it
        if(!uniqueTypes.includes(t)){
            // if it not in uniqueTypes, add it
            uniqueTypes.push(t);
        }
    }
    return uniqueTypes;
}


const totalAmountForType = (orderType) =>{
    const total = ordersByType(orderType).map(order => order.cost).reduce((a, b) => a + b);
    return parseFloat(total.toFixed(2));

}

const ordersByType = (orderType) => {
    return transactions.filter(coffee => coffee.order === orderType);
};



module.exports = {
    totalNumberOfOrders,
    totalAmountSpent,
    orderTypes,
    ordersByType,
    totalAmountForType,
}