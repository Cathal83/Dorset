<?php
    /**
     * @file
     * Contains Drupal\bookingform\Plugin\rest\resource\stripePayment
     */
    namespace Drupal\bookingform\Plugin\rest\resource;

    use Drupal\rest\Plugin\ResourceBase;
    use Drupal\rest\ResourceResponse;
    use Psr\Log\LoggerInterface;
    use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
    use Drupal\bookingform\Controller\paymentController;
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
        private $data = [];

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
          /**
          if (!$this->currentUser->hasPermission('access content')) {

              throw new AccessDeniedHttpException();
          }
          */
          $formData = json_decode($formData);
          $this->data->email = $formData['email'];
          return new ResourceResponse($this->data);
      }
    }