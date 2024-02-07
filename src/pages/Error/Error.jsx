import Header from "../../components/Header/Header";

// Composant de rendu de la page d'erreur
export default function ErrorPage() {
	return (
        <>
        <Header />
		<div className="error-page">
			<p className="error-number">404</p>
			<p className="error-text">Cette page n'existe pas !</p>
		</div>
        </>
	);
}