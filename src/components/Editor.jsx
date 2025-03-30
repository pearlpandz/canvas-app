import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import Frame from "../components/Frame";
import { FRAMES } from "../constants";
import './Editor.css';

function Editor(props) {
    const { selectedImg } = props;
    const canvasRef = useRef(null);
    const componentRef = useRef(null);
    const [selectedFrame, setSelectedFrame] = useState(FRAMES[0]);
    const companyDetails = JSON.parse(localStorage.getItem("companyDetails"))
    const isPremiumUser = companyDetails?.isPremiumUser || true;

    useEffect(() => {
        const addWatermark = (canvas) => {
            const ctx = canvasRef.current?.getContext("2d", { willReadFrequently: true });
            if (!ctx) return;

            // Draw the captured image on the canvas
            ctx.drawImage(canvas, 0, 0, 600, 600);

            // Apply watermark only if the user is NOT premium
            if (!isPremiumUser) {
                const watermarkText = "pearlpandz.github.io";
                ctx.font = "bold 18px Arial";
                ctx.fillStyle = "rgba(0, 0, 0, 0.15)"; // Semi-transparent text
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                // Define spacing
                const stepX = 150; // Horizontal spacing
                const stepY = 100; // Vertical spacing

                // Loop to fill the canvas with watermarks
                for (let x = -100; x < canvas.width; x += stepX) {
                    for (let y = -100; y < canvas.height; y += stepY) {
                        ctx.save(); // Save context state
                        ctx.translate(x, y); // Move to position
                        ctx.rotate(-Math.PI / 4); // Rotate -45 degrees
                        ctx.fillText(watermarkText, 0, 0);
                        ctx.restore(); // Restore context state
                    }
                }
            }
        };

        if (componentRef.current && canvasRef.current) {
            html2canvas(componentRef.current, { useCORS: true }).then((canvas) => {
                addWatermark(canvas);
            });
        }
    }, [companyDetails, selectedFrame]);

    const downloadCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const image = canvas.toDataURL("image/png"); // Convert canvas to PNG
        const link = document.createElement("a");
        link.href = image;
        link.download = "canvas-image.png"; // File name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <>
            <div className="editor-body">
                <div className="frame-container">
                    <div className="frames">
                        {
                            FRAMES.map((frame, index) => (
                                <button onClick={() => setSelectedFrame(frame)} key={index}>
                                    <img src={frame.image} alt={frame.name} />
                                </button>
                            ))
                        }
                    </div>
                </div>

                <div className="canvas-container">
                    {/* Hidden Component to Capture */}
                    <div
                        ref={componentRef}
                        style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
                    >
                        <Frame companyDetails={companyDetails} selectedImg={selectedImg} selectedFrame={selectedFrame} />
                    </div>

                    {/* Canvas */}
                    <canvas ref={canvasRef} width={600} height={600} />

                    <button onClick={downloadCanvas} className="download-button">
                        Download Image
                    </button>
                </div>
            </div>
        </>
    )
}

export default Editor;