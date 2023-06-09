import React from "react";
import SVGGithub from "./SVGGithub";
import SVGHerdMentality from "./SVGHerdMentality";
import SVGLinkedIn from "./SVGLinkedIn";

const Socials = ({ ...props }) => {

    const socials = [
        {
            title: 'herd-mentality',
            // component: <SVGHerdMentality width={30} height={30} />,
            component: SVGHerdMentality
        },
        {
            // https://fontawesome.com/icons/square-github?f=brands&s=solid
            title: 'github',
            // component: <SVGGithub width={30} height={30} />,
            component: SVGGithub
        },
        {
            // https://fontawesome.com/icons/linkedin?f=brands&s=solid&pc=%23ffffff
            title: 'linkedin',
            // component: <SVGLinkedIn width={30} height={30} />,
            component: SVGLinkedIn
        },
    ]

    return (
        <div className='socials'>
            {
                socials && socials.map((el, i) => {

                    const SocialType = el.component;

                    return <SocialType key={i} width={30} height={30} />
                })
            }
        </div>
    )

}

export default Socials