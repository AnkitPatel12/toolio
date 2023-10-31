import Image from "next/image";
import simpleLoad from '../../../public/img/simpleLoad.gif'

export default function Loading() {
    return (
        <div className='flex items-center justify-center align-middle'>
            <Image src={simpleLoad} width={500} height={500} />
        </div>
    )
}