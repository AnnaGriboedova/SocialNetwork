import React from 'react'

type AboutMeProps = {
    aboutMe: string
}
const AboutMe: React.FC<AboutMeProps> = (props) => {
    return <div>
        {props.aboutMe}
    </div>
};

export default AboutMe;