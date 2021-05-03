import { useState, useRef, useEffect } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import styles from "./emailSignup.module.scss";

const url =
  "//knowyourcor.us12.list-manage.com/subscribe/post?u=dae943d68d00c841aef8185af&amp;id=6de65e742b";

const CustomForm = ({ status, message, onValidated }) => {
  const emailRef = useRef();
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = () => {
    const email = emailRef.current;
    if (email && email.value.indexOf("@") > -1) {
      setIsValid(true);
      onValidated({
        EMAIL: email.value,
      });
    } else {
      setIsValid(!isValid);
    }
  };

  const handleInputFocus = (e) => {
    window.addEventListener("keypress", handleEnter);
  };

  const handleInputBlur = (e) => {
    window.removeEventListener("keypress", handleEnter);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("keypress", handleInputFocus);
    };
  }, []);

  return (
    <>
      <div className={styles.form}>
        <div className={styles.inputContainer}>
          <input
            ref={emailRef}
            type="email"
            className={styles.inputEmail}
            placeholder="Stay in the loop"
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
          />
          <button onClick={handleSubmit} className={styles.buttonSubmit}>
            Submit
          </button>
        </div>
        <div className={styles.messages}>
          {!isValid && (
            <div className={styles.messageSending}>
              <span>&#9888;</span>
              <span>Hmm, that's not right. Check your email address.</span>
            </div>
          )}
          {status === "sending" && (
            <div className={styles.messageSending}>Sending...</div>
          )}
          {status === "error" && (
            <div
              className={styles.messageError}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
          {status === "success" && (
            <div
              className={styles.messageSuccess}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
        </div>
      </div>
    </>
  );
};

const EmailSignup = () => (
  <>
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <CustomForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  </>
);

export default EmailSignup;
