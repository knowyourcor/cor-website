import { useState, useRef, useEffect } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import styles from "./emailSignup.module.scss";

const url =
  "//knowyourcor.us12.list-manage.com/subscribe/post?u=dae943d68d00c841aef8185af&amp;id=6de65e742b";

const CustomForm = ({ status, message, onValidated, onSuccess, theme }) => {
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
      setIsValid(false);
    }
  };

  const handleInputFocus = (e) => {
    window.addEventListener("keypress", handleEnter);
  };

  const handleInputBlur = (e) => {
    window.removeEventListener("keypress", handleEnter);
  };

  const handleEnter = (e) => {
    setIsValid(true);
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("keypress", handleInputFocus);
    };
  }, []);

  useEffect(() => {
    if (status === "success") {
      onSuccess(true);
    }
  }, [status]);

  const statusMessage = () => {
    if (!isValid) {
      return {
        __html:
          "<span>&#9888;&nbsp;Hmm, that's not right. Check your email address.</span>",
      };
    } else if (isValid && status === "sending") {
      return {
        __html: "<div>Sending...</div>",
      };
    } else if (isValid && status === "error") {
      console.log(message);
      return { __html: message.replace("0 - ", "").replace("@: )", "@)") };
    } else if (isValid && status === "success") {
      return { __html: message };
    }
  };

  return (
    <>
      <div
        className={[styles.form, theme && styles[`theme-${theme}`]].join(" ")}
      >
        <div className={styles.inputContainer}>
          <input
            ref={emailRef}
            type="email"
            className={[styles.inputEmail, "focus-input"].join(" ")}
            placeholder="Stay in the loop"
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            aria-label="Enter email address"
          />
          <button
            onClick={handleSubmit}
            className={styles.button}
            aria-label="Sign up"
          >
            <span>Sign Up</span>
          </button>
        </div>
        <div className={styles.messages}>
          <div
            className={styles.message}
            dangerouslySetInnerHTML={statusMessage()}
          />
        </div>
      </div>
    </>
  );
};

const EmailSignup = ({ theme, onSuccess }) => (
  <>
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <CustomForm
          status={status}
          message={message}
          onSuccess={(status) =>
            typeof onSuccess === "function" && onSuccess(status)
          }
          onValidated={(formData) => subscribe(formData)}
          theme={theme}
        />
      )}
    />
  </>
);

export default EmailSignup;
