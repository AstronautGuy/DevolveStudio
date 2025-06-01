import { HyperText } from "@/components/ui/hyper-text"

export default function Hero() {

    return (
        <main className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white px-4 sm:px-10 lg:px-20 gap-10">
            <div className="w-full lg:w-1/2">
                <div className="font-light leading-tight text-wrap" style={{ fontSize: 'clamp(1.5rem, 4vw + 1rem, 5rem)' }}>
                    Empower your online presence with <HyperText
                    className="inline text-6xl font-light text-black dark:text-white mt-4"
                    text="Devolve."
                />
                </div>
            </div>

            <div className="h-60 sm:h-[40vh] w-full lg:w-1/2 bg-gray-400 flex justify-center items-center">
                <p>3D Model</p>
            </div>
        </main>
    );
}
