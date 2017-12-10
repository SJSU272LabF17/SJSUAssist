router.get('/shopping-cart', function (req, res, next) {

    var cart = db.collection('carts');
        cart.find({cart_id: "akhil@gmail.com"}).toArray(function (err, result) {
            if(result.length > 0){
                console.log("inside loop...1")
                console.log(result[0].products)
                console.log(typeof result[0].products)
                var x = result[0].products;
                var productlist = x.map(function(product) {
                    return product['product_id'];
                });
                console.log(productlist);
                console.log(typeof productlist);
                var quantity = x.map(function(product) {
                    return product['qty'];
                });
                console.log(quantity);
                var qaunt_arr = Array.prototype.slice.call(quantity);
                console.log(qaunt_arr[0]);
                console.log(qaunt_arr[1]);
                console.log(qaunt_arr[2]);
                console.log(qaunt_arr[3]);

                var final_prod_array = [];
                    const bb = Array.prototype.slice.call(productlist);
                    console.log(
                        Array.isArray(bb) // true
                    );
                    console.log(bb); // array of product id's
                    for(var xyz = 0; xyz < bb.length;xyz++){
                        console.log("Starting point XYZ is "+xyz);                        
                        console.log("bb["+xyz+"]"+bb[xyz]);
                        get_products(product_url+"api/game/product/"+bb[xyz])
                        .then(
                          json_string => {console.log("After Fetching Json String"+json_string);
                          var product_array = JSON.parse(JSON.stringify(json_string));
                          console.log("Product Array is");
                          console.log(product_array);
                          const prod_arr = Array.prototype.slice.call(product_array);
                          console.log(
                              Array.isArray(prod_arr) // true
                          );
/*                           console.log(prod_arr); // array of product id's
                          console.log("The length of product array is "+ productlist.length);
                          console.log("the quantity is"+qaunt_arr[0]);
                          console.log("XYZ is "+xyz);
                          console.log("Product array is"+qaunt_arr[xyz]);                          
                          prod_arr[0].qty = qaunt_arr[xyz];
                        console.log(prod_arr); */
                        //console.log(final_prod_array);
                        }
                        )
                        .catch(reason => console.log(reason.message));
                    }

            }else{
                res.send('Cart is Empty')

            }
    })