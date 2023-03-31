const currentPageLink = document.querySelector(`a[href*="${location.pathname}"]`);
currentPageLink.classList.add("current-page-a");
currentPageLink.parentElement.classList.add("current-page-li");

