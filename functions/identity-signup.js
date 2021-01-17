const fetch = require('node-fetch');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.handler = async (event) => {
    const {user} = JSON.parse(event.body);
    console.log(JSON.stringify(user, null, 2));

    const netlifyID = user.id;
    const email = user.email;
    const roles = user.app_metadata.roles[0];
    const fullname = user.user_metadata.full_name;


    const customer = await stripe.customers.create({
        email : user.email
    })

    await stripe.subscriptions.create({
        customer : customer.id,
        items: [{plan : 'price_1I9CYrCB3hwVZUDLjV8bHZ78'}]
    })
    const stripeID = customer.id;


    const response = await fetch("https://graphql.fauna.com/graphql", {
        method : 'POST',
        headers: {
            Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
        },
        body : JSON.stringify({
            query: `
            mutation($netlifyID : ID! $stripeID: ID! $email : String $roles : String $fullname : String) {
                createUser(data: {netlifyID: $netlifyID, stripeID :$stripeID, email :$email, roles : $roles, fullname : $fullname}){
                  netlifyID
                  stripeID
                  email
                  fullname
                  roles
                }
              }
            `,
            variables : {
                netlifyID,
                stripeID,
                email,
                roles,
                fullname
            }
        })
    });
    console.log(response);


    return {
        // every serverless function has to return status code and body
        statusCode : 200,
        body : JSON.stringify({app_metadata : { roles: ['Free-Subscription']}}),
    
}
}