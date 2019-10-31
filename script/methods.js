const URL = (window.location.hostname === 'localhost') ? 'http://localhost:1000' : 'https://soltee.github.io/vanilla-js-app';	
// const URL = (window.location.hostname === 'localhost') ? 'http://soltee.github.io.com' : 'https://soltee.github.io/vanilla-js-app';	

//Get All Movies
let loader = document.querySelector('.loader');
let loading = true;

function query(endpoint){
	let data = fetch(`https://yts.lt/api/v2/${endpoint}`)
		.then(res => res.json())
		.then(resu => {
			if(loading){

				loader.style.display = "block";

				if(resu.status === 'ok'){
					return resu;
					console.log(resu);				
				}

			}
			

		})
		.catch(error => console.log(error));
	return data;
}


