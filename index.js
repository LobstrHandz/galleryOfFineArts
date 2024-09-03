(function() {
    const fullSizeView = document.querySelector('#fill-size-container');
    let currentSection = '';

    function setLoadingState(isLoading) {

    }

    function getRequest(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.timeout = 60000;
            request.open('GET', url);
            request.send();
            request.onprogress = () => {}
            request.onerror = reject;
    
            request.onload = () => {
                if (request.status === 200) {
                    resolve(JSON.parse(request.response));
                } else {
                    reject();
                }
            }

        });
    }

    function parseResponse(response) {
        return response.items?.map(({ data }) => {
            let result = {};

            for (const key in data) {
                result[key] = data[key].iv;
            }

            return result;
        })
    }

    function handleError(message) {
        setLoadingState(false);
        console.log(message);
    }

    function navLinkEventHandler(pageName) {
        return () => {
            document.querySelector('.current-page')?.classList.remove('current-page');
            document.querySelector(`#${pageName}-page-link`).classList.add('current-page');
            currentSection = pageName;
            // fillContainer(pageName);
        }
    }

    function createNavMenu(sections) {
        const navMenuBlock = document.querySelector('#nav-menu');

        for(const {title} of sections) {
            let link = document.createElement('a');
            link.id=`${title}-page-link`;
            link.innerText = title.toUpperCase();
            link.onclick = navLinkEventHandler(title);
            navMenuBlock.appendChild(link);
        }

        navLinkEventHandler(sections[0].title)();
    }

    function init() {        
        setLoadingState(true);

        getRequest('https://cloud.squidex.io/api/content/lobstrhandzgallery/sections')
        .then((response) => {
            const sections = parseResponse(response).sort((a, b) => a.sortingOrder > b.sortingOrder ? 1 : -1);
            createNavMenu(sections);
        }, () => handleError('Something went wrong'));
    }


    init();




    // function fillContainer(pageName) {
    //     // const pageContent = PICTURES[pageName];
    //     // container.innerHTML = '';

    //     // for (let item of pageContent) {
    //     //     if (Array.isArray(item)) {
    //     //         renderRow(item);
    //     //     } else {
    //     //         renderPicture(item, container);
    //     //     }
    //     // }
    // }

    // function renderPicture(pictureData, parent) {
    //     let pictureContainer = document.createElement('div');
    //     let pictureElement = document.createElement('img');
    //     let plaque = document.createElement('span');

    //     pictureContainer.classList.add('picture-container');
    //     pictureElement.classList.add('picture');
    //     pictureElement.src = `./pictures/${pictureData.file}`;
    //     pictureElement.height = pictureData.size.y;
    //     pictureElement.width = pictureData.size.x;
    //     pictureElement.onclick = () => {
    //         fullSizeView.children[0].src = `./pictures/${pictureData.file}`;
    //         fullSizeView.classList.remove('hidden');
    //         document.body.classList.add('full-view-enabled');
    //     }
    //     plaque.classList.add('plaque', 'picture-caption');
    //     plaque.innerText = pictureData.title;

    //     pictureContainer.appendChild(pictureElement);
    //     pictureContainer.appendChild(plaque);
    //     parent.appendChild(pictureContainer);
    // }

    // function renderRow(row) {
    //     const rowElement = document.createElement('div');
    //     rowElement.classList.add('picture-row');

    //     for (let item of row) {
    //         renderPicture(item, rowElement);
    //     }

    //     container.appendChild(rowElement)
    // }


    // createNavMenu();
    // fillContainer('pictues');
    // fullSizeView.onclick = () => {
    //     fullSizeView.classList.add('hidden');
    //     document.body.classList.remove('full-view-enabled');
    //     fullSizeView.children[0].src = '';
    // }
}());