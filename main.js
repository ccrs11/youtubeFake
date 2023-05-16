const searchBtn = document.querySelector('.search-icon');
searchBtn.addEventListener('click', searchYoutube);

async function traercomentarios(id) {
  const url = `https://youtube138.p.rapidapi.com/video/comments/?id=${id}&hl=en&gl=US`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '91c5acf63cmshdf8666df3c954c3p19b287jsn031880e1823c',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    //console.log(result);

    const insertComment = document.querySelector('.comentarios');
    let comment = "";
    let avatar = "";
    insertComment.innerHTML = ``;
    for (let i = 0; i < 20; i++) {
      comment = result.comments[i].content;
      avatar = result.comments[i].author.avatar[0].url;
      insertComment.insertAdjacentHTML("beforeend", `<div><img src="${avatar}" alt="avatar"> <p>${comment}</p></div>`);
    }
  } catch (error) {
    console.error(error);
  }
}

async function traerDescription(id) {
  const url = `https://youtube138.p.rapidapi.com/video/details/?id=${id}&hl=en&gl=US`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '91c5acf63cmshdf8666df3c954c3p19b287jsn031880e1823c',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    //console.log(result);
    const description = result.description;
    //console.log(description);
    const insertDescription = document.querySelector(".descripcion");
    insertDescription.innerHTML = `<p class="descripcion" >${description}</p>`;
  } catch (error) {
    console.error(error);
  }
}

async function traerRelatedVideos(id) {
  const url = `https://youtube138.p.rapidapi.com/video/related-contents/?id=${id}&hl=en&gl=US`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '91c5acf63cmshdf8666df3c954c3p19b287jsn031880e1823c',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    /*     console.log(result); */

    const insertRelated = document.querySelector('.relatedV');
    let idvideo = "";
    insertRelated.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      idvideo = result.contents[i].video.videoId;
      insertRelated.insertAdjacentHTML("beforeend", `<iframe width="150rem" height="150rem" src="https://www.youtube.com/embed/${idvideo}" frameborder="0" allowfullscreen></iframe>`);
    }



  } catch (error) {
    console.error(error);
  }
}

async function nombreCanal(channelId) {
  const url = `https://youtube138.p.rapidapi.com/channel/details/?id=${channelId}&hl=en&gl=US`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '91c5acf63cmshdf8666df3c954c3p19b287jsn031880e1823c',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    //console.log(result);

    const insertName = document.querySelector('.nombreCanal');
    let nombre = "";
    let avatar = "";
    nombre = result.title;
    avatar = result.avatar[0].url;
    insertName.innerHTML = `<div><img src="${avatar}" alt="avatar"> <p>${nombre}</p><div>`;
  } catch (error) {
    console.error(error);
  }
}



async function searchYoutube() {
  //Traer video
  let search = document.getElementById("search-bar").value;
  const urlv = `https://youtube138.p.rapidapi.com/search/?q=${search}&hl=en&gl=US`;
  const optionsv = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '91c5acf63cmshdf8666df3c954c3p19b287jsn031880e1823c',
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(urlv, optionsv);
    const result = await response.json();
    console.log(result);
    const id = result.contents[1].video.videoId;
    const channelId = result.contents[1].video.author.channelId;
    const nameVideo = result.contents[1].video.title;
    //console.log(id);
    const insertVideo = document.getElementById("principal");
    insertVideo.innerHTML = `<iframe width="100%" height=100% src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`
    const insertName = document.querySelector('.nombreVideo');
    insertName.innerHTML = `<h3>${nameVideo}</h3>`;
    traercomentarios(id);
    traerDescription(id);
    traerRelatedVideos(id);
    nombreCanal(channelId);
  } catch (error) {
    console.error(error);
  }

}