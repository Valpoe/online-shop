import { useState, useEffect } from "react";
import { logIn } from '../components/Server/LogInAPI';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBCheckbox,
  MDBInput,
  MDBBtn,
  MDBCardText,
  MDBIcon,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";

function LoginRegister(props) {
  const [RegisterForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [RegisterErrorForm, setRegisterErrorForm] = useState({
    name: "",
    email: "",
    password: "",
    checked: false,
  });

  const [LoginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [LoginErrorForm, setLoginErrorForm] = useState({
    email: "",
    password: "",
  });

  const [LoginActive, setLoginActive] = useState(false);
  const [RegisterActive, setRegisterActive] = useState(false);
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
    console.log(value);
  };
/*
  const SubmitLogin = (event) => {
    event.preventDefault();

    let errors = {};
    //check if all fields are filled and checkbox is checked
    if (!LoginForm.email) {
      errors.email = "Syötä sähköpostiosoite";
    }
    if (!LoginForm.email.includes("@")) {
      errors.email = "Sähköposti on virheellinen";
    }
    if (!LoginForm.password) {
      errors.password = "Syötä salasana";
    }

    setLoginErrorForm(errors);

    //if no errors submit the form
    if (Object.keys(errors).length === 0) {
      console.log(LoginForm);

      props.setUser(LoginForm.email);
      setLoginActive(true);
      props.setUserID(1);
    } else {
      console.log(errors);
      setLoginActive(false);
    }
    return;
  };
*/
/// nonii eli tätä sitten käytätte tilauksen muokkaamiseen :)
const editTilaus = async () => {
  try {
    const response = await fetch('http://localhost:5000/edit-order', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editorder)
    });
    const data = await response.json();
    // Update the UI with the edited data
  } catch (error) {
    console.log(error);
  }
};

