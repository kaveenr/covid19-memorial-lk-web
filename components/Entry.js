import Link from "next/link"
import { useState } from "react";

const Entry = ({ data }) => {

    const [detailVisible, setDetailVisible] = useState(false);
    return (
        <div className="relative" onMouseOver={(e) => (setDetailVisible(true))} onMouseLeave={(e) => (setDetailVisible(false))}>
            <Link href={`/entry/${data.id}`}>
                <a key={data.id} 
                    className={`py-4 flex flex-col items-center relative ${!detailVisible ? "hover:": ""}scale-125 transition-transform duration-700 ease-out`}>
                    <img src="/img/placeholder-flower.jpg" className="flex-grow w-full"/>
                    <p className="text-sm font-semibold">{data.attributes.ageValue} year {data.attributes.gender}</p>
                    <p className="text-sm">{data.attributes.district}</p>
                </a>
            </Link>
            {detailVisible ? 
                <div className="absolute p-4 bg-white rounded-tr-lg rounded-br-lg rounded-bl-lg top-20 left-20 z-50">
                    <p><b>Province:</b> {data.attributes.province}</p>
                    <p><b>City:</b> {data.attributes.city}</p>
                    <hr/>
                    <p><b>Source:</b> {data.attributes.sourceType}</p>
                    <p><b>Ref:</b> {data.attributes.sourceRef}</p>
                </div> :
            []}
        </div>
  );
}

export default Entry;