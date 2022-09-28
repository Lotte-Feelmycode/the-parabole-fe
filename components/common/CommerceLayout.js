import CommerceHeader from "@components/common/CommerceHeader";
import Footer from "@components/common/Footer";

export default function CommerceLayout({children}) {
    return (
        <>
            <CommerceHeader/>
            <div>{children}</div>
            <Footer/>
        </>
    )
}