const SubmitLogin = async (event) => {
  event.preventDefault();

  let errors = {};
  //check if all fields are filled and checkbox is checked
  if (!LoginForm.email) {
    errors.email = "Syötä sähköpostiosoite";
  }
  if (!LoginForm.email.includes("@")) {
    errors.email = "Sähköposti on virheellinen";
  }
  if (!LoginForm.password) {
    errors.password = "Syötä salasana";
  }

  setLoginErrorForm(errors);

  //if no errors submit the form
  if (Object.keys(errors).length === 0) {
    console.log(LoginForm);

    try {
      console.log(JSON.stringify(LoginForm))
      const userData = await logIn(LoginForm);
      console.log("Asiakkaan tiedot ja tilauksen tiedot:")
      console.log(JSON.stringify(userData))
      props.setUser(userData.name);
      props.setUserID(userData.id);
      setLoginActive(true);
    } catch (error) {
      console.log(error);
      setLoginActive(false);
    }
  } else {
    console.log(errors);
    setLoginActive(false);
  }
  return;
};

  const SubmitRegister = (event) => {
    event.preventDefault();

    let errors = {};
    //check if all fields are filled and checkbox is checked
    if (!RegisterForm.name) {
      errors.name = "Nimi on pakollinen";
    }
    if (!RegisterForm.email) {
      errors.email = "Sähköposti on pakollinen";
    }
    if (!RegisterForm.password) {
      errors.password = "Salasana on pakollinen";
    }
    if (!RegisterForm.checked) {
      errors.checked = "Sinun täytyy hyväksyä käyttöehdot";
    }
    setRegisterErrorForm(errors);

    //if no errors submit the form
    if (Object.keys(errors).length === 0) {
      console.log(RegisterForm);

      
      setRegisterForm({
        name: "",
        email: "",
        password: "",
        checked: false,
      });
      setJustifyActive("tab1");
      setRegisterActive(true);
    } else {
      console.log(errors);
      setRegisterActive(false);
    }
    return;
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setRegisterForm({ ...RegisterForm, [name]: value });
  };

  const handleChangeLogin = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setLoginForm({ ...LoginForm, [name]: value });
  };

  useEffect(() => {
    console.log(LoginActive);
  }, [LoginActive]);

  // Näyttää alertin 3 sekunnin ajan, kun käyttäjä painaa "Unohditko salasanasi" -linkkiä
  const [showAlert, setShowAlert] = useState(false);
  const [showLink, setShowLink] = useState(true);

  useEffect(() => {
    let timeoutId;
    if (showAlert) {
      timeoutId = setTimeout(() => {
        setShowAlert(false);
        setShowLink(true);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [showAlert]);

  const handleClick = (event) => {
    event.preventDefault();
    setShowAlert(true);
    setShowLink(false);
  };

  return (
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        {RegisterActive && justifyActive === "tab1" && (
          <div className="text-success mb-2">Rekisteröityminen onnistui! Voit nyt kirjautua sisään!</div>
        )}
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBCardText><MDBIcon fas icon="pencil-ruler" className="text-dark m-2" />Kirjaudu tunnuksilla tai luo uusi asiakastili  </MDBCardText>
            <NavLink className="btn btn-primary m-3" to={"/tilaus"} onClick={props.toggleShowLogin}>luo asiakastili</NavLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            {LoginActive && justifyActive === "tab1" && (
              <div className="text-success mb-2">*Kirjautuminen onnistui</div>
            )}

            <form onSubmit={SubmitLogin}>
              {LoginErrorForm.email && (
                <div className="text-danger mb-2">*{LoginErrorForm.email}</div>
              )}
              <MDBInput
                wrapperClass="mb-4"
                label="Sähköposti"
                id="form1"
                type="text"
                name="email"
                value={LoginForm.email}
                error={LoginErrorForm.email}
                onChange={handleChangeLogin}
              />

              {LoginErrorForm.password && (
                <div className="text-danger mb-2">
                  *{LoginErrorForm.password}
                </div>
              )}

              <MDBInput
                wrapperClass="mb-4"
                label="Salasana"
                id="form2"
                type="password"
                name="password"
                value={LoginForm.password}
                error={LoginErrorForm.password}
                onChange={handleChangeLogin}
              />

              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox label="Muista minut" />
                {showLink && (
                  <a href="javascript:void(0);" onClick={handleClick}>
                    Unohtuiko salasana?
                  </a>
                )}
                {showAlert && (
                  <div>
                    <span>Harmillista</span>
                  </div>
                )}
              </div>

              <MDBBtn type="submit" className="mb-4 w-100">
                Kirjaudu sisään
              </MDBBtn>
            </form>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <form onSubmit={SubmitRegister}>
              {RegisterErrorForm.name && (
                <div className="text-danger mb-2">
                  *{RegisterErrorForm.name}
                </div>
              )}

              <MDBInput
                wrapperClass="mb-4"
                label="Nimi"
                name="name"
                id="Name"
                type="text"
                error={RegisterErrorForm.name}
                value={RegisterForm.name}
                onChange={handleChange}
              />

              {RegisterErrorForm.email && (
                <div className="text-danger mb-2">
                  *{RegisterErrorForm.email}
                </div>
              )}

              <MDBInput
                wrapperClass="mb-4"
                label="Sähköposti"
                name="email"
                id="Email"
                type="email"
                error={RegisterErrorForm.email}
                value={RegisterForm.email}
                onChange={handleChange}
              />

              {RegisterErrorForm.password && (
                <div className="text-danger mb-2">
                  *{RegisterErrorForm.password}
                </div>
              )}

              <MDBInput
                wrapperClass="mb-4"
                label="Salasana"
                name="password"
                id="Password"
                type="password"
                error={RegisterErrorForm.password}
                value={RegisterForm.password}
                onChange={handleChange}
              />

              {RegisterErrorForm.checked && (
                <div className="text-danger mb-2">
                  *{RegisterErrorForm.checked}
                </div>
              )}

              <MDBCheckbox
                wrapperClass="mx-4 mb-4"
                label="Hyväksyn käyttöehdot"
                name="checked"
                id="checkbox1"
                checked={RegisterForm.checked}
                onChange={handleChange}
                error={RegisterErrorForm.checked}
              />

              <MDBBtn type="submit" className="mb-4 w-100">
                Rekisteröidy
              </MDBBtn>
              <div className="d-flex justify-content-center mb-4"></div>
            </form>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
  );
}

export default LoginRegister;
