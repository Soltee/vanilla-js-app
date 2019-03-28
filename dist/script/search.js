document.addEventListener('DOMContentLoaded', function () {
	
	let moviesDiv = document.querySelector('.moviesDiv');
	let paginateDiv = document.querySelector('.paginate');
	let search = document.querySelector('.fa-search');
	let input = document.getElementById('key');
	//Search
	search.addEventListener("click", (e)=> {
		moviesDiv.textContent = '';
		let queryTerm  = input.value;
		
		loading = true;

		if(queryTerm.length > 0){

			if(loading){

				loader.style.display = "block";
				
			}


			let data = query(`list_movies.json?query_term=${queryTerm}`).then(res => {
				if(res.data.movie_count > 0){

					res.data.movies.forEach((movie) => {

            			let divWrapper = document.createElement('div');
						divWrapper.className = "movies";
						let div = document.createElement('div');
						div.className = "movie";

						let img = document.createElement('img');
						let a  = document.createElement('a');
						a.className = "movie-anchor";
						a.href = `/movie.html?id=${movie.id}`;

						img.className = 'movie-image';	
						img.alt = "Image For Movie.";
						img.src = movie.large_cover_image;


						let title = document.createElement('h5');
						title.className = "video-title";
						title.textContent = movie.title;

						// console.log(movie);

						//Append ALl tot DOM
						a.appendChild(img);
						div.appendChild(a);
						div.appendChild(title);
					    loading = false;

						setTimeout((e) => {
							

							if(!loading){
								loader.style.display = "none";
								divWrapper.appendChild(div);
								if(paginateDiv){
									paginateDiv.style.display = "none";									
								}
								moviesDiv.insertBefore(divWrapper, moviesDiv.childNodes[0]);
							}
							
						}, 2000);
					
					});

				} else 
				{
					let pa = document.createElement('p');
					pa.className = "error";
					pa.textContent = "No movie matched for ( "+ queryTerm +" )";
					loading = false;

					if(!loading){
						loader.style.display = "none";
						paginateDiv.style.display = "none";
						moviesDiv.insertBefore(pa, moviesDiv.childNodes[0]);
					}
				}
				

			});
		} else {
			let pa = document.createElement('p');
			pa.className = "error";
			pa.textContent = "Enter some keywords..";
			loading = false;

			if(!loading){
				loader.style.display = "none";
				paginateDiv.style.display = "none";
				moviesDiv.insertBefore(pa, moviesDiv.childNodes[0]);
			}
		}

		
	});

});