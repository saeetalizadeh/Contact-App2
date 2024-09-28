import { useState } from "react";
import styles from "./Form.module.css";

import { v4 as uuidv4 } from "uuid";
import { useContacts } from "../context/ContactsContext";
import MessageModal from "./MessageModal";
import { useParams } from "react-router-dom";

function Form({ type }) {

  const { id } = useParams();

  const { users, dispatch } = useContacts();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [job, setJob] = useState("");

  const [phone, setPhone] = useState("");
  const [alert, setAlert] = useState([
    "Please enter valid name!",
    "Please enter valid email!",
    "",
    "",
  ]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const addHandler = (e) => {
    e.preventDefault();
    if (name.length > 0 && email.length > 0 && alert[1].length === 0) {
      setShowModal(true);
    } else {
      setAlert([alert[0], "Please enter valid email!", alert[2], alert[3]]);
    }
  };

  const nameValidation = (e) => {
    const regex = /^[a-zA-z\u0600-\u06FF\s\d]{4,20}$/;
    const value = e.target.value;
    const result = regex.test(value);
    if (result) {
      setName(value);
      setAlert(["", alert[1], alert[2], alert[3]]);
    } else {
      setShowModal(false);
      setAlert(["Please enter valid name!", alert[1], alert[2], alert[3]]);
    }
  };
  const emailValidation = (e) => {
    const regex = /^[\w_\.]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
    const value = e.target.value;
    const result = regex.test(value);
    if (result) {
      setEmail(value);
      setAlert([alert[0], "", alert[2], alert[3]]);
    } else {
      setShowModal(false);
      setAlert([alert[0], "Please enter valid email!", alert[2], alert[3]]);
    }
  };
  const jobValidation = (e) => {
    const regex = /^[a-zA-z\u0600-\u06FF\s\d]{4,20}$/;
    const value = e.target.value;
    const result = regex.test(value);
    if (result) {
      setJob(value);
      setAlert([alert[0], alert[1], "", alert[3]]);
    } else {
      setAlert([alert[0], alert[1], "Please enter your job!", alert[3]]);
    }
  };
  const phoneValidation = (e) => {
    const regex = /^09[\d]{9}$/;
    const value = e.target.value;
    const result = regex.test(value);
    if (result) {
      setPhone(value);
      setAlert([alert[0], alert[1], alert[2], ""]);
    } else {
      setAlert([
        alert[0],
        alert[1],
        alert[2],
        "Please enter your phone correctly!",
      ]);
    }
  };

  const contact = {
    id: type === "EDIT" ? id : `${uuidv4()}`,
    name: name.trim(),
    email: email,
    job: job.trim(),
    phone,
  };

  return (
    <>
      {showModal && (
        <MessageModal
          message={
            type === "ADD"
              ? "You are adding new contact are you sure?"
              : "You are editing new contact are you sure ? "
          }
          setShowModal={setShowModal}
          data={contact}
          dispatch={dispatch}
          type={type}
        />
      )}
      <form onSubmit={addHandler} className={styles.container}>
        <div className={styles.form}>
          <label>Name : </label>
          <input
            onChange={nameValidation}
            type="text"
            placeholder="Enter Name..."
          />
        </div>

        {alert[0].length > 0 && <p className={styles.alert}>{alert[0]}</p>}
        <div className={styles.form}>
          <label>Email :</label>
          <input
            onChange={emailValidation}
            type="text"
            placeholder="Enter Email..."
          />
        </div>
        {alert[1].length > 0 && <p className={styles.alert}>{alert[1]}</p>}

        <div className={styles.form}>
          <label>Job :</label>
          <input
            onChange={jobValidation}
            type="text"
            placeholder="Enter Job..."
          />
        </div>
        {alert[2].length > 0 && <p className={styles.alert}>{alert[2]}</p>}
        <div className={styles.form}>
          <label>Phone :</label>
          <input
            onChange={phoneValidation}
            type="number"
            placeholder="Enter PhoneNumber..."
          />
        </div>
        {alert[3].length > 0 && <p className={styles.alert}>{alert[3]}</p>}
        <button className={styles.add} type="submit">
          {type === "ADD" ? "Add Contact" : "Edit Contact"}
        </button>
      </form>
    </>
  );
}

export default Form;
