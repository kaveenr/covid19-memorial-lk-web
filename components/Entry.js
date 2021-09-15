import Link from "next/link"
import { useState } from "react";

const Entry = ({ data }) => {

    const [detailVisible, setDetailVisible] = useState(false);
    return (
        <div className="relative" onMouseOver={(e) => (setDetailVisible(true))} onMouseLeave={(e) => (setDetailVisible(false))}>
            <Link href={`/entry/${data.id}`}>
                <a key={data.id} 
                    className={`py-4 flex flex-col items-center relative ${!detailVisible ? "hover:": ""}scale-110 transition-transform duration-700 ease-out`}>
                    <img src="/img/placeholder-flower.jpg" className="flex-grow w-full"/>
                    <p className="text-sm font-semibold">{data.attributes.ageValue} year {data.attributes.gender}</p>
                    <p className="text-sm">{new Date(data.attributes.deathDate).toLocaleDateString("si")}</p>
                </a>
            </Link>
            <div className={`invisible md:visible overflow-hidden ${!detailVisible ? "w-0 h-0 z-0 opacity-0": "opacity-100 z-50 p-4 bg-white rounded-tr-lg rounded-br-lg rounded-bl-lg w-60"} absolute top-1/3 left-1/2 transition-opacity duration-150 ease-in-out`}>
                    <p><b>Province:</b> {data.attributes.province}</p>
                    <p><b>District:</b> {data.attributes.district}</p>
                    <p><b>City:</b> {data.attributes.city}</p>
                    <hr className="my-4"/>
                    <p><b>Source:</b> {data.attributes.sourceType}</p>
            </div>
        </div>
  );
}

export default Entry;