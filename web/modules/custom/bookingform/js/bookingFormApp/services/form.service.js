bookingformJS.service("formService", function($filter, $location, dataService) {

    var productDelivery = function(productnid, products) {

        var productDelivery = $filter('filter')(products, { nid: productnid }, true);
        return productDelivery;

    }

    var productDocuments = function(productData, productDelivery) {

        var productDocs = $filter('filter')(productData, { delivery_mode: productDelivery }, true);
        return productDocs;

    }
    
    var getSteps = function(productData) {
        /**
         * Steps for application
         */
        var steps = {
            1 : {
                title: "Personal Details",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            2 : {
                title: "Required Documents",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            3 : {
                title: "Payment/ Deposit",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            4 : {
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
        console.log(productData);
        if(productData[0].document == "") {

            delete steps[2];
    
        } else {} 
        // Deposit or application and review
        if(productData[0].application_type == "38") {
            delete steps[3];
            
        } else {}

        return steps;
    }
    return {
        productDelivery : productDelivery,
        productDocuments : productDocuments,
        getSteps: getSteps
    };

})