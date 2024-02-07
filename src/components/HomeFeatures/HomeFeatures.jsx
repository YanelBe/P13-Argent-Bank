import HomeFeatureCard from "./HomeFeatureCard";
import { featuresData } from "../../datas/featuresData"

// Composant qui retourne toutes les features du site
export default function Features() {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {featuresData.map((feature, index) => (
                <HomeFeatureCard
                    key={`feature-${index}`}
                    title={feature.title}
                    description={feature.description}
                    iconSource={feature.iconSource}
                    iconAlt={feature.iconAlt}
                />
            ))}
        </section>
    );
}
