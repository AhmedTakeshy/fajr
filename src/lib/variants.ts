export const fadeIn = (direction:string, delay:number) => {
    return {
        hidden: {
            y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
            opacity: 0,
            x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                delay: delay,
                ease: [0.25, 0.45, 0.45, 0.75],
            },
        },
    };
};