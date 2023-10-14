import React from 'react';
import { useLocation } from 'react-router-dom';

function PaymentReceipt() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const receiptDetails = {
        receiptID: queryParams.get('session_id'),
        date: formattedDate,
        order: JSON.parse(decodeURIComponent(queryParams.get('order'))),
    };

    const totalAmount = receiptDetails.order.reduce((total, item) => total + item.price, 0);

    const printReceipt = () => {
        window.print();
    }

    const sendReceiptByEmail = () => {
      
    }

    return (
        <div className="max-w-[50%] mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold">Tastebite Payment Receipt</h1>
            </div>
            <div className="receipt">
                <p className="text-sm break-all text-blue-900 font-semibold mb-8">Receipt ID: {receiptDetails.receiptID}</p>
                <p className="text-sm">Total Amount: {totalAmount}</p>
                <p className="text-sm">Date: {receiptDetails.date}</p>
                <div className="text-sm">
                    <h1 className='text-lg font-bold'>Order Details:</h1>
                    <table className="table-auto border-collapse w-full">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Recipe Name</th>
                                <th className="border px-4 py-2">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receiptDetails.order.map((element) => (
                                <tr key={element._id}>
                                    <td className="border px-4 py-2">{element.recipe_name}</td>
                                    <td className="border px-4 py-2">{element.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <button onClick={printReceipt} className="hide-on-print bg-blue-500 text-white px-4 py-2 rounded-lg mr-4">Print Receipt</button>
                <button onClick={sendReceiptByEmail} className="hide-on-print bg-blue-500 text-white px-4 py-2 rounded-lg">Send by Email</button>
            </div>
        </div>
    );
}

export default PaymentReceipt;
