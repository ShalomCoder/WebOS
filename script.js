function init(){
    let bgColor = localStorage.getItem('bgColor');
    if(bgColor){
        document.body.style.backgroundColor = bgColor;
    }
    else{
        localStorage.setItem('bgColor', '#f00');
        document.body.style.backgroundColor = '#f00';
    }

    const timeElement = document.getElementById('time');
    let timeColor = localStorage.getItem('timeColor');
    timeElement.style.color = timeColor;
    
    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    };
    
    updateTime();
    setInterval(updateTime, 30000);
}
