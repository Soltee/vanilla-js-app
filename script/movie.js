document.addEventListener('DOMContentLoaded', function () {
	
	let movieDiv = document.querySelector('.movieDiv');
	let similarDiv = document.querySelector('.similarDiv');
	var urlParams = new URLSearchParams(window.location.search);

	let param = urlParams.get('id'); // "edit"
	//https://yts.am/api/v2/movie_details.json?movie_id=10
	//movie_suggestions.json?movie_id=10

	let data = query(`movie_details.json?movie_id=${param}`).then(res => {

		console.log(res);
		if(res.data.movie)
		{
			let main = document.createElement('div');
			main.className = "main";

			let one = document.createElement('div');
			one.className = "one";

			let img = document.createElement('img');
			img.className = 'movie-image-single';	
			img.alt = "Image For Movie.";
			img.src = res.data.movie.large_cover_image;

			one.appendChild(img);

			let two = document.createElement('div');
			two.className = "two";

			let title = document.createElement('h5');
			title.className = "video-title-single";
			title.textContent = res.data.movie.title;
			two.appendChild(title);

			let year = document.createElement('span');
			year.className = "video-year-single";
			year.textContent = res.data.movie.year;
			two.appendChild(year);

			res.data.movie.genres.forEach((g) => {
				let genre = document.createElement('span');
				genre.className = "video-genre-single";
				genre.textContent = g	
				two.appendChild(genre);
			});

			let length = document.createElement('span');
			length.className = "video-length-single";
			length.textContent = "Approximately : " + res.data.movie.runtime + " mins"; 
			two.appendChild(length);

			let download = document.createElement('span');
			download.className = "video-download-single";
			download.textContent = "Downloaded  " + res.data.movie.download_count + " times"; 
			two.appendChild(download);
			
			let availableHead = document.createElement('span');
			availableHead.className = "available-video";
			availableHead.textContent = "Available in";
			two.appendChild(availableHead);
			res.data.movie.torrents.forEach((t) => {
				let available = document.createElement('button');
				available.className = "video-available-single";
				available.textContent = t.quality;
				two.appendChild(available);
			});

			let heartDiv = document.createElement('div');
			heartDiv.className = "heartDiv";
			let heart = document.createElement('i');
			heart.className = "fas fa-heart";
			heartDiv.appendChild(heart);

			let like = document.createElement('span');
			like.className = "video-like-single";
			like.textContent = res.data.movie.like_count;
			heartDiv.appendChild(like);
			two.appendChild(heartDiv);

			let ratingDiv = document.createElement('div');
			ratingDiv.className = "ratingDiv";
			let imdb = document.createElement('i');
			imdb.className = "fab fa-imdb";
			ratingDiv.appendChild(imdb);

			let rating = document.createElement('span');
			rating.className = "video-rating-single";
			rating.textContent = res.data.movie.rating;
			ratingDiv.appendChild(rating);

			let mpa = document.createElement('span');
			mpa.className = "video-mpa-single";
			mpa.textContent = res.data.movie.mpa_rating;
			ratingDiv.appendChild(mpa);

			two.appendChild(ratingDiv);
		
			let p = document.createElement('p');
			p.className = "movie-description";
			p.textContent = res.data.movie.description_intro;
			two.appendChild(p);

			main.appendChild(one);
			main.appendChild(two);

			// console.log(div);
			
			loading = false;

			setTimeout((e) => {
				if(!loading){
					loader.style.display = "none";

					movieDiv.insertBefore(main, movieDiv.childNodes[0]);
				}
				
			}, 1000);
		} else 
		{
			let pa = document.createElement('p');
			pa.className = "error";
			pa.textContent = "No movie matched for ( "+ param +" )";
			loading = false;


			if(!loading){
				loader.style.display = "none";
				movieDiv.insertBefore(pa, movieDiv.childNodes[0]);
			}
		}


	});


	let s = query(`movie_suggestions.json?movie_id=${param}`).then(res => {
		if(res.data.movie_count > 0){

			let sheading = document.createElement('h4');
			sheading.className = "sheading";
			sheading.textContent = "Similar Movies";
			similarDiv.insertBefore(sheading, similarDiv.childNodes[0]);

			res.data.movies.forEach((m) => {
				
				let similar = document.createElement('div');
				similar.className = "similar";	

				let a  = document.createElement('a');
				a.className = "movie-anchor";
				a.href = `/movie.html?id=${m.id}`;

				let similar_img = document.createElement('img');
				similar_img.className = 'similar-img';	
				similar_img.alt = "Image For Movie.";
				similar_img.src = m.medium_cover_image;
				a.appendChild(similar_img);

				similar.appendChild(a);
				similarDiv.appendChild(similar);
			});
			
		}  else 
		{
			let pa = document.createElement('p');
			pa.className = "error";
			pa.textContent = "No movie matched for ( "+ param +" )";
			loading = false;


			if(!loading){
				loader.style.display = "none";
				similar.insertBefore(pa, movieDiv.childNodes[0]);
			}
		}
		
	});

});