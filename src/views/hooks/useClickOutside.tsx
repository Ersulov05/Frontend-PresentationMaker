import { RefObject, useEffect } from "react";

type UseClickOutsideProps = {
    ignoreIds?: string[]
    ignoreClasses?: string[]
    ignoreTags?: string[]
    ignoreRefs?: RefObject<HTMLElement>[]
    onClickOutside?: () => void
}

function useClickOutside({
    ignoreClasses = [],
    ignoreIds = [],
    ignoreTags = [],
    ignoreRefs = [],
    onClickOutside,
}: UseClickOutsideProps) {
    const handleClick = (event: MouseEvent) => {
        if (!onClickOutside) return 
        const target = event.target as HTMLElement
        const isIgnoredClass = ignoreClasses.some(className => target.closest(`.${className}`))
        const isIgnoredId = ignoreIds.some(id => target.closest(`#${id}`))
        const isIgnoredTag = ignoreTags.includes(target.tagName.toLowerCase())
        const isIgnoredRef = ignoreRefs.some(ref => ref.current && ref.current.contains(target))

        if (!isIgnoredClass && !isIgnoredId && !isIgnoredTag && !isIgnoredRef) {
            onClickOutside()
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick, true);

        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, [handleClick]);
}

export { useClickOutside };