// import BenefitSection from "./BenefitSection"

// import { benefits } from "@/data/benefits"

// const Benefits: React.FC = () => {
//     return (
//         <div id="features">
//             <h2 className="sr-only">Features</h2>
//             {benefits.map((item, index) => {
//                 return <BenefitSection key={index} benefit={item} imageAtRight={index % 2 !== 0} />
//             })}
//         </div>
//     )
// }

// export default Benefits

import AboutSection from "./BenefitSection";

const About: React.FC = () => {
    return (
        <div id="about">
            <AboutSection
                title="About Me"
                description="Write your about text here. This paragraph will explain your mission, your background, what your company or service does, and what makes it unique."
                imageSrc="/images/aboutimage.png"
            />
        </div>
    );
};

export default About;
