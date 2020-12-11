const models = require('./models');

const home = (req, res) =>{
    res.render('home', {
        locals: {
            title: 'Home Page',
            totalNumber: models.totalNumberOfOrders(),
            totalAmountSpent: models.totalAmountSpent()
        },

        partials: {
            head: '/partials/head',
            footer: '/partials/footer'
        }
    });
}

const ordersList = (req, res) => {
    // provide list of kinds of orders

    // then, for each kind, add the total amount spent
    // hmmmm....I need an object that looks like this:
    /* 
    {
        'espresso': 96.16,
        'black coffee': ...
    }
    I could write a model function for this, but...
    we know how to do this :)
    */
   const orderTypes = models.orderTypes();
   const pricePerType = {};
   for (let t of orderTypes){
       // t will be 'espresso' or 'black coffee' or ...
       // as the for loop works through the types
       pricePerType[t] = models.totalAmountForType(t);
       // we add t as a new property, and assign it
       // the result of getting the total for that type
   }
    res.render('orders', {
        locals: {
            title: 'Orders Page',
            orderTypes: orderTypes,
            pricePerType: pricePerType,
        },

        partials: {
            head: '/partials/head',
            footer: '/partials/footer'
        }
    })
};

const orderDetails = (req, res)=> {
    const orderType = req.params.orderType;
    res.render('orderdetails', {
        locals: {
            title: orderType,
            orderType,
            orders: models.ordersByType(orderType).map(o => o.cost)
        },

        partials: {
            head: '/partials/head',
            footer: '/partials/footer',
        }
    })
}

module.exports = {
    home,
    ordersList,
    orderDetails,
}