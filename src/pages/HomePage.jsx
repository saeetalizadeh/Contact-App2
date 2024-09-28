import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import { useContacts } from "../context/ContactsContext";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const { users, dispatch } = useContacts();
  const [show, setShow] = useState([]);

  useEffect(() => {
    // if (show.length === 0) {
    setShow(users);
    // }
  }, [users]);

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:3000/contacts/${id}`)
      .then(() => {
        return axios.get("http://localhost:3000/contacts");
      })
      .then((res) => {
        dispatch({
          type: "SET-CONTACTS",
          payload: res.data,
        });
      });
  };
  const serachHandler = (e) => {
    const value = e.target.value;
    const result = users.filter((item) => item.name.includes(value));
    if (result) {
      setShow(result);
    } else {
      setShow(users);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div>
          <h2>Contacts</h2>
          <input onChange={serachHandler} type="text" placeholder="Search..." />
          <Link className={styles.add} to="/add-contact">
            Add Contact
          </Link>
        </div>

        <div className={styles.users}>
          {show.length > 0 ? (
            show.map((user) => (
              <div key={user.id} className={styles.item}>
                <div>
                  <p style={{ color: "#088aba", fontSize: "1.4rem" }}>
                    {user.name}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      color: "#088aba",
                      fontSize: "1.4rem",
                      marginLeft: "10px",
                    }}
                  >
                    <span>✉️</span>
                    {user.email}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>📞</span>
                  <div
                    style={{
                      color: "#088aba",
                      fontSize: "1.4rem",
                      marginLeft: "10px",
                    }}
                  >
                    {user.phone.length > 0 ? user.phone : "---"}
                  </div>
                </div>

                <Link to={`/edit-contact/${user.id}`}>
                  <span className={styles.edit}>📝</span>
                </Link>
                <button onClick={() => deleteHandler(user.id)}>🗑️</button>
              </div>
            ))
          ) : (
            <div className={styles.noItem}>
              <p
                style={{
                  color: "#088aba",
                  width: "fit-content",
                  fontSize: "1.4rem",
                  margin: "0 auto",
                }}
              >
                {users.length > 0 ? "Contact Not Found !" : "No Contact Yet !"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
