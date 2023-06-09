import React from "react";
import SVGGithub from "./SVGGithub";
import SVGHerdMentality from "./SVGHerdMentality";
import SVGLinkedIn from "./SVGLinkedIn";

const Socials = ({ ...props }) => {

    const socials = [
        {
            title: 'herd-mentality',
            component: <SVGHerdMentality width={30} height={30} />,
        },
        {
            title: 'github',
            component: <SVGGithub width={30} height={30} />,
        },
            {
            title: 'linkedin',
            component: <SVGLinkedIn width={30} height={30} />,
        },
    ]

    return (
        <div className='socials'>
            {
                socials && socials.map((el, i) => {
                    return el.component
                })
            }
        </div>
    )

}

export default Socials