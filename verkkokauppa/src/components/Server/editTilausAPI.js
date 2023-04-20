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