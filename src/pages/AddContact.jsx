import { Link } from "react-router-dom";
import Form from "../components/Form";
import styles from "./AddContact.module.css";
function AddContact() {
  return (
    <>
      <div className={styles.title}>
        <h1>Contact Form</h1>
        <Link to="/" className={styles.link}>
          Go to Contacts
        </Link>
      </div>

      <Form type="ADD" />
    </>
  );
}

export default AddContact;
