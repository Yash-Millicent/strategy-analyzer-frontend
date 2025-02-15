import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div className="d-flex align-items-center gap-5">
      <Spinner
        animation="border"
        role="status"
      ></Spinner>
      <span>Loading...</span>
    </div>
  );
}

export default Loader;
