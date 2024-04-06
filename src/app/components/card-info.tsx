import Image, { StaticImageData } from "next/image";

interface CardProps {
    title: string;
    image: string | StaticImageData;
    alt: string;
    classname?: string;
}

export default function Card({ title, image, alt, classname }: CardProps) {
    return (
        <div className={`text-white flex flex-col items-center justify-center bg-gray-300/5 border-1 border-blue-300/30 rounded-xl pt-4 px-4 ${classname}`}>
            <p className="font-semibold lg:text-xl text-sm">{title} </p>
            <Image src={image} alt={alt} className="saturate-150 contrast-100 brightness-[90%] w-[130px] lg:w-[200px] "/>
        </div>
    )
}