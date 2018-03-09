<?php
  namespace Drupal\bookingform\Controller;

  use Drupal\Core\Controller\ControllerBase;
  use Symfony\Component\HttpFoundation\Request;
  use Symfony\Component\HttpFoundation\JsonResponse;
  use \Symfony\Component\HttpKernel\Exception\HttpException;

  class bookingformRest extends ControllerBase {

    private $apiKey = "sk_test_zJpfrkdwd8oaD56vZr8eumPO";

    public function __construct() {

      \Stripe\Stripe::setApiKey($this->apiKey);

    }

    /**
     * 
     * Responds to entity POST request.
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException
     *
     */
    public function bookingformPost(Request $request) {

      $data = json_decode($request->getContent())->data;

      /**
       * Creates a customer Element on Stripe
       */
      $customer = \Stripe\Customer::create(array(
       'email' => $data->email,
       'source' => $data->tk_id
      ));
      
     /**
      * Creates Charge to Stripe from JSON Data
      */
     try{
      $charge = \Stripe\Charge::create(array(
        'customer' => $customer->id,
        'description' => $data->product,
        'receipt_email' => $data->email,
        'amount' => $data->amount,
        'currency' => 'EUR',
        'metadata' => array(
          'firstname' => $data->firstName,
          'lastname' => $data->lastName
        )
      ));
     } catch (\Stripe\Error\Base $e) {

      $error = $e->getMessage();

     } catch (Exception $e) {

      $error = $e->getMessage();

     }

     return new Jsonresponse($error);

    }
  }