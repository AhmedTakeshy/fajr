
type ServiceProps = {
    title: string;
    description: string[];
    icon: JSX.Element;
};


export default function ServiceItem({ title, description, icon }: ServiceProps) {
    return (
        <article  className='grid grid-cols-[1fr,auto] place-items-start text-right gap-x-4 place-content-start'>
            <h3 className="mb-2 text-2xl font-semibold text-black dark:text-slate-100">{title}</h3>
            {icon}
            <ul className="space-y-2 text-xl list-disc dark:text-slate-300 text-slate-700">
                {description.map((item, index) => (
                    <li className="" key={index}>{item}</li>
                ))}
            </ul>
        </article>
    )
}
