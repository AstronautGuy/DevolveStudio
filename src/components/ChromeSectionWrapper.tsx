import ChromeSection from "@/components/ChromeSection";
import TypewriterText from "@/components/TypewriterText";

export default function ChromeSectionWrapper() {

    const text = [
        {
            text: "Designing ",
            bold: false,
        },
        {
            text: "Has No ",
            bold: false,
        },
        {
            text: "Limitations.",
            bold: false,
        },
    ];

    return (
        <section className="relative h-[90vh] w-full bg-gray-300 overflow-hidden">
            <ChromeSection />
            <div className="absolute top-50 left-10 w-1/4 h-full z-10">
                <h1 className="text-gray-300 text-center font-light text-8xl">
                    <TypewriterText segments={text} speed={150} initialDelay={50} className="inline uppercase" />
                </h1>
            </div>
        </section>
    );
}