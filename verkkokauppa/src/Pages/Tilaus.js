import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBInput, MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';
import Yhteenveto from '../components/Yhteenveto';

const Tilaus = (props) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    checked: false, // add checked property for checkbox
  });

  const [ostoskori, setOstoskori] = useState(props.items);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [failedSubmit, setFailedSubmit] = useState(false);

  const [tilaus, setTilaus] = useState(false);

  //search item ammount from ostoskori with item id and return ammount
  const countItem = (itemID) => {
    let count = 0;
    ostoskori.forEach((item) => {
      if (item.tuoteid === itemID) {
        count++;
      }
    });
    return count;
  };

  const uniqueItems = ostoskori.filter((item, index, array) => {
    return array.findIndex((uItem) => uItem.tuoteid === item.tuoteid) === index;
  });
  
  const uniqueItemsWithQuantity = uniqueItems.map((tuote, index) => {
    return {
      tuoteid: tuote.tuoteid,
      hinta: tuote.hinta,
      kuva: tuote.kuva,
      tuotenimi: tuote.tuotenimi,
      kuvaus: tuote.kuvaus,
      määrä: countItem(tuote.tuoteid),
    };
  });

  //useeffect to clear ostoskori after tilaus set true
     useEffect(() => {
       if (tilaus) {
            props.setItems([]);
         }
        }, [tilaus]);

  const handleSubmit = (event) => {
    console.log('Form submitted' + JSON.stringify(formData));
    //clear ostoskori after submit and set tilaus to true
    //prevent page reload
    event.preventDefault();

    //scroll up
    window.scrollTo(0, 0);
    setIsSubmitting(true);

    // Perform form validation
    let errors = {};
    if (!formData.firstName) {
      errors.firstName = 'Etunimi on pakollinen';
    }
    if (!formData.lastName) {
      errors.lastName = 'Sukunimi on pakollinen';
    }
    if (!formData.email) {
      errors.email = 'Sähköposti on pakollinen';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'sähköposti on virheellinen';
    }
    if (!formData.phone) {
      errors.phone = 'Puhelinnumero on pakollinen';
    }
    if (!formData.address) {
      errors.address = 'Osoite on pakollinen';
    }
    if (!formData.city) {
      errors.city = 'Kaupunki on pakollinen';
    }
    if (!formData.zip) {
      errors.zip = 'Postinumero on pakollinen';
    } else if (!/^\d{5}(?:[-\s]\d{4})?$/.test(formData.zip)) {
      errors.zip = 'Postinumero on virheellinen';
    }
    if (!formData.checked) {
        errors.checked = 'Sinun täytyy hyväksyä ehdot';
      }
    setFormErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      // Perform form submission
      setIsSubmitting(false);
      setFailedSubmit(false);
      setTilaus(true);
      
      //print ostoskori json
      //Form output and filtered ostoskori output with quantyties
      console.log(formData);
      console.log(JSON.stringify(uniqueItemsWithQuantity));
      //alert('Form submitted successfully!');
    } else {
        //alert('Form submission failed!\n' + JSON.stringify(errors));
        console.log(errors)
      setIsSubmitting(false);
      setFailedSubmit(true);
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: value });
  };

  //if isSubmitting is true, disable the submit button
  if (tilaus) {
    return (
        <MDBRow className='p-5'>
            <MDBCol md='8' className='mx-auto mt-4'>
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle className='mb-4'>Kiitos tilauksesta, {formData.firstName}!</MDBCardTitle>
                        <MDBCardText>
                            Tilausvahvistus lähetetään sähköpostiosoitteesi <b className='font-weight-bold'>{formData.email}</b>.
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    );
}

    return (
        <MDBRow>
          <MDBCol md='8' className='mx-auto mt-4'>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle className='mb-2'>Tilauslomake</MDBCardTitle>
              { failedSubmit && (
                        <div className='text-danger p-2 mb-2'>Lomakkeen täytössä ilmeni virheitä, ole hyvä ja tarkista lomake uudelleen!</div>
                    )}
                <form onSubmit={handleSubmit}>

                  <MDBRow>
                    <MDBCol md='12' className='mb-4'>
                      <MDBInput
                        label='Etunimi'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        error={formErrors.firstName}
                        outline="true"
                      />
                        {formErrors.firstName && (
                            <div className='text-danger p-2'>*{formErrors.firstName}</div>
                        )}
                    </MDBCol>
                    <MDBCol md='12' className='mb-4'>
                      <MDBInput
                        label='Sukunimi'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        error={formErrors.lastName}
                        outline="true"
                      />
                        {formErrors.lastName && (
                            <div className='text-danger p-2'>*{formErrors.lastName}</div>
                        )}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='12' className='mb-4'>
                      <MDBInput
                        label='Sähköposti'
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleChange}
                        error={formErrors.email}
                        outline="true"
                        />
                        {formErrors.email && (
                            <div className='text-danger p-2'>*{formErrors.email}</div>
                        )}
                    </MDBCol>
                    <MDBCol md='12' className='mb-4'>
                        <MDBInput
                            label='Puhelinnumero'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            error={formErrors.phone}
                            outline="true"
                        />
                        {formErrors.phone && (
                            <div className='text-danger p-2'>*{formErrors.phone}</div>
                        )}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='12' className='mb-4'>
                        <MDBInput
                            label='Osoite'
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                            error={formErrors.address}
                            outline="true"
                        />
                        {formErrors.address && (
                            <div className='text-danger p-2'>*{formErrors.address}</div>
                        )}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md='12' className='mb-4'>
                        <MDBInput
                            label='Kaupunki'
                            name='city'
                            value={formData.city}
                            onChange={handleChange}
                            error={formErrors.city}
                            outline="true"
                        />
                        {formErrors.city && (
                            <div className='text-danger p-2'>*{formErrors.city}</div>
                        )}
                    </MDBCol>
                  </MDBRow>
                    <MDBRow>
                        <MDBCol md='12' className='mb-4'>
                            <MDBInput
                                label='Postinumero'
                                name='zip'
                                value={formData.zip}
                                onChange={handleChange}
                                error={formErrors.zip}
                                outline="true"
                            />
                            {formErrors.zip && (
                                <div className='text-danger p-2'>*{formErrors.zip}</div>
                            )}
                        </MDBCol>
                    </MDBRow>
                  <MDBCardFooter></MDBCardFooter> 
                  <MDBCardTitle className='blockquote text-center'>Ostoskori</MDBCardTitle>
                  <Yhteenveto items={props.items}/>
                  <div className='text-center'>
                  <label className='checkbox-label'>
                    <span>Hyväksyn toimitusehdot</span>
                    <MDBCheckbox
                        name='checked'
                        id='checkbox1'
                        checked={formData.checked}
                        onChange={handleChange}
                        error={formErrors.checked}
                        />
                    {formErrors.checked && (
                        <div className='text-danger p-2'>{formErrors.checked}</div>
                    )}
                    </label>
                </div>
                    <MDBBtn className='btn btn-primary btn-lg btn-block mt-4' color='primary' type='submit' disabled={isSubmitting}>Vahvista tilaus</MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
);
};

export default Tilaus;



