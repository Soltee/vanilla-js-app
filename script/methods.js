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


