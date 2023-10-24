import Image from "next/image";
import pingpongload from '../../../public/img/pingpongload.gif'

export default function Loading() {
    return (
        <div className='flex items-center justify-center align-middle'>
            <Image src={pingpongload} width={500} height={500} />
        </div>
    )
}