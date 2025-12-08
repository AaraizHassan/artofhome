import AboutSection from "./BenefitSection";

const About: React.FC = () => {
    return (
        <div id="about">
            <AboutSection
                title="About Founder"
                description="Write your about text here. This paragraph will explain your mission, your background, what your company or service does, and what makes it unique."
                imageSrc="/images/aboutimage.png"
            />
        </div>
    );
};

export default About;
