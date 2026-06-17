export default function Loader() {
  const styles = {
    container: {
      height: "60vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    spinner: {
      width: "60px",
      height: "60px",
      border: "6px solid #e5e7eb",
      borderTop: "6px solid #2563eb",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.spinner}></div>
      </div>
    </>
  );
}