bookingformJS.service("formService", function($filter, $location, dataService) {

    var productDelivery = function(productnid, products) {

      var productDelivery = $filter('filter')(products, { nid: productnid }, true);
      return productDelivery;
      console.log(productDelivery);
    }

    var productDocuments = function(productData, productDelivery) {

      if(productDelivery) {
        var productDocs = $filter('filter')(productData, { price_group_id: productDelivery }, true);
      }
      else {
        var productDocs = productData;
      }

      return productDocs;

    }
    
    var productPrices = function(type_id, productPrices) {

      var price = $filter('filter')(productPrices, { payment_type_id: type_id }, true);
      return price;

    }

    var getSteps = function(productData) {
        /**
         * Steps for application
         */
        var steps = {
            1 : {
              number: 1,
              title: "Personal Details",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            2 : {
              number: 2,
              title: "Required Documents",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            3 : {
              number: 3,
              title: "Payment/ Deposit",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            4 : {
              number: 4,
              title: "Completion!",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            }
        }
        /**
         * 
         * Steps if deposit or application 
         * also steps if documents or not
         * 
         */
        // Requires documents or not
        if(productData[0].application_type == '60' || productData.document == "") {

            delete steps[2];
    
        } else {} 
        // Deposit or application and review
        if(productData[0].application_type == "61") {

            delete steps[3];
            
        } else {}

        return steps;
    }
    return {
        productDelivery : productDelivery,
        productPrices : productPrices,
        productDocuments : productDocuments,
        getSteps: getSteps
    };

})