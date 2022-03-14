import Navbar from "./Navbar";

export default function layaout({ children }: any) {
    return (
        <div>
            <Navbar />

            {children}
        </div>
    )
}
