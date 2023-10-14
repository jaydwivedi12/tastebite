import React from 'react';

function PaymentReceipt() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); 
    const receiptDetails = {
        receiptID: '',
        amount: '$10.00',
        date: formattedDate, 
      
    };

    const printReceipt = () => {
        window.print();
    }

    const sendReceiptByEmail = () => {
       
    }


    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold">Tastebite Payment Receipt</h1>
            </div>
            <div className="receipt">
                <p className="text-sm">Receipt ID: {receiptDetails.receiptID}</p>
                <p className="text-sm">Amount: {receiptDetails.amount}</p>
                <p className="text-sm">Date: {receiptDetails.date}</p>
            </div>
            <div className="flex justify-center mt-6">
                <button onClick={printReceipt} className="hide-on-print bg-blue-500 text-white px-4 py-2 rounded-lg mr-4">Print Receipt</button>
                <button onClick={sendReceiptByEmail} className="hide-on-print bg-blue-500 text-white px-4 py-2 rounded-lg">Send by Email</button>
            </div>
        </div>
    );
}

export default PaymentReceipt;
