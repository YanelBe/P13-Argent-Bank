import Header from "../../components/Header/Header";
import HomeFeatures from "../../components/HomeFeatures/HomeFeatures";

// Composant de la page d'accueil
const Home = () => {
  return (
    <>
      <Header />
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>

        <section className="features">
          <h2 className="sr-only">Features</h2>
          
          <HomeFeatures />
        </section>
      </main>
    </>
  );
};

export default Home;
