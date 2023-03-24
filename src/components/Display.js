const DisplayOnResize = () => {
  if (window.matchMedia("(width<=375px)").matches) {
    // RULES
    document.querySelectorAll('.desktop').forEach(item => {
      item.classList.add('hidden');
    })
    document.querySelectorAll('.mobile').forEach(item => {
      item.classList.remove('hidden');
    })
    document.querySelectorAll('.flex').forEach(item => {
      item.classList.remove('flex-row');
      item.classList.add('flex-col');
    })
  }
  if (window.matchMedia("(width>375px)").matches) {
    // RULES
    document.querySelectorAll('.mobile').forEach(item => {
      item.classList.add('hidden');
    })
    document.querySelectorAll('.desktop').forEach(item => {
      item.classList.remove('hidden');
    })
    document.querySelectorAll('.flex').forEach(item => {
      item.classList.remove('flex-col');
      item.classList.add('flex-row');
    })
  }
}

export default DisplayOnResize;