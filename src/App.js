import './App.css';
import logo from './logo-2.png'
import promo from './promo.png'
import {useState, useRef} from 'react';
import emailjs from '@emailjs/browser';

function App() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [developerName, setDeveloperName] = useState("");
  const [developerEmail, setDeveloperEmail] = useState("");
  // const [developerCV, setDeveloperCV] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const [isLeftActive, setLeftIsActive] = useState(true);
  const [isRightActive, setRightIsActive] = useState(false);

  const switchButton = useRef(null);
  const switchBtnRight = useRef(null);
  const switchBtnLeft = useRef(null);
  const activeSwitch = useRef(null);

  function switchLeft() {
    setLeftIsActive(true);
    setRightIsActive(false);
  }

  function switchRight() {
    setLeftIsActive(false);
    setRightIsActive(true);
  }

  const sendClientEmail = (event) => {
    event.preventDefault();

    if (!clientEmail) {
      alert('Please fill in your email')
    } else {
      const templateParams = {
        from_name: clientName || 'no name',
        to_name: 'Staffd.',
        message: `Client Name: ${clientName}, Client Email: ${clientEmail}`
      };

      emailjs.send('service_bertbi6', 'template_7krvv1i', templateParams, '-lptpfaQ3Ni46Quvg')
        .then(function (response) {
          console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
          console.log('FAILED...', error);
        });

      setLeftIsActive(false);
      setRightIsActive(false);
      setShowThankYou(true);
    }
  }

  const sendDeveloperEmail = (event) => {
    event.preventDefault();

    if (!developerEmail) {
      alert('Please fill in your email')
    } else {
      const templateParams = {
        from_name: developerName || 'no name',
        to_name: 'Staffd.',
        from_email: developerEmail,
        // from_attachment: developerCV,
        message: `Developer Name: ${developerName}, Developer Email: ${developerEmail}`
      };

      emailjs.send('service_bertbi6', 'template_3d98qn9', templateParams, '-lptpfaQ3Ni46Quvg')
        .then(function (response) {
          console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
          console.log('FAILED...', error);
        });

      setShowThankYou(true);
    }
  }

  return (
    <div className="app">
      <header>
        <img className="logo" src={logo} alt="logo"/>
      </header>

      <section className="promo">
        <div className="promo-header">
          <div className="promo-info">
            <h1>We connect <u>Clients</u> to local Developers in one touch.</h1>

            <div className="promo-text">
              <p>
                Welcome to our exciting new platform that will revolutionize the way clients and developers connect! Our
                platform is designed to make it easy for clients to find the perfect developers for their projects, and
                for developers to connect with new clients and grow their businesses.
              </p>
            </div>
          </div>

          <img className="promo" src={promo} alt="promo"/>
        </div>
      </section>

      <div className="main">
        <div className="reasons">
          <p className="intro">
            We are currently in the process of building our platform, and we are looking for people like you to join us
            in this journey. By leaving your data and email with us, you will be the first to know when our platform
            launches, and you will be able to take advantage of all the benefits that come with being an early adopter.
          </p>

          <h2 className="intention">
            Be an early adopter!
          </h2>

          <ul className="reasons-list">
            <li>
              <h3>Get exclusive access</h3>

              As an early adopter, you will be one of the first people to gain access to our
              platform.
              This means you will have a head start in finding the perfect developers for your projects or growing your
              developer business.
            </li>

            <li>
              <h3>Stay informed</h3>

              By leaving your email with us, you will receive regular updates on our platform's
              development,
              including new features and services, so you can stay informed and make the most of our platform.
            </li>

            <li>
              <h3>Get support</h3>

              Our platform will offer a range of support services to help you find the right developer or
              client for your needs. By leaving your data and email with us, you will be able to take advantage of these
              services from day one.
            </li>
          </ul>
        </div>

        <div className="contact">
          {(isLeftActive || isRightActive) ?
            <div className="switch-button" ref={switchButton}>
          <span
            ref={activeSwitch}
            className={isLeftActive ? 'active active-left' : 'active active-right'}>
            </span>

            <button
              ref={switchBtnLeft}
              onClick={switchLeft}
              className={isLeftActive ? 'switch-button-case left active-case active-case' : 'switch-button-case left'}>
              I am a Client
            </button>

            <button
              ref={switchBtnRight}
              onClick={switchRight}
              className={isRightActive ? 'switch-button-case right active-case' : 'switch-button-case right'}>
              I am a Developer
            </button>
          </div>
            : ''}

          {isLeftActive ?
            <section className="client">
              <form onSubmit={sendClientEmail} id="client-form">
                <label htmlFor="name">Name</label>
                <input type="text" name="from_name" id="name" onChange={(e) => setClientName(e.target.value)}/>

                <label htmlFor="email">E-mail<span className="asterisk"> *</span></label>
                <input type="email" id="email" name="from_email" onChange={(e) => setClientEmail(e.target.value)}/>

                <input className="submit" type="submit" value="Keep me informed"/>
              </form>
            </section>
            : ''}

          {isRightActive ?
            <section className="developer">
              <form onSubmit={sendDeveloperEmail} id="developer-form">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="from_name" onChange={(e) => setDeveloperName(e.target.value)}/>

                <label htmlFor="email">E-mail<span className="asterisk"> *</span></label>
                <input type="email" id="email" name="from_email" onChange={(e) => setDeveloperEmail(e.target.value)}/>

                {/*<label htmlFor="cv">CV</label>*/}
                {/*<input type="file" id="cv" name="from_cv" onChange={(e) => setDeveloperCV(e.target.value)}/>*/}

                <input className="submit" type="submit" value="Keep me informed"/>
              </form>
            </section>
            : ''}

          {showThankYou ?
            <section className="thank-you">
              <h2>
                Thank you!
              </h2>

              <p>Once the Platform is live, you will be the first to know and try it out.</p>
            </section>
            : null}
        </div>
      </div>
    </div>
  );
}

export default App;
