(function() {
    const container = document.querySelector('#container');
    const fullSizeView = document.querySelector('#full-size-container');
    const fullSizePicture = document.querySelector('#full-size-picture');

    const contentURL = 'https://cloud.squidex.io/api/content/lobstrhandzgallery';
    const assetsURL = 'https://cloud.squidex.io/api/assets/lobstrhandzgallery';

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

    function parseResponse({ items }) {
        return items?.map(({ id, data }) => {
            let result = {};

            for (const key in data) {
                result.id = id;
                result[key] = data[key].iv;
            }

            return result;
        })
    }

    function handleError(message) {
        setLoadingState(false);
        console.log(message);
    }

    function createPictureBlock({ image, title, height, width }) {
        let pictureContainer = document.createElement('div');
        let pictureWrapper = document.createElement('div');
        let pictureElement = document.createElement('img');
        let plaque = document.createElement('span');

        pictureContainer.classList.add('picture-container');
        pictureWrapper.classList.add('picture-wrapper');
        pictureElement.classList.add('picture');
        pictureElement.src = `${assetsURL}/${image[0]}`;
        pictureElement.height = height;
        pictureElement.width = width;
        pictureElement.onclick = () => {
            fullSizePicture.src = `${assetsURL}/${image[0]}`;
            fullSizeView.classList.remove('hidden');
            document.body.classList.add('full-view-enabled');
        }
        plaque.classList.add('plaque', 'picture-caption');
        plaque.innerText = title;

        pictureWrapper.appendChild(pictureElement);
        pictureContainer.appendChild(pictureWrapper);
        pictureContainer.appendChild(plaque);
        container.appendChild(pictureContainer);
    }

    function getPictures(pageId) {
        const sectionFilterQuery = JSON.stringify({
            filter: {
                path: 'data.section.iv',
                op: 'eq',
                value: pageId
            }
        })
        setLoadingState(true);

        getRequest(`${contentURL}/pictures?q=${encodeURI(sectionFilterQuery)}`)
        .then((response) => {
            const pictures = parseResponse(response);
            container.innerHTML = '';

            for (let picture of pictures) {
                createPictureBlock(picture);
            }

            setLoadingState(false);
        }, () => handleError('Something went wrong'));
    }

    function navLinkEventHandler(pageId) {
        return () => {
            document.querySelector('.current-page')?.classList.remove('current-page');
            document.querySelector(`#page-link-${pageId}`).classList.add('current-page');
            currentSection = pageId;
            getPictures(pageId);
        }
    }

    function createNavMenu(sections) {
        const navMenuBlock = document.querySelector('#nav-menu');

        for(const {id, title} of sections) {
            let link = document.createElement('a');
            link.id=`page-link-${id}`;
            link.innerText = title.toUpperCase();
            link.onclick = navLinkEventHandler(id);
            navMenuBlock.appendChild(link);
        }

        navLinkEventHandler(sections[0].id)();
    }

    function init() {
        setLoadingState(true);

        fullSizeView.onclick = () => {
            fullSizeView.classList.add('hidden');
            document.body.classList.remove('full-view-enabled');
            fullSizePicture.src = '';
        }

        getRequest(`${contentURL}/sections`)
        .then((response) => {
            const sections = parseResponse(response).sort((a, b) => a.sortingOrder > b.sortingOrder ? 1 : -1);
            createNavMenu(sections);
        }, () => handleError('Something went wrong'));
    }


    init();
}());
