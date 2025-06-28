<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $priceId = $request->input('priceId');

        return $request->user()
            ->newSubscription('prod_Sa00Dt6C9CqQDm', $priceId)

            ->checkout([
                'success_url' => route('dashboard'),
                'cancel_url' => route('dashboard'),
            ]);
    }
}
