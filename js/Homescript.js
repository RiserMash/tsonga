function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

const artits = [
    {
        Name:'benny mayengani',
        Link:'<a href="media/Benny Mayengani/benny mayengani.html"><img src="media/tiles/benny mayengani.png"></a>'
    },
    {
        Name:'Cinna Mpaka',
        Link:'<a href="media/Cinna Mpaka/Cinna Mpaka.html"><img src="media/tiles/cinna mpaka.png"></a>'
    },
    {
        Name:'Dj Gwinya',
        Link:'<a href="media/Dj Gwinya/Dj Gwinya.html"><img src="media/tiles/Dj Gwinya.png"></a>'
    },
    {
        Name:'Hlavu Sikiza',
        Link:'<a href="media/Hlavu Sikiza/Hlavu Sikiza.html"><img src="media/tiles/Hlavu Sikiza.png"></a>'
    },
    {
        Name:'J John',
        Link:'<a href="media/J John/J John.html"><img src="media/tiles/J John.png"></a>'
    },
    {
        Name:'Veekat',
        Link:'<a href="media/Veekat/Veekat.html"><img src="media/tiles/Veekat.png"></a>'
    },
    {
        Name:'XamaCcombo',
        Link:'<a href="media/XamaCcombo/XamaCcombo.html"><img src="media/tiles/XamaCcombo.png"></a>'
    },

]
const names = [...new Set(artits.map(artist => artist.Name))];

const displayItems = (filteredArtits) => {
    const searchResult = document.getElementById('search-result');
    const noMatchMessage = document.getElementById('no-match-message');

    if (filteredArtits.length > 0) {
        searchResult.innerHTML = filteredArtits.map(artist => artist.Link).join('');
        noMatchMessage.style.display = 'none';
    } else {
        searchResult.innerHTML = '';
        noMatchMessage.style.display = 'block';
    }
};

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

document.getElementById('search-input').addEventListener('keyup', debounce((e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredArtits = artits.filter(artist => artist.Name.toLowerCase().includes(searchTerm));
    displayItems(filteredArtits);
}, 300));

// Initial display of all items
displayItems(artits);