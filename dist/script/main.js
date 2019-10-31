document.addEventListener('DOMContentLoaded', function () {
	
	let moviesDiv = document.querySelector('.moviesDiv');
	let paginateDiv = document.querySelector('.paginate');

	//Get All
	let data = query(`list_movies.json?limit=10`).then(res => {
		console.log(res);
		let all = res;
		res.data.movies.forEach((movie) => {
			let divWrapper = document.createElement('div');
			divWrapper.className = "movies";
			let div = document.createElement('div');
			div.className = "movie";

			let img = document.createElement('img');
			let a  = document.createElement('a');
			a.className = "movie-anchor";
			if(window.location.hostname == "localhost"){
				a.href = `/movie.html?id=${movie.id}`;
			} else{
				a.href = `https://soltee.github.io/vanilla-js-app/movie.html?id=${movie.id}`;
			}

			img.className = 'movie-image';	
			img.alt = "Image For Movie.";
			img.src = movie.large_cover_image;


			let title = document.createElement('h5');
			title.className = "video-title";
			title.textContent = movie.title;

			// console.log(all.data.page_number);

			// let control = document.createElement('div');
			// control.className = "paginate";
			

			//Append ALl tot DOM
			a.appendChild(img);
			div.appendChild(a);
			div.appendChild(title);
			divWrapper.appendChild(div);
			
			loading = false;

			setTimeout((e) => {
				if(!loading){
					loader.style.display = "none";

					moviesDiv.appendChild(divWrapper);	
				}
				
			}, 2000);
			

		})

		let prev = document.createElement('a');
		// prev.textContent = "Prev";
		prev.className = "prev fa fa-arrow-left";

		let next = document.createElement('a');
		// next.textContent = "Next";
		next.className = "next fa fa-arrow-right";

		// console.log(paginateDiv);
		if(res.data.movie_count > 0)
		{
			paginateDiv.appendChild(prev);
			paginateDiv.appendChild(next);
		}
		
		//Page Number for Increasing by 1 or decreasing by id when prev and next arrow is clicked
		let page = all.data.page_number;
		let limit = 10;
		//Prev PAge
		document.querySelector('.prev').addEventListener('click', (e)=>{
			
			moviesDiv.textContent = '';
			loading = true;
			if(loading){

				loader.style.display = "block";
				
			}

				fetch(`https://yts.lt/api/v2/list_movies.json?limit=${limit}&page=${page--}`)
					.then(res => res.json())
					.then(resu => {
						console.log(page);
						console.log(res.data);
						// if(loading){

						// 	loader.style.display = "block";
							// moviesDiv.textContent = '';

							if(resu.status === 'ok'){

								let all = resu;
								all.data.movies.forEach((movie) => {
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
									

									//Append ALl tot DOM
									a.appendChild(img);
									div.appendChild(a);
									div.appendChild(title);
									divWrapper.appendChild(div);
									
									loading = false;

									setTimeout((e) => {
										if(!loading){
											loader.style.display = "none";
											moviesDiv.insertBefore(divWrapper, moviesDiv.childNodes[0]);
										}
										
									}, 2000);


								});				
							}
                    
						// }
						

					})
					.catch(error => console.log(error));
			});


		//Next PAge
		document.querySelector('.next').addEventListener('click', (e)=>{
			
			moviesDiv.textContent = '';
			loading = true;
			if(loading){

				loader.style.display = "block";
				
			}

				fetch(`https://yts.lt/api/v2/list_movies.json?limit=${limit}&page=${page++}`)
					.then(res => res.json())
					.then(resu => {
						console.log(page);
						console.log(res.data);
						// if(loading){

						// 	loader.style.display = "block";
							// moviesDiv.textContent = '';

							if(resu.status === 'ok'){

								let all = resu;
								all.data.movies.forEach((movie) => {
									
									let div = document.createElement('div');
									div.className = "movie";

									let img = document.createElement('img');
									let a  = document.createElement('a');
									a.className = "movie-anchor";
									a.href = `/detail.html?id=${movie.id}`;

									img.className = 'movie-image';	
									img.alt = "Image For Movie.";
									img.src = movie.large_cover_image;


									let title = document.createElement('h5');
									title.className = "video-title";
									title.textContent = movie.title;
									

									//Append ALl tot DOM
									a.appendChild(img);
									div.appendChild(a);
									div.appendChild(title);
									
									loading = false;

									setTimeout((e) => {
										if(!loading){
											loader.style.display = "none";
											moviesDiv.insertBefore(div, moviesDiv.childNodes[0]);
										}
										
									}, 2000);


								});				
							}

						// }
						

					})
					.catch(error => console.log(error));
			});

	});



});


