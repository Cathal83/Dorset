<?php
  namespace Drupal\bookingform\Controller;
  
  use Drupal\Core\Controller\ControllerBase;

  use Symfony\Component\HttpFoundation\Request;
  use Symfony\Component\HttpFoundation\JsonResponse;
  /**
  *
   * Rest Resource for Application Form Payment
   *
  * @RestResource(
  *   id = "bookingformRest",
  *   label = @Translation("Bookingform Rest Resource"),
  *   uri_paths = {
  *     "canonical" = "/api/v2/payment",
  *     "https://www.drupal.org/link-relations/create" = "/api/v2/payment"
  *   }
  * )
  *
  */
  class bookingformRest extends ControllerBase {

    private $apiKey = "sk_test_zJpfrkdwd8oaD56vZr8eumPO";

    public function __construct() {

      \Stripe\Stripe::setApiKey($this->apiKey);

    }

    /**
     * Responds to entity POST request.
     * @return \Drupal\rest\ResourceResponse 
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException
     *
     */
    public function bookingformPost($formData) {

      $formData = json_decode($formData);

      /**
       * Creates a customer Element on Stripe
       */
      $customer = \Stripe\Customer::create(array(
       'email' => $formData->email,
       'source' => $formData->tk_id
      ));
      
     /**
      * Creates Charge to Stripe from JSON Data
      */
     try{
      $charge = \Stripe\Charge::create(array(
        'customer' => $customer->id,
        'description' => $formData->product,
        'receipt_email' => $formData->email,
        'amount' => $formData->amount,
        'currency' => 'EUR',
        'metadata' => array(
          'firstname' => $formData->firstName,
          'lastname' => $formData->lastName
        )
      ));
     } catch (\Stripe\Error\Base $e) {

      $error = $e->getMessage();

     } catch (Exception $e) {

      $error = $e->getMessage();

     }

     return new ResourceResponse($error->id);

    }
  }