import { Link } from "react-router-dom";
import styles from "./AddContact.module.css";
import Form from "../components/Form";
function EditContact() {
  return (
    <>
      <div className={styles.title}>
        <h1>Edit Form</h1>
        <Link to="/" className={styles.link}>
          Go to Contacts
        </Link>
      </div>

      <Form type="EDIT" />
    </>
  );
}

export default EditContact;
