export default function PageSection() {
    return(
        <section className="h-[90vh] w-screen bg-pink-500 flex items-center justify-center">
            <div className="h-[80vh] w-[80vw] bg-radial to-gray-950 from-blue-950 rounded-[60px] flex items-center justify-center">
                <div
                    style={{
                        background: `
                        linear-gradient(
                        to bottom,
                        #ffdbab 0%,
                        #fecd9c 20%,
                        #fe8da9 40%,
                        #a35eab 60%,
                        #482f8f 80%,
                        #2f2ba3 100%
                        )
                        `,
                    }}
                    className="h-120 w-120 rounded-full">
                </div>
            </div>
        </section>
    );
}