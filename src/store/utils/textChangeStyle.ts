function changeFont(fontName: string) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedContents = range.cloneContents()

    const parentSpan = range.startContainer.parentNode as HTMLElement;

    if (parentSpan.tagName === 'SPAN' && parentSpan.style.fontFamily === fontName) {
        parentSpan.style.fontFamily = fontName
    } else {
        const span = document.createElement('span')
        span.style.fontFamily = `'${fontName}'`

        range.deleteContents()
        
        span.appendChild(selectedContents)
        range.insertNode(span)
    }
}

function changeFontSize() {
    const newSize = prompt("Введите размер шрифта (например, '24px'):", "24px");
    if (newSize) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const selectedContents = range.cloneContents(); // Клонируем выделенный текст
            const elements = selectedContents.childNodes;

            // for (let i = 0; i < elements.length; i++) {
            //     const element = elements[i];
            // }

            const span = document.createElement('span');
            span.style.fontSize = newSize; // Устанавливаем новый размер шрифта
            
            range.deleteContents();
            
            // Оборачиваем все выделенные узлы в новый <span>
            const fragment = document.createDocumentFragment();
            fragment.appendChild(span);
            span.appendChild(selectedContents); // Добавляем клонированное содержимое в <span>
            
            range.insertNode(fragment); // Вставляем новый фрагмент в документ
        }
    }
}

export {
    changeFont,
    changeFontSize,
}