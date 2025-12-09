import AboutSection from "./BenefitSection";

const About: React.FC = () => {
    return (
        <div id="about">
            <AboutSection
                title="About Founder"
                description="Ayesha Chaudhary is the founder of Art of Home. With a background in textile design and a lifelong love for craft, she brings a thoughtful, detail-led approach to creating spaces that feel warm, personal, and lived-in. Her work has been recognized with multiple awards, reflecting her commitment to quality and timeless design."
                imageSrc="/images/aboutimage.webp"
            />
        </div>
    );
};

export default About;
