bookingformJS.service("postService", function($http) {
  this.postRequest = function(type, user) {
    // Elements to bankFormat Process
    function bankFormat(){
      var data = {
        webform_id: "booking_form",

        course: user.course,
        course_start_date: user.courseDate,
        course_duration: user.courseWeeks,
        course_requirements: user.courseRequirements,
        require_accommodation: user.accommNeeded,
        airport_transfer: user.airportPick,
        flight_details: user.flightDetail,
        flight_number: user.flightNumber,
        flight_arrival_date: user.airportDate,
        medical_insurance: user.medicalInsu,
        first_name: user.firstName,
        last_name: user.lastName,
        gender: user.gender,
        dob: user.DOB,
        nationality: user.nationality,
        email: user.email,
        phone_number: user.phonenumber,
        course_price: user.coursePrice,
        //application_price: user.items.fees[0].price__number,
        //materials_price: user.items.fees[1].price__number,
        accommodation_price: user.accommPrice,
        airport_transfer_price: user.airportPrice,
        medical_insurance_price: user.medPrice,
        invoice_total: user.bookingTotal,
        payment_type: "Bank Transfer"

      }

      return data;
    }

    var data = postService.bankFormat(user);

    var config = {
      headers : {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ZGNpbXBvcnRyZXN0OihBJE12azVafWM1OXRN'
      }
    }

    // Send post to webform_rest
    $http.post('/webform_rest/submit', data, config)
    .then(function (data, status, headers, config) { });

    console.log(type);
    console.log(data);
  }
})
