import { useState, useEffect } from "react";
import { logIn } from '../components/Server/LogInAPI';
import { getAsiakkaatEmail } from "../components/Server/TuoteAPI";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsContent,
  MDBTabsPane,
  MDBCheckbox,
  MDBInput,
  MDBBtn,
  MDBTabsLink,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { luoAsiakas } from "./Server/TilausAPI";
import createTilaus from '../components/Server/TilausAPI';


function LoginRegister(props) {
  const [RegisterForm, setRegisterForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    password: "",
    ATchecked: true,
    ATluonti: true,
  });

  const [sahkopostit, setSahkopostit] = useState(getAsiakkaatEmail);

  useEffect(() => {
    setSahkopostit(getAsiakkaatEmail);
  }, []);

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

  const [rememberMe, setRememberMe] = useState(false);
  
  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };
  

  //if localstorage has password and email
  useEffect(() => {
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
      setLoginForm({
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
      });
    }
  }, []);

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

    if(rememberMe === true) {
      localStorage.setItem("email", LoginForm.email);
      localStorage.setItem("password", LoginForm.password);
    }
    else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    try {

      console.log(JSON.stringify(LoginForm))
      const userData = await logIn(LoginForm);
      props.setPassword(LoginForm.password);
      props.setEmail(LoginForm.email);
      console.log("Asiakkaan tiedot ja tilauksen tiedot:")
      console.log(JSON.stringify(userData + " " + LoginForm.password + " " + LoginForm.email))
      console.log(JSON.stringify(userData))
      props.setUserID(userData.id);
      props.setUser(userData.name);
      console.log("Asiakkaan id:" + userData.customer.asiakasID)
      props.setUserID(userData.customer.asiakasID);
      props.setAsiakasTiedot(userData);
      props.setUser(userData.customer.email);
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

  const SubmitRegister = async (event) => {
    event.preventDefault();

    let errors = {};
    //check if all fields are filled and checkbox is checked

    if (!RegisterForm.email) {
      errors.email = "Sähköposti on pakollinen";
    }
     //if sahkoposti is already in database
      if (RegisterForm.email && props.userID === null) {
        const isEmailInDatabase = await getAsiakkaatEmail(RegisterForm.email);
        if (isEmailInDatabase === true) {
        errors.email = "sähköposti on jo käytössä";
        }
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
      createTilaus.newTilaus(RegisterForm);
      console.log(JSON.stringify(RegisterForm))


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
          <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Kirjaudu
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Rekisteröidy
            </MDBTabsLink>
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
                error={LoginErrorForm.email ? 'true' : 'false'}
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
                error={LoginErrorForm.password ? 'true' : 'false'}
                onChange={handleChangeLogin}
              />

              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox
                label="Muista minut"
                name="tallennatiedot"
                checked={rememberMe}
                onChange={handleCheckboxChange}
                />
                {showLink && (
                  <a href="#" onClick={handleClick}>
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
              <p className="text-center">
              Etkö ole vielä asiakas?{" "}
              <a
                href="#"
                onClick={() => handleJustifyClick("tab2")}
                active={justifyActive === "tab2" ? "true" : "false"}
              >
                Rekisteröidy
              </a>
            </p>
            </form>
          </MDBTabsPane>
          <MDBTabsPane show={justifyActive === "tab2"}>
            <form onSubmit={SubmitRegister}>
              {RegisterErrorForm.name && (
                <div className="text-danger mb-2">
                  *{RegisterErrorForm.name}
                </div>
              )}

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
                error={RegisterErrorForm.email ? 'true' : 'false'}
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
                error={RegisterErrorForm.password ? 'true' : 'false'}
                value={RegisterForm.password}
                onChange={handleChange}
              />

              {RegisterErrorForm.checked && (
                <div className="text-danger mb-2">
                  *{RegisterErrorForm.checked}
                </div>
              )}
              <div className="d-flex">
              <MDBCheckbox
                wrapperClass="mx-4 mb-4"
                label="Hyväksyn käyttöehdot"
                name="checked"
                id="checkbox1"
                checked={RegisterForm.checked}
                onChange={handleChange}
                error={RegisterErrorForm.checked ? 'true' : 'false'}
              />
              </div>
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
