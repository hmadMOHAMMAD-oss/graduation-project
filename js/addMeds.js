document.querySelectorAll('.section')[1].classList.add('spanR' , 'sectionsActive')
document.querySelector('.sections').addEventListener('click' , e => {
  const arr = [...document.querySelectorAll('.section')];
   arr.map(e => {
    console.log(e.classList.remove('sectionsActive' , 'spanR'))//classList.classList.remove('sectionsActive');
  })
e.target.classList.toggle('sectionsActive');
})
