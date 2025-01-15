import { useState } from "react";
import { WIDTH_SLIDE, HEIGHT_SLIDE } from '../../store/constants'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function useGeneratePDF() {
    const [isGeneratePDF, setIsGeneratePDF] = useState(true)
    const [status, setStatus] = useState(true)

    const generatePDFs = async (hiddenContainerRef: React.RefObject<HTMLDivElement>, filename: string): Promise<void> => {
        if (!isGeneratePDF) return Promise.resolve();

        setIsGeneratePDF(false);
        setStatus(true);

        console.log('generate');
        const scale = 0.7;
        const slidesRef = hiddenContainerRef.current?.children;
        if (!slidesRef) {
            setStatus(false);
            setIsGeneratePDF(true);
            return Promise.resolve();
        }

        const slidesArray = Array.from(slidesRef) as HTMLElement[];

        const pdf = new jsPDF('landscape', 'pt', [WIDTH_SLIDE * scale, HEIGHT_SLIDE * scale]);

        try {
            for (const [index, slideRef] of slidesArray.entries()) {
                const canvas = await html2canvas(slideRef, { scale: 2 });
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pdf.internal.pageSize.getWidth();
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
                if (index < slidesArray.length - 1) {
                    pdf.addPage();
                }
            }

            pdf.save(`${filename}.pdf`)
            setIsGeneratePDF(true)
        } catch (error) {
            console.error("Ошибка при создании PDF:", error)
            setStatus(false)
            setIsGeneratePDF(true)
        }
    };


    return {
        generatePDFs,
        isGeneratePDF,
        status,
    };
}

export { useGeneratePDF };