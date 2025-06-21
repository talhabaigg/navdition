<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = Invoice::all();

        return Inertia::render('invoices/index', [
            'invoices' => $invoices,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('invoices/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'invoice_number' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'invoice_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:invoice_date',
            'amount' => 'required|numeric|min:0',
            'notes' => 'nullable|string|max:1000',
            'invoice_items' => 'required|array',
            'invoice_items.*.description' => 'required|string|max:255',
            'invoice_items.*.quantity' => 'required|numeric|min:0',
            'invoice_items.*.rate' => 'required|numeric|min:0',
            'invoice_items.*.total' => 'required|numeric|min:0',
        ]);

        $data['user_id'] = auth()->id(); // Assuming you want to associate the invoice with the authenticated user

        $invoice = Invoice::create($data);

        foreach ($data['invoice_items'] as $item) {
            $invoice->items()->create([
                'description' => $item['description'],
                'quantity' => $item['quantity'],
                'rate' => $item['rate'],
                'total' => $item['total'],
            ]);
        }

        return redirect()->route('invoices.index')->with('success', 'Invoice created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        $invoice->load('items'); // Load related items for editing
        return Inertia::render('invoices/edit', [
            'invoice' => $invoice,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice $invoice)
    {
        $data = $request->validate([
            'invoice_number' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'invoice_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:invoice_date',
            'amount' => 'required|numeric|min:0',
            'notes' => 'nullable|string|max:1000',
            'invoice_items' => 'required|array',
            'invoice_items.*.id' => 'nullable|exists:invoice_items,id', // Allow existing item IDs for updates  
            'invoice_items.*.description' => 'required|string|max:255',
            'invoice_items.*.quantity' => 'required|numeric|min:0',
            'invoice_items.*.rate' => 'required|numeric|min:0',
            'invoice_items.*.total' => 'required|numeric|min:0',
        ]);

        $invoice->update($data);

        // Update or create invoice items
        // Collect IDs of items from the request data
        $itemIds = collect($data['invoice_items'])
            ->pluck('id')
            ->filter()
            ->toArray();

        // Delete items that are not present in the new data
        $invoice->items()
            ->whereNotIn('id', $itemIds)
            ->delete();

        // Update or create invoice items
        foreach ($data['invoice_items'] as $item) {
            $invoice->items()->updateOrCreate(
                ['id' => $item['id'] ?? null], // Use existing item ID if available
                [
                    'description' => $item['description'],
                    'quantity' => $item['quantity'],
                    'rate' => $item['rate'],
                    'total' => $item['total'],
                ]
            );
        }

        return redirect()->route('invoices.index')->with('success', 'Invoice updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        //
    }

    public function print(Invoice $invoice)
    {
        // Load the invoice with its items

        $invoice->load('items');
        $pdf = Pdf::loadView('invoices.pdf', compact('invoice'));
        // Return a view for printing the invoice
        return $pdf->download("invoice-{$invoice->invoice_number}.pdf");
    }
}
