export default ({ store }, inject) => {
  const copyProtection = (flag) => {
      // If the page does not satisfy the condition, then exit
      // It is necessary that the protection works only on certain pages to minimize the load.
    if (store.state['page-info']?.seoData?.page?.component !== 'model') {
      return;
    }

      // Content creation
    const eventListenerFunction = () => {
      const textForAdd = `<br />Подробнее: https://abyss-soft.ucoz.ru/${store.state['page-info']?.seoData?.slug}`;
      const textTarget = window.getSelection();
      const textResultForCopy = textTarget + textForAdd;
      const hiddenElement = document.createElement('div');
      hiddenElement.style.position = 'absolute';
      hiddenElement.style.left = '-98769px';
      document.body.appendChild(hiddenElement);
      hiddenElement.innerHTML = textResultForCopy;
      if (textTarget) textTarget.selectAllChildren(hiddenElement);
      window.setTimeout(function () {
        document.body.removeChild(hiddenElement);
      }, 100);
    };

      // Protection logic  
    const elements = document.querySelectorAll('[data-copy="for-copied"]');
    const isElements = elements && elements.forEach instanceof Function;
    if (!isElements) return;
    if (flag === 1) {
      elements.forEach((element) => {
        if (element.getAttribute('listener') === 'true') {
          return;
        }
        element.setAttribute('listener', 'true');
        element.addEventListener('copy', eventListenerFunction);
      });
      return;
    }

    elements.forEach((element) => {
      element.setAttribute('listener', 'false');
      element.removeEventListener('copy', eventListenerFunction);
    });
  };

  inject('copyProtection', copyProtection);
};
