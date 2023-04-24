/*
async function editOrder(editOrderData) {

    const response = await fetch('http://localhost:5000/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editOrderData)
    });
    const data = await response.json();
    return data;
  }
  
  export { editOrder };
  */

  export const editOrder = async (editOrderData) => {
    let loppuSumma = 0;
    for (let i = 0; i < editOrderData.orderitem.length; i++) {
    const orderitem = editOrderData.orderitem[i];
    const grandTotal = loppusumma(orderitem);
    loppuSumma += grandTotal;
    orderitem.summa = grandTotal;
  }
  editOrderData.orders.summa = loppuSumma;

  const grandTotalAll = editOrderData.orderitem.reduce((total, orderitem) => {
    return total + loppusumma(orderitem);
  }, 0);

  editOrderData.orders.summa = grandTotalAll;
  
  console.log("Loppsumma: " + JSON.stringify(grandTotalAll))
    try {
      const response = await fetch('http://localhost:5000/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editOrderData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
 

  const loppusumma = (orderitem) => {
    return orderitem.kpl * orderitem.summa;
  };