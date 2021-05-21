import React from 'react'
import s from "../../Profile.module.scss";
import cn from "classnames";

export type JobProps = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
}
const Job: React.FC<JobProps> = (props) => {
    return <div className={cn(s.job)}>
        <div className={cn('title--md-greyColor')}>Job</div>

        {props.lookingForAJob &&
        <div className={cn('title--sm--greyColor')}>
            Looking For A Job: {props.lookingForAJob ? 'yes' : 'no'}
        </div>
        }
        {props.lookingForAJobDescription &&
        <div className={s.jobDescription}>
            {props.lookingForAJobDescription}
        </div>
        }
    </div>
};

export default Job;