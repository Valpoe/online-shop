import React, { useState } from 'react';
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
    state: '',
    zip: '',
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    console.log('Form submitted');
    event.preventDefault();
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
    if (!formData.state) {
      errors.state = 'State is required';
    }
    if (!formData.zip) {
      errors.zip = 'Zip code is required';
    } else if (!/^\d{5}(?:[-\s]\d{4})?$/.test(formData.zip)) {
      errors.zip = 'Invalid zip code';
    }
    setFormErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      // Perform form submission
      console.log(formData);
      setIsSubmitting(false);
      alert('Form submitted successfully!');
    } else {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

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
                  <MDBCardFooter></MDBCardFooter> 
                  <MDBCardTitle className='blockquote text-center'>Ostoskori</MDBCardTitle>
                  <Yhteenveto items={props.items}/>
                  <div className='text-center'>
                    <p>Hyväksyn toimitusehdot</p>
                    <MDBCheckbox className='check' type='checkbox' id='checkbox1' />
                    <button type='submit' className='btn-block btn-primary rounded-pill mt-3'>Tilaa tuotteet</button>
                </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
);
};

export default Tilaus;



