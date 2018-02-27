<?php
    /**
     * @file
     * Contains Drupal\bookingform\Plugin\rest\resource\stripePayment
     */

    namespace Drupal\bookingform\Plugin\rest\resource;

    use Drupal\rest\Plugin\ResourceBase;
    use Drupal\rest\ResourceResponse;


    /**
     * Provides a resource to get view modes by entity and bundle
     *  @RestResource(
     *   id = "stripe_rest_resource",
     *   label = @Translation("Stripe Rest Resource"),
     *   uri_paths = {
     *      "canonical" = "/api/payment"
     *   }
     * )
     */
    class stripePayment extends ResourceBase {
        /**
         * Respons to entity POST request.
         * @return \Drupal\rest\ResourceResponse
         */
        public function post() {
            $response = ['message' => 'Hello, this is a Post'];
            return new ResoruceResponse($response);
        }
    }