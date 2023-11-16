import { MotionSection } from '@/lib/motionDev'
import { fadeIn } from '@/lib/variants'
import React from 'react'
import TeamMember from './TeamMember'

export default function Team() {
    return (
        <MotionSection
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className='container flex flex-col items-start justify-center w-full my-10' id='team'>
            <h1 className='my-6 font-bold text-7xl'>اعضاء الفريق</h1>
            <div className='grid w-full grid-cols-3 gap-8 my-4 place-content-center'>
                <TeamMember title="محمد العمري" description="مطور ويب" img="/images/team-01.jpg" />
                <TeamMember title="محمد العمري" description="مطور ويب" img="/images/team-01.jpg" />
                <TeamMember title="محمد العمري" description="مطور ويب" img="/images/team-01.jpg" />
            </div>
        </MotionSection>
    )
}
