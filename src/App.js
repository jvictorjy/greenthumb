import './styles/main.scss';


const App = () => {
	const App = document.createElement('div');

	let sun = document.getElementById('select-sun');
	let water = document.getElementById('select-water');
	let dog = document.getElementById('select-dog');

	sun.addEventListener("change", change, false);
	water.addEventListener("change", change, false);
	dog.addEventListener("change", change, false);

	function change() {
		let data = {
			sun: sun.value,
			water: water.value,
			pets: dog.value
		};

		console.log();


		callback(data);
	}

	function callback(data) {
		let params = new URLSearchParams(data).toString()
		fetch(`https://6nrr6n9l50.execute-api.us-east-1.amazonaws.com/default/front-plantTest-service?${ params }`).then(res => res.json())
			.then((res) => {
				if (res.status === 422) {
					const message = 'You need to answer all questions';
					let toast = document.getElementById("toast");
					toast.innerHTML = message;
					toast.className = "show";
					setTimeout(function () {
						toast.className = toast.className.replace("show", "");
					}, 3000);

					return;
				}

				results(res);
			});
	}

	function results(data) {
		if (data) {
			let message = document.getElementById('message');
			message.style.display = 'none';

			let img = document.getElementById('illustration');
			img.style.display = 'none';

			let result = document.getElementById('show-results');
			createCard(data);
			result.style.display = 'block';
		}
	}

	function createCard(data) {
		console.log(data);
		const cards = document.getElementById('cards');
		cards.innerHTML = '';

		data.map((plant) => {
			let imgWater = '';
			let altWater = '';
			switch (plant.water) {
				case 'rarely':
					imgWater = 'rarely.svg';
					altWater = 'Rarely';
					break;
				case 'regularly':
					imgWater = 'Regularly.svg';
					altWater = 'Regularly';
					break;
				case 'daily':
					imgWater = 'daily.svg';
					altWater = 'Daily';
					break;
			}

			let imgSun = '';
			let altSun = '';
			switch (plant.sun) {
				case 'high':
					imgSun = 'HighSun.svg';
					altSun = 'High Sun';
					break;
				case 'low':
					imgSun = 'LowSun.svg';
					altSun = 'Low Sun';
					break;
				case 'no':
					imgSun = 'NoSun.svg';
					altSun = 'No Sun';
					break;
			}

			let imgToxicity = 'Pet.svg';
			let altToxicity = 'No Toxic';
			if (plant.toxicity) {
				imgToxicity = 'Toxic.svg';
				altToxicity = 'Toxic';
			}

			const card = document.createElement('div');
			card.classList.add('card');

			card.innerHTML = `
					<div class="img-plant">
			        <img src="${plant.url}" alt="${plant.name}"/>
			    </div>
			    <p>${plant.name}</p>
			    <div>
			        <p>$ ${plant.price}</p>
			        <div class="icons">
			            <img src="assets/${imgToxicity}" alt="${altToxicity}">
			            <img src="assets/${imgSun}" alt="${altSun}">
			            <img src="assets/${imgWater}" alt="${altWater}"/>
			        </div>
			    </div>
			`;

			cards.appendChild(card);
		});

	}

	return App;
}

export default App;