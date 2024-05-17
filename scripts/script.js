document.addEventListener('DOMContentLoaded', function() {
    var xhr = new XMLHttpRequest();
    var dataList = document.getElementById('dataList');
    var searchInput = document.getElementById('searchInput');
    var suggestionsList = document.getElementById('suggestionsList'); 
    var responseData; 

    function displayData(data) {
        dataList.innerHTML = '';
        console.log(data)
        data.forEach(function(item) {
            var mainBlock = document.createElement('div');
            mainBlock.classList.add("card");

            var title = createAndAppendElement(mainBlock, "div", "bigFont", item.name);

            var image = createAndAppendElement(mainBlock, "img", null, null);
            image.src = item.img;

            var price = createAndAppendElement(mainBlock, "price", "mediumFont", item.price);

            var button = createAndAppendElement(mainBlock, "button", null, "Details");
            button.addEventListener('click', function() {
                var url = 'details.html?id=' + item.id; 
                window.location.href = url; 
            });

            dataList.appendChild(mainBlock);
        });
    }

    function createAndAppendElement(parent, tagName, className, text) {
        var element = document.createElement(tagName);
        if (className) element.classList.add(className);
        if (text) element.textContent = text;
        parent.appendChild(element);
        return element;
    }

    function shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function searchByName(name) {
        var filteredData;
        var suggestions = []; 
        if (name.trim() === '') {
            filteredData = responseData; 
        } else {
            filteredData = responseData.filter(function(item) {
                var lowercaseName = item.name.toLowerCase();
                var lowercaseSearch = name.toLowerCase();
                if (lowercaseName.includes(lowercaseSearch)) {
                    suggestions.push(item.name); 
                    return true;
                }
                return false;
            });
        }
        displayData(filteredData);
        searchInput.setAttribute('list', 'suggestionList'); 
        displayAutocomplete(suggestions); 
    }
    
    function displayAutocomplete(suggestions) {
        var datalist = document.getElementById('suggestionList');
        if (!datalist) {
            datalist = document.createElement('datalist');
            datalist.id = 'suggestionList';
            document.body.appendChild(datalist); 
        } else {
            datalist.innerHTML = ''; 
        }
    
        suggestions.forEach(function(suggestion) {
            var option = document.createElement('option');
            option.value = suggestion;
            datalist.appendChild(option);
        });
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                responseData = JSON.parse(xhr.responseText);
                searchInput.addEventListener('input', function() {
                    searchByName(this.value);
                });
                displayData(responseData);
            } else {
                console.error('Ошибка запроса: ' + xhr.status);
            }
        }
    };

    xhr.open('GET', 'data.json', true);
    xhr.send();
});
