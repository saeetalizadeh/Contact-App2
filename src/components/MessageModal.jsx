import axios from "axios";
import styles from "./MessageModal.module.css";

function MessageModal({ message, setShowModal, data, dispatch, type }) {
  const yesHandler = () => {
    if (type === "ADD") {
      axios
        .post("http://localhost:3000/contacts", data)
        .then(() => {
          return axios.get("http://localhost:3000/contacts");
        })
        .then((res) => {
          dispatch({
            type: "SET-CONTACTS",
            payload: res.data,
          });
        });
    } else {
      axios
        .patch(`http://localhost:3000/contacts/${data.id}`, data)
        .then(() => {
          return axios.get("http://localhost:3000/contacts");
        })
        .then((res) => {
          dispatch({
            type: "SET-CONTACTS",
            payload: res.data,
          });
        });
    }
    setShowModal(false);
  };
  const noHandler = () => {
    setShowModal(false);
  };
  return (
    <div className={styles.container}>
      <span>{message}</span>
      <button onClick={yesHandler}>yes</button>
      <button onClick={noHandler}>no</button>
    </div>
  );
}

export default MessageModal;
