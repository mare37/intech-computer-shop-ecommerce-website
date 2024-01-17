import styles from "./connectionerror.module.scss";

function ConnectionError() {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}>
       <p> Connection Error.Please check your internet settings  </p>
       <button    onClick={()=>{window.location.reload()  }}          >Retry</button>
      </div>
    </div>
  );
}

export default ConnectionError;
