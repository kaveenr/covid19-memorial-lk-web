import Link from "next/link"
import { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";

const Entry = ({ data }) => {

    const [detailVisible, setDetailVisible] = useState(false);
    
    // Overcomplicated tool tip clipping solution.
    const [tooltipDir, setTooltipDir] = useState(true);
    const handleHover = (e) => {
        const offset = (100 * e.clientX) / window.innerWidth;
        if (offset > 80) {
            setTooltipDir(false);
        }
        setDetailVisible(true);
    }

    return (
        <div key={data.id} className="relative" onMouseOver={(e) => (handleHover(e))} onMouseLeave={(e) => (setDetailVisible(false))}>
            <Link href={`/entry/${data.id}`}>
                <a 
                    className={`py-4 flex flex-col items-center relative ${!detailVisible ? "hover:": ""}scale-110 transition-transform duration-700 ease-out`}>
                    <img src="/img/placeholder-flower.jpg" className="flex-grow w-full"/>
                    <p className="text-sm font-semibold">{data.attributes.ageValue} year {data.attributes.gender}</p>
                    <p className="text-sm">{new Date(data.attributes.deathDate).toLocaleDateString("si")}</p>
                </a>
            </Link>
            <div className={`invisible md:visible overflow-hidden ${!detailVisible ? "w-0 h-0 z-0 opacity-0": "opacity-100 z-50 p-4 bg-white rounded-xl w-60"} absolute top-1/3 ${tooltipDir ? 'left' : 'right'}-1/2 transition-opacity duration-150 ease-in-out`}>
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