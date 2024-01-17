import styles from "./loading.module.scss";

function Loading() {
  return <div className={styles.loading}>
    
    <div><span className={styles.loader}></span></div>
    
    </div>;
}

export default Loading;
