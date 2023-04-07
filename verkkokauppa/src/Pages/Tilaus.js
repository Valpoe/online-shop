import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBInput, MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';
import Ostoskori from '../components/Ostoskori';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tilaus, setTilaus] = useState(false);

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
      errors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    }
    if (!formData.address) {
      errors.address = 'Address is required';
    }
    if (!formData.city) {
      errors.city = 'City is required';
    }
    if (!formData.zip) {
      errors.zip = 'Zip code is required';
    } else if (!/^\d{5}(?:[-\s]\d{4})?$/.test(formData.zip)) {
      errors.zip = 'Invalid zip code';
    }
    if (!formData.checked) {
        errors.checked = 'Please accept the terms and conditions';
      }
    setFormErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      // Perform form submission
      console.log(formData);
      setIsSubmitting(false);
      setTilaus(true);
      //alert('Form submitted successfully!');
    } else {
        alert('Form submission failed!\n' + JSON.stringify(errors));
        console.log(errors)
      setIsSubmitting(false);
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
                <MDBCardTitle className='mb-4'>Tilauslomake</MDBCardTitle>
                <form onSubmit={handleSubmit}>
                  <MDBRow>
                    <MDBCol md='12' className='mb-4'>
                      <MDBInput
                        label='Etunimi'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        error={formErrors.firstName}
                        outline
                      />
                    </MDBCol>
                    <MDBCol md='12' className='mb-4'>
                      <MDBInput
                        label='Sukunimi'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        error={formErrors.lastName}
                        outline
                      />
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
                        outline
                        />
                    </MDBCol>
                    <MDBCol md='12' className='mb-4'>
                        <MDBInput
                            label='Puhelinnumero'
                            name='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            error={formErrors.phone}
                            outline
                        />
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
                            outline
                        />
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
                            outline
                        />
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
                                outline
                            />
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



