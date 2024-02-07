// Composant qui retourne le contenu d'une "card" des features du site
export default function HomeFeatureCard({ title, description, iconSource, iconAlt }) {
    return (
        <article className="feature-item">
            <img
                src={iconSource}
                alt={iconAlt}
                className="feature-icon"
                width={100}
                height={100}
            />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </article>
    );
}
