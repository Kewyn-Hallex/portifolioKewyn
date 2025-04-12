const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
            if (entry.target.classList.contains('hidden-right')) {
                entry.target.classList.add('show-right');
            }
        } else {
            entry.target.classList.remove('show', 'show-right');
        }
    });
});

const elements = document.querySelectorAll('.hidden, .hidden-right');

elements.forEach((element) => myObserver.observe(element));