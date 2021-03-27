import Loader from "../components/Loader";

const ErrorPage = () => {
    setTimeout(() => window.location.replace("http://localhost:3000/start"), 2000);
    return(
        <div className="error-page">
            <h1 className="error-page__title">An <p className="error-page__title--mark">error</p> has occurred</h1>
            <p className="error-page__description">Sorry for the inconvenience</p>
            <p className="error-page__description">Redirecting to home page</p>
            <Loader/>
        </div>
    )
}

export default ErrorPage;