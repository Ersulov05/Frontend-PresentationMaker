import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Presentation, Slide, ObjectText } from './Presentation'; 

interface PresentationContextType {
    presentation: Presentation;
    setPresentation: React.Dispatch<React.SetStateAction<Presentation>>;
    addSlide: () => void;
    selectSlide: (slideUid: string) => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);


const PresentationMin:Presentation = {
    name: "My Presentation",
    slides: [],
    selectedSlideIds: [],
    scale: 1,
}

const PresentationMax:Presentation = {
  name: 'New presentation',
  slides: [
    {
      uid: '28b0e84e-eb72-4f63-9cc9-1ed47ea3e07b',
      background: { color: '#AF00F1', type: 'solid' },
      objects: [
        {
          uid: 'a4764091-6cf2-4b5a-a586-ede15a722b86',
          pos: { x: 100, y: 100 },
          size: { width: 100, height: 100 },
          src: '/image/react.svg',
          type: 'image'
        },
        {
          uid: '25f6059b-42ca-40c9-95be-0502cd0844b2',
          pos: { x: 0, y: 100 },
          size: { width: 100, height: 100 },
          value: 'Тут текст',
          font: {
            style: 'italic',
            family: 'arial',
            size: 12,
            weight: 400,
            lineHeight: 1
          },
          color: 'none',
          backgroundColor: 'none',
          type: 'text'
        }
      ],
      selectedObjectIds: [ '25f6059b-42ca-40c9-95be-0502cd0844b2' ]
    },
    {
      uid: 'b28d7ce8-86c7-4e45-8cbd-79e8fbf8c465',
      background: { src: '/image/fon.jpeg', type: 'image' },
      objects: [
        {
          uid: 'a8fa7818-7232-4981-b369-1b8fcced8d5f',
          pos: { x: 100, y: 100 },
          size: { width: 100, height: 100 },
          src: '/image/react.svg',
          type: 'image'
        },
        {
          uid: '40fd75e3-2abc-4b14-a02b-31740e2774d2',
          pos: { x: 200, y: 200 },
          size: { width: 100, height: 100 },
          value: 'text',
          font: {
            style: 'normal',
            family: 'arial',
            size: 36,
            weight: 400,
            lineHeight: 1
          },
          color: '#ff00ff',
          backgroundColor: '#00fff0',
          type: 'text'
        }
      ],
      selectedObjectIds: [ '40fd75e3-2abc-4b14-a02b-31740e2774d2' ]
    }
  ],
  selectedSlideIds: [ 'b28d7ce8-86c7-4e45-8cbd-79e8fbf8c465', '28b0e84e-eb72-4f63-9cc9-1ed47ea3e07b' ],
  scale: 1
}

export const PresentationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [presentation, setPresentation] = useState<Presentation>(PresentationMax);

    function generateUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const addSlide = () => {
        const newSlide: Slide = {
            uid: generateUID(),
            background: {
                color: "#FFFFFF",
                type: "solid"
            },
            objects: [],
            selectedObjectIds: []
        }

        setPresentation(prev => ({
            ...prev,
            slides: [...prev.slides, newSlide],
            selectedSlideIds: [newSlide.uid],
        }));
    };

    const selectSlide = (slideUid: string) => {
        const { slides } = presentation
        setPresentation(prev => ( {
            ...prev,
            slides: slides.map(slide => {
                if (slide.uid === slideUid) {
                    return {
                        ...slide,
                        selectedObjectIds: []
                    }
                }
                return slide
            }),
            selectedSlideIds: [slideUid]
        }))
    }

    return (
        <PresentationContext.Provider value={{ presentation, setPresentation, addSlide, selectSlide }}>
            {children}
        </PresentationContext.Provider>
    );
};

export const usePresentation = () => {
    const context = useContext(PresentationContext);
    if (!context) {
        throw new Error('usePresentation must be used within a PresentationProvider');
    }
    return context;
};