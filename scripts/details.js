var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');



function loadDataById(id) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var carData = JSON.parse(xhr.responseText);
                var car = carData.find(function(item) {

                    return item.id === id;
                });
                console.log(car)
                if (car) {
                    displayDetails(car);
                } else {
                    console.error('Машина с ID ' + id + ' не найдена.');
                }
            } else {
                console.error('Ошибка загрузки данных: ' + xhr.status);
            }
        }
    };
    xhr.open('GET', 'data.json', true);
    xhr.send();

    function displayDetails(car) {
        console.log(car);
        var detailsContainer = document.getElementById('detailsContainer');
        var textBlock = document.getElementById("text")
        if (!detailsContainer) return;

        var title = document.createElement('h1');
        title.textContent = "Model name: " + car.name;

        var image = document.createElement('img');
        image.src = car.img;

        var text = document.createElement("div")
        text.textContent = car.text

        var price = document.createElement('div');
        price.textContent = "Price: " + car.price;

        var button = document.createElement("button")
        button.textContent = "Purchase"
        button.classList.add("green")
        button.addEventListener("click", function() {
            
            Swal.fire({
                title: 'Success!',
                text: 'Thank you for purchase',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
        });

        detailsContainer.appendChild(image);
        detailsContainer.appendChild(title);
        textBlock.appendChild(text);
        detailsContainer.appendChild(price);
        detailsContainer.appendChild(button);
    }

}


loadDataById(parseInt(id))
