
type ServiceProps = {
    title: string;
    description: string;
    icon: JSX.Element;
};


export default function ServiceItem({ title, description, icon }: ServiceProps) {
    return (
        <article dir='ltr' className='grid grid-cols-[1fr,auto] place-items-end text-right gap-x-4'>
            <h3 className="mb-2 text-2xl dark:text-slate-200 text-slate-400">{title}</h3>
            {icon}
            <p className="text-xl dark:text-slate-500 text-slate-700">{description}</p>
        </article>
    )
}
