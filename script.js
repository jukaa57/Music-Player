const audio = document.querySelector("audio")
const coverAlbum = document.getElementById("imageDisplay_player")
const controller = document.getElementById("controller")
const imgVolume = document.getElementById("imgVolume")
const buttomPlay = document.getElementById("play")
const buttomPause = document.getElementById("pause")
const title = document.querySelectorAll(".titleMusic")
const imgMusic = document.getElementById("imageDisplay_player")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")

let high = document.getElementsByName("volume-high-outline")[0]
let medium = document.getElementsByName("volume-medium-outline")[0]
let low = document.getElementsByName("volume-low-outline")[0]
let mute = document.getElementsByName("volume-off-outline")[0]

let playSong = false
let startMusic = 0


//it is list of Music contain: directory of song, cover and name
const musicList = [
    { path: "media/musicsList/Depths-by-Guustavv.mp3",
    cover_song: 'url("media/musicsCover/Depths-by-Guustavv.jpg")' ,
    Name_song: "Depths by Guustavv"},

    { path: "media/musicsList/Giants-Nest-Marble-Ink.mp3",
    cover_song: 'url("media/musicsCover/Giants-Nest-Marble-Ink.jpg")' ,
    Name_song: "Giants' Nest Marble Ink"},

    { path: "media/musicsList/Guustavv, Timothy-Infinite-Sunday-Travels.mp3",
    cover_song: 'url("media/musicsCover/Guustavv, Timothy-Infinite-Sunday-Travels.jfif")',
    Name_song:"Guustavv, Timothy Infinite - Sunday Travels"},

    { path: "media/musicsList/It-Must-Be-Justnormal.mp3",
    cover_song: 'url("media/musicsCover/It-Must-Be-Justnormal.jpg")',
    Name_song:"It Must Be Justnormal"},

    { path: "media/musicsList/Justnormal-A-simple-Kiss.mp3",
    cover_song: 'url("media/musicsCover/Justnormal-A-simple-Kiss.jfif")',
    Name_song:"Justnormal - A simple Kiss"},

    
    { path: "media/musicsList/Neopolitin-by-Guustavv.mp3",
    cover_song: 'url("media/musicsCover/Neopolitin-by-Guustavv.jpg")',
    Name_song:"Neopolitin by Guustavv"},
    
    { path: "media/musicsList/ocean jams-Augment.mp3",
    cover_song: 'url("media/musicsCover/ocean jams-Augment.jpg")',
    Name_song:"ocean jams Augment"},
    
    { path: "media/musicsList/Odyssey-by-[ocean jams].mp3",
    cover_song: 'url("media/musicsCover/Odyssey-by-[ocean jams].jfif")',
    Name_song:"Odyssey by [ocean jams]"},

    { path: "media/musicsList/Shinigami-by-Siny.mp3",
    cover_song: 'url("media/musicsCover/Shinigami-by-Siny.jfif")',
    Name_song:"Shinigami by Siny"},

    { path: "media/musicsList/Timothy-Infinite-Ocean-Breeze.mp3",
    cover_song: 'url("media/musicsCover/Timothy-Infinite-Ocean-Breeze.jfif")',
    Name_song:"Timothy Infinite - Ocean Breeze"}
]


// Control of Play and Pause of song
function playMusic() {
    playSong = true
    audio.play()
    buttomPlay.style.display="none"
    buttomPause.style.display="inline-block"
    imgMusic.style.animationPlayState="running"
}

function pauseMusic() {
    playSong = false
    audio.pause()   
    buttomPlay.style.display = "inline-block"
    buttomPause.style.display = "none" 
    imgMusic.style.animationPlayState="paused"
}
// End Function Play and Pause

//Event that check if the music is playing or paused and replaces the icon 
buttomPlay.addEventListener("click", () => ( playSong ?  playMusic() : pauseMusic() ))

// Control of Volume
/*
   **BUG FIX -> without this verification of end volume, the volume it becomes the are negative or to exceed the limit.
*/
function volumeUpMusic() {
    if( audio.volume <= .9 ) {
        audio.volume += .12
    } else {
        audio.volume = 1
    }
    console.log(audio.volume)
    imageVolume()
}

function volumeDownMusic() {
    if( audio.volume >= .1 ) {
        audio.volume -= .12
    } else {
        audio.volume = 0
    }
    console.log(audio.volume)
    imageVolume()
}
// End Function Control of Volume

// Function to change icon of volume
function imageVolume() {
    if( audio.volume >= .7 ){
        high.style.display = "inline-block"
        medium.style.display = "none"
        low.style.display = "none"
        mute.style.display = "none"
    } else if( audio.volume == .6 || audio.volume >= .45 ) {
        high.style.display = "none"
        medium.style.display = "inline-block"
        low.style.display = "none"
        mute.style.display = "none"
    } else if( audio.volume == .3 || audio.volume >= .01 ) {
        high.style.display = "none"
        medium.style.display = "none"
        low.style.display = "inline-block"
        mute.style.display = "none"
    } else {
        high.style.display = "none"
        medium.style.display = "none"
        low.style.display = "none"
        mute.style.display = "inline-block"
    }
}

// Function that will play fact music and replaces content of song
function loadMusic( music ) {
    title[0].textContent = music.Name_song
    audio.src = music.path
    coverAlbum.style.backgroundImage = music.cover_song  
    imageVolume()
}

// Function for select to previous or next song
/*
    In previous if the song are 3sec or +, the song initiate newly
*/
function prevMusic() {
    if( audio.currentTime > 3 ) audio.currentTime = 0
    else startMusic-- 

    if( startMusic < 0 ) startMusic = musicList.length - 1
    loadMusic( musicList[startMusic] )
    playMusic()
}

function nextMusic() {
    startMusic++
    if( startMusic > musicList.length - 1 ) startMusic = 0
    loadMusic( musicList[startMusic] )
    playMusic()
}
// End Function Prev and Next

// Function for Progress Bar with select position on click
function updateProgress( element ) {
    const { duration, currentTime } = element.srcElement
    const progressPercent = ( currentTime / duration ) * 100;
    progress.style.width = `${ progressPercent }%`

    if( progressPercent === 100 ) nextMusic()
}
audio.addEventListener( "timeupdate", updateProgress )

function clickProgress( element ) {
    const width = this.clientWidth
    const userClick = element.offsetX
    const duration = audio.duration
    audio.currentTime = ( userClick / width ) * duration
}
progressContainer.addEventListener( "click", clickProgress )
// End function Progress Bar

loadMusic( musicList[startMusic] )