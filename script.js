const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })
    // FIX 1: Changed 'dragent' to 'dragend'
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        
        if (draggable) {
            if (afterElement == null) {
                container.appendChild(draggable)
            } else {
                container.insertBefore(draggable, afterElement)
            }
        }
    })
})

function getDragAfterElement(container, y) {
    // FIX 2: Added dot prefix for class selector '.draggable'
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        
        if (offset < 0 && offset > closest.offset) {
            // FIX 3: Changed 'Element' to 'element' to match .element at the end
            return { offset: offset, element: child } 
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}