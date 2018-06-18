bookingformJS.service("postService", function ($filter, $location, $http) {
  // Elements to bankFormat Process
  var submitData = function(data) {
    console.log(data);
    // Bookingform Fields
    var postData = {

      webform_id: "application_form",
      application_date: data.date,
      courseid: data.productnid,
      course_name: data.productname,
      delivery_mode: data.deliverymode,
      email: data.email,
      nationality: data.nationality,
      country_of_residence: data.residence,
      firstname: data.firstname,
      lastname: data.lastname,
      date_of_birth: data.dob,
      address_line_1: data.contactaddress.address1,
      address_line_2: data.contactaddress.address2,
      county: data.contactaddress.county,
      country: data.contactaddress.country,
      city_town: data.contactaddress.city,
      postal_code: data.contactaddress.postalcode,
      payment: "", // Yes/No
      stripe_id: "",
      payment_type: "",
      payment_amount: data.payment.amount,
      contact_address_as_billing: data.billingaddress.billingcontact,
      billing_address_1: data.billingaddress.address1,
      billing_address_2: data.billingaddress.address2,
      billing_country: "",
      billing_postal_code: "",
      documents: "",
      documents_submitted: "",
      dropbox_folder_name: "",

    };

    var config = {
      headers : {
        'Content-Type' : 'application/json',
        'Authorization': 'Basic d2ViZm9ybV91c2VyOlhDV2lXYkY5RnlUcGNGZmdBb3p1QVp0TA==',
      }
    }
    console.log(data.date);

    $http.post('/webform_rest/submit', data, config)
    .then( function(data, status, headers, config){
      console.log(data);
      console.log(status);
    });
  }
  return {
    submitData: submitData,
  };
})