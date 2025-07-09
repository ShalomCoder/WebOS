function init(){
    const timeElement = document.getElementById('time');
    const topBar = document.getElementById('top-bar')

    let bgColor = localStorage.getItem('bgColor');
    let timeColor = localStorage.getItem('timeColor');

    if(bgColor && timeColor){
        document.body.style.background = bgColor;
        topBar.style.color = timeColor;
    }
    else{
        localStorage.setItem('bgColor', '#f00');
        localStorage.setItem('timeColor', '#fff');

        document.body.style.background = '#f00';
        topBar.style.color = '#fff';
    }

    
    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    };
    
    updateTime();
    setInterval(updateTime, 30000);
}
