<?php
    /**
     * @file
     * Contains Drupal\bookingform\Plugin\rest\resource\stripePayment
     */
    namespace Drupal\bookingform\Plugin\rest\resource;

    use Drupal\rest\Plugin\ResourceBase;
    use Drupal\rest\ResourceResponse;
    use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

    /**
    * Provides a resource to get view modes by entity and bundle
    * @RestResource(
    *   id = "bookingform_rest_resource",
    *   label = @Translation("Bookingform Rest Resource"),
    *   uri_paths = {
    *     "canonical" = "payment",
    *     "https://www.drupal.org/link-relations/create" = "payment"
    *   },
    *   
    * )
    */
    class stripePayment extends ResourceBase {

      private $apiKey = "sk_test_zJpfrkdwd8oaD56vZr8eumPO";

      public function __construct(){
        \Stripe\Stripe::setApiKey($this->apiKey);
      }

      /**
       * Responds to entity POST request.
       * @return \Drupal\rest\ResourceResponse 
       * @throws \Symfony\Component\HttpKernel\Exception\HttpException
       *
       */
      public function post($formData) {

        $formData = json_decode($formData);

        /**
         * Creates Customer Element on Stripe
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
        return new ResourceResponse($error);

      }
    }