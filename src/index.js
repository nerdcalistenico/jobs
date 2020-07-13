fetch("https://api.github.com/repos/nerdcalistenico/jobs/issues", {
  method: "GET",
})
.then((response => response.json())
.then(data => {
  let html = '<ul>';

  data.map(item => {
    let title = item.title;
    let items;
    items = title.match(/<(.*?)>/g).map(item => item.replace(/[><]/g,''))
    items = items.concat(title.match(/\[(.*?)\]/g).map(item => item.replace(/[\[\]]/g,'')))

    let body = item.body.split('##')
    const about = body[1].split('\r\n\r\n').filter((item, index) => index !== 0 && !!item).join('<br><br>');
    const description = body[2].split('\r\n-').filter((item, index) => index !== 0 && !!item).map(item => `<li>${item}</li>`).join('');
    const location = body[3];
    const requirements = body[4];
    const benefits = body[5];
    const apply = body[6];

    
    html += `
      <li>
        <ul>
          <li><strong>Cargo</strong>: ${items[0]} | <strong>Cidade</strong>: ${items[2]}</li>
          <li><ul>${item.labels.map(item => `<li style="background: #${item.color}; display: inline-block; padding: 2px 10px;">${item.name}</li>`).join('')}</ul></li>
          <li>${about}</li><br><br>
          <li><ul>${description}</ul></li><br><br>
          <li>${location}</li><br><br>
          <li>${requirements}</li><br><br>
          <li>${benefits}</li><br><br>
          <li>${apply}</li>
        </ul>
      </li>
    `
  })

  html += '<ul>';
  document.querySelector('[data-js="main"]').innerHTML = html;
});
