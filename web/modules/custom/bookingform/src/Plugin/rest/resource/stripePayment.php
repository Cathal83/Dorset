<?php
    /**
     * @file
     * Contains Drupal\bookingform\Plugin\rest\resource\stripePayment
     */
    namespace Drupal\bookingform\Plugin\rest\resource;

    use Drupal\rest\Plugin\ResourceBase;
    use Drupal\rest\ResourceResponse;
    use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
    use Drupal\stripe_api\StripeApiService;
    use Stripe\Subscription;

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
    * @stripe_api.stripe_api
    */
    class stripePayment extends ResourceBase {
        public function __construct(StripeApiService $stripe_api) {
            $this->stripeApi = $stripe_api;
        }
        public function loadSubscriptionsMultiple($args = []) {
            $subscriptions = Subscription::all($args);
            if (!count($subscriptions->data)) {
              return FALSE;
            }
        
            return $subscriptions;
        }
        /**
         * Respons to entity POST request.
         * @return \Drupal\rest\ResourceResponse 
         * @throws \Symfony\Component\HttpKernel\Exception\HttpException
         * 
         */
        public function post() {
            /**
            if (!$this->currentUser->hasPermission('access content')) {

                throw new AccessDeniedHttpException();
            }
            */
            $response = ['message' => 'Hello, this is a Post'];
            return new ResourceResponse($this->stripeApi);

        }
    }