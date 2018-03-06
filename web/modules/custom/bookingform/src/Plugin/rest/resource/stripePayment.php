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
    *   id = "stripe_rest_resource",
    *   label = @Translation("Stripe Rest Resource"),
    *   uri_paths = {
    *     "canonical" = "/api/payment",
    *     "https://www.drupal.org/link-relations/create" = "/api/payment"
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

        if (!$this->currentUser->hasPermission('access content')) {

            throw new AccessDeniedHttpException();
        }
        else {
          
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
                  'description' => $formData->course,
                  'receipt_email' => $formData->email,
                  'amount' => $formData->amount,
                  'currency' => 'eur',
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
          return new ResourceResponse($error, $charge);
        }
      }
    }