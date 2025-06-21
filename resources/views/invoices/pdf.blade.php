<!DOCTYPE html>
<html>

<head>
    <title>Invoice #{{ $invoice->invoice_number }}</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 40px;
        }

        h1,
        h2 {
            margin: 0;
        }

        .header,
        .bill-to {
            margin-bottom: 20px;
        }

        .from,
        .to {
            width: 48%;
            display: inline-block;
            vertical-align: top;
        }

        .from {
            font-weight: bold;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
        }

        th {
            background-color: #f4f4f4;
        }

        .text-right {
            text-align: right;
        }

        .text-left {
            text-align: left;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>Invoice #{{ $invoice->invoice_number }}</h1>
        <p><strong>Date:</strong> {{ $invoice->invoice_date }}</p>
        <p><strong>Due Date:</strong> {{ $invoice->due_date }}</p>
    </div>

    <div class="bill-to">
        <div class="from">
            <h2>To</h2>
            <p>Navjot Singh</p>
            <p>ABN: 9999999999</p>
            <p>49/50 Perkin St,<br>Calamvale, QLD 4116</p>
            <p>Phone: 07 3003 730</p>
        </div>

        <div class="to">
            <h2>From</h2>
            <p>{{ $invoice->name }}</p>
            <p>{{ $invoice->email }}</p>
            <p>{{ $invoice->address }}</p>
            <p>{{ $invoice->phone }}</p>
        </div>
    </div>

    <div>
        <h2>Payment details</h2>
        <p>{{ $invoice->paymenth_method }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($invoice->items as $index => $item)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td class="text-left">{{ $item->description }}</td>
                    <td class="text-right">{{ $item->quantity }}</td>
                    <td class="text-right">${{ number_format($item->rate, 2) }}</td>
                    <td class="text-right">${{ number_format($item->total, 2) }}</td>
                </tr>
            @endforeach
            <tr>
                <td colspan="4" class="text-right"><strong>Total</strong></td>
                <td class="text-right"><strong>${{ number_format($invoice->amount, 2) }}</strong></td>
            </tr>
        </tbody>
    </table>
</body>

</html>